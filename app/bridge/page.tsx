'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/swap', label: 'Swap (Custom)' },
  { href: '/swap-all', label: 'Swap All' },
  { href: '/zap', label: 'Zap' },
  { href: '/bridge', label: 'Bridge', active: true },
  { href: '/limit-orders', label: 'Limit Orders' },
  { href: '/contact', label: 'Contact' },
];

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
          r: '32916',
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090b' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 20px',
        maxWidth: 1200,
        margin: '0 auto',
        borderBottom: '1px solid #3f3f46',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto" 
            alt="Logo" 
            style={{ width: 40, height: 40, borderRadius: '50%' }} 
          />
          <span style={{ fontSize: 18, fontWeight: 700, background: 'linear-gradient(90deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Arbitrage Inception
          </span>
        </div>
        
        <nav style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.1)' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              style={{ 
                color: link.active ? '#fff' : '#a1a1aa',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 13,
                padding: '8px 16px',
                borderRadius: 20,
                background: link.active ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{ padding: '24px 16px' }}>
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
        
        <div id="debridge-widget" style={{ borderRadius: '16px', minHeight: '600px' }}></div>

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
