import { NextRequest, NextResponse } from 'next/server';

const PORTALS_API_BASE = 'https://api.portals.fi/v2';
const PORTALS_API_KEY = process.env.PORTALS_API_KEY ?? '';

export async function POST(req: NextRequest) {
  try {
    const { vaultId, amount, tokenIn, sender, feeRecipient, feePercentage } = await req.json();

    if (!vaultId || !amount || !tokenIn || !sender) {
      return NextResponse.json({ error: 'Parametri mancanti: vaultId, amount, tokenIn, sender' }, { status: 400 });
    }

    // Controlla approvazione (solo per ERC-20, non per BNB nativo)
    let approveTx: object | null = null;
    if (tokenIn !== '0x0000000000000000000000000000000000000000') {
      const approvalUrl = new URL(`${PORTALS_API_BASE}/approval`);
      approvalUrl.searchParams.set('sender', sender);
      approvalUrl.searchParams.set('inputToken', `bsc:${tokenIn}`);
      approvalUrl.searchParams.set('inputAmount', amount);
      const approvalRes = await fetch(approvalUrl.toString(), {
        headers: { Authorization: `Bearer ${PORTALS_API_KEY}`, 'Content-Type': 'application/json' },
      });
      if (approvalRes.ok) {
        const approvalData = await approvalRes.json();
        if (approvalData?.context?.shouldApprove && approvalData?.tx) {
          approveTx = approvalData.tx;
        }
      }
    }

    // Costruisci deposito
    const portalUrl = new URL(`${PORTALS_API_BASE}/portal`);
    portalUrl.searchParams.set('sender', sender);
    portalUrl.searchParams.set('inputToken', `bsc:${tokenIn}`);
    portalUrl.searchParams.set('inputAmount', amount);
    portalUrl.searchParams.set('outputToken', vaultId);
    portalUrl.searchParams.set('slippageTolerancePercentage', '1');
    if (feeRecipient && feePercentage) {
      portalUrl.searchParams.set('feeRecipient', feeRecipient);
      portalUrl.searchParams.set('feeBps', String(feePercentage));
    }

    const portalRes = await fetch(portalUrl.toString(), {
      headers: { Authorization: `Bearer ${PORTALS_API_KEY}`, 'Content-Type': 'application/json' },
    });

    if (!portalRes.ok) {
      const errText = await portalRes.text();
      return NextResponse.json({ error: `Portals API error: ${portalRes.status}`, detail: errText }, { status: 502 });
    }

    const portalData = await portalRes.json();
    return NextResponse.json({ approveTx, tx: portalData.tx, context: portalData.context });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Errore sconosciuto' }, { status: 500 });
  }
}
