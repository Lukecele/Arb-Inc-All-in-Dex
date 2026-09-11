const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });
const { Redis } = require("@upstash/redis");
const { ethers } = require("ethers");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";
const PRIVATE_KEY = process.env.TREASURY_PRIVATE_KEY;

async function payDebts() {
	console.log("🚀 AVVIO SCRIPT DI PAGAMENTO MASSIVO (PAY ALL DEBTS)...");

	if (!PRIVATE_KEY) {
		console.error("❌ ERRORE CRITICO: TREASURY_PRIVATE_KEY mancante nel file .env");
		process.exit(1);
	}

	const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
	const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

	console.log(`🏦 Wallet Titolare: ${wallet.address}`);
	
	try {
	    const balance = await provider.getBalance(wallet.address);
	    console.log(`💰 Saldo Disponibile On-Chain: ${ethers.utils.formatEther(balance)} BNB`);
	} catch (error) {
	    console.error("❌ ERRORE RPC:", error.message);
	    process.exit(1);
	}

	let cursor = 0;
	let pendingKeys = [];
	try {
        do {
            const result = await redis.scan(cursor, { match: "rewards:pending:*", count: 1000 });
            cursor = result[0];
            pendingKeys.push(...result[1]);
        } while (cursor !== 0 && cursor !== "0");
    } catch (error) {
         const allKeys = await redis.keys("rewards:pending:*");
         if (allKeys && allKeys.length > 0) pendingKeys = allKeys;
    }

	if (pendingKeys.length === 0) {
		console.log("🤷‍♂️ Nessun debito pendente.");
		process.exit(0);
	}

	let totSent = ethers.BigNumber.from(0);

	for (const key of pendingKeys) {
		const walletAddress = key.replace("rewards:pending:", "");
		const pendingStr = await redis.get(key);
		
		if (!pendingStr || parseFloat(pendingStr) <= 0) continue;
		
		let amountToPayText = parseFloat(pendingStr).toFixed(18).replace(/\.?0+$/, "");
		if (amountToPayText === "") amountToPayText = "0";
		if (parseFloat(amountToPayText) === 0) continue;

		const amountInWei = ethers.utils.parseEther(amountToPayText);

		if (!ethers.utils.isAddress(walletAddress)) {
			console.log(`⚠️ Ignorato: ${walletAddress}`);
			continue;
		}

		console.log(`🔄 Preparazione invio ${amountToPayText} BNB a ${walletAddress}...`);
		try {
			const tx = await wallet.sendTransaction({ to: walletAddress, value: amountInWei });
			await tx.wait(1); 
			await redis.set(key, "0");
			totSent = totSent.add(amountInWei);
		} catch (error) {
			console.error(`   ❌ Fallito invio a ${walletAddress}. Errore:`, error.message);
		}
	}
	console.log(`\n💸 Totale Erogato: ${ethers.utils.formatEther(totSent)} BNB`);
	process.exit(0);
}

payDebts().catch(error => {
	console.error("☠️ ERRORE SCRIPT:", error);
	process.exit(1);
});
