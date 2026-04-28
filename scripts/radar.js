const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
const MY_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7";

async function scan() {
    console.log(`📡 RADAR ATTIVO. Sto sorvegliando il wallet: ${MY_WALLET}...`);
    let lastPoints = await redis.zscore('leaderboard:points', MY_WALLET) || "0";
    
    setInterval(async () => {
        try {
            const currentPoints = await redis.zscore('leaderboard:points', MY_WALLET) || "0";
            if (currentPoints !== lastPoints) {
                const diff = parseFloat(currentPoints) - parseFloat(lastPoints);
                console.log(`🚨 [${new Date().toLocaleTimeString()}] INTRUSIONE RILEVATA! Punti modificati: ${diff > 0 ? '+' : ''}${diff.toFixed(2)}. Totale ora: ${currentPoints}`);
                lastPoints = currentPoints;
            }
        } catch (e) {}
    }, 3000);
}
scan();
