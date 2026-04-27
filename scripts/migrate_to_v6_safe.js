const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function migrate() {
    console.log("🛡️ MIGRAZIONE CON RISERVA DI CRESCITA (70% Distribuzione)...");
    
    const TOTAL_TREASURY = 0.0088; 
    const SAFE_DISTRIBUTION = TOTAL_TREASURY * 0.70; // 0.00616 BNB distribuiti subito

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

        const offsetPerPoint = SAFE_DISTRIBUTION / totalPoints;
        const newUserIndex = parseFloat(globalIndex) - offsetPerPoint;

        for (const data of walletData) {
            // Non usiamo il 'pending' per ora, ma l'offset dell'indice 
            // così i BNB fluttuano se i punti cambiano!
            await redis.set(`rewards:pending:${data.wallet}`, "0");
            await redis.set(`rewards:user_index:${data.wallet}`, newUserIndex.toString());
            
            const currentShow = data.points * (parseFloat(globalIndex) - newUserIndex);
            console.log(`✅ ${data.wallet}: Mostra ${currentShow.toFixed(6)} BNB (Margine crescita attivo)`);
        }

        console.log(`\n💰 Totale Promesso: ${SAFE_DISTRIBUTION.toFixed(6)} BNB`);
        console.log(`⛽ Riserva Gas + Crescita: ${(TOTAL_TREASURY - SAFE_DISTRIBUTION).toFixed(6)} BNB`);
    } catch (e) { console.error(e); }
    process.exit(0);
}
migrate();
