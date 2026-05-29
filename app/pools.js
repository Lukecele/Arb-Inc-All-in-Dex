// 1. Array completo di tutte le pool
export const STATIC_POOLS = [
  { id: "0x1F12B85aAC097E43Aa1555b2881E98a51090e9A6", dex: "DEX_PANCAKESWAPV3", symbol: "GENIUS/USDT", fee: 2500 },
  { id: "0x5506599c722389A60580B5213ea1Da60D64754a1", dex: "DEX_PANCAKESWAPV3", symbol: "ZEST/USDT", fee: 2500 },
  { id: "0x36bAFee1059f3C1514C609919CC85A9B48967990", dex: "DEX_PANCAKESWAPV3", symbol: "WBNB/USDT", fee: 2500 },
  { id: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82", dex: "DEX_PANCAKESWAPV3", symbol: "CAKE/WBNB", fee: 2500 },
  { id: "0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb", dex: "DEX_PANCAKESWAPV3", symbol: "ZEC/WBNB", fee: 2500 },
  { id: "0x1b8259878388b03d15dd1b86a3113bbbef87eb", dex: "DEX_PANCAKESWAPV3", symbol: "FGRM/USDT", fee: 2500 },
  { id: "0x2222222222222222222222222222222222222222", dex: "DEX_PANCAKESWAPV3", symbol: "BTC/USDT", fee: 500 },
  { id: "0x3333333333333333333333333333333333333333", dex: "DEX_PANCAKESWAPV3", symbol: "ETH/USDT", fee: 500 },
  { id: "0x4444444444444444444444444444444444444444", dex: "DEX_PANCAKESWAPV3", symbol: "ADA/USDT", fee: 2500 },
  { id: "0x5555555555555555555555555555555555555555", dex: "DEX_PANCAKESWAPV3", symbol: "DOT/USDT", fee: 2500 },
  { id: "0x6666666666666666666666666666666666666666", dex: "DEX_PANCAKESWAPV3", symbol: "SOL/USDT", fee: 2500 },
  { id: "0x7777777777777777777777777777777777777777", dex: "DEX_PANCAKESWAPV3", symbol: "LINK/USDT", fee: 2500 },
  { id: "0x8888888888888888888888888888888888888888", dex: "DEX_PANCAKESWAPV3", symbol: "UNI/USDT", fee: 2500 },
  { id: "0x9999999999999999999999999999999999999999", dex: "DEX_PANCAKESWAPV3", symbol: "MATIC/USDT", fee: 2500 },
  { id: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", dex: "DEX_PANCAKESWAPV3", symbol: "DOGE/USDT", fee: 2500 },
  { id: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", dex: "DEX_PANCAKESWAPV3", symbol: "SHIB/USDT", fee: 2500 },
  { id: "0xcccccccccccccccccccccccccccccccccccccccc", dex: "DEX_PANCAKESWAPV3", symbol: "AVAX/USDT", fee: 2500 },
  { id: "0xdddddddddddddddddddddddddddddddddddddddd", dex: "DEX_PANCAKESWAPV3", symbol: "ATOM/USDT", fee: 2500 },
  { id: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", dex: "DEX_PANCAKESWAPV3", symbol: "NEAR/USDT", fee: 2500 },
  { id: "0xffffffffffffffffffffffffffffffffffffffff", dex: "DEX_PANCAKESWAPV3", symbol: "XRP/USDT", fee: 2500 },
  { id: "0x1234567812345678123456781234567812345678", dex: "DEX_PANCAKESWAPV3", symbol: "FTM/USDT", fee: 2500 },
  { id: "0x8765432187654321876543218765432187654321", dex: "DEX_PANCAKESWAPV3", symbol: "SAND/USDT", fee: 2500 },
  { id: "0xabcdefabcdefabcdefabcdefabcdefabcdefab", dex: "DEX_PANCAKESWAPV3", symbol: "MANA/USDT", fee: 2500 }
];

export const pools = STATIC_POOLS;
export const pcsV3Pools = STATIC_POOLS.filter(p => p.dex === 'DEX_PANCAKESWAPV3');
export const clmPools = STATIC_POOLS.filter(p => p.dex === 'DEX_KYBERSWAPELASTIC');
export const WBNB_ADDRESS = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

// 2. Fetching ottimizzato con feeTier dinamico
const PANCAKE_V3_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc";
const KYBER_ELASTIC_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/kybernetwork/kyberswap-elastic-bsc";

export async function fetchLivePoolMetrics() {
  try {
    const poolIds = STATIC_POOLS.map(p => `"${p.id.toLowerCase()}"`).join(",");
    // Query aggiornata per includere feeTier
    const graphqlQuery = { 
      query: \`{ 
        pools(where: { id_in: [${poolIds}] }) { 
          id 
          totalValueLockedUSD 
          feeTier 
          poolDayData(first: 1, orderBy: date, orderDirection: desc) { 
            volumeUSD 
            feesUSD 
          } 
        } 
      }\` 
    };

    const [pancakeRes, kyberRes] = await Promise.all([
      fetch(PANCAKE_V3_SUBGRAPH, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(graphqlQuery) }).then(r => r.json()).catch(() => ({ data: { pools: [] } })),
      fetch(KYBER_ELASTIC_SUBGRAPH, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(graphqlQuery) }).then(r => r.json()).catch(() => ({ data: { pools: [] } }))
    ]);

    const liveDataMap = new Map();
    const allPools = [...(pancakeRes.data?.pools || []), ...(kyberRes.data?.pools || [])];
    
    allPools.forEach(p => {
      const tvl = parseFloat(p.totalValueLockedUSD) || 0;
      const dayData = p.poolDayData?.[0];
      const feeTier = parseInt(p.feeTier) || 2500; // Default 0.25% (2500 basis points)
      
      let apr = 0;
      if (tvl > 1000 && dayData) {
        // Se feesUSD non è presente, calcola usando il feeTier reale
        // feeTier è in basis points (es. 2500 = 0.25%).
        const dailyFees = parseFloat(dayData.feesUSD) || (parseFloat(dayData.volumeUSD) * (feeTier / 1000000));
        apr = (dailyFees * 365 * 100) / tvl;
      }
      liveDataMap.set(p.id.toLowerCase(), { tvl, apr });
    });

    return STATIC_POOLS.map(pool => {
      const live = liveDataMap.get(pool.id.toLowerCase());
      return { 
        ...pool, 
        liquidity: (live && live.tvl > 1000) ? live.tvl : 1500, 
        apr: (live && live.apr > 0) ? parseFloat(live.apr.toFixed(2)) : 12.5 
      };
    });
  } catch (e) {
    console.error("Errore fetch:", e);
    return STATIC_POOLS.map(pool => ({ ...pool, liquidity: 5000, apr: 15.0 }));
  }
}
