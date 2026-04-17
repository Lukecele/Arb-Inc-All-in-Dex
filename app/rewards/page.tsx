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
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Banner Cointraffic Top */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 30px 0', minHeight: '250px' }}>
          <span id="ct_cmykXXKHPsy"></span>
        </div>

        <h1 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>Arbitrage Rewards</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', textAlign: 'center' }}>
          Complete tasks and earn credits. Payouts are managed directly by TimeWall.
        </p>

        {/* --- SEZIONE TIMEWALL OFFERWALL --- */}
        <div style={{ 
          background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0.4))', 
          border: '1px solid rgba(139, 92, 246, 0.3)', 
          padding: '25px', 
          borderRadius: '24px',
          marginBottom: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#8B5CF6', borderRadius: '50%', boxShadow: '0 0 10px #8B5CF6' }}></div>
            <h2 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>Instant Credits Wall</h2>
          </div>

          <div style={{ 
            width: '100%', 
            height: '800px', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            backgroundColor: '#ffffff' 
          }}>
            <iframe 
              src="https://timewall.io/widget/v2/678fdb164b161a3c" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="TimeWall Offerwall"
              allow="geolocation; microphone; camera"
            />
          </div>
          <p style={{ marginTop: '15px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            *Offers are currently loading. They will appear as soon as the placement is approved.
          </p>
        </div>

        {/* --- CARDS REFERRAL --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#8B5CF6', marginBottom: '10px' }}>Daily BTC Faucet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>High-paying tasks and Bitcoin rewards from our trusted partner.</p>
            <a href="https://r.adbtc.top/3494539" target="_blank" style={{ display: 'inline-block', backgroundColor: '#8B5CF6', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Open Portal</a>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#0052ff', marginBottom: '10px' }}>Micro-Wallet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>Register on FaucetPay to receive your external rewards.</p>
            <a href="https://faucetpay.io/?r=5296764" target="_blank" style={{ display: 'inline-block', backgroundColor: '#0052ff', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Register Wallet</a>
          </div>

        </div>

        {/* Banner Cointraffic Bottom */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0', minHeight: '250px' }}>
          <span id="ct_c83XILwXy4d"></span>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Back to Terminal</a>
        </div>
      </div>
    </main>
  )
}
