const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function clean() {
    console.log("🧹 Arrotondamento punti in corso...");
    const allWallets = await redis.zrange('leaderboard:points', 0, -1, { withScores: true });
    
    for (let i = 0; i < allWallets.length; i += 2) {
        const w = allWallets[i];
        const score = parseFloat(allWallets[i+1]);
        const cleanScore = Math.round(score);
        
        await redis.zadd('leaderboard:points', { score: cleanScore, member: w });
    }
    console.log("✨ Fatto! Decimali eliminati con successo.");
}
clean();
