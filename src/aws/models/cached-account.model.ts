import { embed } from '@aws/dynamodb-data-mapper';
import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { ACCOUNT_DATA } from '../../config/constants';
import { CachedBoostMultiplier } from '../../rewards/interfaces/cached-boost-multiplier.interface';
import { CachedSettBalance } from '../../accounts/interfaces/cached-sett-balance.interface';

@table(ACCOUNT_DATA)
export class CachedAccount {
  @hashKey()
  address!: string;

  @attribute()
  boost!: number;

  @attribute()
  boostRank!: number;

  @attribute({ memberType: embed(CachedBoostMultiplier) })
  multipliers!: Array<CachedBoostMultiplier>;

  @attribute()
  value!: number;

  @attribute()
  earnedValue!: number;

  @attribute({ memberType: embed(CachedSettBalance) })
  balances!: Array<CachedSettBalance>;

  @attribute()
  stakeRatio!: number;

  @attribute()
  nativeBalance!: number;

  @attribute()
  nonNativeBalance!: number;

  @attribute()
  nftBalance!: number;
}
