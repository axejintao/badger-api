import { ethers } from 'ethers';
import { getChainStartBlockKey, getDataMapper, getLeaderboardKey } from '../aws/dynamodb.utils';
import { getObject } from '../aws/s3.utils';
import { Chain } from '../chains/config/chain.config';
import { REWARD_DATA } from '../config/constants';
import { TOKENS } from '../config/tokens.config';
import { LeaderBoardType } from '../leaderboards/enums/leaderboard-type.enum';
import { CachedBoost } from '../aws/models/cached-boost.model';
import { convert, getPrice } from '../prices/prices.utils';
import { BoostData } from '../rewards/interfaces/boost-data.interface';
import { getCachedVault, getVaultDefinition } from '../vaults/vaults.utils';
import { getVaultTokens, getFullToken } from '../tokens/tokens.utils';
import { AccountMap } from './interfaces/account-map.interface';
import { CachedAccount } from '../aws/models/cached-account.model';
import { CachedSettBalance } from './interfaces/cached-sett-balance.interface';
import { Account, Currency, formatBalance } from '@badger-dao/sdk';
import { UserClaimSnapshot } from '../aws/models/user-claim-snapshot.model';
import { UserClaimMetadata } from '../rewards/entities/user-claim-metadata';
import { gqlGenT } from '@badger-dao/sdk';

export function defaultBoost(chain: Chain, address: string): CachedBoost {
  return {
    leaderboard: `${chain.network}_${LeaderBoardType.BadgerBoost}`,
    rank: 0,
    address,
    boost: 1,
    stakeRatio: 0,
    nftBalance: 0,
    nativeBalance: 0,
    bveCvxBalance: 0,
    diggBalance: 0,
    nonNativeBalance: 0,
  };
}

export async function getUserAccounts(chain: Chain, accounts: string[]): Promise<gqlGenT.UsersQuery> {
  const sdk = await chain.getSdk();
  return sdk.graph.loadUsers({
    where: {
      id_in: accounts.map((acc) => acc.toLowerCase()),
    },
  });
}

export async function getBoostFile(chain: Chain): Promise<BoostData | null> {
  try {
    const boostFile = await getObject(REWARD_DATA, `badger-boosts-${parseInt(chain.chainId, 16)}.json`);
    return JSON.parse(boostFile.toString('utf-8'));
  } catch (err) {
    return null;
  }
}

export async function getAccounts(chain: Chain): Promise<string[]> {
  const sdk = await chain.getSdk();
  const accounts = new Set<string>();

  let lastAddress: string | undefined;
  const pageSize = 1000;
  while (true) {
    try {
      const userPage = await sdk.graph.loadUsers({
        first: pageSize,
        where: { id_gt: lastAddress },
        orderBy: gqlGenT.User_OrderBy.Id,
        orderDirection: gqlGenT.OrderDirection.Asc,
      });
      if (!userPage || !userPage.users || userPage.users.length === 0) {
        break;
      }
      const { users } = userPage;
      lastAddress = users[users.length - 1].id;
      users.forEach((user) => {
        const address = ethers.utils.getAddress(user.id);
        if (!accounts.has(address)) {
          accounts.add(address);
        }
      });
    } catch (err) {
      break;
    }
  }

  console.log(`Retrieved ${accounts.size} accounts on ${chain.name}`);
  return [...accounts];
}

export async function getAccountsFomBoostFile(chain: Chain): Promise<string[]> {
  const boostFile = await getBoostFile(chain);
  if (!boostFile) {
    return [];
  }
  return Object.keys(boostFile.userData).map((acc) => ethers.utils.getAddress(acc));
}

export async function getAccountMap(addresses: string[]): Promise<AccountMap> {
  const accounts = await Promise.all(addresses.map(async (addr) => queryCachedAccount(addr)));
  return Object.fromEntries(accounts.map((acc) => [ethers.utils.getAddress(acc.address), acc]));
}

export async function queryCachedAccount(address: string): Promise<CachedAccount> {
  const checksummedAccount = ethers.utils.getAddress(address);
  const defaultAccount: CachedAccount = {
    address: checksummedAccount,
    boost: 0,
    boostRank: 0,
    nftBalance: 0,
    multipliers: [],
    value: 0,
    earnedValue: 0,
    balances: [],
    stakeRatio: 0,
    nativeBalance: 0,
    nonNativeBalance: 0,
  };
  try {
    const mapper = getDataMapper();
    for await (const item of mapper.query(
      CachedAccount,
      { address: checksummedAccount },
      { limit: 1, scanIndexForward: false },
    )) {
      return item;
    }
    return defaultAccount;
  } catch (err) {
    return defaultAccount;
  }
}

export async function toVaultBalance(
  chain: Chain,
  vaultBalance: gqlGenT.UserSettBalanceFragment,
  currency?: Currency,
): Promise<CachedSettBalance> {
  const vaultDefinition = getVaultDefinition(chain, vaultBalance.sett.id);
  const { netShareDeposit, grossDeposit, grossWithdraw } = vaultBalance;
  const vault = await getCachedVault(chain, vaultDefinition);
  const { pricePerFullShare } = vault;

  const depositToken = await getFullToken(chain, vaultDefinition.depositToken);
  const settToken = await getFullToken(chain, vaultDefinition.vaultToken);

  const currentTokens = formatBalance(netShareDeposit, settToken.decimals);
  let depositTokenDecimals = depositToken.decimals;
  if (depositToken.address === TOKENS.DIGG) {
    depositTokenDecimals = settToken.decimals;
  }
  const depositedTokens = formatBalance(grossDeposit, depositTokenDecimals);
  const withdrawnTokens = formatBalance(grossWithdraw, depositTokenDecimals);
  const balanceTokens = currentTokens * pricePerFullShare;
  const earnedBalance = balanceTokens - depositedTokens + withdrawnTokens;
  const [depositTokenPrice, earnedTokens, tokens] = await Promise.all([
    getPrice(vaultDefinition.depositToken),
    getVaultTokens(chain, vault, earnedBalance, currency),
    getVaultTokens(chain, vault, balanceTokens, currency),
  ]);

  const depositTokenConvertedPrice = await convert(depositTokenPrice.price, currency);

  return Object.assign(new CachedSettBalance(), {
    network: chain.network,
    address: vaultDefinition.vaultToken,
    name: vaultDefinition.name,
    symbol: depositToken.symbol,
    pricePerFullShare: pricePerFullShare,
    balance: balanceTokens,
    value: depositTokenConvertedPrice * balanceTokens,
    tokens,
    earnedBalance: earnedBalance,
    earnedValue: depositTokenConvertedPrice * earnedBalance,
    earnedTokens,
    depositedBalance: depositedTokens,
    withdrawnBalance: withdrawnTokens,
  });
}

export async function getCachedBoost(chain: Chain, address: string): Promise<CachedBoost> {
  const mapper = getDataMapper();
  for await (const entry of mapper.query(
    CachedBoost,
    { leaderboard: getLeaderboardKey(chain), address: ethers.utils.getAddress(address) },
    { limit: 1, indexName: 'IndexLeaderBoardRankOnAddressAndLeaderboard' },
  )) {
    return entry;
  }
  return defaultBoost(chain, address);
}

export async function getCachedAccount(chain: Chain, address: string): Promise<Account> {
  const [cachedAccount, metadata] = await Promise.all([queryCachedAccount(address), getLatestMetadata(chain)]);
  const claimableBalanceSnapshot = await getClaimableBalanceSnapshot(chain, address, metadata.startBlock);
  const { network } = chain;
  const balances = cachedAccount.balances
    .filter((bal) => !network || bal.network === network)
    .map((bal) => ({
      ...bal,
      tokens: bal.tokens,
      earnedTokens: bal.earnedTokens,
    }));
  const multipliers = Object.fromEntries(
    cachedAccount.multipliers
      .filter((mult) => mult.network === network)
      .map((entry) => [entry.address, entry.multiplier]),
  );
  const data = Object.fromEntries(balances.map((bal) => [bal.address, bal]));
  const claimableBalances = Object.fromEntries(
    claimableBalanceSnapshot.claimableBalances.map((bal) => [bal.address, bal.balance]),
  );
  const cachedBoost = await getCachedBoost(chain, cachedAccount.address);
  const { boost, rank, stakeRatio, nftBalance, bveCvxBalance, nativeBalance, nonNativeBalance, diggBalance } =
    cachedBoost;
  const value = balances.map((b) => b.value).reduce((total, value) => (total += value), 0);
  const earnedValue = balances.map((b) => b.earnedValue).reduce((total, value) => (total += value), 0);
  const account: Account = {
    address,
    value,
    earnedValue,
    boost,
    rank,
    boostRank: rank,
    multipliers,
    data,
    claimableBalances,
    stakeRatio,
    nftBalance,
    bveCvxBalance,
    diggBalance,
    nativeBalance,
    nonNativeBalance,
  };
  return account;
}

export async function getClaimableBalanceSnapshot(
  chain: Chain,
  address: string,
  startBlock: number,
): Promise<UserClaimSnapshot> {
  const mapper = getDataMapper();
  for await (const entry of mapper.query(
    UserClaimSnapshot,
    { chainStartBlock: getChainStartBlockKey(chain, startBlock), address: ethers.utils.getAddress(address) },
    { limit: 1, indexName: 'IndexUnclaimedSnapshotsOnAddressAndChainStartBlock' },
  )) {
    return entry;
  }
  return {
    chainStartBlock: getChainStartBlockKey(chain, startBlock),
    address,
    chain: chain.network,
    startBlock,
    claimableBalances: [],
    pageId: -1,
    expiresAt: Date.now(),
  };
}

export async function getLatestMetadata(chain: Chain): Promise<UserClaimMetadata> {
  const mapper = getDataMapper();
  let result: UserClaimMetadata | null = null;
  for await (const metric of mapper.query(
    UserClaimMetadata,
    { chain: chain.network },
    { indexName: 'IndexMetadataChainAndStartBlock', scanIndexForward: false, limit: 1 },
  )) {
    result = metric;
  }
  // In case there UserClaimMetadata wasn't created yet, create it with default values
  if (!result) {
    const blockNumber = await chain.provider.getBlockNumber();
    const metaData = Object.assign(new UserClaimMetadata(), {
      startBlock: blockNumber,
      endBlock: blockNumber + 1,
      chainStartBlock: getChainStartBlockKey(chain, blockNumber),
      chain: chain.network,
      count: 0,
    });
    result = await mapper.put(metaData);
  }
  return result;
}
