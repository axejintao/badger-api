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
  [TOKENS.FTM_WBTC]: {
    address: TOKENS.FTM_WBTC,
    decimals: 8,
    lookupName: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
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
  [TOKENS.FTM_DAI]: {
    address: TOKENS.FTM_DAI,
    decimals: 18,
    name: 'Dai',
    lookupName: 'dai',
    symbol: 'DAI',
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
  [TOKENS.FTM_USDC]: {
    address: TOKENS.FTM_USDC,
    decimals: 6,
    name: 'US Dollar Coin',
    lookupName: 'usd-coin',
    symbol: 'USDC',
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
  [TOKENS.BSMM_BOO_XBOO]: {
    address: TOKENS.BSMM_BOO_XBOO,
    decimals: 18,
    name: 'bSolidly: BOO-xBOO',
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
};
