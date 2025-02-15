import { AccountsController } from './accounts/accounts.controller';
import { ChartsController } from './charts/charts.controller';
import { GasController } from './gas/gas.controller';
import { LeaderBoardsController } from './leaderboards/leaderboards.controller';
import { MetricsController } from './metrics/metrics.controller';
import { PriceController } from './prices/prices.controller';
import { ProtocolController } from './protocols/protocols.controller';
import { RewardsController } from './rewards/rewards.controller';
import { VaultsController } from './vaults/vaults.controller';
import { SettsController } from './vaults/setts.controller';
import { TokensController } from './tokens/tokens.controller';
import { ProofsController } from './proofs/proofs.controller';
import { RewardController } from './rewards/reward.controller';

/**
 * Controller registry forces serverless offline to load
 * the appropriate controller routes on start. Default
 * lazy loading makes dealing with local development a pain
 * without this.
 */
export const V2_CONTROLLERS = [
  AccountsController,
  ChartsController,
  GasController,
  LeaderBoardsController,
  MetricsController,
  PriceController,
  ProofsController,
  ProtocolController,
  RewardController,
  RewardsController,
  SettsController,
  TokensController,
  VaultsController,
];
