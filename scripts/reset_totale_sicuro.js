const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function reset() {
    console.log("💣 Avvio RESET TOTALE della classifica...");
    
    // 1. Cancelliamo la classifica sminchiata
    await redis.del('leaderboard:points');
    console.log("🗑️ Leaderboard eliminata.");

    // 2. Cancelliamo anche il flag del bonus (così partiamo puliti)
    await redis.del('bonus_partner_done');
    await redis.del('bonus_0x74a8_done');

    // 3. Inseriamo il partner con i suoi 1000 punti
    const partner = "0x74a8ea4126d0e099eb6a50d508e9be6d24d345cc";
    await redis.zadd('leaderboard:points', { score: 1000, member: partner });
    
    console.log(`✅ Reset completato. Partner ${partner} impostato a 1000 punti.`);
    console.log("🚀 Ora la classifica è pulita e pronta per i nuovi calcoli.");
    process.exit();
}

reset();
