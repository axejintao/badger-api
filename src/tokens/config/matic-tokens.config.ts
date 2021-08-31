import { ChainNetwork } from '../../chains/enums/chain-network.enum';
import { TOKENS } from '../../config/tokens.config';
import { TokenType } from '../enums/token-type.enum';
import { TokenConfig } from '../interfaces/token-config.interface';

export const maticTokensConfig: TokenConfig = {
  [TOKENS.MATIC_RENBTC]: {
    address: TOKENS.MATIC_RENBTC,
    decimals: 8,
    lookupName: 'renbtc',
    name: 'Ren Protocol BTC',
    symbol: 'renBTC',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_WBTC]: {
    address: TOKENS.MATIC_WBTC,
    decimals: 8,
    lookupName: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_USDC]: {
    address: TOKENS.MATIC_USDC,
    decimals: 6,
    lookupName: 'usd-coin',
    name: 'US Dollar Coin',
    symbol: 'USDC',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_USDT]: {
    address: TOKENS.MATIC_USDT,
    decimals: 6,
    lookupName: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_DAI]: {
    address: TOKENS.MATIC_DAI,
    decimals: 18,
    lookupName: 'dai',
    name: 'Dai',
    symbol: 'DAI',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_IBBTC]: {
    address: TOKENS.MATIC_IBBTC,
    decimals: 18,
    lookupName: 'interest-bearing-bitcoin',
    name: 'ibBTC',
    symbol: 'ibBTC',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_AMWBTC]: {
    address: TOKENS.MATIC_AMWBTC,
    decimals: 8,
    lookupName: 'aave-polygon-wbtc',
    name: 'Aave WBTC',
    symbol: 'amWBTC',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_AMWETH]: {
    address: TOKENS.MATIC_AMWETH,
    decimals: 18,
    lookupName: 'aave-polygon-weth',
    name: 'Aave WETH',
    symbol: 'amWETH',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_AMDAI]: {
    address: TOKENS.MATIC_AMDAI,
    decimals: 18,
    lookupName: 'aave-polygon-dai',
    name: 'Aave DAI',
    symbol: 'amDAI',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_AMUSDC]: {
    address: TOKENS.MATIC_AMUSDC,
    decimals: 6,
    lookupName: 'aave-polygon-usdc',
    name: 'Aave USDC',
    symbol: 'amUSDC',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_AMUSDT]: {
    address: TOKENS.MATIC_AMUSDT,
    decimals: 6,
    lookupName: 'aave-polygon-usdt',
    name: 'Aave USDT',
    symbol: 'amUSDT',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_CRV]: {
    address: TOKENS.MATIC_CRV,
    decimals: 18,
    lookupName: 'curve-dao-token',
    name: 'Curve DAO Token',
    symbol: 'CRV',
    type: TokenType.Contract,
  },
  [TOKENS.MATIC_SUSHI_IBBTC_WBTC]: {
    address: TOKENS.MATIC_SUSHI_IBBTC_WBTC,
    decimals: 18,
    lpToken: true,
    name: 'Sushiswap: ibBTC-WBTC',
    symbol: 'SLP-IBBTC-WBTC',
    type: TokenType.SushiswapLp,
  },
  [TOKENS.MATIC_QUICK_USDC_WBTC]: {
    address: TOKENS.MATIC_QUICK_USDC_WBTC,
    decimals: 18,
    lpToken: true,
    name: 'Quickswap: USDC-WBTC',
    symbol: 'QLP-USDC-WBTC',
    type: TokenType.SushiswapLp,
  },
  [TOKENS.MATIC_CRV_AM3CRV]: {
    address: TOKENS.MATIC_CRV_AM3CRV,
    decimals: 18,
    name: 'Curve.fi amDAI/amUSDC/amUSDT',
    symbol: 'crvAM3',
    type: TokenType.CurveLP,
  },
  [TOKENS.MATIC_CRV_AMWBTC]: {
    address: TOKENS.MATIC_CRV_AMWBTC,
    decimals: 18,
    name: 'Curve.fi amWBTC/renBTC',
    symbol: 'btcCRV',
    type: TokenType.CurveLP,
  },
  [TOKENS.BMATIC_SUSHI_IBBTC_WBTC]: {
    address: TOKENS.BMATIC_SUSHI_IBBTC_WBTC,
    decimals: 18,
    name: 'bSushiSwap: ibBTC-WBTC',
    symbol: 'bSLP-IBBTC-WBTC',
    type: TokenType.Vault,
    vaultToken: {
      address: TOKENS.MATIC_SUSHI_IBBTC_WBTC,
      network: ChainNetwork.Matic,
    },
  },
  [TOKENS.BMATIC_QUICK_USDC_WBTC]: {
    address: TOKENS.BMATIC_QUICK_USDC_WBTC,
    decimals: 18,
    name: 'bQuickswap: USDC-WBTC',
    symbol: 'bQLP-USDC-WBTC',
    type: TokenType.Vault,
    vaultToken: {
      address: TOKENS.MATIC_QUICK_USDC_WBTC,
      network: ChainNetwork.Matic,
    },
  },
  [TOKENS.BMATIC_CRV_AMWBTC]: {
    address: TOKENS.BMATIC_CRV_AMWBTC,
    decimals: 18,
    name: 'bCurve.fi amWBTC/renBTC',
    symbol: 'bbtcCRV',
    type: TokenType.Vault,
    vaultToken: {
      address: TOKENS.MATIC_CRV_AMWBTC,
      network: ChainNetwork.Matic,
    },
  },
};
