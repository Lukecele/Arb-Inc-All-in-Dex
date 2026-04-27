const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function migrate() {
    console.log("🚀 ATTIVAZIONE LAUNCH MODE (50% Riserva di Sicurezza)...");
    
    const TOTAL_TREASURY = 0.0088; 
    const LAUNCH_DISTRIBUTION = TOTAL_TREASURY * 0.50; // Distribuiamo solo lo 0.0044

    try {
        const allWallets = await redis.zrange('leaderboard:points', 0, -1);
        const globalIndex = await redis.get('rewards:global_index') || "0";
        let totalPoints = 0;
        const walletData = [];

        for (const wallet of allWallets) {
            const points = parseFloat(await redis.zscore('leaderboard:points', wallet) || "0");
            if (points > 0) {
                totalPoints += points;
                walletData.push({ wallet: wallet.toLowerCase(), points });
            }
        }

        if (totalPoints === 0) return process.exit(0);

        const offsetPerPoint = LAUNCH_DISTRIBUTION / totalPoints;
        const newUserIndex = parseFloat(globalIndex) - offsetPerPoint;

        for (const data of walletData) {
            await redis.set(`rewards:pending:${data.wallet}`, "0");
            await redis.set(`rewards:user_index:${data.wallet}`, newUserIndex.toString());
            
            const currentShow = data.points * (parseFloat(globalIndex) - newUserIndex);
            console.log(`✅ ${data.wallet}: ${currentShow.toFixed(6)} BNB (Stato: Blindato)`);
        }

        console.log(`\n💰 Promesso agli utenti: ${LAUNCH_DISTRIBUTION.toFixed(6)} BNB`);
        console.log(`🛡️ Riserva per Gas e Crescita Punti: ${(TOTAL_TREASURY - LAUNCH_DISTRIBUTION).toFixed(6)} BNB`);
    } catch (e) { console.error(e); }
    process.exit(0);
}
migrate();
