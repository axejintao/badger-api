import { Network } from '@badger-dao/sdk';
import { TOKENS } from '../../config/tokens.config';
import { PricingType } from '../../prices/enums/pricing-type.enum';
import { TokenConfig } from '../interfaces/token-config.interface';

export const fantomTokensConfig: TokenConfig = {
  [TOKENS.MULTI_BADGER]: {
    address: TOKENS.MULTI_BADGER,
    decimals: 18,
    lookupName: 'badger-dao',
    name: 'Badger',
    symbol: 'BADGER',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_WFTM]: {
    address: TOKENS.FTM_WFTM,
    decimals: 18,
    name: 'Wrapped Fantom',
    lookupName: 'fantom',
    symbol: 'WFTM',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_GEIST]: {
    address: TOKENS.FTM_GEIST,
    decimals: 18,
    name: 'Geist',
    lookupName: 'geist-finance',
    symbol: 'GEIST',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_G3CRV]: {
    address: TOKENS.FTM_G3CRV,
    decimals: 18,
    name: 'Geist: 3CRV',
    symbol: 'g3CRV',
    type: PricingType.CurveLP,
  },
  [TOKENS.FTM_WEVE]: {
    address: TOKENS.FTM_WEVE,
    decimals: 18,
    name: 'veDAO',
    lookupName: 'vedao',
    symbol: 'WEVE',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_WBTC]: {
    address: TOKENS.FTM_WBTC,
    decimals: 8,
    lookupName: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_OXD]: {
    address: TOKENS.FTM_OXD,
    decimals: 18,
    lookupName: '0xdao',
    name: '0xDAO',
    symbol: 'OXD',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_SOLID]: {
    address: TOKENS.FTM_SOLID,
    decimals: 18,
    lookupName: '0xe4bc39fdD4618a76f6472079C329bdfa820afA75',
    name: 'Solidly',
    symbol: 'SOLID',
    type: PricingType.OnChainUniV2LP,
  },
  [TOKENS.FTM_SOLIDSEX]: {
    address: TOKENS.FTM_SOLIDSEX,
    decimals: 18,
    lookupName: '0x62E2819Dd417F3b430B6fa5Fd34a49A377A02ac8',
    name: 'SOLIDsex: Tokenized veSOLID',
    symbol: 'SOLIDsex',
    type: PricingType.OnChainUniV2LP,
  },
  [TOKENS.FTM_SEX]: {
    address: TOKENS.FTM_SEX,
    decimals: 18,
    lookupName: 'solidex',
    name: 'Solidex',
    symbol: 'SEX',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_GDAI]: {
    address: TOKENS.FTM_GDAI,
    decimals: 18,
    name: 'gDai',
    lookupName: 'dai',
    symbol: 'gDAI',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_DAI]: {
    address: TOKENS.FTM_DAI,
    decimals: 18,
    name: 'Dai',
    lookupName: 'dai',
    symbol: 'DAI',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_CRV]: {
    address: TOKENS.FTM_CRV,
    decimals: 18,
    name: 'Curve DAO Token',
    lookupName: 'curve-dao-token',
    symbol: 'CRV',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_BOO]: {
    address: TOKENS.FTM_BOO,
    decimals: 18,
    name: 'SpookyToken',
    lookupName: 'spookyswap',
    symbol: 'BOO',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_MIM]: {
    address: TOKENS.FTM_MIM,
    decimals: 18,
    name: 'Magic Internet Money',
    lookupName: 'magic-internet-money',
    symbol: 'MIM',
    type: PricingType.Contract,
  },
  [TOKENS.FTM_XBOO]: {
    address: TOKENS.FTM_XBOO,
    decimals: 18,
    name: 'Boo MirrorWorld',
    lookupName: 'boo-mirrorworld',
    symbol: 'XBOO',
    type: PricingType.LookupName,
  },
  [TOKENS.MULTI_RENBTC]: {
    address: TOKENS.MULTI_RENBTC,
    decimals: 8,
    lookupName: 'renbtc',
    name: 'Ren Protocol BTC',
    symbol: 'renBTC',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_GUSDC]: {
    address: TOKENS.FTM_GUSDC,
    decimals: 6,
    name: 'gUS Dollar Coin',
    lookupName: 'usd-coin',
    symbol: 'gUSDC',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_USDC]: {
    address: TOKENS.FTM_USDC,
    decimals: 6,
    name: 'US Dollar Coin',
    lookupName: 'usd-coin',
    symbol: 'USDC',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_GUSDT]: {
    address: TOKENS.FTM_GUSDT,
    decimals: 6,
    name: 'gTether',
    lookupName: 'tether',
    symbol: 'gUSDT',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_USDT]: {
    address: TOKENS.FTM_USDT,
    decimals: 6,
    name: 'Tether',
    lookupName: 'tether',
    symbol: 'USDT',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_SCREAM]: {
    address: TOKENS.FTM_SCREAM,
    decimals: 18,
    name: 'Scream',
    lookupName: 'scream',
    symbol: 'SCREAM',
    type: PricingType.LookupName,
  },
  [TOKENS.FTM_TOMB]: {
    address: TOKENS.FTM_TOMB,
    decimals: 18,
    name: 'Tomb',
    lookupName: 'tomb',
    symbol: 'TOMB',
    type: PricingType.LookupName,
  },
  [TOKENS.SMM_BOO_XBOO]: {
    address: TOKENS.SMM_BOO_XBOO,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: BOO-xBOO',
    symbol: 'SMM-BOO-XBOO',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WBTC_RENBTC]: {
    address: TOKENS.SMM_WBTC_RENBTC,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WBTC-renBTC',
    symbol: 'SMM-WBTC-RENBTC',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WFTM_SEX]: {
    address: TOKENS.SMM_WFTM_SEX,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WFTM-SEX',
    symbol: 'SMM-WFTM-SEX',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_SOLID_SOLIDSEX]: {
    address: TOKENS.SMM_SOLID_SOLIDSEX,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: SOLID-SOLIDsex',
    symbol: 'SMM-SOLID-SOLIDSEX',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WEVE_USDC]: {
    address: TOKENS.SMM_WEVE_USDC,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WEVE-SDC',
    symbol: 'SMM-WEVE-USDC',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_OXD_USDC]: {
    address: TOKENS.SMM_OXD_USDC,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: OXD-SDC',
    symbol: 'SMM-OXD-USDC',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WFTM_CRV]: {
    address: TOKENS.SMM_WFTM_CRV,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WFTM-CRV',
    symbol: 'SMM-WFTM-CRV',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_USDC_MIM]: {
    address: TOKENS.SMM_USDC_MIM,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: USDC-MIM',
    symbol: 'SMM-USDC-MIM',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WFTM_RENBTC]: {
    address: TOKENS.SMM_WFTM_RENBTC,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WFTM-RENBTC',
    symbol: 'SMM-WFTM-RENBTC',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_GEIST_3CRV]: {
    address: TOKENS.SMM_GEIST_3CRV,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: GEIST-g3CRV',
    symbol: 'SMM-GEIST-G3CRV',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WFTM_SCREAM]: {
    address: TOKENS.SMM_WFTM_SCREAM,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WFTM-SCREAM',
    symbol: 'SMM-WFTM-SCREAM',
    type: PricingType.UniV2LP,
  },
  [TOKENS.SMM_WFTM_TOMB]: {
    address: TOKENS.SMM_WFTM_TOMB,
    decimals: 18,
    lpToken: true,
    name: 'Solidly: WFTM-TOMB',
    symbol: 'SMM-WFTM-TOMB',
    type: PricingType.UniV2LP,
  },
  [TOKENS.BSMM_GEIST_3CRV_DCA]: {
    address: TOKENS.BSMM_GEIST_3CRV_DCA,
    decimals: 18,
    name: 'bSolidly: GEIST-g3CRV',
    symbol: 'bSMM-GEIST-G3CRV',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_GEIST_3CRV,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_BOO_XBOO_ECO]: {
    address: TOKENS.BSMM_BOO_XBOO_ECO,
    decimals: 18,
    name: 'bSolidly: BOO-xBOO Ecosystem',
    symbol: 'bSMM-BOO-XBOO',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_BOO_XBOO,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WBTC_RENBTC]: {
    address: TOKENS.BSMM_WBTC_RENBTC,
    decimals: 18,
    name: 'bSolidly: WBTC-renBTC',
    symbol: 'bSMM-WBTC-RENBTC',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WBTC_RENBTC,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_SEX]: {
    address: TOKENS.BSMM_WFTM_SEX,
    decimals: 18,
    name: 'bSolidly: WFTM-SEX',
    symbol: 'bSMM-WFTM-SEX',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_SEX,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_SOLID_SOLIDSEX]: {
    address: TOKENS.BSMM_SOLID_SOLIDSEX,
    decimals: 18,
    name: 'bSolidly: SOLID-SOLIDsex',
    symbol: 'bSMM-SOLID-SOLIDSEX',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_SEX,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WEVE_USDC]: {
    address: TOKENS.BSMM_WEVE_USDC,
    decimals: 18,
    name: 'bSolidly: WEVE-SDC',
    symbol: 'bSMM-WEVE-USDC',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WEVE_USDC,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_OXD_USDC]: {
    address: TOKENS.BSMM_OXD_USDC,
    decimals: 18,
    name: 'bSolidly: OXD-SDC',
    symbol: 'bSMM-OXD-USDC',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_OXD_USDC,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_CRV]: {
    address: TOKENS.BSMM_WFTM_CRV,
    decimals: 18,
    name: 'bSolidly: WFTM-CRV',
    symbol: 'bSMM-WFTM-CRV',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_CRV,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_CRV_ECO]: {
    address: TOKENS.BSMM_WFTM_CRV_ECO,
    decimals: 18,
    name: 'bSolidly: WFTM-CRV Ecosystem',
    symbol: 'bSMM-WFTM-CRV',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_CRV,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_USDC_MIM]: {
    address: TOKENS.BSMM_USDC_MIM,
    decimals: 18,
    name: 'bSolidly: USDC-MIM',
    symbol: 'bSMM-USDC-MIM',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_USDC_MIM,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_RENBTC]: {
    address: TOKENS.BSMM_WFTM_RENBTC,
    decimals: 18,
    name: 'bSolidly: WFTM-renBTC',
    symbol: 'bSMM-WFTM-renBTC',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_RENBTC,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_USDC_MIM_ECO]: {
    address: TOKENS.BSMM_USDC_MIM_ECO,
    decimals: 18,
    name: 'bSolidly: USDC-MIM Ecosystem',
    symbol: 'bSMM-USDC-MIM',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_USDC_MIM,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_SCREAM_ECO]: {
    address: TOKENS.BSMM_WFTM_SCREAM_ECO,
    decimals: 18,
    name: 'bSolidly: WFTM-SCREAM Ecosystem',
    symbol: 'bSMM-WFTM-SCREAM',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_SCREAM,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_RENBTC_ECO]: {
    address: TOKENS.BSMM_WFTM_RENBTC_ECO,
    decimals: 18,
    name: 'bSolidly: WFTM-renBTC Ecosystem',
    symbol: 'bSMM-WFTM-RENBTC',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_RENBTC,
      network: Network.Fantom,
    },
  },
  [TOKENS.BSMM_WFTM_TOMB_ECO]: {
    address: TOKENS.BSMM_WFTM_TOMB_ECO,
    decimals: 18,
    name: 'bSolidly: WFTM-TOMB Ecosystem',
    symbol: 'bSMM-WFTM-TOMB',
    type: PricingType.Vault,
    vaultToken: {
      address: TOKENS.SMM_WFTM_TOMB,
      network: Network.Fantom,
    },
  },
};
