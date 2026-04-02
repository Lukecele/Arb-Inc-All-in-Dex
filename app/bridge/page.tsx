'use client';

import Link from 'next/link';
import Script from 'next/script';

declare global {
  interface Window {
    MayanSwap: {
      init: (containerId: string, config: Record<string, unknown>) => void;
    };
  }
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/swap', label: 'Swap (Custom)' },
  { href: '/swap-all', label: 'Swap All' },
  { href: '/zap', label: 'Zap' },
  { href: '/bridge', label: 'Bridge', active: true },
  { href: '/limit-orders', label: 'Limit Orders' },
  { href: '/contact', label: 'Contact' },
];

const mayanConfig = {
  appIdentity: {
    name: 'Arbitrage Inception',
    icon: 'https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto',
    uri: 'https://arbitrage-inc.exchange',
  },
  solanaReferrerAddress: 'FNRBnEp9g2Zfw9qtEyVbzyFe7sDwaXKsPB8hHw2kXrZi',
  evmReferrerAddress: '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7',
  referrerBps: 30,
  sourceChains: ['bsc', 'ethereum', 'arbitrum', 'polygon', 'base', 'avalanche', 'solana'],
  destinationChains: ['solana', 'bsc', 'ethereum', 'arbitrum', 'polygon', 'base', 'avalanche'],
  defaultFromChain: 'bsc',
  defaultToChain: 'solana',
  colors: {
    mainBox: '#18181b',
    background: '#09090b',
    primary: '#8B5CF6',
    primaryText: '#ffffff',
    secondary: '#3f3f46',
    secondaryText: '#a1a1aa',
    inputBox: '#27272a',
    statusBar: '#27272a',
    statusBarText: '#ffffff',
    twitterHandle: 'ArbitrageInc',
    modalBackground: '#18181b',
    buttonBackground: '#8B5CF6',
    cardBackground: '#27272a',
    toastBackground: '#27272a',
    toastText: '#ffffff',
  },
};

function handleWidgetReady() {
  if (typeof window !== 'undefined' && window.MayanSwap) {
    window.MayanSwap.init('mayan_widget', mayanConfig as Record<string, unknown>);
  }
}

export default function BridgePage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#050508' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        maxWidth: 1200,
        margin: '0 auto',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 18, 0.75)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto"
            alt="Logo"
            style={{ width: 40, height: 40, borderRadius: '50%', boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
          />
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 50%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Arbitrage Inception
          </span>
        </div>

        <nav style={{
          display: 'flex',
          gap: '4px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.03)',
          padding: '6px 10px',
          borderRadius: 100,
          border: '1px solid rgba(255,255,255,0.06)',
          WebkitBackdropFilter: 'blur(16px)',
          backdropFilter: 'blur(16px)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: link.active ? '#fff' : '#a1a1aa',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 13,
                padding: '7px 14px',
                borderRadius: 100,
                background: link.active ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div style={{ padding: '24px 16px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            color: '#fff',
            marginBottom: 8,
            fontSize: 36,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #C084FC 50%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>Bridge</h1>
          <p style={{ color: '#a1a1aa', fontSize: 16, marginBottom: 24 }}>
            Powered by <strong style={{ color: '#8B5CF6' }}>Mayan Finance</strong>
          </p>

          {/* Info box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            color: '#a1a1aa',
            fontSize: 14,
            lineHeight: 1.7,
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
            }} />
            Bridge tokens across <strong style={{ color: '#fff' }}>Solana ↔ BNB Chain</strong> and
            other major networks with best-rate routing.
            Powered by <strong style={{ color: '#8B5CF6' }}>Mayan Finance</strong> — fast, secure,
            and optimised for Solana cross-chain swaps.
            <br /><br />
            Supported chains: Solana, BNB Chain, Ethereum, Arbitrum, Polygon, Base, Avalanche, and more.
          </div>

          {/* Mayan Finance Widget container */}
          <div style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            background: '#0a0a12',
            minHeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}>
            <div id="mayan_widget" style={{ width: '100%' }} />
          </div>

          {/* Why use section */}
          <div style={{
            marginTop: 40,
            padding: 24,
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 16,
            textAlign: 'left',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}>
            <h3 style={{ color: '#fff', marginBottom: 16, fontSize: 18, fontWeight: 700 }}>Why use our Bridge?</h3>
            <ul style={{ color: '#a1a1aa', fontSize: 14, paddingLeft: 0, lineHeight: 1.8, listStyle: 'none' }}>
              <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 0, color: '#8B5CF6', fontWeight: 600 }}>→</span>
                Best Solana cross-chain rates via Mayan Finance routing
              </li>
              <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 0, color: '#8B5CF6', fontWeight: 600 }}>→</span>
                Native Solana ↔ BNB Chain bridging
              </li>
              <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 0, color: '#8B5CF6', fontWeight: 600 }}>→</span>
                Fast finality — Mayan Swift protocol
              </li>
              <li style={{ paddingLeft: 20, position: 'relative', marginBottom: 8 }}>
                <span style={{ position: 'absolute', left: 0, color: '#8B5CF6', fontWeight: 600 }}>→</span>
                Support for 10+ major blockchains
              </li>
              <li style={{ paddingLeft: 20, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#8B5CF6', fontWeight: 600 }}>→</span>
                Secure, audited, and non-custodial
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(255, 255, 255, 0.06)', position: 'relative' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}>
              <a href="/privacy-policy" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>Privacy Policy</a>
              <a href="/terms-of-service" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>Terms of Service</a>
              <a href="/cookie-policy" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>Cookie Policy</a>
              <a href="/contact" style={{ color: '#71717a', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>Contact</a>
            </div>

            <div style={{
              maxWidth: 600,
              margin: '0 auto 20px',
              padding: 15,
              background: 'rgba(255, 152, 0, 0.06)',
              border: '1px solid rgba(255, 152, 0, 0.15)',
              borderRadius: 10,
              color: '#FFB347',
              fontSize: 12,
              lineHeight: 1.6,
            }}>
              <strong>⚠️ Risk Disclaimer:</strong> Cross-chain bridge transactions involve risk.
              Arbitrage Inception provides a frontend interface powered by Mayan Finance and is not
              responsible for any financial losses. Please bridge responsibly.
            </div>

            <p style={{ color: '#71717a', fontSize: 12, marginTop: 10 }}>
              © 2026 Arbitrage Inception. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Mayan Finance widget script - v1.8.0 */}
      <Script
        src="https://cdn.mayan.finance/widget/1_8_0/main.js"
        integrity="sha256-csokBs9wUf3aZCKTR7/XXElwXugjzCQeUygLmN+/Y7Y="
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onReady={handleWidgetReady}
      />
    </div>
  );
}
