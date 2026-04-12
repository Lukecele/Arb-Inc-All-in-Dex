import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap, zap, and provide liquidity on BSC.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', paddingTop: '40px' }}>
      
      {/* TOP PROMO BAR - Più discreta */}
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
          backgroundColor: '#8B5CF6', // Viola come il brand
          color: '#fff',
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
        <span style={{ marginRight: '10px' }}>💎</span> 
        PROMOTIONAL: COLLECT YOUR DAILY REWARD
        <span style={{ marginLeft: '10px', backgroundColor: '#fff', color: '#8B5CF6', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>COLLECT</span>
      </a>

      <HomePageClient />

      {/* FLOATING BUTTON - Stile Faucet/Reward */}
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
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid #8B5CF6',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          animation: 'pulse 2s infinite'
        }}>
          <span style={{ fontSize: '24px' }}>💰</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#8B5CF6' }}>Community</span>
            <span style={{ fontSize: '16px', fontWeight: '800' }}>REWARD HUB</span>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); border-color: #fff; }
            100% { transform: scale(1); }
          }
        `}} />
      </a>
    </main>
  )
}
