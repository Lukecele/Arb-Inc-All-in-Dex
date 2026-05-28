export interface VaultConfig {
  id: string;
  name: string;
  protocol: string;
  apy: number;
  tvl: number;
  suggestedToken: string; // simbolo del token principale accettato
}

export const vaultsList: VaultConfig[] = [
  { id: 'bsc:0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2', name: 'Ethena Staked USDe', protocol: 'Ethena', apy: 3.75, tvl: 1_790_000_000, suggestedToken: 'USDe' },
  { id: 'bsc:0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B', name: 'Venus BTC', protocol: 'Venus', apy: 0.18, tvl: 388_250_000, suggestedToken: 'BTCB' },
  { id: 'bsc:0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B', name: 'Staked Lista BNB', protocol: 'Lista', apy: 4.55, tvl: 584_250_000, suggestedToken: 'WBNB' },
  { id: 'bsc:0xf508fCD89b8bd15579dc79A6827cB4686A3592c8', name: 'Venus ETH', protocol: 'Venus', apy: 0.38, tvl: 39_800_000, suggestedToken: 'ETH' },
  { id: 'bsc:0x86aC3974e2BD0d60825230fa6F355fF11409df5c', name: 'Venus CAKE', protocol: 'Venus', apy: 0.01, tvl: 18_000_000, suggestedToken: 'CAKE' },
  { id: 'bsc:0xB248a295732e0225acd3337607cc01068e3b9c10', name: 'Venus XRP', protocol: 'Venus', apy: 0.37, tvl: 7_250_000, suggestedToken: 'XRP' },
  { id: 'bsc:0x26DA28954763B92139ED49283625ceCAf52C6f94', name: 'Venus AAVE', protocol: 'Venus', apy: 0.02, tvl: 494_960, suggestedToken: 'AAVE' },
  { id: 'bsc:0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1', name: 'Venus DAI', protocol: 'Venus', apy: 1.35, tvl: 1_920_000, suggestedToken: 'DAI' },
  { id: 'bsc:0x27FF564707786720C71A2e5c1490A63266683612', name: 'Venus UNI', protocol: 'Venus', apy: 0.00, tvl: 6_020_000, suggestedToken: 'UNI' },
  { id: 'bsc:0x650b940a1033B8A1b1873f78730FcFC73ec11f1f', name: 'Venus LINK', protocol: 'Venus', apy: 0.02, tvl: 1_530_000, suggestedToken: 'LINK' },
  { id: 'bsc:0xfd5840cd36d94d7229439859c0112a4185bc0255', name: 'Venus USDT', protocol: 'Venus', apy: 2.50, tvl: 1_200_000_000, suggestedToken: 'USDT' },
  { id: 'bsc:0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3', name: 'Venus TUSD', protocol: 'Venus', apy: 35.11, tvl: 13_800, suggestedToken: 'TUSD' },
  { id: 'bsc:0x86B31895B51D839Ce645a3F95E5AC4e5b2A36BE7', name: 'Venus THE', protocol: 'Venus', apy: 4.92, tvl: 92_980, suggestedToken: 'THE' },
  { id: 'bsc:0x77734e70b6e88b4d82fe632a168edf6e700912b6', name: 'Astherus BNB', protocol: 'Astherus', apy: 4.55, tvl: 155_600_000, suggestedToken: 'slisBNB' },
  { id: 'bsc:0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A', name: 'Wrapped eETH', protocol: 'EtherFi', apy: 5.34, tvl: 63_240, suggestedToken: 'WBNB' },
  { id: 'bsc:0xba9425ec55ee0e72216d18e0ad8bbba2553bfb60', name: 'Re Protocol reUSD', protocol: 'Re Protocol', apy: 6.97, tvl: 31_970, suggestedToken: 'USDT' },
  { id: 'bsc:0x3ac88afbc38bb41443457eeb027b60e85b815538', name: 'Euler Re7 Labs WBNB', protocol: 'Euler', apy: 240.00, tvl: 22_560, suggestedToken: 'WBNB' },
  { id: 'bsc:0x7a455f66fd2d2d5c69ae403a971ed513c852f9d7', name: 'Euler Re7 Labs BTCB', protocol: 'Euler', apy: 240.00, tvl: 9_940, suggestedToken: 'BTCB' },
  { id: 'bsc:0x266d3f3219680624de4d66c716444512a2b9a72f', name: 'Euler Re7 Labs lisUSD', protocol: 'Euler', apy: 80.00, tvl: 563, suggestedToken: 'HAY' },
  { id: 'bsc:0xa9ca5c4bff689afcfb249ae81565422fa78f82b4', name: 'Euler Tulipa BNB USDC', protocol: 'Euler', apy: 55.76, tvl: 1_110, suggestedToken: 'USDC' },
  { id: 'bsc:0xc27d44a8aea0cda482600136c0d0876e807f6c1a', name: 'Euler Apostro BSC USDC', protocol: 'Euler', apy: 54.00, tvl: 11_250, suggestedToken: 'USDC' },
  { id: 'bsc:0x4051d583ea7cd39b7f6bb4b687d900c9dc211cb3', name: 'Euler EVK Vault eUSDT-7', protocol: 'Euler', apy: 14.26, tvl: 1_500, suggestedToken: 'USDT' },
  { id: 'bsc:0xb9c596697d5127d3ceb9babe23868de000ee2181', name: 'Euler EVK Vault eTHE-1', protocol: 'Euler', apy: 10.47, tvl: 7_310, suggestedToken: 'THE' },
  { id: 'bsc:0x95c5fd8618c68d6156a739c1eab5aa7c807ff148', name: 'Euler K3 Capital ASTERLIQUID USDT', protocol: 'Euler', apy: 5.24, tvl: 269_740, suggestedToken: 'USDT' },
  { id: 'bsc:0xc8e046fe778be29572016d1f703e9b2ff77a207d', name: 'Mellow LRT CycleNetwork Vault', protocol: 'Mellow', apy: 7.00, tvl: 1_810, suggestedToken: 'CYC' },
];
