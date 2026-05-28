import { NextResponse } from 'next/server';

const PORTALS_API_KEY = process.env.PORTALS_API_KEY ?? '';

export async function GET() {
  if (!PORTALS_API_KEY) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }
  try {
    const res = await fetch('https://api.portals.fi/v2/tokens?networks=bsc&sortBy=liquidity&sortDirection=desc&limit=100', {
      headers: { Authorization: `Bearer ${PORTALS_API_KEY}` },
    });
    const data = await res.json();
    const tokens = data?.tokens || [];
    // Filtra token con APY o liquidità significativa
    const vaults = tokens
      .filter((t: any) => (t.metrics?.apy > 0 || t.liquidity > 1000000) && t.symbol)
      .map((t: any) => ({
        id: t.key,
        name: t.name,
        symbol: t.symbol,
        address: t.address,
        apy: t.metrics?.apy || 0,
        tvl: t.liquidity || 0,
        platform: t.platform,
        token: t.tokens?.[0] || t.address,
        decimals: t.decimals || 18,
      }));
    return NextResponse.json(vaults);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vaults' }, { status: 500 });
  }
}
