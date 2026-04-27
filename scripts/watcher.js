const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { Redis } = require('@upstash/redis');
const { ethers } = require('ethers');

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TOKEN_ADDRESS = "0xafF5340Ecfaf7cE049261CfF193F5FEd6BDf04e7"; // Il tuo token
const TREASURY_WALLET = "0xdd10e79aef463D71cfF79bAdD033a32f93Bd8E3A"; // Treasury
const MIN_HOLDING = 2000000n * 10n**9n; // 2M con 9 decimali

async function watch() {
    console.log("🚀 Avvio Watcher V5 (MasterChef Vault System)...");

    try {
        // 1. Calcolo del Global Index (Tasse nuove)
        const balance = await provider.getBalance(TREASURY_WALLET);
        const lastBalance = BigInt(await redis.get('rewards:last_balance') || "0");
        const totalPoints = parseFloat(await redis.zcard('leaderboard:points') === 0 ? "1" : await redis.zscore('leaderboard:total_global_points', 'all') || "1");
        
        let globalIndex = parseFloat(await redis.get('rewards:global_index') || "0");

        if (balance > lastBalance) {
            const diff = Number(ethers.formatEther(balance - lastBalance));
            const totalPointsGlobal = await redis.zscore('leaderboard:total_points_sum', 'global') || 1;
            globalIndex += diff / parseFloat(totalPointsGlobal);
            await redis.set('rewards:global_index', globalIndex.toString());
            await redis.set('rewards:last_balance', balance.toString());
            console.log(`📈 Nuove tasse! Global Index aggiornato: ${globalIndex}`);
        }

        // 2. Aggiornamento Wallet per Wallet
        const allWallets = await redis.zrange('leaderboard:points', 0, -1);
        let newGlobalTotalPoints = 0;

        for (const wallet of allWallets) {
            const walletLower = wallet.toLowerCase();
            
            // --- LOGICA DI CONGELAMENTO (VAULT) ---
            const currentPoints = parseFloat(await redis.zscore('leaderboard:points', walletLower) || "0");
            const userIndex = parseFloat(await redis.get(`rewards:user_index:${walletLower}`) || globalIndex.toString());
            const currentPending = parseFloat(await redis.get(`rewards:pending:${walletLower}`) || "0");

            // Calcola quanto ha guadagnato con i VECCHI punti e lo mette nel "salvadanaio"
            const earned = currentPoints * (globalIndex - userIndex);
            const newPending = currentPending + Math.max(0, earned);
            await redis.set(`rewards:pending:${walletLower}`, newPending.toString());

            // --- AGGIORNAMENTO PUNTI HOLDING ---
            const abi = ["function balanceOf(address) view returns (uint256)"];
            const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);
            const holding = await contract.balanceOf(walletLower);
            
            let updatedPoints = currentPoints;
            if (holding >= MIN_HOLDING) {
                const dailyReward = Number(holding / 10n**9n) / 100000; 
                updatedPoints += dailyReward; // Esempio: assegna punti in base all'hold
                console.log(`✨ ${walletLower}: +${dailyReward.toFixed(2)} pt (Hold stimato)`);
            }

            // --- RESET LINEA DI PARTENZA ---
            await redis.zadd('leaderboard:points', { score: updatedPoints, member: walletLower });
            await redis.set(`rewards:user_index:${walletLower}`, globalIndex.toString());
            
            newGlobalTotalPoints += updatedPoints;
        }

        await redis.set('rewards:total_points_sum:global', newGlobalTotalPoints.toString());
        console.log("🏁 Ciclo completato in sicurezza.");

    } catch (e) {
        console.error("❌ Errore Watcher:", e);
    }
    process.exit(0);
}

watch();
