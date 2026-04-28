const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TOKEN_CONTRACT = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c".toLowerCase();
const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();
const abi = ["function balanceOf(address) view returns (uint256)"];

async function resetEsatto() {
    console.log("🧹 Resetting leaderboard to exact cycle values (Bonus CEO: 50)...");
    const contract = new ethers.Contract(TOKEN_CONTRACT, abi, provider);
    
    await redis.del('leaderboard:points');

    let cursor = 0;
    const wallets = new Set();
    do {
        const res = await redis.scan(cursor, { match: 'rewards:pending:*', count: 100 });
        cursor = res[0];
        res[1].forEach(key => wallets.add(key.replace('rewards:pending:', '')));
    } while (cursor !== 0 && cursor !== "0");

    for (const w of wallets) {
        try {
            const holding = await contract.balanceOf(w);
            const tokens = Number(holding / (10n ** 9n));
            
            // ✅ Ripristinato il bonus originale a 50
            const rate = (w.toLowerCase() === CEO_WALLET) ? 50 : 10;
            const initialPoints = (tokens / 1000000) * rate;

            if (initialPoints > 0) {
                await redis.zadd('leaderboard:points', { score: initialPoints, member: w });
            }
        } catch (e) { continue; }
    }
    console.log("✅ Classifica resettata con Bonus CEO a 50.");
}
resetEsatto();
