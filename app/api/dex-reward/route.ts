import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.json({ success: false, error: "Missing Redis config" }, { status: 500 });
    }

    const body = await req.json();
    const { userWallet, type, referrerWallet, txHash } = body;

    if (!userWallet) return NextResponse.json({ success: false, error: "No wallet" }, { status: 400 });

    // 🚨 SISTEMA ANTI-FARMING: Controlla se questa specifica transazione/ordine ha già ricevuto punti
    if (txHash) {
      // 'nx: true' significa "Salva solo se non esiste già"
      const isNewTransaction = await redis.set(`processed_tx:${txHash}`, 'true', { nx: true });
      if (!isNewTransaction) {
        console.log(`[BLOCCATO] Tentativo di claim doppio per tx/order: ${txHash}`);
        return NextResponse.json({ success: false, error: "Reward already claimed for this transaction" });
      }
    }

    let points = 0;
    if (type === 'swap') points = 100;
    if (type === 'zap') points = 150;
    if (type === 'limit') points = 200; // I 200 punti sudati!
    if (points === 0) return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

    // 1. Assegna punti base
    await redis.zincrby('leaderboard:points', points, userWallet);

    // 2. Assegna il bonus Referrer del 10%
    if (referrerWallet && referrerWallet !== userWallet) {
      const bonus = Math.floor(points * 0.10);
      if (bonus > 0) {
        await redis.zincrby('leaderboard:points', bonus, referrerWallet);
      }
    }

    return NextResponse.json({ success: true, pointsAdded: points });
  } catch (error) {
    console.error("Errore salvataggio punti:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
