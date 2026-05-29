const { ethers } = require("ethers");

// Risolve la compatibilità tra Ethers v5 ed v6 automaticamente
const JsonRpcProvider = ethers.JsonRpcProvider || ethers.providers.JsonRpcProvider;
const provider = new JsonRpcProvider("https://bsc-dataseed.binance.org/");

// Factory Addresses ufficiali su BSC (v3)
const PANCAKE_FACTORY = "0x0BFbCF9fa4f9C56B0F40a671Ad45E095e263d95D";
const UNISWAP_FACTORY = "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7";

const FACTORY_ABI = ["function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)"];

// POPOLA QUI GLI INDIRIZZI DEI TUOI TOKEN INTERESSATI
// Inserisci l'address corretto al posto di "0x0000..." per i token mancanti
const tokens = {
    GENIUS: "0x1F12B85aAC097E43Aa1555b2881E98a51090e9A6",
    USDT: "0x55d398326f99059ff775485246999027b3197955",
    WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    BTCB: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
    ETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    ZEST: "0x0000000000000000000000000000000000000000", // <-- Inserisci address reale
    ZEC: "0x0000000000000000000000000000000000000000",  // <-- Inserisci address reale
    XPL: "0x0000000000000000000000000000000000000000",  // <-- Inserisci address reale
    OPG: "0x0000000000000000000000000000000000000000",  // <-- Inserisci address reale
    PUP: "0x0000000000000000000000000000000000000000",  // <-- Inserisci address reale
    BROCCOLI: "0x0000000000000000000000000000000000000000", // <-- Inserisci address reale
    "4": "0x0000000000000000000000000000000000000000",   // <-- Inserisci address reale
    FORM: "0x0000000000000000000000000000000000000000"  // <-- Inserisci address reale
};

// Tutte le 16 pool ricavate con i dati associati di Liquidity e APR
const pairsToFetch = [
    { id: "genius-usdt-uni", name: "GENIUS / USDT", t0: "GENIUS", t1: "USDT", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 5716, apr: 40414 },
    { id: "genius-usdt-pancake", name: "GENIUS / USDT", t0: "GENIUS", t1: "USDT", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 8697, apr: 12621 },
    { id: "zest-usdt-uni", name: "ZEST / USDT", t0: "ZEST", t1: "USDT", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 23, apr: 2710 },
    { id: "zec-usdt-uni", name: "ZEC / USDT", t0: "ZEC", t1: "USDT", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 44135, apr: 618 },
    { id: "zec-wbnb-uni", name: "ZEC / WBNB", t0: "ZEC", t1: "WBNB", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 4534, apr: 438 },
    { id: "xpl-usdt-uni", name: "XPL / USDT", t0: "XPL", t1: "USDT", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 4358, apr: 410 },
    { id: "xpl-usdt-pancake", name: "XPL / USDT", t0: "XPL", t1: "USDT", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 1950, apr: 386 },
    { id: "usdt-opg-uni", name: "USDT / OPG", t0: "USDT", t1: "OPG", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 1001, apr: 348 },
    { id: "zec-btcb-uni", name: "ZEC / BTCB", t0: "ZEC", t1: "BTCB", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 8250, apr: 291 },
    { id: "zec-usdt-pancake", name: "ZEC / USDT", t0: "ZEC", t1: "USDT", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 3598, apr: 274 },
    { id: "pup-wbnb-pancake", name: "PUP / WBNB", t0: "PUP", t1: "WBNB", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 595, apr: 169 },
    { id: "broccoli-wbnb-pancake", name: "BROCCOLI / WBNB", t0: "BROCCOLI", t1: "WBNB", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 13826, apr: 66 },
    { id: "4-usdt-pancake", name: "4 / USDT", t0: "4", t1: "USDT", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 9727, apr: 45 },
    { id: "form-usdt-pancake", name: "FORM / USDT", t0: "FORM", t1: "USDT", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 868, apr: 37 },
    { id: "eth-usdt-pancake", name: "ETH / USDT", t0: "ETH", t1: "USDT", dex: "PancakeSwap", factory: PANCAKE_FACTORY, liq: 4190, apr: 32 },
    { id: "usdt-wbnb-uni", name: "USDT / WBNB", t0: "USDT", t1: "WBNB", dex: "Uniswap", factory: UNISWAP_FACTORY, liq: 74944, apr: 24 }
];

// Fee Tier standard v3 da testare in ordine per trovare la pool attiva (0.01%, 0.05%, 0.25%, 0.3%, 1%)
const feeTiers = [100, 500, 2500, 3000, 10000];

async function fetchAll() {
    console.log("export interface PoolInfo { id: string; name: string; address: string; token0: any; token1: any; poolType: string; liquidityUSD: number; apr?: string; aprValue: number; dex: string; isMainstream: boolean; }\n");
    console.log("export const pools: PoolInfo[] = [");

    for (const pair of pairsToFetch) {
        const addr0 = tokens[pair.t0];
        const addr1 = tokens[pair.t1];

        if (!addr0 || !addr1 || addr0.startsWith("0x000") || addr1.startsWith("0x000")) {
            console.log(`  // [MANCA TOKEN ADDRESS] Salto ${pair.name} su ${pair.dex} (inserisci gli indirizzi in 'tokens')`);
            continue;
        }

        let poolAddress = "0x0000000000000000000000000000000000000000";
        const factoryContract = new ethers.Contract(pair.factory, FACTORY_ABI, provider);

        // Effettua il controllo ciclico automatico sui fee tier finché non trova l'indirizzo valido
        for (const fee of feeTiers) {
            try {
                const res = await factoryContract.getPool(addr0, addr1, fee);
                if (res && res !== "0x0000000000000000000000000000000000000000") {
                    poolAddress = res;
                    break;
                }
            } catch (e) {
                // Silenzioso
            }
        }

        console.log(`        {`);
        console.log(`                id: "${pair.id}",`);
        console.log(`                name: "${pair.name}",`);
        console.log(`                address: "${poolAddress}",`);
        console.log(`                token0: { symbol: "${pair.t0}", address: "${addr0}", decimals: 18 },`);
        console.log(`                token1: { symbol: "${pair.t1}", address: "${addr1}", decimals: 18 },`);
        console.log(`                poolType: "${pair.dex === "Uniswap" ? "DEX_UNI" : "DEX_PANCAKESWAPV3"}",`);
        console.log(`                liquidityUSD: ${pair.liq},`);
        console.log(`                apr: "${pair.apr}% APR",`);
        console.log(`                aprValue: ${pair.apr},`);
        console.log(`                dex: "${pair.dex}",`);
        console.log(`                isMainstream: ${pair.t0 === "ETH" || pair.t0 === "USDT" ? "true" : "false"},`);
        console.log(`        },`);
    }
    console.log("];");
}

fetchAll();
