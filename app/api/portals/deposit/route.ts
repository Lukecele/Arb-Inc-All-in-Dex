import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

const PORTALS_API_BASE = 'https://api.portals.fi/v2';
const PORTALS_API_KEY = process.env.PORTALS_API_KEY ?? '';

export async function POST(req: NextRequest) {
  try {
    const { vaultId, amount, tokenIn, sender, feeRecipient, feePercentage } = await req.json();

    if (!vaultId || !amount || !tokenIn || !sender) {
      return NextResponse.json({ error: 'Parametri mancanti: vaultId, amount, tokenIn, sender' }, { status: 400 });
    }

    // Costruisci la transazione di deposito PRIMA di tutto (ci serve per ottenere lo spender)
    const portalUrl = new URL(`${PORTALS_API_BASE}/portal`);
    portalUrl.searchParams.set('sender', sender);
    portalUrl.searchParams.set('inputToken', `bsc:${tokenIn}`);
    portalUrl.searchParams.set('inputAmount', amount);
    portalUrl.searchParams.set('outputToken', vaultId);
    portalUrl.searchParams.set('slippageTolerancePercentage', '1');
    portalUrl.searchParams.set('validate', 'false');
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

    // Per token ERC-20, forza sempre l'approvazione (se manca la generiamo noi)
    let approveTx: object | null = null;

    if (tokenIn !== '0x0000000000000000000000000000000000000000') {
      // 1) Prova a ottenere l'approvazione da Portals
      try {
        const approvalUrl = new URL(`${PORTALS_API_BASE}/approval`);
        approvalUrl.searchParams.set('sender', sender);
        approvalUrl.searchParams.set('inputToken', `bsc:${tokenIn}`);
        approvalUrl.searchParams.set('inputAmount', amount);

        const approvalRes = await fetch(approvalUrl.toString(), {
          headers: { Authorization: `Bearer ${PORTALS_API_KEY}`, 'Content-Type': 'application/json' },
        });
        if (approvalRes.ok) {
          const approvalData = await approvalRes.json();
          if (approvalData?.tx) {
            approveTx = approvalData.tx;
          }
        }
      } catch (err) {
        console.error('Errore durante la richiesta di approvazione:', err);
      }

      // 2) Se Portals non ha restituito una approve, costruiscila manualmente
      if (!approveTx) {
        const spender = portalData?.tx?.to || portalData?.context?.target;
        if (spender) {
          const iface = new ethers.utils.Interface(['function approve(address spender, uint256 amount)']);
          const data = iface.encodeFunctionData('approve', [spender, amount]);
          approveTx = {
            to: tokenIn,
            data: data,
            value: '0',
          };
        }
      }
    }

    return NextResponse.json({
      approveTx,          // ora sempre presente per ERC-20
      tx: portalData.tx,
      context: portalData.context,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Errore sconosciuto' }, { status: 500 });
  }
}
