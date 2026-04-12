import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap, zap, and provide liquidity on BSC.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '40px' }}>
      
      {/* 1. TOP PROMO BAR (Impossibile non vederla) */}
      <a 
        href="https://idealistic-revenue.com/8YeCXW" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          backgroundColor: '#f59e0b', // Arancione BTC
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 'bold',
          zIndex: 10000,
          textDecoration: 'none',
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}
      >
        <span style={{ marginRight: '10px' }}>🚀</span> 
        SPECIAL REWARD: CLAIM YOUR FREE DAILY BTC NOW! 
        <span style={{ marginLeft: '10px', backgroundColor: '#000', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>CLICK HERE</span>
      </a>

      {/* Il DEX originale */}
      <HomePageClient />

      {/* 2. FLOATING BUTTON con animazione Pulse */}
      <a 
        href="https://idealistic-revenue.com/8YeCXW" 
        target="_blank" 
        rel="noopener noreferrer"
        className="reward-button"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}
      >
        <div style={{
          backgroundColor: '#7c3aed',
          backgroundImage: 'linear-gradient(to right, #7c3aed, #4f46e5)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(124, 58, 237, 0.8)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          animation: 'pulse 2s infinite'
        }}>
          <span style={{ fontSize: '24px' }}>🎁</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Instant Reward</span>
            <span style={{ fontSize: '18px', fontWeight: '900' }}>GET FREE BTC</span>
          </div>
        </div>

        {/* CSS inline per l'animazione pulse */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(124, 58, 237, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
          }
        `}} />
      </a>
    </main>
  )
}
