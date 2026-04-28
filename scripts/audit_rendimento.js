const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');
const fs = require('fs');

// 🔍 Recuperiamo l'indirizzo del token dal watcher.js per essere sicuri
const watcherCode = fs.readFileSync(path.resolve(__dirname, 'watcher.js'), 'utf8');
const tokenMatch = watcherCode.match(/TOKEN_ADDRESS\s*=\s*["'](0x[a-fA-F0-0]+)["']/);
const TOKEN_ADDRESS = tokenMatch ? tokenMatch[1] : null;

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const abi = ["function balanceOf(address) view returns (uint256)"];

async function runAudit() {
    if (!TOKEN_ADDRESS) return console.log("❌ Non ho trovato TOKEN_ADDRESS in watcher.js");
    
    const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);
    const topWallets = await redis.zrevrange('leaderboard:points', 0, 4); // Prende i primi 5
    
    console.log(`\n🕵️ AUDIT RENDIMENTO REALE (Token: ${TOKEN_ADDRESS.slice(0,6)}...)`);
    console.log("----------------------------------------------------------------------");
    console.log("WALLET          |  TOKEN ATTUALI  | PUNTI/CICLO | STATUS");
    console.log("----------------------------------------------------------------------");

    for (const w of topWallets) {
        try {
            const balWei = await contract.balanceOf(w);
            const tokens = parseFloat(ethers.formatUnits(balWei, 18));
            const pointsPerCycle = (tokens / 1000000) * 10;
            const status = (await redis.get(`rewards:status:${w}`)) || "diamond";
            
            const shortW = w.slice(0,6) + "..." + w.slice(-4);
            console.log(`${shortW} | ${tokens.toLocaleString().padEnd(15)} | +${pointsPerCycle.toFixed(2).padEnd(10)} | ${status.toUpperCase()}`);
        } catch (e) {
            console.log(`${w.slice(0,6)}... | Errore nel recupero dati`);
        }
    }
    console.log("----------------------------------------------------------------------\n");
}
runAudit();
