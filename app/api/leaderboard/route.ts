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

    // withScores: true restituisce i dati. Nelle nuove versioni è un array di oggetti!
    const data = await redis.zrange('leaderboard:points', 0, 99, { rev: true, withScores: true });
    
    // LA SOLUZIONE: Diciamo a TypeScript esattamente cosa ci sarà in questo array
    let leaderboard: Array<{ address: string; points: number }> = [];
    
    if (data && data.length > 0) {
      // Se Upstash ci dà un array di oggetti: [{ member: '0x...', score: 100 }]
      if (typeof data[0] === 'object' && data[0] !== null) {
        leaderboard = data.map((item: any) => ({
          address: String(item.member || item.id || item.value || "Unknown"),
          points: Number(item.score)
        }));
      } 
      // Se Upstash ci dà un array piatto (vecchio stile): ['0x...', 100]
      else {
        for (let i = 0; i < data.length; i += 2) {
          leaderboard.push({
            address: String(data[i]),
            points: Number(data[i + 1])
          });
        }
      }
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Errore fetch leaderboard:", error);
    return NextResponse.json({ leaderboard: [] });
  }
}
