const { Redis } = require("@upstash/redis");
require("dotenv").config({ path: "./.env.local" });

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function run() {
	const count = await redis.zcard("leaderboard:points");
	const allUsers = await redis.zrange("leaderboard:points", 0, -1);
	console.log("-----------------------------------");
	console.log(`👥 Utenti totali in Leaderboard: ${count}`);
	console.log("-----------------------------------");
	console.log("Ultimi wallet registrati:");
	console.log(allUsers.slice(-5)); // Mostra gli ultimi 5
	process.exit();
}
run();
