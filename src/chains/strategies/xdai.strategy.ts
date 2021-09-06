import { ChainNetwork } from '../enums/chain-network.enum';
import { BaseStrategy } from './base.strategy';

export class xDaiStrategy extends BaseStrategy {
  constructor(tokens: string[]) {
    super(ChainNetwork.xDai, tokens);
  }
}
