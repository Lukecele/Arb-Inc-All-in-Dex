import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL || "",
	token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	let wallet = searchParams.get("wallet")?.toLowerCase();
  if (!wallet || !isAddress(wallet)) return NextResponse.json({ error: "Invalid Ethereum address" }, { status: 400 });
  wallet = getAddress(wallet).toLowerCase();
	const ref = searchParams.get("ref")?.toLowerCase(); // L'indirizzo di chi ha invitato

	if (!wallet) {
		return NextResponse.json(
			{ error: "Wallet address required" },
			{ status: 400 },
		);
	}

	try {
		let points = await redis.zscore("leaderboard:points", wallet);

		// 1. REGISTRAZIONE NUOVO UTENTE (se non esiste)
		if (points === null) {
			await redis.zadd("leaderboard:points", { score: 0, member: wallet });
			points = 0;
		}

		// 2. LOGICA REFERRAL UNIVERSALE (Sia nuovi che vecchi utenti)
		// Se c'è un referrer nell'URL e non è l'utente stesso...
		if (ref && ref !== wallet && isAddress(ref)) {
			// Controlliamo se l'utente ha GIÀ un "padre" per non sovrascriverlo
			const hasParent = await redis.get(`ref:parent:${wallet}`);

			// Se NON ha un padre, lo leghiamo a chi lo ha invitato ORA
			if (!hasParent) {
				await redis.set(`ref:parent:${wallet}`, ref);
				await redis.sadd(`ref:children:${ref}`, wallet);
				console.log(`🔗 Referral Universale: ${wallet} si è legato a ${ref}`);
			}
		}

		// 3. RECUPERO STATISTICHE REFERRAL PER LA DASHBOARD
		const referralCount = (await redis.scard(`ref:children:${wallet}`)) || 0;
		const referralEarnings = (await redis.get(`ref:earnings:${wallet}`)) || 0;

		// --- LOGICA REWARDS ESISTENTE ---
		const globalIndex = parseFloat(
			String((await redis.get("rewards:global_index")) || "0"),
		);
		let userIndexStr = await redis.get(`rewards:user_index:${wallet}`);

		if (userIndexStr === null) {
			userIndexStr = globalIndex.toString();
			await redis.set(`rewards:user_index:${wallet}`, userIndexStr);
		}

		const userIndex = parseFloat(String(userIndexStr));
		const pendingBnb = parseFloat(
			String((await redis.get(`rewards:pending:${wallet}`)) || "0"),
		);
		const currentClaimable = Number(points) * (globalIndex - userIndex);
		const totalClaimable = pendingBnb + Math.max(0, currentClaimable);

		return NextResponse.json({
			points: Number(points),
			claimable: totalClaimable,
			referralCount: Number(referralCount),
			referralEarnings: Number(referralEarnings),
		});
	} catch (error) {
		console.error("Stats Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
