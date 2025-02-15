export const contract = '0x7eCc602743bD50FB01fF60e9288fc532B851afc5';
export const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Claimed',
    type: 'event',
  },
  { inputs: [], name: 'claim', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'honeypot',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20Upgradeable', name: 'token_', type: 'address' },
      { internalType: 'uint256', name: 'honeypot_', type: 'uint256' },
      { internalType: 'uint256[]', name: 'nftIndicies_', type: 'uint256[]' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isClaimed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'memeLtd',
    outputs: [{ internalType: 'contract IMemeLtd', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'memeLtdAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'nftIndicies',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [{ internalType: 'contract IERC20Upgradeable', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];
