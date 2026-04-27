const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

// 🔥 SINTASSI ETHERS V5
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TOKEN_ADDRESS = "0xafF5340Ecfaf7cE049261CfF193F5FEd6BDf04e7";
const TREASURY_WALLET = "0xdd10e79aef463D71cfF79bAdD033a32f93Bd8E3A";
const MIN_HOLDING = ethers.BigNumber.from("2000000").mul(ethers.BigNumber.from(10).pow(9));

async function watch() {
    console.log("🚀 Avvio Watcher (Ethers V5 Mode)...");
    try {
        const balance = await provider.getBalance(TREASURY_WALLET);
        const lastBalance = ethers.BigNumber.from(await redis.get('rewards:last_balance') || "0");
        
        let globalIndex = parseFloat(await redis.get('rewards:global_index') || "0");

        if (balance.gt(lastBalance)) {
            const diff = parseFloat(ethers.utils.formatEther(balance.sub(lastBalance)));
            const totalPointsGlobal = parseFloat(await redis.get('leaderboard:total_points_sum:global') || "1");
            globalIndex += diff / totalPointsGlobal;
            await redis.set('rewards:global_index', globalIndex.toString());
            await redis.set('rewards:last_balance', balance.toString());
            console.log(`📈 Nuove tasse! Global Index: ${globalIndex}`);
        }

        const allWallets = await redis.zrange('leaderboard:points', 0, -1);
        let newGlobalTotalPoints = 0;

        for (const wallet of allWallets) {
            const walletLower = wallet.toLowerCase();
            const currentPoints = parseFloat(await redis.zscore('leaderboard:points', walletLower) || "0");
            const userIndex = parseFloat(await redis.get(`rewards:user_index:${walletLower}`) || globalIndex.toString());
            const currentPending = parseFloat(await redis.get(`rewards:pending:${walletLower}`) || "0");

            const earned = currentPoints * (globalIndex - userIndex);
            await redis.set(`rewards:pending:${walletLower}`, (currentPending + Math.max(0, earned)).toString());

            const abi = ["function balanceOf(address) view returns (uint256)"];
            const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);
            const holding = await contract.balanceOf(walletLower);
            
            let updatedPoints = currentPoints;
            if (holding.gte(MIN_HOLDING)) {
                const dailyReward = holding.div(ethers.BigNumber.from(10).pow(9)).toNumber() / 100000;
                updatedPoints += dailyReward;
            }

            await redis.zadd('leaderboard:points', { score: updatedPoints, member: walletLower });
            await redis.set(`rewards:user_index:${walletLower}`, globalIndex.toString());
            newGlobalTotalPoints += updatedPoints;
        }

        await redis.set('leaderboard:total_points_sum:global', newGlobalTotalPoints.toString());
        console.log("🏁 Ciclo completato.");
    } catch (e) {
        console.error("❌ Errore:", e);
    }
    process.exit(0);
}
watch();
