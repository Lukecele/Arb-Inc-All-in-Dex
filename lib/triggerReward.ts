export async function triggerDexReward(
  userWallet: string | undefined, 
  actionType: 'swap' | 'zap' | 'bridge' | 'limit-order', 
  txHash: string
) {
  if (!userWallet) return;

  try {
    // Pesca il padrino dal browser
    const referrer = typeof window !== 'undefined' ? localStorage.getItem('arb_inc_referrer') : null;

    // Spara i dati all'API che abbiamo creato prima
    const res = await fetch('/api/dex-reward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userWallet,
        referrerWallet: referrer,
        actionType,
        txHash
      })
    });

    if (res.ok) {
      console.log(`✅ [Arbitrage Inc] Punti accreditati per l'azione: ${actionType}`);
    } else {
      console.warn(`⚠️ [Arbitrage Inc] Server ha rifiutato i punti per ${actionType}`);
    }
  } catch (error) {
    console.error(`❌ [Arbitrage Inc] Errore di rete nel sistema reward`, error);
  }
}
