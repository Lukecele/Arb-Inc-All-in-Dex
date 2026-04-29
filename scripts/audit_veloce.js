const { Redis } = require('@upstash/redis');
require('dotenv').config({ path: './.env.local' });

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function audit() {
    console.log("🔍 --- AUDIT STATO ATTUALE ---");
    
    // 1. Quanti utenti ci sono in classifica?
    const count = await redis.zcard('leaderboard:points');
    console.log(`👥 Utenti in classifica: ${count}`);

    // 2. I primi 3 per vedere se i numeri sono alti (6k, 16k, etc.)
    const top = await redis.zrange('leaderboard:points', 0, 2, { rev: true, withScores: true });
    console.log("🏆 Top 3:", top);

    // 3. Il partner ha i punti?
    const p = await redis.zscore('leaderboard:points', '0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc');
    console.log(`💎 Punti Partner: ${p}`);

    process.exit();
}
audit();
