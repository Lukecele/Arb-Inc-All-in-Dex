export interface PoolInfo {
    id: string;
    name: string;
    address: string;
    dex: string;
    poolType: string;
    isBeefy?: boolean;
    rawApy?: number;
    apr?: string;
    liquidityUSD?: number;
    isArbitrageInception?: boolean;
    token0: { symbol: string; address: string };
    token1: { symbol: string; address: string };
}
