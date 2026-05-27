const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function restoreLeaderboard() {
    console.log("🔍 AVVIO RECUPERO WALLETS PER LA LEADERBOARD...");
    try {
        let wallets = new Set();
        
        // Cerca i wallet nei referral_mappings
        const mappings = await redis.hkeys("referral_mappings");
        if (mappings) {
            mappings.forEach(w => wallets.add(w.toLowerCase()));
            const values = await redis.hvals("referral_mappings");
            values.forEach(w => wallets.add(w.toLowerCase()));
        }

        // Cerca nei referral_codes
        const codes = await redis.hkeys("referral_codes");
        if (codes) {
            codes.forEach(w => wallets.add(w.toLowerCase()));
        }

        // Cerca in user_volume
        const volumes = await redis.hkeys("user_volume");
        if (volumes) {
            volumes.forEach(w => wallets.add(w.toLowerCase()));
        }

        console.log(`📋 Trovati in totale ${wallets.size} wallets unici dallo storico.`);
        
        if (wallets.size > 0) {
            console.log("Reinserendo i wallet nella leaderboard con punteggio 0...");
            for (const w of wallets) {
                await redis.zadd("leaderboard:points", { score: 0, member: w });
            }
            console.log("✅ Leaderboard ripopolata con tutti i wallet a 0 punti!");
        } else {
            console.log("Nessun wallet trovato nello storico per ripopolare la leaderboard.");
        }

    } catch (error) {
        console.error("❌ ERRORE:", error);
    }
    process.exit(0);
}

restoreLeaderboard();
