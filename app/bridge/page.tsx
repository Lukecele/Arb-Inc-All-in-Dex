'use client';

import { useSyncExternalStore } from 'react';
import type { WidgetConfig } from '@lifi/widget';
import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';

function subscribe() {
  return () => {};
}

function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const hydrated = useHydrated();
  return hydrated ? children : fallback;
}

const widgetConfig = {
  appearance: 'dark',
  theme: {
    container: {
      borderRadius: '16px',
    },
  },
} as Partial<WidgetConfig>;

export default function BridgePage() {
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
          Powered by <strong style={{color:'#20B8CD'}}>Jumper Exchange</strong> (LI.FI).
          <br/><br/>
          Supported chains: BSC, Ethereum, Polygon, Arbitrum, Optimism, Avalanche, Base, and more.
        </div>
        
        <ClientOnly fallback={<WidgetSkeleton config={widgetConfig} />}>
          <LiFiWidget integrator="arbitrage-inc" config={widgetConfig} />
        </ClientOnly>

        <div style={{ marginTop: 40, padding: 20, background: '#18181b', borderRadius: 12, textAlign: 'left' }}>
          <h3 style={{ color: '#fff', marginBottom: 12, fontSize: 16 }}>Why use our Bridge?</h3>
          <ul style={{ color: '#a1a1aa', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Best cross-chain rates via LI.FI aggregation</li>
            <li>Support for 20+ blockchains</li>
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
