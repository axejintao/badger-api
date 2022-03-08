import { DataMapper } from '@aws/dynamodb-data-mapper';
import { GraphQLClient } from 'graphql-request';
import { TestStrategy } from '../chains/strategies/test.strategy';
import { TOKENS } from '../config/tokens.config';
import { UserQuery, UserSettBalance, UsersQuery } from '../graphql/generated/badger';
import { LeaderBoardType } from '../leaderboards/enums/leaderboard-type.enum';
import * as priceUtils from '../prices/prices.utils';
import { VaultDefinition } from '../vaults/interfaces/vault-definition.interface';
import { getVaultDefinition } from '../vaults/vaults.utils';
import { defaultAccount, randomSnapshot, setupMapper, TEST_ADDR, TEST_CHAIN } from '../test/tests.utils';
import { getToken } from '../tokens/tokens.utils';
import {
  defaultBoost,
  getAccountMap,
  getAccounts,
  getCachedBoost,
  getLatestMetadata,
  getUserAccount,
  queryCachedAccount,
  toSettBalance,
} from './accounts.utils';
import { ethers } from 'ethers';
import { UserClaimMetadata } from '../rewards/entities/user-claim-metadata';
import { Currency } from '@badger-dao/sdk';

describe('accounts.utils', () => {
  const testSettBalance = (vaultDefinition: VaultDefinition): UserSettBalance => {
    const settToken = getToken(vaultDefinition.vaultToken);
    const depositToken = getToken(vaultDefinition.depositToken);
    const toWei = (amt: number) => {
      const values = amt * Math.pow(10, settToken.decimals);
      return values.toString();
    };
    return {
      id: TEST_ADDR,
      netDeposit: 4,
      netShareDeposit: toWei(4),
      grossDeposit: 9,
      grossShareDeposit: toWei(9),
      grossWithdraw: 5,
      grossShareWithdraw: toWei(5),
      user: {
        id: TEST_ADDR,
        settBalances: [],
      },
      sett: {
        id: settToken.address,
        name: settToken.name,
        symbol: settToken.symbol,
        available: 1,
        pricePerFullShare: 1034039284374221,
        balance: 3,
        totalSupply: 5,
        netDeposit: 4,
        netShareDeposit: toWei(4),
        grossDeposit: 9,
        grossShareDeposit: toWei(9),
        grossWithdraw: 5,
        grossShareWithdraw: toWei(5),
        decimals: 18,
        token: {
          id: depositToken.address,
          name: depositToken.name,
          symbol: depositToken.symbol,
          decimals: depositToken.decimals,
          totalSupply: 21000000,
        },
        treeDistributions: [],
        harvests: [],
      },
    };
  };

  describe('getAccountMap', () => {
    describe('no saved account', () => {
      it('returns the account with the default account mapping', async () => {
        setupMapper([]);
        const actual = await getAccountMap([TEST_ADDR]);
        expect(actual).toMatchSnapshot();
      });
    });

    describe('a saved account', () => {
      it('returns the stored account', async () => {
        setupMapper([defaultAccount(TEST_ADDR), defaultAccount(TOKENS.BADGER), defaultAccount(TOKENS.DIGG)]);
        const actual = await getAccountMap([TEST_ADDR]);
        expect(actual).toMatchSnapshot();
      });
    });
  });

  describe('queryCachedAccount', () => {
    describe('no saved account', () => {
      it('returns undefined', async () => {
        setupMapper([]);
        const actual = await queryCachedAccount(TEST_ADDR);
        expect(actual).toMatchObject(defaultAccount(TEST_ADDR));
      });
    });

    describe('encounters an errors', () => {
      it('returns undefined', async () => {
        jest.spyOn(DataMapper.prototype, 'query').mockImplementation(() => {
          throw new Error();
        });
        const actual = await queryCachedAccount(TEST_ADDR);
        expect(actual).toMatchObject(defaultAccount(TEST_ADDR));
      });
    });

    describe('a saved account', () => {
      it('returns the stored account', async () => {
        const expected = { address: TEST_ADDR, claimableBalances: [] };
        setupMapper([expected]);
        const actual = await queryCachedAccount(TEST_ADDR);
        expect(actual).toMatchObject(expected);
      });
    });
  });

  describe('getUserAccount', () => {
    describe('user exists', () => {
      it('returns the user account', async () => {
        const sett = getVaultDefinition(TEST_CHAIN, TOKENS.BBADGER);
        const result: UserQuery = {
          user: {
            settBalances: [testSettBalance(sett)],
          },
        };
        jest.spyOn(GraphQLClient.prototype, 'request').mockImplementationOnce(async () => Promise.resolve(result));
        const user = await getUserAccount(TEST_CHAIN, TEST_ADDR);
        expect(user).toMatchObject(result);
      });
    });

    describe('user does not exist', () => {
      it('returns null', async () => {
        const result: UserQuery = {
          user: null,
        };
        jest.spyOn(GraphQLClient.prototype, 'request').mockImplementationOnce(async () => Promise.resolve(result));
        const user = await getUserAccount(TEST_CHAIN, TEST_ADDR);
        expect(user).toMatchObject(result);
      });
    });
  });

  describe('getAccounts', () => {
    describe('users exist', () => {
      it('returns a list of user accounts', async () => {
        const mockAccounts = [TOKENS.BADGER, TOKENS.DIGG, TOKENS.WBTC, TOKENS.FTM_GEIST];
        const result: UsersQuery = {
          users: mockAccounts.map((account) => ({ id: account, settBalances: [] })),
        };
        let responded = false;
        jest.spyOn(GraphQLClient.prototype, 'request').mockImplementation(async () => {
          if (responded) {
            return { users: [] };
          }
          responded = true;
          return Promise.resolve(result);
        });
        const users = await getAccounts(TEST_CHAIN);
        expect(users).toMatchObject(mockAccounts);
      });
    });

    describe('users do not exist', () => {
      it('returns an empty list', async () => {
        jest.spyOn(GraphQLClient.prototype, 'request').mockImplementationOnce(async () => Promise.resolve(null));
        const nullReturn = await getAccounts(TEST_CHAIN);
        expect(nullReturn).toMatchObject([]);

        jest
          .spyOn(GraphQLClient.prototype, 'request')
          .mockImplementationOnce(async () => Promise.resolve({ users: null }));
        const nullUsers = await getAccounts(TEST_CHAIN);
        expect(nullUsers).toMatchObject([]);
      });
    });
  });

  describe('toSettBalance', () => {
    const chain = TEST_CHAIN;
    const strategy = new TestStrategy();

    const testToSettBalance = (settAddress: string) => {
      it.each([
        [undefined, Currency.USD],
        [Currency.USD, Currency.USD],
        [Currency.ETH, Currency.ETH],
      ])('returns sett balance request in %s currency with %s denominated value', async (currency, toCurrency) => {
        const sett = getVaultDefinition(chain, settAddress);
        const snapshot = randomSnapshot(sett);
        setupMapper([snapshot]);
        const depositToken = getToken(sett.depositToken);
        const depositTokenPrice = await strategy.getPrice(depositToken.address);
        jest.spyOn(priceUtils, 'getPrice').mockImplementation(async (contract) => ({
          ...depositTokenPrice,
          updatedAt: Date.now(),
        }));
        jest.spyOn(priceUtils, 'convert').mockImplementation(async (price: number, currency?: Currency) => {
          if (!currency || currency === Currency.USD) {
            return price;
          }
          return price / 1670;
        });
        const mockBalance = testSettBalance(sett);
        const actual = await toSettBalance(chain, mockBalance, currency as Currency);
        expect(actual).toBeTruthy();
        expect(actual.name).toEqual(depositToken.name);
        expect(actual.symbol).toEqual(depositToken.symbol);
        expect(actual.pricePerFullShare).toEqual(snapshot.balance / snapshot.supply);
        const convertedPrice = await priceUtils.convert(depositTokenPrice.price, toCurrency);
        expect(actual.value).toEqual(convertedPrice * actual.balance);
      });
    };

    describe('non-digg token conversion', () => {
      testToSettBalance(TOKENS.BBADGER);
    });

    describe('digg token conversion', () => {
      testToSettBalance(TOKENS.BDIGG);
    });
  });

  describe('defaultBoost', () => {
    it('returns a boost with all fields as the default values', () => {
      const expected = {
        leaderboard: `${TEST_CHAIN.network}_${LeaderBoardType.BadgerBoost}`,
        rank: 0,
        address: TEST_ADDR,
        boost: 1,
        stakeRatio: 0,
        nftBalance: 0,
        nativeBalance: 0,
        bveCvxBalance: 0,
        nonNativeBalance: 0,
      };
      expect(defaultBoost(TEST_CHAIN, TEST_ADDR)).toMatchObject(expected);
    });
  });

  describe('getCachedBoost', () => {
    describe('no cached boost', () => {
      it('returns the default boost', async () => {
        setupMapper([]);
        const result = await getCachedBoost(TEST_CHAIN, TEST_ADDR);
        expect(result).toMatchObject(defaultBoost(TEST_CHAIN, TEST_ADDR));
      });
    });
    describe('a previously cached boost', () => {
      it('returns the default boost', async () => {
        const boost = defaultBoost(TEST_CHAIN, TEST_ADDR);
        boost.rank = 42;
        boost.stakeRatio = 1;
        boost.nativeBalance = 32021;
        boost.nonNativeBalance = 32021;
        setupMapper([boost]);
        const result = await getCachedBoost(TEST_CHAIN, TEST_ADDR);
        expect(result).toMatchObject(boost);
      });
    });
  });

  describe('getLatestMetadata', () => {
    it('should not create new meta obj if exists', async () => {
      const put = jest.spyOn(DataMapper.prototype, 'put').mockImplementation();
      const meta = Object.assign(new UserClaimMetadata(), {
        startBlock: 100,
        endBlock: 101,
        chainStartBlock: `${TEST_CHAIN.network}_123123`,
        chain: TEST_CHAIN.network,
      });
      setupMapper([meta]);
      const latest_meta = await getLatestMetadata(TEST_CHAIN);
      expect(latest_meta).toEqual(meta);
      expect(put.mock.calls).toEqual([]);
    });
    it('should create new meta if no meta obj found', async () => {
      const put = jest.spyOn(DataMapper.prototype, 'put').mockImplementation();
      const mockedBlockNumber = 100;
      jest
        .spyOn(ethers.providers.JsonRpcProvider.prototype, 'getBlockNumber')
        .mockImplementation(() => Promise.resolve(mockedBlockNumber));
      const expected = Object.assign(new UserClaimMetadata(), {
        startBlock: 100,
        endBlock: 101,
        chainStartBlock: `${TEST_CHAIN.network}_${mockedBlockNumber}`,
        chain: TEST_CHAIN.network,
      });
      setupMapper([]);
      await getLatestMetadata(TEST_CHAIN);
      expect(put.mock.calls[0][0]).toEqual(expected);
    });
  });
});
