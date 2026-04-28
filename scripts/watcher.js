const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

if (!process.env.UPSTASH_REDIS_REST_URL) process.exit(1);

const redis = new Redis({ 
    url: process.env.UPSTASH_REDIS_REST_URL, 
    token: process.env.UPSTASH_REDIS_REST_TOKEN 
});

// ✅ INDIRIZZO CORRETTO (Quello che vede i tuoi 4M di token)
const TOKEN_CONTRACT_ADDRESS = "0x56a640954939768ad660686940860089201a9908".toLowerCase();
const REAL_TREASURY_WALLET = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f".toLowerCase();
const CEO_WALLET = "0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7".toLowerCase();

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const MIN_HOLDING = 2000000n * (10n ** 9n);
const SAFE_FACTOR = 0.50; 

async function watch() {
    console.log(`\n🕒 [${new Date().toLocaleTimeString()}] Ciclo di controllo...`);
    try {
        const balance = await provider.getBalance(ethers.getAddress(REAL_TREASURY_WALLET));
        const lastBalanceStr = await redis.get('rewards:last_balance');
        const lastBalance = lastBalanceStr ? BigInt(lastBalanceStr) : balance;
        const allWallets = await redis.zrange('leaderboard:points', 0, -1);

        if (balance > lastBalance) {
            const diff = parseFloat(ethers.formatEther(balance - lastBalance));
            const toDistribute = diff * SAFE_FACTOR;
            let realTotalPoints = 0;
            const scores = {};
            for (const w of allWallets) {
                const pts = parseFloat(await redis.zscore('leaderboard:points', w) || "0");
                scores[w] = pts;
                realTotalPoints += pts;
            }
            if (realTotalPoints > 0) {
                for (const w of allWallets) {
                    if (scores[w] > 0) {
                        const share = scores[w] / realTotalPoints;
                        const earned = toDistribute * share;
                        const pending = parseFloat(await redis.get(`rewards:pending:${w}`) || "0");
                        await redis.set(`rewards:pending:${w}`, (pending + earned).toString());
                    }
                }
            }
        }
        await redis.set('rewards:last_balance', balance.toString());

        const abi = ["function balanceOf(address) view returns (uint256)"];
        const contract = new ethers.Contract(ethers.getAddress(TOKEN_CONTRACT_ADDRESS), abi, provider);

        for (const w of allWallets) {
            if (w.toLowerCase() === REAL_TREASURY_WALLET || w.toLowerCase() === TOKEN_CONTRACT_ADDRESS) continue;
            try {
                const currentPoints = parseFloat(await redis.zscore('leaderboard:points', w) || "0");
                const holding = await contract.balanceOf(ethers.getAddress(w));
                const lastHoldingStr = await redis.get(`rewards:last_holding:${w}`);
                const lastHolding = lastHoldingStr ? BigInt(lastHoldingStr) : holding;
                
                let status = await redis.get(`rewards:status:${w}`) || "diamond";

                if (holding < lastHolding) {
                    status = "paper";
                } else if (holding >= MIN_HOLDING) {
                    status = "diamond";
                }

                let updatedPoints = currentPoints;
                if (status === "paper") {
                    updatedPoints = currentPoints * 0.95;
                } else if (status === "diamond" && holding >= MIN_HOLDING) {
                    // 👑 CEO MULTIPLIER (50 invece di 10)
                    const rate = (w.toLowerCase() === CEO_WALLET) ? 50 : 10;
                    updatedPoints += ((Number(holding / (10n ** 9n)) / 1000000) * rate);
                }

                await redis.set(`rewards:status:${w}`, status);
                await redis.set(`rewards:last_holding:${w}`, holding.toString());
                await redis.zadd('leaderboard:points', { score: updatedPoints, member: w });
            } catch (e) { continue; }
        }
        console.log(`🏁 Ciclo completato con indirizzo corretto.`);
    } catch (e) { console.error("Errore Watcher:", e.message); }
    setTimeout(watch, 15 * 60 * 1000);
}
watch();
