import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VIP Rewards | Arbitrage Inception',
  description: 'Guadagna crypto gratis con i nostri partner selezionati.',
}

export default function RewardsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white' }}>
      
      {/* 1. Navigazione di Ritorno */}
      <nav style={{ 
        width: '100%', 
        padding: '15px 20px', 
        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>VIP HUB</span>
        <a href="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '14px', 
          backgroundColor: '#1f2937', 
          padding: '8px 16px', 
          borderRadius: '8px',
          border: '1px solid #374151'
        }}>
          ← Torna al DEX
        </a>
      </nav>

      <div style={{ maxWidth: '800px', margin: 'auto', padding: '40px 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>💎 AREA PREMI ESCLUSIVA</h1>
          <p style={{ color: '#94a3b8' }}>Usa i link qui sotto per accumulare crypto e finanziare i tuoi swap!</p>
        </div>

        {/* Banner Pubblicitario */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
           <iframe data-aa='2433982' src='//acceptable.a-ads.com/2433982/?size=Adaptive' style={{ border:0, padding:0, width:'100%', maxWidth:'728px', height:'90px', overflow:'hidden', backgroundColor: 'transparent' }}></iframe>
        </div>

        {/* Lista dei Guadagni */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* adBTC - LINK REALE AGGIORNATO */}
          <a href="https://r.adbtc.top/2245084" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0f', padding: '20px', borderRadius: '15px', textDecoration: 'none', color: 'white', border: '1px solid #d97706' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#fbbf24' }}>adBTC.top</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Guadagna Bitcoin guardando siti web. Affidabile e veloce.</div>
            </div>
            <div style={{ backgroundColor: '#d97706', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>GUADAGNA ORA</div>
          </a>

          {/* FaucetPay */}
          <a href="https://faucetpay.io/?r=5296764" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0a0a0f', padding: '20px', borderRadius: '15px', textDecoration: 'none', color: 'white', border: '1px solid #0052ff' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#00d1ff' }}>FaucetPay Wallet</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>Il micro-wallet essenziale per ricevere pagamenti dai faucet.</div>
            </div>
            <div style={{ backgroundColor: '#0052ff', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}>ISCRIVITI</div>
          </a>

        </div>

        <div style={{ marginTop: '60px', textAlign: 'center', color: '#475569', fontSize: '12px' }}>
          © Arbitrage Inception - Tutti i link sono testati e sicuri.
        </div>
      </div>
    </main>
  )
}
