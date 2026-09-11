const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { Redis } = require("@upstash/redis");

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function recover() {
	console.log("🛠️ Recupero dei wallet smarriti...");
	let cursor = 0;
	let count = 0;

	do {
		// Cerchiamo tutti i wallet nei record dei fondi pending
		const res = await redis.scan(cursor, {
			match: "rewards:pending:*",
			count: 100,
		});
		cursor = res[0];
		const keys = res[1];

		for (const key of keys) {
			const w = key.replace("rewards:pending:", "");

			// Se non sono in classifica, li rimettiamo a zero
			const exists = await redis.zscore("leaderboard:points", w);
			if (exists === null) {
				await redis.zadd("leaderboard:points", { score: 0, member: w });
				count++;
			}
		}
	} while (cursor !== 0 && cursor !== "0");

	console.log("---------------------------------------------------------");
	console.log(`✅ Recuperati e reinseriti ${count} wallet nella classifica!`);
	console.log(
		"⏱️ Al prossimo giro, il Watcher li vedrà tutti e ricalcolerà i loro punti in automatico.",
	);
	console.log("---------------------------------------------------------");
}

recover();
