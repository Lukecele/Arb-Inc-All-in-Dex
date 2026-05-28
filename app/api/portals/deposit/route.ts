import { NextRequest, NextResponse } from 'next/server';

const PORTALS_API_BASE = 'https://api.portals.fi/v2';
const PORTALS_API_KEY = process.env.PORTALS_API_KEY ?? '';

export async function POST(req: NextRequest) {
  try {
    const { vaultId, amount, tokenIn, sender, feeRecipient, feePercentage } = await req.json();

    if (!vaultId || !amount || !tokenIn || !sender) {
      return NextResponse.json({ error: 'Parametri mancanti: vaultId, amount, tokenIn, sender' }, { status: 400 });
    }

    const isBNBNative = tokenIn === '0x0000000000000000000000000000000000000000';

    // ----------------------------------------------------------
    // 1. Controlla approvazione (solo per ERC-20, non BNB nativo)
    // ----------------------------------------------------------
    let approveTx: object | null = null;

    if (!isBNBNative) {
      const approvalUrl = new URL(`${PORTALS_API_BASE}/approval`);
      approvalUrl.searchParams.set('sender', sender);
      approvalUrl.searchParams.set('inputToken', `bsc:${tokenIn}`);
      approvalUrl.searchParams.set('inputAmount', amount); // in wei (già convertito lato client)

      const approvalRes = await fetch(approvalUrl.toString(), {
        headers: {
          Authorization: `Bearer ${PORTALS_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (approvalRes.ok) {
        const approvalData = await approvalRes.json();
        // Se context.shouldApprove === true, bisogna mandare prima la approve
        if (approvalData?.context?.shouldApprove && approvalData?.tx) {
          approveTx = approvalData.tx;
        }
      }
    }

    // ----------------------------------------------------------
    // 2. Costruisci la transazione di deposit via /v2/portal
    // ----------------------------------------------------------
    const portalUrl = new URL(`${PORTALS_API_BASE}/portal`);
    portalUrl.searchParams.set('sender', sender);
    portalUrl.searchParams.set('inputToken', isBNBNative ? 'bsc:0x0000000000000000000000000000000000000000' : `bsc:${tokenIn}`);
    portalUrl.searchParams.set('inputAmount', amount); // in wei
    portalUrl.searchParams.set('outputToken', vaultId); // es. "bsc:0x882C..."
    portalUrl.searchParams.set('slippageTolerancePercentage', '1');

    // Fee parametri (opzionali ma utili)
    if (feeRecipient && feePercentage) {
      portalUrl.searchParams.set('feeRecipient', feeRecipient);
      portalUrl.searchParams.set('feeBps', String(feePercentage)); // es. 100 = 1%
    }

    const portalRes = await fetch(portalUrl.toString(), {
      headers: {
        Authorization: `Bearer ${PORTALS_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!portalRes.ok) {
      const errText = await portalRes.text();
      console.error('[portals/deposit] Errore API Portals:', errText);
      return NextResponse.json({ error: `Portals API error: ${portalRes.status}`, detail: errText }, { status: 502 });
    }

    const portalData = await portalRes.json();

    return NextResponse.json({
      approveTx,          // null se non serve approve
      tx: portalData.tx,  // transazione deposit
      context: portalData.context,
    });
  } catch (err: any) {
    console.error('[portals/deposit] Errore interno:', err);
    return NextResponse.json({ error: err.message ?? 'Errore sconosciuto' }, { status: 500 });
  }
}
