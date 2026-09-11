const pairsToFetch = [
    { id: "gen-usdt-uni", name: "GENIUS/USDT", q: "GENIUS USDT", dex: "uniswap", t0: "GENIUS", t1: "USDT" },
    { id: "gen-usdt-pcs", name: "GENIUS/USDT", q: "GENIUS USDT", dex: "pancakeswap", t0: "GENIUS", t1: "USDT" },
    { id: "zest-usdt-uni", name: "ZEST/USDT", q: "ZEST USDT", dex: "uniswap", t0: "ZEST", t1: "USDT" },
    { id: "zec-usdt-uni", name: "ZEC/USDT", q: "ZEC USDT", dex: "uniswap", t0: "ZEC", t1: "USDT" },
    { id: "zec-wbnb-uni", name: "ZEC/WBNB", q: "ZEC WBNB", dex: "uniswap", t0: "ZEC", t1: "WBNB" },
    { id: "xpl-usdt-uni", name: "XPL/USDT", q: "XPL USDT", dex: "uniswap", t0: "XPL", t1: "USDT" },
    { id: "xpl-usdt-pcs", name: "XPL/USDT", q: "XPL USDT", dex: "pancakeswap", t0: "XPL", t1: "USDT" },
    { id: "usdt-opg-uni", name: "USDT/OPG", q: "OPG USDT", dex: "uniswap", t0: "USDT", t1: "OPG" },
    { id: "zec-btcb-uni", name: "ZEC/BTCB", q: "ZEC BTCB", dex: "uniswap", t0: "ZEC", t1: "BTCB" },
    { id: "zec-usdt-pcs", name: "ZEC/USDT", q: "ZEC USDT", dex: "pancakeswap", t0: "ZEC", t1: "USDT" },
    { id: "pup-wbnb-pcs", name: "PUP/WBNB", q: "PUP WBNB", dex: "pancakeswap", t0: "PUP", t1: "WBNB" },
    { id: "broc-wbnb-pcs", name: "BROCCOLI/WBNB", q: "BROCCOLI WBNB", dex: "pancakeswap", t0: "BROCCOLI", t1: "WBNB" },
    { id: "4-usdt-pcs", name: "4/USDT", q: "4 USDT", dex: "pancakeswap", t0: "4", t1: "USDT" },
    { id: "form-usdt-pcs", name: "FORM/USDT", q: "FORM USDT", dex: "pancakeswap", t0: "FORM", t1: "USDT" },
    // Per evitare i limiti di ricerca testo, usiamo direttamente gli indirizzi dei token noti
    { id: "eth-usdt-pcs", name: "ETH/USDT", q: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", dex: "pancakeswap", t0: "ETH", t1: "USDT" }, 
    { id: "usdt-wbnb-uni", name: "USDT/WBNB", q: "0x55d398326f99059ff775485246999027b3197955", dex: "uniswap", t0: "USDT", t1: "WBNB" }, 
];

async function main() {
    let tsContent = `export interface PoolInfo {
	id: string;
	name: string;
	address: string;
	token0: { symbol: string; address: string; decimals: number };
	token1: { symbol: string; address: string; decimals: number };
	poolType: string;
	liquidityUSD: number;
	apr?: string;
	aprValue: number;
	dex: string;
	isMainstream: boolean;
}

export const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

export const pools: PoolInfo[] = [
	{
		id: "bnb-usdt",
		name: "BNB / USDT",
		address: "0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae",
		token0: { symbol: "WBNB", address: WBNB_ADDRESS, decimals: 18 },
		token1: { symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
		poolType: "DEX_PANCAKESWAPV2",
		liquidityUSD: 150000000,
		apr: "25% APR",
		aprValue: 25,
		dex: "PancakeSwap V2",
		isMainstream: true,
	},
	{
		id: "bnb-btc",
		name: "BNB / BTCB",
		address: "0x61EB785d58D2dAd0DB4bF4f71546C56d2dFcE7d6",
		token0: { symbol: "WBNB", address: WBNB_ADDRESS, decimals: 18 },
		token1: { symbol: "BTCB", address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", decimals: 18 },
		poolType: "DEX_PANCAKESWAPV2",
		liquidityUSD: 120000000,
		apr: "22% APR",
		aprValue: 22,
		dex: "PancakeSwap V2",
		isMainstream: true,
	},
	{
		id: "bnb-eth",
		name: "BNB / ETH",
		address: "0x74E4716E4B519cB5e270542D7B5391c5c69Aa162",
		token0: { symbol: "WBNB", address: WBNB_ADDRESS, decimals: 18 },
		token1: { symbol: "ETH", address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", decimals: 18 },
		poolType: "DEX_PANCAKESWAPV2",
		liquidityUSD: 95000000,
		apr: "28% APR",
		aprValue: 28,
		dex: "PancakeSwap V2",
		isMainstream: true,
	},
];

export const pcsV3Pools: PoolInfo[] = [
	{
		id: "pcs-v3-esports-wbnb",
		name: "ESPORTS / WBNB",
		address: "0x5bb59bb9371cbec158ed602d5f3cf1ad1c9b4462",
		token0: { symbol: "ESPORTS", address: "0xf39e4b21c84e737df08e2c3b32541d856f508e48", decimals: 18 },
		token1: { symbol: "WBNB", address: WBNB_ADDRESS, decimals: 18 },
		poolType: "DEX_PANCAKESWAPV3",
		liquidityUSD: 3100000,
		apr: "55% APR",
		aprValue: 55,
		dex: "PancakeSwap V3",
		isMainstream: false,
	},
	{
		id: "pcs-v3-mgo-wbnb",
		name: "MGO / WBNB",
		address: "0x83bd3ceadc3c19af0264157f4b70f0402c9bb3a8",
		token0: { symbol: "MGO", address: "0x5e0d6791edbeeba6a14d1d38e2b8233257118eb1", decimals: 9 },
		token1: { symbol: "WBNB", address: WBNB_ADDRESS, decimals: 18 },
		poolType: "DEX_PANCAKESWAPV3",
		liquidityUSD: 12500000,
		apr: "42% APR",
		aprValue: 42,
		dex: "PancakeSwap V3",
		isMainstream: false,
	},
	{
		id: "pcs-v3-usdt-wbnb",
		name: "USDT / WBNB",
		address: "0x172fcd41e0913e95784454622d1c3724f546f849",
		token0: { symbol: "USDT", address: "0x55d398326f99059ff775485246999027b3197955", decimals: 18 },
		token1: { symbol: "WBNB", address: WBNB_ADDRESS, decimals: 18 },
		poolType: "DEX_PANCAKESWAPV3",
		liquidityUSD: 85000000,
		apr: "35% APR",
		aprValue: 35,
		dex: "PancakeSwap V3",
		isMainstream: false,
	},
];

export const clmPools: PoolInfo[] = [\n`;

    console.log("Avvio ricerca CORRETTA e filtrata delle pool su BSC...");

    for (const target of pairsToFetch) {
        try {
            const url = `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(target.q)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.pairs || data.pairs.length === 0) {
                console.log(`⚠️ Nessun dato trovato per la query: ${target.q}`);
                continue;
            }

            // FILTRO AVANZATO: Controlla blockchain, DEX e l'effettiva corrispondenza dei simboli
            const match = data.pairs.find(p => {
                if (p.chainId !== 'bsc') return false;
                if (!p.dexId.toLowerCase().includes(target.dex)) return false;

                const s0 = p.baseToken.symbol.toLowerCase();
                const s1 = p.quoteToken.symbol.toLowerCase();
                const t0 = target.t0.toLowerCase();
                const t1 = target.t1.toLowerCase();

                // Normalizza i sinonimi più comuni delle pool (es: BNB = WBNB, ETH = WETH)
                const isT0Match = (s0 === t0 || s0 === 'w' + t0 || 'w' + s0 === t0 || (t0 === 'eth' && s0 === 'weth') || (t0 === '4' && s0.includes('4')));
                const isT1Match = (s1 === t1 || s1 === 'w' + t1 || 'w' + s1 === t1 || (t1 === 'usdt' && s1.includes('usd')));

                const isCrossT0Match = (s1 === t0 || s1 === 'w' + t0 || 'w' + s1 === t0 || (t0 === 'eth' && s1 === 'weth') || (t0 === '4' && s1.includes('4')));
                const isCrossT1Match = (s0 === t1 || s0 === 'w' + t1 || 'w' + s0 === t1 || (t1 === 'usdt' && s0.includes('usd')));

                return (isT0Match && isT1Match) || (isCrossT0Match && isCrossT1Match);
            });

            if (match) {
                const liq = match.liquidity ? Math.round(match.liquidity.usd) : 0;
                const aprValue = match.volume && match.volume.h24 ? Math.round((match.volume.h24 / (liq || 1)) * 100) : 12;

                tsContent += `	{
		id: "${target.id}",
		name: "${target.name}",
		address: "${match.pairAddress}",
		token0: { symbol: "${match.baseToken.symbol}", address: "${match.baseToken.address}", decimals: 18 },
		token1: { symbol: "${match.quoteToken.symbol}", address: "${match.quoteToken.address}", decimals: 18 },
		poolType: "DEX_CLM",
		liquidityUSD: ${liq || 1000},
		aprValue: ${aprValue},
		dex: "${match.dexId === 'uniswap' ? 'Uniswap' : 'PancakeSwap'}",
		isMainstream: false,
	},\n`;
                console.log(`✅ [OK] ${target.name} (${target.dex}) -> Mappata su ${match.pairAddress}`);
            } else {
                console.log(`❌ [NON TROVATA STRETTAMENTE] ${target.name} su ${target.dex}`);
            }
        } catch (error) {
            console.error(`❌ Errore per ${target.name}:`, error.message);
        }
        await new Promise(r => setTimeout(r, 400));
    }

    tsContent += `];\n`;

    const fs = require('fs');
    fs.writeFileSync('app/pools.ts', tsContent);
    console.log("\n🚀 File 'app/pools.ts' CORRETTO e rigenerato con successo!");
}

main();
