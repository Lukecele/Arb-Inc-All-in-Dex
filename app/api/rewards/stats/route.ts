import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet')?.toLowerCase();
  const ref = searchParams.get('ref')?.toLowerCase(); // L'indirizzo di chi ha invitato

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    let points = await redis.zscore('leaderboard:points', wallet);
    
    // 1. REGISTRAZIONE NUOVO UTENTE + REFERRAL
    if (points === null) {
      await redis.zadd('leaderboard:points', { score: 0, member: wallet });
      points = 0;

      // Se c'è un referrer e non è l'utente stesso
      if (ref && ref !== wallet && ref.startsWith('0x')) {
        // Controlliamo se l'utente ha già un "padre" (per evitare sovrascritture)
        const hasParent = await redis.get(`ref:parent:${wallet}`);
        if (!hasParent) {
          await redis.set(`ref:parent:${wallet}`, ref);
          await redis.sadd(`ref:children:${ref}`, wallet); // Aggiunge il figlio alla lista del padre
          console.log(`🔗 Referral: ${wallet} invitato da ${ref}`);
        }
      }
    }

    // 2. RECUPERO STATISTICHE REFERRAL
    const referralCount = await redis.scard(`ref:children:${wallet}`) || 0;
    const referralEarnings = await redis.get(`ref:earnings:${wallet}`) || 0;

    // --- LOGICA REWARDS ESISTENTE ---
    const globalIndex = parseFloat(String(await redis.get('rewards:global_index') || '0'));
    let userIndexStr = await redis.get(`rewards:user_index:${wallet}`);
    
    if (userIndexStr === null) {
        userIndexStr = globalIndex.toString();
        await redis.set(`rewards:user_index:${wallet}`, userIndexStr);
    }

    const userIndex = parseFloat(String(userIndexStr));
    const pendingBnb = parseFloat(String(await redis.get(`rewards:pending:${wallet}`) || '0'));
    const currentClaimable = Number(points) * (globalIndex - userIndex);
    const totalClaimable = pendingBnb + Math.max(0, currentClaimable);

    return NextResponse.json({ 
      points: Number(points), 
      claimable: totalClaimable,
      referralCount: Number(referralCount),
      referralEarnings: Number(referralEarnings)
    });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
