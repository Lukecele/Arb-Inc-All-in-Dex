const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TREASURY_WALLET = "0xdd10e79aef463D71cfF79bAdD033a32f93Bd8E3A";
const SAFE_FACTOR = 0.80; // Distribuiamo solo l'80% delle nuove entrate

async function watch() {
    try {
        const balance = await provider.getBalance(TREASURY_WALLET);
        const lastBalance = ethers.BigNumber.from(await redis.get('rewards:last_balance') || "0");
        let globalIndex = parseFloat(await redis.get('rewards:global_index') || "0");

        if (balance.gt(lastBalance)) {
            const diff = parseFloat(ethers.utils.formatEther(balance.sub(lastBalance)));
            const totalPointsGlobal = parseFloat(await redis.get('leaderboard:total_points_sum:global') || "1");
            
            // Applichiamo il SAFE_FACTOR
            globalIndex += (diff * SAFE_FACTOR) / totalPointsGlobal;
            
            await redis.set('rewards:global_index', globalIndex.toString());
            await redis.set('rewards:last_balance', balance.toString());
            console.log(`📈 Index aggiornato con margine sicurezza: ${globalIndex}`);
        } else {
            // Aggiorniamo comunque se il bilancio scende (per i claim)
            await redis.set('rewards:last_balance', balance.toString());
        }
        
        // ... (resto della logica punti uguale a prima)
        console.log("🏁 Watcher V6 Pro completato.");
    } catch (e) { console.error(e); }
    process.exit(0);
}
watch();
