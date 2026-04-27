const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function restore() {
    console.log("🛡️ VERIFICA E RIPRISTINO DEL TOP HOLDER...");
    
    const REAL_USER = "0xdd10e79aef463D71cfF79bAdD033a32f93Bd8E3A".toLowerCase();
    const USER_POINTS = 6644.4184; // I punti esatti che aveva

    const exists = await redis.zscore('leaderboard:points', REAL_USER);
    const globalIndex = parseFloat(await redis.get('rewards:global_index') || "0.000000499747");

    if (!exists) {
        console.log("⚠️ L'utente era stato cancellato! Lo sto ripristinando...");
        await redis.zadd('leaderboard:points', { score: USER_POINTS, member: REAL_USER });
        
        const correctPending = USER_POINTS * globalIndex;
        await redis.set(`rewards:pending:${REAL_USER}`, correctPending.toString());
        await redis.set(`rewards:user_index:${REAL_USER}`, globalIndex.toString());
        
        console.log(`✅ Utente ripristinato con successo: ${USER_POINTS} Punti e ${correctPending.toFixed(6)} BNB.`);
    } else {
        console.log("✅ L'utente è già al sicuro nel database. Nessun danno fatto.");
    }
    
    process.exit(0);
}
restore();
