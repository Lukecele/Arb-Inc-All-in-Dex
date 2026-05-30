#!/usr/bin/env node
/*
Fetch top Beefy BSC vaults and map to DEX pools supported by Kyber.
Generates app/pools.beefy_candidates.ts with candidate PoolInfo entries for review.

Run: node scripts/generate_beefy_candidates.js
*/
const fs = require('fs');

const VAULTS_URL = 'https://api.beefy.finance/vaults';
const APY_URL = 'https://api.beefy.finance/apy';
const TVL_URL = 'https://api.beefy.finance/tvl';

const SUPPORTED_DEX_KEYWORDS = [
  { kw: 'pancake', poolType: 'DEX_PANCAKESWAPV3', dexId: 'PANCAKE_SWAP_V3' },
  { kw: 'pancake', poolType: 'DEX_PANCAKESWAPV2', dexId: 'PANCAKE_SWAP_V2' },
  { kw: 'uni', poolType: 'DEX_UNISWAPV3', dexId: 'UNISWAP_V3' },
  { kw: 'sushi', poolType: 'DEX_SUSHISWAPV2', dexId: 'SUSHISWAP_V2' },
];

function mapPlatformToDex(platformId, name) {
  const lower = (platformId || '') .toLowerCase() + ' ' + (name||'').toLowerCase();
  if (lower.includes('pancake')) return { poolType: 'DEX_PANCAKESWAPV3', dexId: 'PANCAKE_SWAP_V3', dex: 'PancakeSwap' };
  if (lower.includes('uni')) return { poolType: 'DEX_UNISWAPV3', dexId: 'UNISWAP_V3', dex: 'Uniswap' };
  if (lower.includes('sushi')) return { poolType: 'DEX_SUSHISWAPV2', dexId: 'SUSHISWAP_V2', dex: 'SushiSwap' };
  return null;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return res.json();
}

async function main() {
  console.log('Fetching Beefy vaults...');
  const [vaults, apyMap, tvlMap] = await Promise.all([
    fetchJson(VAULTS_URL),
    fetchJson(APY_URL),
    fetchJson(TVL_URL),
  ]);

  // Filter BSC active vaults
  const bsc = vaults.filter(v => v.chain === 'bsc' && v.status === 'active');

  // Map candidates
  const candidates = bsc.map(v => {
    const apy = (apyMap && apyMap[v.id] && apyMap[v.id].totalApy) ? apyMap[v.id].totalApy * 100 : null;
    const tvl = (tvlMap && tvlMap[v.chain] && tvlMap[v.chain][v.id]) ? tvlMap[v.chain][v.id] : 0;
    const mapped = mapPlatformToDex(v.platformId, v.platformId);
    const dex = mapped ? mapped.dex : v.platformId || 'Unknown';
    const poolType = mapped ? mapped.poolType : 'DEX_PANCAKESWAPV2';
    const dexId = mapped ? mapped.dexId : 'PANCAKE_SWAP_V2';

    // try to determine token symbols from assets
    const token0 = { symbol: (v.assets && v.assets[0]) || '', address: (v.want && v.want.token0) || '' , decimals: 18 };
    const token1 = { symbol: (v.assets && v.assets[1]) || '', address: (v.want && v.want.token1) || '' , decimals: 18 };

    return {
      id: v.id,
      name: v.name,
      address: v.earnContractAddress || v.want?.address || v.earnContractAddress,
      token0,
      token1,
      poolType,
      liquidityUSD: tvl || 0,
      apr: apy ? `${apy.toFixed(2)}% APR` : 'N/A',
      aprValue: apy ? Math.round(apy) : 0,
      dex,
      isMainstream: false,
      dexId,
      chain: 'bsc',
      category: mapped ? (mapped.dexId.includes('PANCAKE') ? 'pancake' : 'uniswap') : 'unknown',
      source: 'beefy',
      raw: v,
    };
  })
  .sort((a,b) => (b.aprValue||0) - (a.aprValue||0))
  .slice(0, 12);

  // Generate TS file
  const outPath = 'app/pools.beefy_candidates.ts';
  const header = `// Auto-generated Beefy pool candidates. Review before merging.\nimport type { PoolInfo } from './pools';\n\nexport const beefyCandidates: PoolInfo[] = `;
  const body = JSON.stringify(candidates, null, 2)
    .replace(/"id":/g,'id:')
    .replace(/"name":/g,'name:')
    .replace(/"address":/g,'address:')
    .replace(/"token0":/g,'token0:')
    .replace(/"token1":/g,'token1:')
    .replace(/"poolType":/g,'poolType:')
    .replace(/"liquidityUSD":/g,'liquidityUSD:')
    .replace(/"apr":/g,'apr:')
    .replace(/"aprValue":/g,'aprValue:')
    .replace(/"dex":/g,'dex:')
    .replace(/"isMainstream":/g,'isMainstream:')
    .replace(/"dexId":/g,'dexId:')
    .replace(/"chain":/g,'chain:')
    .replace(/"category":/g,'category:')
    .replace(/"source":/g,'source:')
    .replace(/"raw":/g,'raw:')
;

  const fileContent = header + body + ' as PoolInfo[];\n';
  fs.writeFileSync(outPath, fileContent, 'utf8');
  console.log(`Wrote ${outPath} with ${candidates.length} candidates.`);
}

main().catch(err => { console.error(err); process.exit(1); });
