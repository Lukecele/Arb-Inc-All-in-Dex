import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VIP Rewards & Arbitrage Tools | Arbitrage Inception',
  description: 'Exclusive earning resources for our community. Get free crypto and trading signals.',
}

export default function RewardsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: 'auto' }}>
        
        {/* Header - Fa sentire l'utente un "VIP" dopo lo shortlink */}
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', borderBottom: '1px solid #8B5CF6' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#8B5CF6' }}>💎 VIP REWARDS HUB</h1>
          <p style={{ color: '#94a3b8' }}>Benvenuto! Hai sbloccato l'accesso alle migliori risorse di guadagno del web.</p>
        </div>

        {/* 1. PUBBLICITÀ (A-Ads) - Guadagni subito all'apertura */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
           <iframe data-aa='2433982' src='//acceptable.a-ads.com/2433982/?size=Adaptive' style={{ border:0, padding:0, width:'100%', maxWidth:'728px', height:'90px', overflow:'hidden', backgroundColor: 'transparent' }}></iframe>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* 2. SEZIONE FAUCETS (I tuoi Referral) */}
          <section style={{ backgroundColor: '#0a0a0f', padding: '25px', borderRadius: '15px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#10b981' }}>🔥 Top Paying Sites (Daily Claims)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Item FaucetPay */}
              <a href="https://faucetpay.io/?r=5296764" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827', padding: '15px', borderRadius: '10px', textDecoration: 'none', color: 'white', border: '1px solid #1e293b' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>FaucetPay Wallet</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Il miglior micro-wallet per prelevare dai faucet.</div>
                </div>
                <div style={{ backgroundColor: '#0052ff', padding: '8px 15px', borderRadius: '5px', fontSize: '12px' }}>JOIN NOW</div>
              </a>

              {/* Item adBTC (Qui metti il tuo ref di adBTC) */}
              <a href="#" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827', padding: '15px', borderRadius: '10px', textDecoration: 'none', color: 'white', border: '1px solid #1e293b' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>adBTC.top</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Guadagna Satoshi guardando siti (come stai facendo ora).</div>
                </div>
                <div style={{ backgroundColor: '#d97706', padding: '8px 15px', borderRadius: '5px', fontSize: '12px' }}>EARN BTC</div>
              </a>

            </div>
          </section>

          {/* 3. SEZIONE TRADING & AIRDROPS */}
          <section style={{ backgroundColor: '#0a0a0f', padding: '25px', borderRadius: '15px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#3b82f6' }}>📈 Premium Trading Tools</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '15px' }}>Usa questi exchange partner per fare arbitraggio con le commissioni più basse.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
               <a href="#" style={{ textAlign: 'center', padding: '15px', backgroundColor: '#111827', borderRadius: '10px', border: '1px solid #1e293b', textDecoration: 'none', color: 'white' }}>Binance Ref</a>
               <a href="#" style={{ textAlign: 'center', padding: '15px', backgroundColor: '#111827', borderRadius: '10px', border: '1px solid #1e293b', textDecoration: 'none', color: 'white' }}>ByBit Ref</a>
            </div>
          </section>

        </div>

        {/* Footer - Ritorno al DEX */}
        <div style={{ marginTop: '50px', textAlign: 'center', opacity: 0.6 }}>
          <a href="/" style={{ color: '#8B5CF6', textDecoration: 'none' }}>← Back to Arbitrage Inception DEX</a>
        </div>
      </div>
    </main>
  )
}
