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
    id: "bsc:0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b",
    name: "Ankr BNB Liquid Staking",
    protocol: "Portals",
    apy: 4.5,
    tvl: 45000000,
    token: "0x0000000000000000000000000000000000000000",
    tokenDecimals: 18
  }
  // Aggiungi qui solo vault che hai VERIFICATO personalmente sull'Explorer
];
