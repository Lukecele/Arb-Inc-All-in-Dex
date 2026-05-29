export interface VaultConfig {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  tvl: number;
  suggestedToken: string;
}

export const vaultsList: VaultConfig[] = [
  { id: "bsc:0x211cc4dd073734da055fbf44a2b4667d5e5fe5d2", name: "Ethena Staked USDe", protocol: "ethena", apy: 3.75, tvl: 1788893560, suggestedToken: "SUSDE" },
  { id: "bsc:0xb0b84d294e0c75a6abe60171b70edeb2efd14a1b", name: "Staked Lista BNB", protocol: "lista", apy: 4.55, tvl: 581525211, suggestedToken: "SLISBNB" },
  { id: "bsc:0xa2e3356610840701bdf5611a53974510ae27e2e1", name: "Wrapped Binance Beacon ETH", protocol: "binance-staked-eth", apy: 2.43, tvl: 421018175, suggestedToken: "WBETH" },
  { id: "bsc:0xfd5840cd36d94d7229439859c0112a4185bc0255", name: "Venus USDT", protocol: "venus", apy: 1.17, tvl: 207329878, suggestedToken: "VUSDT" },
  { id: "bsc:0x77734e70b6e88b4d82fe632a168edf6e700912b6", name: "Astherus BNB", protocol: "aster", apy: 4.55, tvl: 155198008, suggestedToken: "ASBNB" },
];
