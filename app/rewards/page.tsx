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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Banner UNICO 1 */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 30px 0', minHeight: '250px' }}>
          <span id="ct_cmykXXKHPsy"></span>
        </div>

        <h1 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: 'bold' }}>Ecosystem Rewards</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
          Explore our partner ecosystem to maximize your crypto earnings and trading efficiency.
        </p>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '20px', color: '#8B5CF6', marginBottom: '10px' }}>Daily Crypto Faucet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>Earn Bitcoin by interacting with our verified advertising partner.</p>
            <a href="https://r.adbtc.top/3494539" target="_blank" style={{ display: 'inline-block', backgroundColor: '#8B5CF6', color: 'white', padding: '10px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Access Portal</a>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '20px', color: '#0052ff', marginBottom: '10px' }}>Micro-Wallet Integration</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>Connect your FaucetPay account to receive instant micro-payments.</p>
            <a href="https://faucetpay.io/?r=5296764" target="_blank" style={{ display: 'inline-block', backgroundColor: '#0052ff', color: 'white', padding: '10px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Claim Rewards</a>
          </div>
        </div>

        {/* Banner UNICO 2 */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0', minHeight: '250px' }}>
          <span id="ct_c83XILwXy4d"></span>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Back to Trading Terminal</a>
        </div>
      </div>
    </main>
  )
}
