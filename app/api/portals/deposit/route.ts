import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.PORTALS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }

  const body = await request.json();
  const { vaultId, amount, tokenIn, feeRecipient, feePercentage } = body;

  if (!vaultId || !amount || !tokenIn || !feeRecipient) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const params = new URLSearchParams({
    vaultId,
    amount,
    tokenIn,
    network: 'bsc',
    feeRecipient,
    feePercentage: (feePercentage || 100).toString(),
    slippage: '0.5',
  });

  try {
    const res = await fetch(`https://api.portals.fi/v2/portal/deposit?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to build deposit tx' }, { status: 500 });
  }
}
