import { Network } from '@badger-dao/sdk';

import { TokenFullMap } from '../interfaces/token-full.interface';
import { TOKENS } from '../../config/tokens.config';
import { PricingType } from '../../prices/enums/pricing-type.enum';
import { getRemDiggPrice } from '../../prices/custom/remdigg-price';
import { TEST_ADDR } from '../../test/tests.utils';

// temp solution, remove after sdk lib mocks
export const fullTokenMockMap: TokenFullMap = {
  [TOKENS.BADGER]: {
    address: TOKENS.BADGER,
    decimals: 18,
    name: 'Badger',
    symbol: 'BADGER',
    lookupName: 'badger',
    type: PricingType.Contract,
  },
  [TOKENS.DIGG]: {
    address: TOKENS.DIGG,
    decimals: 9,
    name: 'Digg',
    symbol: 'DIGG',
    type: PricingType.Contract,
  },
  [TOKENS.WBTC]: {
    address: TOKENS.WBTC,
    decimals: 8,
    lookupName: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    type: PricingType.LookupName,
  },
  [TOKENS.WETH]: {
    address: TOKENS.WETH,
    decimals: 18,
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    type: PricingType.Contract,
  },
  [TOKENS.FTM_GEIST]: {
    address: TOKENS.FTM_GEIST,
    decimals: 18,
    name: 'Geist',
    lookupName: 'geist-finance',
    symbol: 'GEIST',
    type: PricingType.LookupName,
  },
  [TOKENS.BBADGER]: {
    address: TOKENS.BBADGER,
    decimals: 18,
    name: 'bBadger',
    symbol: 'bBADGER',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.BADGER,
      network: Network.Ethereum,
    },
  },
  [TOKENS.BDIGG]: {
    address: TOKENS.BDIGG,
    decimals: 18,
    name: 'bDigg',
    symbol: 'bDIGG',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.DIGG,
      network: Network.Ethereum,
    },
  },
  [TOKENS.CVX]: {
    address: TOKENS.CVX,
    decimals: 18,
    name: 'Convex Token',
    symbol: 'CVX',
    type: PricingType.Contract,
  },
  [TOKENS.BCVXCRV]: {
    address: TOKENS.BCVXCRV,
    decimals: 18,
    name: 'bCVXCRV',
    symbol: 'bCVXCRV',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.CVXCRV,
      network: Network.Ethereum,
    },
  },
  [TOKENS.BVECVX]: {
    address: TOKENS.BVECVX,
    decimals: 18,
    name: 'bVECVX',
    symbol: 'bVECVX',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.CVX,
      network: Network.Ethereum,
    },
  },
  [TOKENS.BMATIC_QUICK_USDC_WBTC]: {
    address: TOKENS.BMATIC_QUICK_USDC_WBTC,
    decimals: 18,
    name: 'bQuickswap: USDC-WBTC',
    symbol: 'bQLP-USDC-WBTC',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.MATIC_QUICK_USDC_WBTC,
      network: Network.Polygon,
    },
  },
  [TOKENS.MATIC_QUICK_USDC_WBTC]: {
    address: TOKENS.MATIC_QUICK_USDC_WBTC,
    decimals: 18,
    lpToken: true,
    name: 'Quickswap: USDC-WBTC',
    symbol: 'QLP-USDC-WBTC',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SUSHI_BADGER_WBTC]: {
    address: TOKENS.SUSHI_BADGER_WBTC,
    decimals: 18,
    lpToken: true,
    name: 'Sushiswap: WBTC-BADGER',
    symbol: 'SLP-BADGER-WBTC',
    type: PricingType.LookupName,
  },
  [TOKENS.BREMDIGG]: {
    address: TOKENS.BREMDIGG,
    decimals: 18,
    getPrice: getRemDiggPrice,
    name: 'remDigg',
    symbol: 'bremDIGG',
    type: PricingType.Custom,
  },
  [TOKENS.REMDIGG]: {
    address: TOKENS.REMDIGG,
    decimals: 18,
    getPrice: getRemDiggPrice,
    name: 'remDigg',
    symbol: 'remDIGG',
    type: PricingType.Custom,
  },
  [TOKENS.BSUSHI_ETH_WBTC]: {
    address: TOKENS.BSUSHI_ETH_WBTC,
    decimals: 18,
    name: 'bSushiSwap: WBTC-ETH',
    symbol: 'bSLP-WBTC-ETH',
    type: PricingType.Vault,
    lpToken: true,
    vaultToken: {
      address: TOKENS.SUSHI_ETH_WBTC,
      network: Network.Ethereum,
    },
  },
  [TOKENS.SUSHI_ETH_WBTC]: {
    address: TOKENS.SUSHI_ETH_WBTC,
    decimals: 18,
    name: 'Sushiswap: WBTC-ETH',
    symbol: 'SLP-WBTC-ETH',
    type: PricingType.Vault,
  },
  [TEST_ADDR]: {
    address: TEST_ADDR,
    symbol: 'TEST',
    name: 'TEST',
    decimals: 18,
    type: PricingType.Contract,
  },
};
