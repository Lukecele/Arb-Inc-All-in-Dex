import { NextRequest, NextResponse } from 'next/server';

const PORTALS_API_BASE = 'https://api.portals.fi/v2';
const PORTALS_API_KEY = process.env.PORTALS_API_KEY ?? '';
const FEE_RECIPIENT = '0xafF5340ECFaf7ce049261f193f5FED6BDF04E7';
const WITHDRAW_FEE_BPS = 50; // 0.5% fee sul prelievo

export async function POST(req: NextRequest) {
  try {
    const { vaultId, amount, tokenIn, sender, feeRecipient, feePercentage } = await req.json();

    if (!vaultId || !amount || !tokenIn || !sender) {
      return NextResponse.json({ error: 'Parametri mancanti: vaultId, amount, tokenIn, sender' }, { status: 400 });
    }

    const isBNBNative = tokenIn === '0x0000000000000000000000000000000000000000';
    const inputToken = isBNBNative ? 'bsc:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : `bsc:${tokenIn}`;

    // Se il vaultId inizia con "bsc:" ma l'outputToken è un token reale (non un vault), è un prelievo → applichiamo la fee
    const isRedeem = vaultId.startsWith('bsc:') && !vaultId.includes('0xeeee');
    const effectiveFeeRecipient = isRedeem ? FEE_RECIPIENT : feeRecipient;
    const effectiveFeeBps = isRedeem ? WITHDRAW_FEE_BPS : (feePercentage || 0);

    const portalUrl = new URL(`${PORTALS_API_BASE}/portal`);
    portalUrl.searchParams.set('sender', sender);
    portalUrl.searchParams.set('inputToken', inputToken);
    portalUrl.searchParams.set('inputAmount', amount);
    portalUrl.searchParams.set('outputToken', vaultId);
    portalUrl.searchParams.set('slippageTolerancePercentage', '1');
    portalUrl.searchParams.set('validate', 'false');
    if (effectiveFeeRecipient && effectiveFeeBps) {
      portalUrl.searchParams.set('feeRecipient', effectiveFeeRecipient);
      portalUrl.searchParams.set('feeBps', String(effectiveFeeBps));
    }

    const portalRes = await fetch(portalUrl.toString(), {
      headers: { Authorization: `Bearer ${PORTALS_API_KEY}`, 'Content-Type': 'application/json' },
    });

    if (!portalRes.ok) {
      const errText = await portalRes.text();
      return NextResponse.json({ error: `Portals API error: ${portalRes.status}`, detail: errText }, { status: 502 });
    }

    const portalData = await portalRes.json();

    let approveTx: object | null = null;
    if (!isBNBNative) {
      try {
        const approvalUrl = new URL(`${PORTALS_API_BASE}/approval`);
        approvalUrl.searchParams.set('sender', sender);
        approvalUrl.searchParams.set('inputToken', inputToken);
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
      } catch (err) {
        console.error('Errore durante la richiesta di approvazione:', err);
      }
    }

    return NextResponse.json({ approveTx, tx: portalData.tx, context: portalData.context });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Errore sconosciuto' }, { status: 500 });
  }
}
