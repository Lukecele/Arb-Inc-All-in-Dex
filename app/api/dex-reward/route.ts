import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Forza la connessione con le variabili esatte
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      console.error("ERRORE CRITICO: Variabili Redis non trovate in Vercel!");
      return NextResponse.json({ success: false, error: "Missing Redis config" }, { status: 500 });
    }

    const body = await req.json();
    const { userWallet, type, referrerWallet } = body;

    if (!userWallet) return NextResponse.json({ success: false, error: "No wallet" }, { status: 400 });

    // Punti base a seconda dell'azione
    let points = 0;
    if (type === 'swap') points = 100;
    if (type === 'zap') points = 150;
    if (type === 'limit') points = 200;
    if (points === 0) return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

    // 1. Assegna punti all'utente
    await redis.zincrby('leaderboard:points', points, userWallet);

    // 2. Assegna il bonus del 10% al Referrer (se esiste)
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
