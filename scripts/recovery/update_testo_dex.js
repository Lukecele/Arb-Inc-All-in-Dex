const fs = require("fs");
const file = "/home/luca/progetti/arb-inc/app/rewards/RewardsClient.tsx";
let code = fs.readFileSync(file, "utf8");

// Usiamo una regex per ignorare eventuali spazi vuoti a inizio riga
const regex =
	/Points earned from <b>Swaps, Zaps, Limit Orders, Auto-Staking, Tasks, and Referrals<\/b> increase your share of the BNB collected from platform trading fees!<br\/>/g;

const nuovoTesto =
	"Boost your rank to increase your share of the BNB trading fees!<br/><br/><b>🟣 Active DEX Rewards:</b><br/>🔄 Swap: <b>+100 Pts</b> &nbsp;|&nbsp; ⚡ Zap: <b>+150 Pts</b> &nbsp;|&nbsp; 🎯 Limit Order: <b>+200 Pts</b><br/>";

if (regex.test(code)) {
	code = code.replace(regex, nuovoTesto);
	fs.writeFileSync(file, code);
	console.log("✅ Frontend (DEX Box) aggiornato con i nuovi punteggi!");
} else {
	console.log("⚠️ Testo non trovato. Forse ha una formattazione diversa?");
}
