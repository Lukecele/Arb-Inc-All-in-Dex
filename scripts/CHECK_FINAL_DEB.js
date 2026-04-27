const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function runCheck() {
    console.log("\n🔍 --- ISPEZIONE FINALE PROTOCOLLO ARB-INC ---");
    
    const globalIndex = await redis.get('rewards:global_index');
    const totalPoints = await redis.get('leaderboard:total_points_sum:global');
    const treasury = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f".toLowerCase();
    const topUser = "0xdd10e79aef463D71cfF79bAdD033a32f93Bd8E3A".toLowerCase();

    console.log(`📡 Global Index: ${globalIndex}`);
    console.log(`📊 Punti Globali Totali: ${totalPoints}`);

    // 1. Check Top User
    console.log("\n👤 CONTROLLO TOP HOLDER (0xdd10...):");
    const pointsUser = await redis.zscore('leaderboard:points', topUser);
    const pendingUser = await redis.get(`rewards:pending:${topUser}`) || "0";
    const userIdx = await redis.get(`rewards:user_index:${topUser}`);
    
    if (pointsUser) {
        console.log(`   ✅ Punti: ${pointsUser}`);
        console.log(`   💰 Pending BNB: ${parseFloat(pendingUser).toFixed(6)}`);
        console.log(`   📍 User Index: ${userIdx}`);
    } else {
        console.log("   ❌ ERRORE: Top user non trovato in classifica!");
    }

    // 2. Check Treasury
    console.log("\n🏦 CONTROLLO TREASURY (0x66BB...):");
    const pointsTreasury = await redis.zscore('leaderboard:points', treasury);
    if (pointsTreasury) {
        console.log(`   ❌ ERRORE: Il Treasury è ancora in classifica con ${pointsTreasury} punti!`);
    } else {
        console.log("   ✅ Treasury correttamente escluso dalla classifica.");
    }

    // 3. Verifica Classifica Top 3
    console.log("\n🏆 TOP 3 HOLDER ATTUALI:");
    const top3 = await redis.zrange('leaderboard:points', 0, 2, { rev: true, withScores: true });
    for (let i = 0; i < top3.length; i += 2) {
        const wallet = top3[i];
        const score = top3[i+1];
        const bal = await redis.get(`rewards:pending:${wallet.toLowerCase()}`) || "0";
        console.log(`   ${(i/2)+1}. ${wallet}: ${parseFloat(score).toFixed(2)} pts -> ${parseFloat(bal).toFixed(6)} BNB`);
    }

    console.log("\n----------------------------------------------");
    process.exit(0);
}
runCheck();
