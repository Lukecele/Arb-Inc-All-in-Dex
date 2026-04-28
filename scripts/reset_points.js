const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function resetPoints() {
    console.log("🧹 INIZIO PULIZIA CLASSIFICA DOPATA...");
    
    try {
        const wallets = await redis.zrange('leaderboard:points', 0, -1);
        
        for (const w of wallets) {
            await redis.zadd('leaderboard:points', { score: 0, member: w });
            console.log(`✅ Punti azzerati per: ${w}`);
        }
        
        await redis.set('leaderboard:total_points_sum:global', "0");
        console.log("🚀 Classifica resettata con successo! I BNB pending sono salvi.");
        console.log("⏳ Al prossimo giro il Watcher assegnerà i 20 punti corretti a chi ha 2M di token.");
        
    } catch (error) {
        console.error("Errore durante il reset:", error);
    }
}

resetPoints();
