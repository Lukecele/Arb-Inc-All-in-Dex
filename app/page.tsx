import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates.',
  keywords: ['DeFi', 'BSC', 'Arbitrage', 'DEX Aggregator'],
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Il cuore del DEX */}
      <HomePageClient />

      {/* Pulsante Direct Link forzato in primo piano */}
      <a 
        href="https://idealistic-revenue.com/8YeCXW" 
        target="_blank" 
        rel="noopener noreferrer"
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
          padding: '12px 20px',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(124, 58, 237, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}>
          <span style={{ fontSize: '24px' }}>🎁</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em', opacity: 0.8, textTransform: 'uppercase' }}>Daily Reward</span>
            <span style={{ fontSize: '16px', fontWeight: '800' }}>CLAIM BTC</span>
          </div>
        </div>
      </a>
    </main>
  )
}
