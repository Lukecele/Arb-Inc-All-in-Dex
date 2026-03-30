'use client';

import { useEffect, useState } from 'react';

export default function BridgePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
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
          Bridge tokens across <strong style={{color:'#fff'}}>20+ blockchains</strong> with the best rates. 
          Powered by <strong style={{color:'#fff'}}>Jumper Exchange</strong> (LI.FI) with <strong style={{color:'#20B8CD'}}>0.1% dev fee</strong>.
          <br/><br/>
          Supported chains: BSC, Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Base, and more.
        </div>
        
        {loading ? (
          <div style={{ color: '#71717a', padding: 100 }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a 
              href="https://jumper.exchange/?integrator=081a94df-4e42-4367-90df-64c86a9a0419.3cc7b9d9-c559-4a38-98f7-b7a4cce0cd3c"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '20px 32px',
                background: '#20B8CD',
                color: '#fff',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Open Bridge ↗
            </a>
            <p style={{ color: '#71717a', fontSize: 14 }}>
              Click to open in new tab • Powered by Jumper Exchange
            </p>
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: '#18181b', borderRadius: 12, textAlign: 'left' }}>
          <h3 style={{ color: '#fff', marginBottom: 12, fontSize: 16 }}>Why use our Bridge?</h3>
          <ul style={{ color: '#a1a1aa', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Best cross-chain rates via LI.FI aggregation</li>
            <li>Support for 20+ blockchains</li>
            <li>0.1% dev fee supports our platform</li>
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
            <strong>⚠️ Risk Disclaimer:</strong> Cross-chain bridge transactions involve risk. Arbitrage Inception provides a frontend interface powered by Jumper Exchange/LI.FI and is not responsible for any financial losses. Please bridge responsibly.
          </div>
          
          <p style={{ color: '#71717a', fontSize: 12, marginTop: 10 }}>© 2026 Arbitrage Inception. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
