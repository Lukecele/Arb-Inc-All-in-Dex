export interface PoolInfo {
  id: string
  name: string
  address: string
  token0: {
    symbol: string
    address: string
    decimals: number
  }
  token1: {
    symbol: string
    address: string
    decimals: number
  }
  poolType: string
  liquidityUSD: number
  apr?: string
  dex: string
  isArbitrageInception: boolean
}

export const ARB_INC_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'
export const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

export const pools: PoolInfo[] = [
  {
    id: 'arb-inc-wbnb',
    name: 'Arb Inc / WBNB',
    address: '0x630B9C39d46314A3268D75Bb25fd79Df4581D1aF',
    token0: {
      symbol: 'Arb Inc',
      address: ARB_INC_ADDRESS,
      decimals: 9,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 780.35,
    apr: '~0.25% fee',
    dex: 'PancakeSwap V2',
    isArbitrageInception: true,
  },
  {
    id: 'arb-inc-belg',
    name: 'Arb Inc / BELG',
    address: '0x1648FC0d0127618B67d4290fC75fAc07eD0FFf23',
    token0: {
      symbol: 'Arb Inc',
      address: ARB_INC_ADDRESS,
      decimals: 9,
    },
    token1: {
      symbol: 'BELG',
      address: '0x7e4DAB87cBD6307E8833Cc5C540ee151C6db4F42',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 0.88,
    dex: 'PancakeSwap V2',
    isArbitrageInception: true,
  },
  {
    id: 'arb-inc-hachiko',
    name: 'Arb Inc / Hachiko',
    address: '0x6e958BB18fc1ceA139B7306529DcdBcE0A863Ca3',
    token0: {
      symbol: 'Arb Inc',
      address: ARB_INC_ADDRESS,
      decimals: 9,
    },
    token1: {
      symbol: 'Hachiko',
      address: '0xF1c599E9A5FBDEA408a7409C0176a2fE42C64444',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 850.36,
    apr: '~0.25% fee',
    dex: 'PancakeSwap V2',
    isArbitrageInception: true,
  },
  {
    id: 'bnb-usdt',
    name: 'BNB / USDT',
    address: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'USDT',
      address: '0x55d398326f99059fF775485246999027B3197955',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 150000000,
    apr: '~25% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-usdc',
    name: 'BNB / USDC',
    address: '0x2354ef4df11afacb85a5883adfe4c18950608c2f',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'USDC',
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 80000000,
    apr: '~20% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-cake',
    name: 'BNB / CAKE',
    address: '0x0eD7e52944161450477ee417de9Cd3a859b14fD0',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'CAKE',
      address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 45000000,
    apr: '~30% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-busd',
    name: 'BNB / BUSD',
    address: '0x58F876857a02D67614e3014CB834aED2F2983Da4',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'BUSD',
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 35000000,
    apr: '~18% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-doge',
    name: 'BNB / DOGE',
    address: '0x976ea31d8081e0e219b07221d44bc7b8654cf55c',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'DOGE',
      address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
      decimals: 8,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 25000000,
    apr: '~15% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-xrp',
    name: 'BNB / XRP',
    address: '0x9340De482A4f3c534d32d393817c936e3B664563',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'XRP',
      address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 20000000,
    apr: '~12% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-btc',
    name: 'BNB / BTCB',
    address: '0x61EB785d58D2dAd0DB4bF4f71546C56d2dFcE7d6',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'BTCB',
      address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 120000000,
    apr: '~22% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
  {
    id: 'bnb-eth',
    name: 'BNB / ETH',
    address: '0x74E4716E4B519cB5e270542D7B5391c5c69Aa162',
    token0: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    token1: {
      symbol: 'ETH',
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV2',
    liquidityUSD: 95000000,
    apr: '~28% APR (CAKE rewards)',
    dex: 'PancakeSwap V2',
    isArbitrageInception: false,
  },
]

export const pcsV3Pools: PoolInfo[] = [
  {
    id: 'pcs-v3-usdt-wbnb',
    name: 'USDT / WBNB',
    address: '0x172fcd41e0913e95784454622d1c3724f546f849',
    token0: {
      symbol: 'USDT',
      address: '0x55d398326f99059ff775485246999027b3197955',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 85000000,
    apr: '~35% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-mgo-wbnb',
    name: 'MGO / WBNB',
    address: '0x83bd3ceadc3c19af0264157f4b70f0402c9bb3a8',
    token0: {
      symbol: 'MGO',
      address: '0x5e0d6791edbeeba6a14d1d38e2b8233257118eb1',
      decimals: 9,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 12500000,
    apr: '~42% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-crtr-wbnb',
    name: 'CRTR / WBNB',
    address: '0x8f889728c2a879b15936eecc38a61f03fcdc6818',
    token0: {
      symbol: 'CRTR',
      address: '0xb150e91cb40909f47d45115ee9e90667d807464b',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 5800000,
    apr: '~38% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-koge-usdt',
    name: 'KOGE / USDT',
    address: '0xcf59b8c8baa2dea520e3d549f97d4e49ade17057',
    token0: {
      symbol: 'KOGE',
      address: '0xe6df05ce8c8301223373cf5b969afcb1498c5528',
      decimals: 18,
    },
    token1: {
      symbol: 'USDT',
      address: '0x55d398326f99059ff775485246999027b3197955',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 4200000,
    apr: '~25% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-btcb-usdt',
    name: 'BTCB / USDT',
    address: '0x46cf1cf8c69595804ba91dfdd8d6b960c9b0a7c4',
    token0: {
      symbol: 'BTCB',
      address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      decimals: 18,
    },
    token1: {
      symbol: 'USDT',
      address: '0x55d398326f99059ff775485246999027b3197955',
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 95000000,
    apr: '~18% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-usdc-wbnb',
    name: 'USDC / WBNB',
    address: '0xf2688fb5b81049dfb7703ada5e770543770612c4',
    token0: {
      symbol: 'USDC',
      address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 72000000,
    apr: '~32% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-esports-wbnb',
    name: 'ESPORTS / WBNB',
    address: '0x5bb59bb9371cbec158ed602d5f3cf1ad1c9b4462',
    token0: {
      symbol: 'ESPORTS',
      address: '0xf39e4b21c84e737df08e2c3b32541d856f508e48',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 3100000,
    apr: '~55% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-btcb-wbnb',
    name: 'BTCB / WBNB',
    address: '0x62edaf2a56c9fb55be5f9b1399ac067f6a37013b',
    token0: {
      symbol: 'BTCB',
      address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 65000000,
    apr: '~22% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-eth-wbnb',
    name: 'ETH / WBNB',
    address: '0x62fcb3c1794fb95bd8b1a97f6ad5d8a7e4943a1e',
    token0: {
      symbol: 'ETH',
      address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 88000000,
    apr: '~28% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
  {
    id: 'pcs-v3-usd1-wbnb',
    name: 'USD1 / WBNB',
    address: '0x4a3218606af9b4728a9f187e1c1a8c07fbc172a9',
    token0: {
      symbol: 'USD1',
      address: '0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d',
      decimals: 18,
    },
    token1: {
      symbol: 'WBNB',
      address: WBNB_ADDRESS,
      decimals: 18,
    },
    poolType: 'DEX_PANCAKESWAPV3',
    liquidityUSD: 15000000,
    apr: '~30% APR',
    dex: 'PancakeSwap V3',
    isArbitrageInception: false,
  },
]
