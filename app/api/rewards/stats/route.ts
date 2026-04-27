import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet')?.toLowerCase();

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    // 1. Cerca l'utente nel database
    let points = await redis.zscore('leaderboard:points', wallet);

    // 2. IL FIX DEL RADAR: Se non esiste, lo inseriamo con 0 punti!
    if (points === null) {
      await redis.zadd('leaderboard:points', { score: 0, member: wallet });
      points = 0;
      console.log(`🎯 Nuovo Holder sul radar: ${wallet}`);
    }

    // 3. Calcolo dei dividendi BNB
    const globalIndex = parseFloat((await redis.get('rewards:global_index')) || '0');
    const userIndex = parseFloat((await redis.get(`rewards:user_index:${wallet}`)) || globalIndex.toString());
    
    // Assicuriamoci che l'userIndex sia salvato per i nuovi utenti
    if (await redis.get(`rewards:user_index:${wallet}`) === null) {
        await redis.set(`rewards:user_index:${wallet}`, globalIndex.toString());
    }

    const claimable = Number(points) * (globalIndex - userIndex);

    return NextResponse.json({ 
      points: Number(points), 
      claimable: Math.max(0, claimable) 
    });

  } catch (error) {
    console.error('Errore API Stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
