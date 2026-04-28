const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

if (!process.env.UPSTASH_REDIS_REST_URL) process.exit(1);

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

const TOKEN_CONTRACT_ADDRESS = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c".toLowerCase();
const REAL_TREASURY_WALLET = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f".toLowerCase();
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const MIN_HOLDING = 2000000n * (10n ** 9n);
const SAFE_FACTOR = 0.50; 

async function watch() {
    console.log(`\n🕒 [${new Date().toLocaleTimeString()}] Ciclo di controllo...`);
    try {
        const balance = await provider.getBalance(ethers.getAddress(REAL_TREASURY_WALLET));
        const lastBalanceStr = await redis.get('rewards:last_balance') || "0";
        const lastBalance = BigInt(lastBalanceStr);
        let globalIndex = parseFloat(await redis.get('rewards:global_index') || "0");

        if (balance > lastBalance) {
            const diff = parseFloat(ethers.formatEther(balance - lastBalance));
            const totalPointsStr = await redis.get('leaderboard:total_points_sum:global');
            let totalPointsGlobal = parseFloat(totalPointsStr || "7000");
            if (totalPointsGlobal < 100) totalPointsGlobal = 7000; 

            globalIndex += (diff * SAFE_FACTOR) / totalPointsGlobal;
            await redis.set('rewards:global_index', globalIndex.toString());
            console.log(`📈 Dividendi: ${diff.toFixed(6)} BNB. Nuovo Index: ${globalIndex}`);
        }
        await redis.set('rewards:last_balance', balance.toString());

        const allWallets = await redis.zrange('leaderboard:points', 0, -1);
        let newGlobalTotalPoints = 0;
        const abi = ["function balanceOf(address) view returns (uint256)"];
        const contract = new ethers.Contract(ethers.getAddress(TOKEN_CONTRACT_ADDRESS), abi, provider);

        for (const wallet of allWallets) {
            const walletLower = wallet.toLowerCase();
            if (walletLower === REAL_TREASURY_WALLET || walletLower === TOKEN_CONTRACT_ADDRESS) continue;

            try {
                const currentPoints = parseFloat(await redis.zscore('leaderboard:points', walletLower) || "0");
                const userIndex = parseFloat(await redis.get(`rewards:user_index:${walletLower}`) || globalIndex);
                const currentPending = parseFloat(await redis.get(`rewards:pending:${walletLower}`) || "0");

                // 1. Applichiamo i BNB guadagnati finora
                const earned = currentPoints * (globalIndex - userIndex);
                if (earned > 0) {
                    await redis.set(`rewards:pending:${walletLower}`, (currentPending + earned).toString());
                }

                // 2. Controllo Status Diamond / Paper
                const holding = await contract.balanceOf(ethers.getAddress(walletLower));
                const lastHoldingStr = await redis.get(`rewards:last_holding:${walletLower}`);
                
                // Se è la prima volta che lo leggiamo, non lo puniamo subito
                const lastHolding = lastHoldingStr ? BigInt(lastHoldingStr) : holding; 
                
                let status = await redis.get(`rewards:status:${walletLower}`) || "diamond";

                if (holding < lastHolding) {
                    status = "paper";
                    console.log(`🩸 ${walletLower} ha venduto! Status: PAPER HANDS.`);
                } else if (holding > lastHolding && holding >= MIN_HOLDING) {
                    status = "diamond";
                    console.log(`💎 ${walletLower} ha comprato! Status: DIAMOND HANDS.`);
                }

                let updatedPoints = currentPoints;

                if (status === "paper") {
                    // MALUS: Perde il 5% dei punti correnti
                    updatedPoints = currentPoints * 0.95;
                    console.log(`📉 Malus 5% applicato a ${walletLower}. Punti attuali: ${updatedPoints.toFixed(2)}`);
                } else if (status === "diamond" && holding >= MIN_HOLDING) {
                    // PREMIO: 10 pt per Milione
                    const millionsHeld = Number(holding / (10n ** 9n)) / 1000000;
                    updatedPoints += (millionsHeld * 10);
                }

                // Salviamo le modifiche per il prossimo giro
                await redis.set(`rewards:status:${walletLower}`, status);
                await redis.set(`rewards:last_holding:${walletLower}`, holding.toString());
                await redis.zadd('leaderboard:points', { score: updatedPoints, member: walletLower });
                await redis.set(`rewards:user_index:${walletLower}`, globalIndex.toString());
                
                newGlobalTotalPoints += updatedPoints;
            } catch (e) { continue; }
        }
        await redis.set('leaderboard:total_points_sum:global', newGlobalTotalPoints.toString());
        console.log(`🏁 Ciclo completato. Totale Punti Globali: ${newGlobalTotalPoints.toFixed(2)}`);
    } catch (e) { console.error("Errore Watcher:", e.message); }
    setTimeout(watch, 15 * 60 * 1000);
}
watch();
