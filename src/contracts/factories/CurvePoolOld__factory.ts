/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type { CurvePoolOld, CurvePoolOldInterface } from '../CurvePoolOld';

const _abi = [
  {
    constant: true,
    inputs: [
      {
        type: 'int128',
        name: 'arg0',
      },
    ],
    name: 'coins',
    outputs: [
      {
        type: 'address',
        name: '',
      },
    ],
    payable: false,
    type: 'function',
  },
];

export class CurvePoolOld__factory {
  static readonly abi = _abi;
  static createInterface(): CurvePoolOldInterface {
    return new utils.Interface(_abi) as CurvePoolOldInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): CurvePoolOld {
    return new Contract(address, _abi, signerOrProvider) as CurvePoolOld;
  }
}
