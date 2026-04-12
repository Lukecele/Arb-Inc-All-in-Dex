import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508' }}>
      
      {/* 1. A-Ads Banner Superiore */}
      <div style={{ 
        width: '100%', 
        backgroundColor: '#0a0a0f', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        padding: '10px 0'
      }}>
        <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99 }}>
          <iframe 
            data-aa='2433982' 
            src='//acceptable.a-ads.com/2433982/?size=Adaptive' 
            style={{ 
              border: 0, 
              padding: 0, 
              width: '100%', 
              maxWidth: '970px', 
              height: '90px', 
              overflow: 'hidden', 
              display: 'block', 
              margin: 'auto' 
            }}
          />
        </div>
      </div>

      {/* 2. Pulsante Accattivante FaucetPay */}
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '20px 0',
        background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)'
      }}>
        <a 
          href="https://faucetpay.io/?r=5296764" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#0052ff', // Colore FaucetPay
            backgroundImage: 'linear-gradient(45deg, #0052ff, #00a3ff)',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 0 20px rgba(0, 82, 255, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 82, 255, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 82, 255, 0.4)';
          }}
        >
          <span style={{ fontSize: '22px' }}>⚡</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.9 }}>Withdrawal Partner</span>
            <span>GET A FAUCETPAY WALLET</span>
          </div>
        </a>
      </div>

      {/* 3. Il DEX originale */}
      <HomePageClient />
      
    </main>
  )
}
