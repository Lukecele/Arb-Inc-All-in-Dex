'use client';

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

const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7';
const REFERRER_BPS = 30; // 0.3% dev fee

const MAYAN_URL =
  `https://swap.mayan.finance/` +
  `?ref=${FEE_RECEIVER}` +
  `&referrerBps=${REFERRER_BPS}` +
  `&defaultFromChain=bsc` +
  `&defaultToChain=solana` +
  `&theme=dark`;

export default function BridgePage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090b' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        maxWidth: 1200,
        margin: '0 auto',
        borderBottom: '1px solid #3f3f46',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto"
            alt="Logo"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Arbitrage Inception
          </span>
        </div>

        <nav style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.05)',
          padding: '8px 16px',
          borderRadius: 50,
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
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
                transition: 'all 0.2s',
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
          <h1 style={{ color: '#fff', marginBottom: 8 }}>Bridge</h1>
          <p style={{ color: '#a1a1aa', fontSize: 13, marginBottom: 20 }}>
            Powered by <strong style={{ color: '#8B5CF6' }}>Mayan Finance</strong>
          </p>

          {/* Info box */}
          <div style={{
            background: '#18181b',
            border: '1px solid #3f3f46',
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            color: '#a1a1aa',
            fontSize: 14,
            lineHeight: 1.5,
            textAlign: 'left',
          }}>
            Bridge tokens across <strong style={{ color: '#fff' }}>Solana ↔ BNB Chain</strong> and
            other major networks with best-rate routing.
            Powered by <strong style={{ color: '#8B5CF6' }}>Mayan Finance</strong> — fast, secure,
            and optimised for Solana cross-chain swaps.
            <br /><br />
            Supported chains: Solana, BNB Chain, Ethereum, Arbitrum, Polygon, Base, Avalanche, and more.
          </div>

          {/* Mayan Finance Widget */}
          <div style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid #3f3f46',
            background: '#18181b',
          }}>
            <iframe
              src={MAYAN_URL}
              width="100%"
              height="660"
              style={{
                border: 'none',
                display: 'block',
              }}
              allow="clipboard-write"
              title="Mayan Finance Bridge"
            />
          </div>

          {/* Why use section */}
          <div style={{
            marginTop: 40,
            padding: 20,
            background: '#18181b',
            borderRadius: 12,
            textAlign: 'left',
          }}>
            <h3 style={{ color: '#fff', marginBottom: 12, fontSize: 16 }}>Why use our Bridge?</h3>
            <ul style={{ color: '#a1a1aa', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
              <li>Best Solana cross-chain rates via Mayan Finance routing</li>
              <li>Native Solana ↔ BNB Chain bridging</li>
              <li>Fast finality — Mayan Swift protocol</li>
              <li>Support for 10+ major blockchains</li>
              <li>Secure, audited, and non-custodial</li>
            </ul>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #3f3f46' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}>
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
              lineHeight: 1.5,
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
    </div>
  );
}
