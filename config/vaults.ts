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
    token: BNB_NATIVE,
    tokenSymbol: 'BNB',
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
];
