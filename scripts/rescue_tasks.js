const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function rescue() {
    console.log("🚑 Inizio missione di salvataggio punti...");
    
    const wallets = [
        "0x12469ba697d66e295b1142416b6b657d19ac8f8f",
        "0x510f4dcbe2063f95d64f25816a6fb27f0c6a255d"
    ];

    for (const w of wallets) {
        try {
            // Aggiungiamo 250 punti al loro score attuale
            const newScore = await redis.zincrby('leaderboard:points', 250, w);
            console.log(`✅ Rimborsati 250 Punti a ${w}. Nuovo totale: ${newScore}`);
        } catch (e) {
            console.error(`⚠️ Errore su ${w}:`, e.message);
        }
    }
    
    console.log("🎉 Giustizia è fatta! Punti rimborsati con successo.");
}
rescue();
