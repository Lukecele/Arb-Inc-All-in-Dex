const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function pulizia() {
    console.log("🧹 Inizio pulizia del database corrotto...");
    
    // Eliminiamo SOLO la classifica dei punti. 
    // I BNB e gli status (diamond/paper) rimangono intatti.
    await redis.del('leaderboard:points');
    
    console.log("✅ Tabellone punti AZZERATO con successo!");
    console.log("⏱️ Al prossimo ciclo del Watcher, i punti ripartiranno calcolati alla perfezione.");
}

pulizia();
