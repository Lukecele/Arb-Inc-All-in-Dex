const { Redis } = require('@upstash/redis');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
    console.error("❌ ERRORE: Chiavi Redis non trovate in .env o .env.local");
    process.exit(1);
}

const redis = new Redis({ url, token });

async function run() {
    console.log("🎁 AVVIO OPERAZIONE GENEROSITÀ SUPREMA...");

    const LIVE_BALANCE = 0.0331; 
    const TARGET_UTILIZATION = 0.40; 
    const TARGET_DEBT = LIVE_BALANCE * TARGET_UTILIZATION;
    
    let currentDebt = 0;
    const wallets = await redis.zrange('leaderboard:points', 0, -1);
    
    for (const w of wallets) {
        const p = parseFloat(await redis.get(`rewards:pending:${w}`) || "0");
        currentDebt += p;
    }

    const AMOUNT_TO_INJECT = TARGET_DEBT - currentDebt;

    if (AMOUNT_TO_INJECT <= 0) {
        console.log(`✅ Il debito (${currentDebt.toFixed(6)}) è già sopra il target (${TARGET_DEBT.toFixed(6)}).`);
        process.exit(0);
    }

    console.log(`💰 Debito attuale: ${currentDebt.toFixed(6)} BNB`);
    console.log(`🎯 Target (40%): ${TARGET_DEBT.toFixed(6)} BNB`);
    console.log(`💉 Iniezione totale: ${AMOUNT_TO_INJECT.toFixed(6)} BNB`);

    const totalPointsStr = await redis.get('leaderboard:total_points_sum:global');
    const totalPoints = parseFloat(totalPointsStr);

    if (!totalPoints || totalPoints <= 0) {
        console.error("❌ Errore: Punti globali non trovati o pari a zero.");
        process.exit(1);
    }

    for (const w of wallets) {
        const points = parseFloat(await redis.zscore('leaderboard:points', w));
        if (points > 0) {
            const share = points / totalPoints;
            const bonus = AMOUNT_TO_INJECT * share;
            
            const currentPending = parseFloat(await redis.get(`rewards:pending:${w}`) || "0");
            await redis.set(`rewards:pending:${w}`, (currentPending + bonus).toString());
        }
    }

    console.log("🚀 OPERAZIONE COMPLETATA: Il debito è ora al 40% del bilancio!");
    process.exit(0);
}
run();
