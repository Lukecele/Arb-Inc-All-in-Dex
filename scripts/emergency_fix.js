const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

async function fix() {
    console.log("🛑 INIZIO FIX DI EMERGENZA...");
    
    try {
        const globalIndex = await redis.get('rewards:global_index') || "0";
        console.log(`Indice Globale attuale: ${globalIndex}`);

        const affectedWallets = [
            "0x75f7f06a5c5c440c1adbd586826cd26253ede219",
            "0x66bb01f14229e2179bad84d52a69c0e4628de63f",
            "0xdd10e79aef463d71cff79badd033a32f93bd8e3a",
            "0x3b523ec5ac7f37a151142b756040301729061348",
            "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7"
        ];

        for (const wallet of affectedWallets) {
            await redis.set(`rewards:user_index:${wallet.toLowerCase()}`, globalIndex);
            console.log(`✅ Falla chiusa per: ${wallet}`);
        }
        console.log("🎉 MESSA IN SICUREZZA COMPLETATA. Ricarica la pagina.");
    } catch (e) {
        console.error("❌ Errore:", e);
    }
    process.exit(0);
}
fix();
