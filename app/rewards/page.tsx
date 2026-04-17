'use client';

import React from 'react';

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
        
        {/* 1. BANNER COINTRAFFIC TOP */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px', minHeight: '250px' }}>
          <span id="ct_cmykXXKHPsy"></span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
          Arbitrage Rewards Hub
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', textAlign: 'center' }}>
          Complete tasks and watch videos to boost your terminal balance.
        </p>

        {/* 2. TIMEWALL (Premium Wall) */}
        <div style={{ 
          background: 'rgba(139, 92, 246, 0.05)', 
          border: '1px solid rgba(139, 92, 246, 0.2)', 
          padding: '20px', 
          borderRadius: '24px',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#8B5CF6' }}>⭐ Premium Offers (TimeWall)</h2>
          <div style={{ width: '100%', height: '800px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <iframe 
              src="https://timewall.io/widget/v2/678fdb164b161a3c" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="TimeWall"
            />
          </div>
        </div>

        {/* 3. CPAGRIP (Secondary Wall - NO LOCKER) */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '24px',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#fff' }}>⚡ Fast Tasks (CPAGrip)</h2>
          <div style={{ width: '100%', height: '600px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            {/* NOTA: Qui ho messo il link di CPAGrip. 
                Se vedi errore, è perché CPAGrip vuole il "Direct Link" (quello che inizia con show.php).
            */}
            <iframe 
              src="https://www.cpagrip.com/view.php?id=1890760" 
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="CPAGrip"
            />
          </div>
        </div>

        {/* 4. CARDS REFERRAL RIPRISTINATE */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#8B5CF6', marginBottom: '10px' }}>Daily BTC Faucet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>High-paying tasks and Bitcoin rewards from our trusted partner adBTC.</p>
            <a href="https://r.adbtc.top/3494539" target="_blank" style={{ display: 'inline-block', backgroundColor: '#8B5CF6', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Open Portal</a>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#0052ff', marginBottom: '10px' }}>Micro-Wallet</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>Register on FaucetPay to receive your external rewards directly.</p>
            <a href="https://faucetpay.io/?r=5296764" target="_blank" style={{ display: 'inline-block', backgroundColor: '#0052ff', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Register Wallet</a>
          </div>

        </div>

        {/* 5. BANNER COINTRAFFIC BOTTOM */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0', minHeight: '250px' }}>
          <span id="ct_c83XILwXy4d"></span>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '14px' }}>← Back to Terminal</a>
        </div>
      </div>
    </main>
  );
}
