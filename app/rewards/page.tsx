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
        
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 30px 0', minHeight: '250px' }}>
          <span id="ct_cmykXXKHPsy"></span>
        </div>

        <h1 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>Ecosystem Rewards</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', textAlign: 'center' }}>
          Complete tasks and explore our partners to boost your crypto holdings.
        </p>

        <div style={{ 
          background: 'linear-gradient(145deg, rgba(0, 82, 255, 0.05), rgba(255, 255, 255, 0.02))', 
          border: '1px solid rgba(0, 82, 255, 0.2)', 
          padding: '25px', 
          borderRadius: '24px',
          marginBottom: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: '#0052ff', borderRadius: '50%', boxShadow: '0 0 10px #0052ff' }}></div>
            <h2 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>Instant Rewards Wall</h2>
          </div>

          <div style={{ 
            width: '100%', 
            height: '800px', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            backgroundColor: '#ffffff' 
          }}>
            <iframe 
              src="https://faucetpay.io/offerwall/widget/8268c7aec0ef9ace7fe5a0248d80daeae677e859c6d3e43df0275aa892c5391c" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="FaucetPay Offerwall"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
              allow="geolocation; microphone; camera"
            />
          </div>
          <p style={{ marginTop: '15px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            Payments are sent instantly to your FaucetPay account.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#8B5CF6', marginBottom: '10px' }}>Daily BTC Faucet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>Interact with our verified partner for daily Bitcoin tasks.</p>
            <a href="https://r.adbtc.top/3494539" target="_blank" style={{ display: 'inline-block', backgroundColor: '#8B5CF6', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Open Portal</a>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#0052ff', marginBottom: '10px' }}>Micro-Wallet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>Need a FaucetPay account? Register here to receive your rewards.</p>
            <a href="https://faucetpay.io/?r=5296764" target="_blank" style={{ display: 'inline-block', backgroundColor: '#0052ff', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Create Account</a>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0', minHeight: '250px' }}>
          <span id="ct_c83XILwXy4d"></span>
        </div>
      </div>
    </main>
  )
}
