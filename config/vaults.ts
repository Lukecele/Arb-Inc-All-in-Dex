export interface VaultConfig {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  tvl: number;
  token: string;
  tokenDecimals: number;
}

export const vaultsList: VaultConfig[] = [
  {
    id: "binance-bnb-bsc",
    name: "BNB Staking",
    protocol: "Portals",
    apy: 12.5,
    tvl: 45000000,
    token: "0x0000000000000000000000000000000000000000",
    tokenDecimals: 18
  },
  {
    id: "binance-busd-bsc",
    name: "BUSD Savings",
    protocol: "Portals",
    apy: 8.2,
    tvl: 12000000,
    token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    tokenDecimals: 18
  }
];
