import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  // Il formato userid è: wallet--ref--referrer
  const userid = searchParams.get('userid') || '';
  const status = searchParams.get('status');
  const reward = searchParams.get('reward') || '0';

  const parts = userid.split('--ref--');
  const userWallet = parts[0];
  const referrerWallet = parts[1];

  const amt = Math.floor(parseFloat(reward) * 100);

  // 🛡️ Eseguiamo le operazioni Redis solo se la connessione esiste
  if (redis && userWallet && userWallet.startsWith('0x') && amt > 0) {
    try {
      // 1. Punti pieni all'utente
      await redis.zincrby('leaderboard:points', amt, userWallet);

      // 2. Bonus 10% al referrer (se esiste e non è l'utente stesso)
      if (referrerWallet && referrerWallet.startsWith('0x') && referrerWallet !== userWallet) {
        const bonus = Math.floor(amt * 0.1);
        if (bonus > 0) {
          await redis.zincrby('leaderboard:points', bonus, referrerWallet);
        }
      }
    } catch (err) {
      console.error("Postback Redis Error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
