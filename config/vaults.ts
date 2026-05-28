// ============================================================
//  config/vaults.ts
//  Vault list per Portals.fi su BNB Chain
//
//  NOTA SUI CAMPI:
//  - id         : outputToken per l'API Portals /v2/portal (il vault/receipt token)
//  - token      : inputToken che l'utente possiede e vuole depositare
//  - tokenDecimals: decimali dell'inputToken (serve per parseUnits)
// ============================================================

export interface VaultConfig {
  id: string;           // Portals outputToken: "bsc:0x..."
  name: string;
  protocol: string;
  apy: number;          // APY snapshot (aggiornare periodicamente)
  tvl: number;          // TVL in USD snapshot
  token: string;        // inputToken address (0x000...000 = BNB nativo)
  tokenSymbol: string;  // simbolo leggibile dell'inputToken
  tokenDecimals: number;
}

// Costante BNB nativo
const BNB_NATIVE = '0x0000000000000000000000000000000000000000';

export const vaultsList: VaultConfig[] = [
  // ----------------------------------------------------------
  // Ethena Staked USDe
  // outputToken (vault): sUSDe su BSC  → 0x211Cc4DD...
  // inputToken: USDe su BSC           → 0x5d3a1Ff2...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2',
    name: 'Ethena Staked USDe',
    protocol: 'Ethena',
    apy: 3.75,
    tvl: 1_790_000_000,
    token: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34', // USDe su BSC
    tokenSymbol: 'USDe',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus BTC
  // outputToken (vault): vBTC  → 0x882C173b...
  // inputToken: BTCB            → 0x7130d2A1...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B',
    name: 'Venus BTC',
    protocol: 'Venus',
    apy: 0.18,
    tvl: 388_250_000,
    token: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', // BTCB
    tokenSymbol: 'BTCB',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Staked Lista BNB
  // outputToken (vault): slisBNB → 0xB0b84D29...
  // inputToken: BNB nativo
  // ----------------------------------------------------------
  {
    id: 'bsc:0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    name: 'Staked Lista BNB',
    protocol: 'Lista',
    apy: 4.55,
    tvl: 584_250_000,
    token: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    tokenSymbol: 'WBNB',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus ETH
  // outputToken (vault): vETH  → 0xf508fCD8...
  // inputToken: ETH (Binance-Peg) → 0x2170Ed08...
  // ----------------------------------------------------------
  {
    id: 'bsc:0xf508fCD89b8bd15579dc79A6827cB4686A3592c8',
    name: 'Venus ETH',
    protocol: 'Venus',
    apy: 0.38,
    tvl: 39_800_000,
    token: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', // Binance-Peg ETH
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus CAKE
  // outputToken (vault): vCAKE → 0x86aC3974...
  // inputToken: CAKE            → 0x0E09FaBB...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x86aC3974e2BD0d60825230fa6F355fF11409df5c',
    name: 'Venus CAKE',
    protocol: 'Venus',
    apy: 0.01,
    tvl: 18_000_000,
    token: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // CAKE
    tokenSymbol: 'CAKE',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus XRP
  // outputToken (vault): vXRP → 0xB248a295...
  // inputToken: XRP (Binance-Peg) → 0x1D2F0da1...
  // ----------------------------------------------------------
  {
    id: 'bsc:0xB248a295732e0225acd3337607cc01068e3b9c10',
    name: 'Venus XRP',
    protocol: 'Venus',
    apy: 0.37,
    tvl: 7_250_000,
    token: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE', // Binance-Peg XRP
    tokenSymbol: 'XRP',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus AAVE
  // outputToken (vault): vAAVE → 0x26DA2895...
  // inputToken: AAVE (Binance-Peg) → 0xfb611544...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x26DA28954763B92139ED49283625ceCAf52C6f94',
    name: 'Venus AAVE',
    protocol: 'Venus',
    apy: 0.02,
    tvl: 494_960,
    token: '0xfb6115445Bff7b52FeB98650C87f44907E58f802', // Binance-Peg AAVE
    tokenSymbol: 'AAVE',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus DAI
  // outputToken (vault): vDAI → 0x334b3eCB...
  // inputToken: DAI (Binance-Peg) → 0x1AF3F329...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1',
    name: 'Venus DAI',
    protocol: 'Venus',
    apy: 1.35,
    tvl: 1_920_000,
    token: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', // Binance-Peg DAI
    tokenSymbol: 'DAI',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus UNI
  // outputToken (vault): vUNI → 0x27FF5647...
  // inputToken: UNI (Binance-Peg) → 0xBf5140A2...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x27FF564707786720C71A2e5c1490A63266683612',
    name: 'Venus UNI',
    protocol: 'Venus',
    apy: 0.00,
    tvl: 6_020_000,
    token: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1', // Binance-Peg UNI
    tokenSymbol: 'UNI',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus LINK
  // outputToken (vault): vLINK → 0x650b940a...
  // inputToken: LINK (Binance-Peg) → 0xF8A0BF9c...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x650b940a1033B8A1b1873f78730FcFC73ec11f1f',
    name: 'Venus LINK',
    protocol: 'Venus',
    apy: 0.02,
    tvl: 1_530_000,
    token: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD', // Binance-Peg LINK
    tokenSymbol: 'LINK',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus TUSD
  // outputToken (vault): vTUSD → 0x08CEB3F4...
  // inputToken: TUSD su BSC → 0x14016E85...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3',
    name: 'Venus TUSD',
    protocol: 'Venus',
    apy: 35.11,
    tvl: 13_800,
    token: '0x14016E85a25aeb13065688cAFB43044C2ef86784', // TUSD su BSC
    tokenSymbol: 'TUSD',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Venus THE
  // outputToken (vault): vTHE → 0x86B3189...
  // inputToken: THE → 0xF4C8E32E...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x86B31895B51D839Ce645a3F95E5AC4e5b2A36BE7',
    name: 'Venus THE',
    protocol: 'Venus',
    apy: 4.92,
    tvl: 92_980,
    token: '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a5', // THE token
    tokenSymbol: 'THE',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Astherus BNB (ASBNB)
  // outputToken (vault): ASBNB → 0x77734...
  // inputToken: slisBNB → 0xB0b84D29...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x77734e70b6e88b4d82fe632a168edf6e700912b6',
    name: 'Astherus BNB',
    protocol: 'Astherus',
    apy: 4.55,
    tvl: 155_600_000,
    token: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B', // slisBNB
    tokenSymbol: 'slisBNB',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Wrapped eETH (weETH su BSC)
  // outputToken (vault): weETH → 0x04C0599...
  // inputToken: BNB nativo (il bridge usa BNB)
  // ----------------------------------------------------------
  {
    id: 'bsc:0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A',
    name: 'Wrapped eETH',
    protocol: 'EtherFi',
    apy: 5.34,
    tvl: 63_240,
    token: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // deposito via BNB → weETH tramite Portals
    tokenSymbol: 'WBNB',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Re Protocol reUSD
  // outputToken (vault): reUSD → 0xba9425ec55ee0e72216d18e0ad8bbba2553bfb60
  // inputToken: USDT su BSC → 0x55d398...
  // ----------------------------------------------------------
  {
    id: 'bsc:0xba9425ec55ee0e72216d18e0ad8bbba2553bfb60',
    name: 'Re Protocol reUSD',
    protocol: 'Re Protocol',
    apy: 6.97,
    tvl: 31_970,
    token: '0x55d398326f99059fF775485246999027B3197955', // USDT su BSC
    tokenSymbol: 'USDT',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler Re7 Labs WBNB (EWBNB-5)
  // outputToken (vault): EWBNB-5 → verificare su Portals
  // inputToken: WBNB → 0xbb4CdB9C...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x3ac88afbc38bb41443457eeb027b60e85b815538',
    name: 'Euler Re7 Labs WBNB',
    protocol: 'Euler',
    apy: 240.00,
    tvl: 22_560,
    token: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
    tokenSymbol: 'WBNB',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler Re7 Labs BTCB (EBTCB-4)
  // inputToken: BTCB → 0x7130d2A1...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x7a455f66fd2d2d5c69ae403a971ed513c852f9d7',
    name: 'Euler Re7 Labs BTCB',
    protocol: 'Euler',
    apy: 240.00,
    tvl: 9_940,
    token: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', // BTCB
    tokenSymbol: 'BTCB',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler Re7 Labs lisUSD (ELISUSD-2)
  // inputToken: HAY/lisUSD → 0x0782b6d8...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x266d3f3219680624de4d66c716444512a2b9a72f',
    name: 'Euler Re7 Labs lisUSD',
    protocol: 'Euler',
    apy: 80.00,
    tvl: 563,
    token: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5', // HAY (lisUSD)
    tokenSymbol: 'HAY',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler Tulipa BNB USDC (EUSDC-3)
  // inputToken: USDC su BSC → 0x8AC76a51...
  // ----------------------------------------------------------
  {
    id: 'bsc:0xa9ca5c4bff689afcfb249ae81565422fa78f82b4',
    name: 'Euler Tulipa BNB USDC',
    protocol: 'Euler',
    apy: 55.76,
    tvl: 1_110,
    token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC su BSC
    tokenSymbol: 'USDC',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler Apostro BSC USDC (EUSDC-2)
  // inputToken: USDC su BSC → 0x8AC76a51...
  // ----------------------------------------------------------
  {
    id: 'bsc:0xc27d44a8aea0cda482600136c0d0876e807f6c1a',
    name: 'Euler Apostro BSC USDC',
    protocol: 'Euler',
    apy: 54.00,
    tvl: 11_250,
    token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC su BSC
    tokenSymbol: 'USDC',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler EVK Vault eUSDT-7
  // inputToken: USDT su BSC → 0x55d398...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x4051d583ea7cd39b7f6bb4b687d900c9dc211cb3',
    name: 'Euler EVK Vault eUSDT-7',
    protocol: 'Euler',
    apy: 14.26,
    tvl: 1_500,
    token: '0x55d398326f99059fF775485246999027B3197955', // USDT su BSC
    tokenSymbol: 'USDT',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler EVK Vault eTHE-1
  // inputToken: THE → 0xF4C8E32E...
  // ----------------------------------------------------------
  {
    id: 'bsc:0xb9c596697d5127d3ceb9babe23868de000ee2181',
    name: 'Euler EVK Vault eTHE-1',
    protocol: 'Euler',
    apy: 10.47,
    tvl: 7_310,
    token: '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a5', // THE
    tokenSymbol: 'THE',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Euler K3 Capital ASTERLIQUID USDT (EUSDT-6)
  // inputToken: USDT su BSC → 0x55d398...
  // ----------------------------------------------------------
  {
    id: 'bsc:0x95c5fd8618c68d6156a739c1eab5aa7c807ff148',
    name: 'Euler K3 Capital ASTERLIQUID USDT',
    protocol: 'Euler',
    apy: 5.24,
    tvl: 269_740,
    token: '0x55d398326f99059fF775485246999027B3197955', // USDT su BSC
    tokenSymbol: 'USDT',
    tokenDecimals: 18,
  },

  // ----------------------------------------------------------
  // Mellow LRT CycleNetwork Vault
  // inputToken: CYC → da verificare
  // ----------------------------------------------------------
  {
    id: 'bsc:0xc8e046fe778be29572016d1f703e9b2ff77a207d',
    name: 'Mellow LRT CycleNetwork Vault',
    protocol: 'Mellow',
    apy: 7.00,
    tvl: 1_810,
    token: '0x5845684b49aef79a5c0f887f50401c247dca7ac6', // CYC
    tokenSymbol: 'CYC',
    tokenDecimals: 18,
  },


  // ----------------------------------------------------------
  // Beefy Moo Ape BNBx-BNB
  // outputToken: mooBNBxBNB LP vault su Beefy
  // inputToken: BNB nativo
  // ----------------------------------------------------------
  {
    id: 'bsc:0xc46dcde0d91f674c04a61bb30a52c6b45b95f317',
    name: 'Beefy Moo Ape BNBx-BNB',
    protocol: 'Beefy',
    apy: 277.63,
    tvl: 25_770,
    token: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    tokenSymbol: 'WBNB',
    tokenDecimals: 18,
  },
];
