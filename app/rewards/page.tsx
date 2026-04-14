import React from 'react'

export default function RewardsPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508', color: 'white' }}>
      
      {/* 1. Navigazione (Coerente con la Home) */}
      <nav style={{ 
        width: '100%', 
        padding: '20px 0', 
        textAlign: 'center', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px'
      }}>
        <a href="/" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '12px', textDecoration: 'none' }}>
          TRADING TERMINAL
        </a>
        <a href="/rewards" style={{ color: 'white', fontWeight: 'bold', letterSpacing: '1px', fontSize: '12px', textDecoration: 'none' }}>
          ECOSYSTEM REWARDS
        </a>
      </nav>

      {/* 2. Cointraffic Banner (Top) */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <span id="ct_cmykXXKHPsy"></span>
      </div>

      {/* 3. Contenuto Rewards */}
      <section style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '60px 20px', 
        textAlign: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          background: 'linear-gradient(to right, #8B5CF6, #D946EF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Ecosystem Rewards
        </h1>
        
        <p style={{ 
          color: 'rgba(255,255,255,0.6)', 
          fontSize: '18px', 
          lineHeight: '1.6',
          marginBottom: '40px' 
        }}>
          Earn passive income through our multi-chain arbitrage protocol. <br />
          Holders and stakers will receive a share of the aggregator's volume fees.
        </p>

        <div style={{ 
          padding: '40px', 
          border: '1px solid rgba(139, 92, 246, 0.3)', 
          borderRadius: '24px', 
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Rewards Dashboard</h2>
          <div style={{ 
            display: 'inline-block', 
            padding: '8px 16px', 
            borderRadius: '100px', 
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            color: '#A78BFA',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '20px'
          }}>
            Status: Under Development
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            We are finalizing the smart contracts for the automated distribution of fees. <br />
            The dashboard will be live shortly. Stay tuned to our official channels.
          </p>
        </div>
      </section>

      {/* 4. Cointraffic Banner (Bottom) */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0 80px 0' }}>
        <span id="ct_c83XILwXy4d"></span>
      </div>

    </main>
  )
}
