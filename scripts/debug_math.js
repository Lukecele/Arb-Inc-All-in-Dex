const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { Redis } = require('@upstash/redis');
const ethers = require('ethers');

const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
const TOKEN_CONTRACT_ADDRESS = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c".toLowerCase();

async function runDebug() {
    console.log("🕵️‍♂️ AVVIO DIAGNOSTICA MATEMATICA (SOLA LETTURA)...\n");
    const abi = ["function balanceOf(address) view returns (uint256)"];
    const contract = new ethers.Contract(ethers.getAddress(TOKEN_CONTRACT_ADDRESS), abi, provider);
    const allWallets = await redis.zrange('leaderboard:points', 0, -1);

    for (const w of allWallets) {
        if (w === "0x66bb01f14229e2179bad84d52a69c0e4628de63f" || w === TOKEN_CONTRACT_ADDRESS) continue;
        try {
            const holdingWei = await contract.balanceOf(ethers.getAddress(w));
            const tokenReali = Number(holdingWei / (10n ** 9n));
            const puntiBonus = (tokenReali / 1000000) * 10;
            
            console.log(`Wallet: ${w}`);
            console.log(`  - Saldo Reale: ${tokenReali.toLocaleString()} ARB-INC`);
            console.log(`  - Punti calcolati dal Watcher: +${puntiBonus.toFixed(2)} pt\n`);
        } catch (e) {}
    }
    console.log("🏁 Diagnostica completata. Nessun dato modificato nel database.");
    process.exit(0);
}
runDebug();
