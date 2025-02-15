import { Arbitrum } from './config/arbitrum.config';
import { Avalanche } from './config/avax.config';
import { BinanceSmartChain } from './config/bsc.config';
import { Ethereum } from './config/eth.config';
import { Polygon } from './config/polygon.config';
import { Fantom } from './config/fantom.config';

export const SUPPORTED_CHAINS = [
  new Ethereum(),
  new BinanceSmartChain(),
  new Polygon(),
  new Arbitrum(),
  new Avalanche(),
  new Fantom(),
];
