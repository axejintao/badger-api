import { Network, Protocol } from '@badger-dao/sdk';
import rpc from '../../config/rpc.config';
import { TOKENS } from '../../config/tokens.config';
import { GasPrices } from '../../gas/interfaces/gas-prices.interface';
import { getCurveVaultTokenBalance } from '../../protocols/strategies/convex.strategy';
import { VaultDefinition } from '../../vaults/interfaces/vault-definition.interface';
import { maticTokensConfig } from '../../tokens/config/polygon-tokens.config';
import { Chain } from './chain.config';
import { BaseStrategy } from '../strategies/base.strategy';

export class Polygon extends Chain {
  constructor() {
    super(
      'Polygon',
      'polygon',
      '0x89',
      Network.Polygon,
      maticTokensConfig,
      rpc[Network.Polygon],
      maticSetts,
      new BaseStrategy(Network.Polygon, Object.keys(maticTokensConfig)),
    );
    Chain.register(this.network, this);
  }

  async getGasPrices(): Promise<GasPrices> {
    return this.defaultGasPrice();
  }

  getBadgerTokenAddress(): string {
    return TOKENS.MATIC_BADGER;
  }
}

export const maticSetts: VaultDefinition[] = [
  {
    name: 'wBTC/ibBTC',
    vaultToken: TOKENS.BMATIC_SUSHI_IBBTC_WBTC,
    depositToken: TOKENS.MATIC_SUSHI_IBBTC_WBTC,
    protocol: Protocol.Sushiswap,
  },
  {
    name: 'wBTC/USDC',
    vaultToken: TOKENS.BMATIC_QUICK_USDC_WBTC,
    depositToken: TOKENS.MATIC_QUICK_USDC_WBTC,
    protocol: Protocol.Quickswap,
  },
  {
    name: 'amWBTC/renBTC',
    vaultToken: TOKENS.BMATIC_CRV_AMWBTC,
    depositToken: TOKENS.MATIC_CRV_AMWBTC,
    getTokenBalance: getCurveVaultTokenBalance,
    protocol: Protocol.Curve,
  },
];
