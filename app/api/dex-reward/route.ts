import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request: Request) {
  try {
    // Riceviamo i dati dal frontend
    const { userWallet, referrerWallet, actionType, txHash } = await request.json();

    if (!userWallet || !userWallet.startsWith('0x')) {
      return NextResponse.json({ error: 'Wallet non valido' }, { status: 400 });
    }

    // Listino Punti per Azione
    const pointsMap: Record<string, number> = {
      'swap': 100,
      'zap': 150,
      'limit-order': 200,
      'bridge': 500
    };

    const points = pointsMap[actionType] || 0;

    if (points > 0) {
      // 1. Diamo i punti a chi ha fatto lo Swap
      await redis.zincrby('leaderboard', points, userWallet);

      // 2. Se l'utente era stato invitato, diamo il 10% di bonus al Padrino
      if (referrerWallet && referrerWallet.startsWith('0x') && referrerWallet !== userWallet) {
        const bonus = points * 0.10;
        await redis.zincrby('leaderboard', bonus, referrerWallet);
      }

      console.log(`🔥 DEX Reward: ${userWallet} ha ottenuto ${points} punti per un ${actionType}.`);
      return NextResponse.json({ success: true, pointsAdded: points });
    }

    return NextResponse.json({ error: 'Azione non riconosciuta' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Errore server' }, { status: 500 });
  }
}
