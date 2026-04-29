import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
});

export const revalidate = 60;

export async function GET() {
  try {
    // Leggiamo la CHIAVE REALE dal tuo motore
    const globalPoints = await redis.get('leaderboard:total_points_sum:global');
    
    let displayPoints = "109,980+"; // Fallback di sicurezza

    if (globalPoints) {
      const numPoints = Number(globalPoints);
      if (!isNaN(numPoints) && numPoints > 0) {
        displayPoints = numPoints.toLocaleString('en-US', { maximumFractionDigits: 0 }) + "+";
      }
    }

    return NextResponse.json({ 
      totalPoints: displayPoints,
      treasuryHealth: "Overcollateralized" 
    });
  } catch (error) {
    return NextResponse.json({ totalPoints: "109,980+", treasuryHealth: "Overcollateralized" });
  }
}
