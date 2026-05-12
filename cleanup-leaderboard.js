require("dotenv").config({ path: ".env.local" });
const { Redis } = require("@upstash/redis");
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
const ETH_REGEX = /^0x[0-9a-f]{40}$/;
async function run() {
  const data = await redis.zrange("leaderboard:points", 0, -1, { withScores: true });
  const wallets = [];
  for (let i = 0; i < data.length; i += 2) wallets.push({ address: String(data[i]), points: Number(data[i+1]) });
  console.log("\nTOTALE WALLET:", wallets.length);
  const valid = wallets.filter(w => ETH_REGEX.test(w.address));
  const invalid = wallets.filter(w => !ETH_REGEX.test(w.address));
  console.log("\n WALLET REALI (non toccati):", valid.length);
  valid.forEach(w => console.log("  " + w.address + "  " + w.points.toFixed(2) + " pts"));
  console.log("\n WALLET FALSI da rimuovere:", invalid.length);
  invalid.forEach(w => console.log("  [" + w.points + " pts] " + w.address.slice(0, 80)));
  if (invalid.length === 0) { console.log("\nLeaderboard gia pulita.\n"); return; }
  if (process.argv[2] !== "--confirm") { console.log("\nEsegui: node cleanup-leaderboard.js --confirm\n"); return; }
  for (const w of invalid) {
    await redis.zrem("leaderboard:points", w.address);
    await redis.del("rewards:pending:" + w.address);
    await redis.del("rewards:last_holding:" + w.address);
    await redis.del("rewards:status:" + w.address);
    await redis.del("rewards:user_index:" + w.address);
    await redis.del("ref:parent:" + w.address);
    await redis.del("ref:children:" + w.address);
    await redis.del("ref:earnings:" + w.address);
    console.log("  Rimosso: " + w.address.slice(0, 80));
  }
  console.log("\nFatto. Wallet reali intatti.\n");
}
run().catch(console.error);
