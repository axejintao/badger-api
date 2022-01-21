import { Network, Protocol } from '@badger-dao/sdk';
import rpc from '../../config/rpc.config';
import { TOKENS } from '../../config/tokens.config';
import { GasPrices } from '../../gas/interfaces/gas-prices.interface';
import { getCurveVaultTokenBalance } from '../../protocols/strategies/convex.strategy';
import { VaultDefinition } from '../../vaults/interfaces/vault-definition.interface';
import { maticTokensConfig } from '../../tokens/config/matic-tokens.config';
import { MaticStrategy } from '../strategies/matic.strategy';
import { Chain } from './chain.config';

export class Polygon extends Chain {
  constructor() {
    super(
      'Polygon',
      'polygon',
      '0x89',
      Network.Polygon,
      maticTokensConfig,
      maticSetts,
      rpc[Network.Polygon],
      new MaticStrategy(Object.keys(maticTokensConfig)),
      15768000,
      '0x2C798FaFd37C7DCdcAc2498e19432898Bc51376b',
      '0xd0ee2a5108b8800d688abc834445fd03b3b2738e',
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
    createdBlock: 17580716,
    protocol: Protocol.Sushiswap,
    strategy: '0xDed61Bd8a8c90596D8A6Cf0e678dA04036146963',
  },
  {
    name: 'wBTC/USDC',
    vaultToken: TOKENS.BMATIC_QUICK_USDC_WBTC,
    depositToken: TOKENS.MATIC_QUICK_USDC_WBTC,
    createdBlock: 17687004,
    protocol: Protocol.Quickswap,
    strategy: '0x809990849D53a5109e0cb9C446137793B9f6f1Eb',
  },
  {
    name: 'amWBTC/renBTC',
    vaultToken: TOKENS.BMATIC_CRV_AMWBTC,
    depositToken: TOKENS.MATIC_CRV_AMWBTC,
    getTokenBalance: getCurveVaultTokenBalance,
    createdBlock: 17616741,
    protocol: Protocol.Curve,
    strategy: '0xF8F02D0d41C79a1973f65A440C98acAc7eAA8Dc1',
  },
];
