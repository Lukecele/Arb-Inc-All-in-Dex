import React from 'react'

export default function RewardsPage() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#050508', 
      color: 'white', 
      fontFamily: 'sans-serif',
      padding: '40px 20px' 
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
          Arbitrage Rewards
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', textAlign: 'center' }}>
          Complete simple tasks to earn credits instantly for your trading account.
        </p>

        {/* CONTENITORE OFFER WALL CPAGRIP */}
        <div style={{ 
          width: '100%', 
          height: '900px', 
          backgroundColor: '#ffffff', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(139, 92, 246, 0.2)',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <iframe 
            src="https://www.cpagrip.com/view.php?id=1890760" 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Offers"
          />
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            *Rewards are processed via CPAGrip. Make sure to disable AdBlock to see all offers.
          </p>
          <div style={{ marginTop: '20px' }}>
            <a href="/" style={{ color: '#8B5CF6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
              ← Back to Terminal
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
