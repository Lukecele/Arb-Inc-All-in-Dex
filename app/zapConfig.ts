export const BSC_CHAIN_ID = 56;

// Indirizzi dei contratti di routing e validazione per lo Zap su BSC
export const ZAP_CONTRACTS = {
  KS_ZAP_ROUTER_POSITION: "0x0e97c887b61ccd952a53578b04763e7134429e05",
  KS_ZAP_ROUTER_POSITION_PERMIT: "0x638d935eEcD1646991A8b2CE9C2A2B7B840CCaBb",
  KS_ZAP_VALIDATOR_V2_PART1: "0xa16f32442209c6b978431818aa535bcc9ad2863e",
};

// Mappatura solida tra gli ENUM on-chain/aggregatore e i nomi visualizzati nella UI
export const DEX_INFO = {
  DEX_UNISWAPV3: {
    label: "Uniswap V3",
    key: "uniswapv3",
    validator: ZAP_CONTRACTS.KS_ZAP_VALIDATOR_V2_PART1, // Associato esplicitamente al tuo validatore V3
  },
  DEX_UNISWAPV2: {
    label: "Uniswap V2",
    key: "uniswapv2",
    validator: null,
  },
  DEX_PANCAKESWAPV3: {
    label: "PancakeSwap V3",
    key: "pancakeswapv3",
    validator: null,
  },
  DEX_PANCAKESWAPV2: {
    label: "PancakeSwap V2",
    key: "pancakeswapv2",
    validator: null,
  },
} as const;

export type DexType = keyof typeof DEX_INFO;
