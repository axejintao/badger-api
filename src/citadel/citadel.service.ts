import { CitadelLeaderboardEntry, CitadelRewardType, formatBalance, Network } from '@badger-dao/sdk';
import { CitadelTreasurySummary } from '@badger-dao/sdk/lib/api/interfaces/citadel-treasury-summary.interface';
import { Service } from '@tsed/di';
import { TOKENS } from '../config/tokens.config';
import { getPrice } from '../prices/prices.utils';
import { queryTreasurySummary } from '../treasury/treasury.utils';
import { getCitadelKnightingRoundsStats, getStakedCitadelEarnings, queryCitadelData } from './citadel.utils';
import { CITADEL_TREASURY_ADDRESS } from './config/citadel-treasury.config';
import { RewardFilter } from '@badger-dao/sdk/lib/citadel/enums/reward-filter.enum';
import { CitadelRewardEvent } from './interfaces/citadel-reward-event.interface';
import { getDataMapper } from '../aws/dynamodb.utils';
import { CitadelRewardsSnapshot } from '../aws/models/citadel-rewards-snapshot';
import { CitadelRewardEventData } from './destructors/citadel-reward-event.destructor';
import { RewardEventType } from '@badger-dao/sdk/lib/citadel/enums/reward-event-type.enum';
import { ConditionExpression } from '@aws/dynamodb-expressions';
import { CitadelSummary } from '@badger-dao/sdk/lib/api/interfaces/citadel-summary.interface';
import { CitadelAccount } from './interfaces/citadel-account.interface';
import { Chain } from '../chains/config/chain.config';
import { CITADEL_KNIGHTS } from './citadel.constants';

@Service()
export class CitadelService {
  async loadTreasurySummary(): Promise<CitadelTreasurySummary> {
    const [baseTreasurySummary, citadelData] = await Promise.all([
      queryTreasurySummary(CITADEL_TREASURY_ADDRESS),
      queryCitadelData(),
    ]);

    const { price } = await getPrice(TOKENS.WBTC);
    const {
      marketCapToTreasuryRatio,
      valuePaid,
      fundingBps,
      lockingBps,
      stakingBps,
      marketCap,
      supply,
      staked,
      stakedPercent,
    } = citadelData;

    const valueBtc = baseTreasurySummary.value / price;
    const valuePaidBtc = valuePaid / price;

    return {
      ...baseTreasurySummary,
      valueBtc,
      valuePaid,
      valuePaidBtc,
      marketCapToTreasuryRatio,
      fundingBps,
      stakingBps,
      lockingBps,
      marketCap,
      supply,
      staked,
      stakedPercent,
    };
  }

  async loadRewardSummary(): Promise<CitadelSummary> {
    const { stakingApr, lockingApr, tokensPaid, valuePaid } = await queryCitadelData();
    return {
      stakingApr,
      lockingApr: lockingApr.overall,
      lockingAprSources: {
        [CitadelRewardType.Citadel]: lockingApr[CitadelRewardType.Citadel],
        [CitadelRewardType.Funding]: lockingApr[CitadelRewardType.Funding],
        [CitadelRewardType.Yield]: lockingApr[CitadelRewardType.Yield],
        [CitadelRewardType.Tokens]: lockingApr[CitadelRewardType.Tokens],
      },
      tokensPaid,
      valuePaid,
    };
  }

  async loadAccount(address: string): Promise<CitadelAccount> {
    const sdk = await Chain.getChain(Network.Ethereum).getSdk();
    const [citadelTokenPrice, stakedCitadelTokenPrice] = await Promise.all([
      getPrice(TOKENS.CTDL),
      getPrice(TOKENS.XCTDL),
    ]);
    const { price: citadelPrice } = citadelTokenPrice;
    const { price: stakedCitadelPrice } = stakedCitadelTokenPrice;

    const balances = await sdk.tokens.loadBalances([TOKENS.CTDL, TOKENS.XCTDL], address);

    // Aggregate balances
    const citadelBalance = formatBalance(balances[TOKENS.CTDL]);
    const stakedCitadelBalance = formatBalance(balances[TOKENS.XCTDL]);
    const lockedCitadelBalance = formatBalance(await sdk.citadel.lockedBalanceOf(address));

    const citadelHoldings = citadelBalance * citadelPrice;
    const stakedCitadelHoldings = stakedCitadelBalance * stakedCitadelPrice;
    const lockedCitadelHoldings = lockedCitadelBalance * stakedCitadelPrice;
    const value = citadelHoldings + stakedCitadelHoldings + lockedCitadelHoldings;

    const stakingEarned = (await getStakedCitadelEarnings(address)) * citadelPrice;
    // really we probably need to calculate some twap balance here or something or freeze it somehow
    // if we remove ourselves completely our roi becomes infinity
    const stakingRoi = stakedCitadelBalance > 0 ? stakingEarned / stakedCitadelBalance : 0;

    const rewardTokens = await sdk.citadel.locker.getRewardTokens();
    const rewardAmounts = await Promise.all(
      rewardTokens.map(async (t) => {
        const [token, amount] = await Promise.all([
          sdk.tokens.loadToken(t),
          sdk.citadel.getCumulativeClaimedRewards(address, t),
        ]);
        return formatBalance(amount, token.decimals);
      }),
    );

    // TODO: load earned btc from contract / ddb / graph
    // do we need to account for multiple flavors of btc, wbtc ibbtc lp etc.?
    let earnedBtc = 0;
    let lockingEarned = 0;

    for (let i = 0; i < rewardTokens.length; i++) {
      const token = rewardTokens[i];
      const amount = rewardAmounts[i];
      // TODO: probably want a better check here who knows what
      if (token === TOKENS.WBTC || token === TOKENS.BCRV_IBBTC) {
        earnedBtc += amount;
      }
      const { price } = await getPrice(token);
      lockingEarned += price * amount;
    }

    const claimable = await sdk.citadel.getClaimableRewards(address);
    for (const claim of claimable) {
      const { token, amount } = claim;
      const { decimals } = await sdk.tokens.loadToken(token);
      const balance = formatBalance(amount, decimals);
      if (token === TOKENS.WBTC || token === TOKENS.BCRV_IBBTC) {
        earnedBtc += balance;
      }
      const { price } = await getPrice(token);
      lockingEarned += price * balance;
    }

    // we fukt. prob need usd denominated data or idk
    const lockingRoi = lockedCitadelHoldings > 0 ? lockingEarned / lockedCitadelHoldings : 0;

    // TODO: weighted average of staking + locking
    const earned = stakingEarned + lockingEarned;
    const roi = (stakingRoi * stakedCitadelHoldings) / value + (lockingRoi * lockedCitadelHoldings) / value;

    return {
      address,
      value,
      earned,
      earnedBtc,
      roi,
      // TODO: caculate earnings for current epoch and LERP for current epoch
      // we should save this epoch data and probably take guidance from previous epochs once possible
      projectedEarnings: {
        [CitadelRewardType.Funding]: 0,
        [CitadelRewardType.Yield]: 0,
        [CitadelRewardType.Citadel]: 0,
        [CitadelRewardType.Tokens]: 0,
      },
      stakingEarned,
      stakingRoi,
      lockingEarned,
      lockingRoi,
    };
  }

  async getListRewards(
    token?: string,
    account?: string,
    epoch?: number,
    filter: RewardFilter = RewardFilter.PAID,
  ): Promise<CitadelRewardEvent[]> {
    const rewards: CitadelRewardEvent[] = [];

    const queryKeys: {
      payType: RewardEventType;
      token?: string;
      account?: string;
    } = { payType: filter };

    const queryOpts: {
      indexName?: string;
      filter?: ConditionExpression;
    } = { indexName: 'IndexCitadelRewardsDataPayType' };

    if (filter === RewardFilter.ADDED) {
      queryOpts.filter = {
        type: 'GreaterThanOrEqualTo',
        object: Date.now() / 1000,
        subject: 'finishTime',
      };
    }

    if (account) {
      queryKeys.account = account;
      queryOpts.indexName = 'IndexCitadelRewardsDataPayTypeAccount';
    }
    if (token) {
      queryKeys.token = token;
      queryOpts.indexName = 'IndexCitadelRewardsDataPayTypeToken';
    }

    const mapper = getDataMapper();

    const query = mapper.query(CitadelRewardsSnapshot, queryKeys, queryOpts);

    try {
      for await (const reward of query) {
        if (epoch) {
          if (reward.epoch >= epoch) {
            rewards.push(new CitadelRewardEventData(reward));
          }
        } else {
          rewards.push(new CitadelRewardEventData(reward));
        }
      }
    } catch (e) {
      console.error(`Failed to get citadel reward from ddb ${e}`);
    }

    return rewards;
  }

  async loadKnightingRoundLeaderboard(): Promise<CitadelLeaderboardEntry[]> {
    const knightingRoundStats = await getCitadelKnightingRoundsStats();

    const knighsData = CITADEL_KNIGHTS.map((k, i) => {
      const knightStatTemplate = {
        knight: k,
        votes: 0,
        voteWeight: 0,
        users: 0,
        funding: 0,
      };

      const graphKnight = knightingRoundStats.find((stat) => stat.knight === k);

      if (!graphKnight) return knightStatTemplate;

      return {
        ...knightStatTemplate,
        votes: graphKnight.votes,
        voteWeight: graphKnight.voteWeight,
        users: graphKnight.votersCount,
        funding: graphKnight.funding,
      };
    });

    return knighsData
      .sort((a, b) => b.votes - a.votes)
      .map((knight, ix) => ({
        ...knight,
        rank: ix,
      }));
  }
}
