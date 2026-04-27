require('dotenv').config();
const { Redis } = require('@upstash/redis');
const { ethers } = require('ethers');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const tokenAddress = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c";
const treasuryAddress = process.env.TREASURY_WALLET;

async function run() {
    console.log("🚀 Avvio Watcher...");
    try {
        // 1. GESTIONE DIVIDENDI BNB
        const currentBnb = parseFloat(ethers.formatEther(await provider.getBalance(treasuryAddress)));
        const lastSeenBnb = parseFloat(await redis.get("rewards:last_seen_bnb") || 0);
        const diff = currentBnb - lastSeenBnb;

        if (diff > 0) {
            const allData = await redis.zrange("leaderboard:points", 0, -1, { withScores: true });
            let totalPoints = 0;
            for (let i = 1; i < allData.length; i += 2) totalPoints += parseInt(allData[i]);

            if (totalPoints > 0) {
                const indexIncrement = diff / totalPoints;
                await redis.incrbyfloat("rewards:global_index", indexIncrement);
                console.log(`💰 Nuove tasse: +${diff.toFixed(6)} BNB.`);
            }
        }
        await redis.set("rewards:last_seen_bnb", currentBnb);

        // 2. STAKING VIRTUALE (2M+ TOKENS)
        const abi = ["function balanceOf(address) view returns (uint256)"];
        const contract = new ethers.Contract(tokenAddress, abi, provider);
        const wallets = await redis.zrange("leaderboard:points", 0, -1);

        for (const wallet of wallets) {
            const balance = await contract.balanceOf(wallet);
            const tokens = parseFloat(ethers.formatUnits(balance, 18));
            if (tokens >= 2000000) {
                const points = Math.floor((tokens / 1000000) * 1000);
                await redis.zincrby("leaderboard:points", points, wallet);
                console.log(`✨ ${wallet}: +${points} punti.`);
            }
        }
        console.log("🏁 Ciclo completato.");
    } catch (e) { console.error("Errore:", e); }
}
run();
