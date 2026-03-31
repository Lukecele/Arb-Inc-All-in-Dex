'use client';

import { useEffect } from 'react';

export default function BridgePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.debridge.com/assets/scripts/widget.js';
    script.defer = true;
    script.onload = () => {
      if ((window as any).deBridge) {
        (window as any).deBridge.widget({
          element: 'debridge-widget',
          v: '1',
          mode: 'deswap',
          title: '',
          width: 600,
          height: 700,
          theme: 'dark',
          lang: 'en',
          r: 'TuoReferralCode',
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090b', padding: '24px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', marginBottom: 16 }}>Bridge</h1>
        
        <div style={{ 
          background: '#18181b', 
          border: '1px solid #3f3f46', 
          borderRadius: 12, 
          padding: 16, 
          marginBottom: 24,
          color: '#a1a1aa',
          fontSize: 14,
          lineHeight: 1.5,
          textAlign: 'left'
        }}>
          Bridge tokens across <strong style={{color:'#fff'}}>30+ blockchains</strong> including 
          <strong style={{color:'#fff'}}> Solana ↔ BNB</strong>. 
          Powered by <strong style={{color:'#20B8CD'}}>deBridge</strong>.
          <br/><br/>
          Supported chains: Solana, Ethereum, BNB Chain, Arbitrum, Polygon, Base, and more.
        </div>
        
        <div 
          id="debridge-widget" 
          style={{ borderRadius: '16px', minHeight: '600px' }}
        />

        <div style={{ marginTop: 40, padding: 20, background: '#18181b', borderRadius: 12, textAlign: 'left' }}>
          <h3 style={{ color: '#fff', marginBottom: 12, fontSize: 16 }}>Why use our Bridge?</h3>
          <ul style={{ color: '#a1a1aa', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Best cross-chain rates via deBridge aggregation</li>
            <li>Support for 30+ blockchains</li>
            <li>Secure and fast transactions</li>
          </ul>
        </div>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #3f3f46' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            <a href="/privacy-policy" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13 }}>Privacy Policy</a>
            <a href="/terms-of-service" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13 }}>Terms of Service</a>
            <a href="/cookie-policy" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13 }}>Cookie Policy</a>
            <a href="/contact" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13 }}>Contact</a>
          </div>
          
          <div style={{ 
            maxWidth: 600, 
            margin: '0 auto 20px', 
            padding: 15, 
            background: 'rgba(255, 152, 0, 0.1)', 
            border: '1px solid rgba(255, 152, 0, 0.3)', 
            borderRadius: 8, 
            color: '#FF9901', 
            fontSize: 12, 
            lineHeight: 1.5 
          }}>
            <strong>⚠️ Risk Disclaimer:</strong> Cross-chain bridge transactions involve risk. Arbitrage Inception provides a frontend interface powered by deBridge and is not responsible for any financial losses. Please bridge responsibly.
          </div>
          
          <p style={{ color: '#71717a', fontSize: 12, marginTop: 10 }}>© 2026 Arbitrage Inception. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
