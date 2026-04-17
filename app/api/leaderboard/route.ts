import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    // 🛡️ Se Redis non è configurato o le chiavi mancano, restituiamo una classifica vuota
    if (!redis) {
      return NextResponse.json({ leaderboard: [] });
    }

    // Sintassi corretta per Upstash: zrange con rev: true
    const rawData = await redis.zrange('leaderboard', 0, 99, { 
      rev: true, 
      withScores: true 
    });
    
    const leaderboard = [];
    // Upstash restituisce un array di oggetti o coppie a seconda della versione
    // Questa logica gestisce il formato standard [member, score, member, score]
    if (Array.isArray(rawData)) {
      for (let i = 0; i < rawData.length; i += 2) {
        leaderboard.push({
          address: rawData[i],
          points: parseInt(rawData[i + 1] as string, 10),
        });
      }
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard API Error:', error);
    return NextResponse.json({ leaderboard: [] });
  }
}
