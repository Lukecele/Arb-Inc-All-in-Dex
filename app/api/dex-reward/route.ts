import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const { userWallet, type, referrerWallet } = await req.json();

    if (!userWallet) {
      return NextResponse.json({ error: 'Missing wallet' }, { status: 400 });
    }

    let points = 0;
    if (type === 'swap') points = 100;
    if (type === 'zap') points = 150;
    if (type === 'limit-order') points = 200;

    // 🛡️ CONTROLLO REDIS: Eseguiamo solo se la connessione esiste
    if (redis) {
      if (points > 0) {
        // 1. Punti all'utente
        await redis.zincrby('leaderboard', points, userWallet);

        // 2. Bonus al Padrino (10%)
        if (referrerWallet && referrerWallet.startsWith('0x') && referrerWallet !== userWallet) {
          const bonus = Math.floor(points * 0.1);
          if (bonus > 0) {
            await redis.zincrby('leaderboard', bonus, referrerWallet);
          }
        }
      }
    }

    return NextResponse.json({ success: true, points });
  } catch (error) {
    console.error('Reward API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
