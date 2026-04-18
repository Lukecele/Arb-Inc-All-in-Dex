import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.json({ leaderboard: [] });
    }

    // Prende i primi 100 utenti con i punteggi più alti, ordinati dal più alto al più basso
    const data = await redis.zrange('leaderboard:points', 0, 99, { rev: true, withScores: true });
    
    const leaderboard = [];
    // Upstash restituisce un array piatto: [wallet1, punti1, wallet2, punti2...]
    for (let i = 0; i < data.length; i += 2) {
      leaderboard.push({
        address: data[i],
        points: Number(data[i + 1])
      });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Errore fetch leaderboard:", error);
    return NextResponse.json({ leaderboard: [] });
  }
}
