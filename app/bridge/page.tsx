'use client';

import { LiFiWidget } from '@lifi/widget';

const widgetConfig = {
  integrator: 'Arbitrage Inception',
  fee: 0.001,
  showFeePercentage: true,
  theme: {
    palette: {
      primary: { main: '#20B8CD' },
      background: { default: '#09090b', paper: '#18181b' },
    },
  },
};

export default function BridgePage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090b', padding: '24px 16px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>Bridge</h1>
        <div style={{ background: '#18181b', borderRadius: 16, overflow: 'hidden' }}>
          <LiFiWidget config={widgetConfig} />
        </div>
      </div>
    </div>
  );
}
