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
  fee?: number; 
  fallbackApr: number; 
}

// FIX: Esportiamo l'alias PoolInfo per non far sballare PoolSelector.tsx
export type PoolInfo = PoolConfig;

// Pool PancakeSwap V3
export const pcsV3Pools: PoolConfig[] = [
  {
    id: "pcs-v3-usdt-wbnb",
    name: "USDT-WBNB (PancakeSwap V3 0.25%)",
    address: "0x36696169C63e42cd08ce11f5deeBbCeBae652050",
    poolType: "DEX_PANCAKESWAPV3",
    fee: 2500, 
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
    fallbackApr: 28.2,
  }
];

// Pool Concentrated Liquidity / KyberSwap Elastic
export const clmPools: PoolConfig[] = [
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

// Pool Standard / V2 (Incluso il fix su CAKE-WBNB)
export const v2Pools: PoolConfig[] = [
  {
    id: "pcs-v2-cake-wbnb",
    name: "CAKE-WBNB (PancakeSwap V2)",
    address: "0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6", // LP Address Corretto
    poolType: "DEX_PANCAKESWAPV2",
    token0: {
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", 
      symbol: "CAKE",
      decimals: 18,
    },
    token1: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 
      symbol: "WBNB",
      decimals: 18,
    },
    fallbackApr: 14.5,
  }
];

// FIX: Esportiamo l'array globale 'pools' unendo tutte le liste, richiesto sia da ZapPageClient che da PoolSelector
export const pools: PoolConfig[] = [...v2Pools, ...pcsV3Pools, ...clmPools];
