import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
});

const TOKEN_ADDRESS = "0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c".toLowerCase();
const REWARD_TAX_PERCENTAGE = 4.0; 

export async function GET() {
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`, { 
        next: { revalidate: 60 }
    });
    
    const textData = await res.text();
    let data;
    try { 
        data = JSON.parse(textData); 
    } catch (e) {
        return NextResponse.json({ apr: "0.00" }); 
    }

    if (!data || !data.pairs || data.pairs.length === 0) {
       return NextResponse.json({ apr: "0.00" });
    }

    const pair = data.pairs[0];
    const volume24hUsd = parseFloat(pair.volume?.h24 || "0");
    const tokenPriceUsd = parseFloat(pair.priceUsd || "0");

    if (tokenPriceUsd === 0) return NextResponse.json({ apr: "0.00" });

    const dailyRewardsUsd = volume24hUsd * (REWARD_TAX_PERCENTAGE / 100);
    const yearlyRewardsUsd = dailyRewardsUsd * 365;

    const wallets = await redis.zrange('leaderboard:points', 0, -1);
    let totalParticipatingTokens = 0;

    if (wallets && wallets.length > 0) {
        const keys = wallets.map(w => `rewards:last_holding:${w}`);
        const holdings = await redis.mget(...keys);
        
        for (const h of holdings) {
            // 🛡️ FIX: Controlla che h esista e non sia "null" prima di fare conti matematici
            if (h && h !== "null" && String(h).trim() !== "") {
                try {
                    totalParticipatingTokens += Number(BigInt(String(h))) / (10 ** 9);
                } catch (e) {
                    // Ignora silenziosamente portafogli con dati corrotti
                }
            }
        }
    }

    const totalParticipatingUsd = totalParticipatingTokens * tokenPriceUsd;

    let globalApr = 0;
    if (totalParticipatingUsd > 0) {
        globalApr = (yearlyRewardsUsd / totalParticipatingUsd) * 100;
    }

    if (globalApr > 9999999) globalApr = 9999999;

    return NextResponse.json({ 
        apr: globalApr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        metrics: {
            volume24h: volume24hUsd,
            dailyRewardsUsd: dailyRewardsUsd,
            participatingUsd: totalParticipatingUsd
        }
    });

  } catch (error: any) {
    console.error("❌ Errore API APR Globale:", error);
    return NextResponse.json({ apr: "0.00" }, { status: 200 }); 
  }
}
