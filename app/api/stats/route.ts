import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
});

// Cache abilitata: esegue il calcolo solo 1 volta al minuto per non pesare sul DB
export const revalidate = 60;

export async function GET() {
  try {
    // 1. Punti Globali
    const globalPoints = await redis.get('leaderboard:total_points_sum:global');
    let displayPoints = "109,980+";
    if (globalPoints) {
      const numPoints = Number(globalPoints);
      if (!isNaN(numPoints) && numPoints > 0) {
        displayPoints = numPoints.toLocaleString('en-US', { maximumFractionDigits: 0 }) + "+";
      }
    }

    // 2. Calcolo Debito Totale / Pending BNB (basato su health_check.js)
    let totalPending = 0;
    const wallets = await redis.zrange('leaderboard:points', 0, -1);
    
    if (wallets && wallets.length > 0) {
      // Per non intasare l'API di Upstash, facciamo query a blocchi di 100
      const chunkSize = 100;
      for (let i = 0; i < wallets.length; i += chunkSize) {
          const chunk = wallets.slice(i, i + chunkSize);
          const keys = chunk.map(w => `rewards:pending:${w}`);
          if (keys.length > 0) {
              const values = await redis.mget(...keys);
              for (const val of values) {
                  if (val) totalPending += parseFloat(String(val));
              }
          }
      }
    }

    return NextResponse.json({ 
      totalPoints: displayPoints,
      totalPending: totalPending.toFixed(4), 
      protocolDebt: totalPending.toFixed(4)
    });
    
  } catch (error) {
    console.error("API Stats Error:", error);
    return NextResponse.json({ 
      totalPoints: "109,980+", 
      totalPending: "0.0000",
      protocolDebt: "0.0000"
    });
  }
}
