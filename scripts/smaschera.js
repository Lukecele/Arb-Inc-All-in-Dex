const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TOKEN_CONTRACT = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c".toLowerCase();
const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();
const abi = ["function balanceOf(address) view returns (uint256)"];

async function check() {
    const contract = new ethers.Contract(TOKEN_CONTRACT, abi, provider);
    const topWallets = await redis.zrange('leaderboard:points', 0, 9, { rev: true }); 
    
    console.log("\n🔍 VERIFICA SALDI REALI (Token: 0x5EE5...)");
    console.log("---------------------------------------------------------");
    console.log("WALLET          | TOKEN REALI (9 dec) | PUNTI A CICLO");
    console.log("---------------------------------------------------------");

    for (const w of topWallets) {
        try {
            const holding = await contract.balanceOf(w);
            const tokens = Number(holding / (10n ** 9n));
            const isCEO = (w.toLowerCase() === CEO_WALLET);
            const rate = isCEO ? 50 : 10;
            const pointsPerCycle = (tokens / 1000000) * rate;
            
            const shortW = w.slice(0,6) + "..." + w.slice(-4);
            const ceoTag = isCEO ? "👑" : "  ";
            console.log(`${shortW} ${ceoTag} | ${tokens.toLocaleString().padEnd(19)} | +${pointsPerCycle.toFixed(2)}`);
        } catch (e) {
            console.log(`${w.slice(0,6)}... | Errore lettura`);
        }
    }
    console.log("---------------------------------------------------------\n");
}
check();
