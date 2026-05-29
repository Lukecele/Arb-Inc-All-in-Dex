export interface PoolConfig {
  id: string;
  name: string;
  address: string;
  poolType: string;
  token0: {
    address: string;
    symbol: string;
    decimals: number;
  };
  token1: {
    address: string;
    symbol: string;
    decimals: number;
  };
  fee?: number; // Opzionale, specifico per le V3
  fallbackApr: number; // Usato come fallback se l'API fallisce
}

export const pools: PoolConfig[] = [
  {
    id: "pcs-v2-cake-wbnb",
    name: "CAKE-WBNB (PancakeSwap V2)",
    // FIX: Cambiato l'indirizzo del token CAKE con l'indirizzo reale del pool LP di PancakeSwap V2
    address: "0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6", 
    poolType: "DEX_PANCAKESWAPV2",
    token0: {
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", // CAKE
      symbol: "CAKE",
      decimals: 18,
    },
    token1: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
      symbol: "WBNB",
      decimals: 18,
    },
    fallbackApr: 14.5,
  },
  {
    id: "pcs-v3-usdt-wbnb",
    name: "USDT-WBNB (PancakeSwap V3 0.25%)",
    address: "0x36696169C63e42cd08ce11f5deeBbCeBae652050",
    poolType: "DEX_PANCAKESWAPV3",
    fee: 2500, // 0.25%
    token0: {
      address: "0x55d398326f99059fF775485246999027B3197955", // USDT
      symbol: "USDT",
      decimals: 18,
    },
    token1: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
      symbol: "WBNB",
      decimals: 18,
    },
    fallbackApr: 28.2,
  },
  {
    id: "kyberswap-v3-usdt-wbnb",
    name: "USDT-WBNB (KyberSwap Elastic)",
    address: "0x4AA05AcCE320bE0fD98356E81A204C63AdE8E067",
    poolType: "DEX_KYBERSWAPV3",
    fee: 1000, 
    token0: {
      address: "0x55d398326f99059fF775485246999027B3197955",
      symbol: "USDT",
      decimals: 18,
    },
    token1: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      symbol: "WBNB",
      decimals: 18,
    },
    fallbackApr: 32.1,
  }
];
