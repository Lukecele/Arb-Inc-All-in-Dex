import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.PORTALS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.portals.fi/v2/vaults?network=bsc&limit=50', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vaults' }, { status: 500 });
  }
}
