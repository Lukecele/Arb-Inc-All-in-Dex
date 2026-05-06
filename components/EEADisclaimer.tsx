'use client';
import { useState, useEffect } from 'react';

export default function EEADisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('eea_disclaimer_v1');
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem('eea_disclaimer_v1', '1');
    setVisible(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '0',
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #0f0a1e 0%, #1a0f2e 100%)',
        border: '1px solid rgba(168,85,247,0.4)',
        borderRadius: '20px 20px 0 0',
        width: '100%',
        maxWidth: '640px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Scrollable content area */}
        <div style={{
          overflowY: 'auto',
          padding: '20px 20px 8px',
          flex: 1,
        }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '28px' }}>⚠️</span>
            <h2 style={{
              color: '#f59e0b', margin: '6px 0 4px',
              fontSize: 'clamp(1rem, 4vw, 1.3rem)', fontWeight: '700',
            }}>
              Risk &amp; Access Notice
            </h2>
          </div>

          <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.78rem, 3vw, 0.9rem)', marginBottom: '10px', lineHeight: '1.5' }}>
            This is an <strong style={{ color: '#e2e8f0' }}>experimental, non-regulated open-source DeFi interface</strong>,
            not authorized by any financial regulator (EU/MiCA, OAM, CONSOB, Banca d&apos;Italia).
          </p>

          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px', padding: '10px 12px', marginBottom: '10px',
          }}>
            <p style={{ color: '#fca5a5', margin: 0, fontSize: 'clamp(0.76rem, 2.8vw, 0.85rem)', lineHeight: '1.5' }}>
              🔴 <strong>Crypto-assets are highly volatile. You may lose all invested capital.</strong><br />
              🔴 <strong>APR figures are not guaranteed returns.</strong>
            </p>
          </div>

          <p style={{ color: '#94a3b8', fontSize: 'clamp(0.72rem, 2.6vw, 0.82rem)', marginBottom: '4px', lineHeight: '1.5' }}>
            EEA residents: this service is not currently authorized under MiCA in your jurisdiction.
            Use is at your sole risk. Read our <a href="/terms" style={{ color: '#a855f7' }}>Terms of Service</a> before proceeding.
          </p>
        </div>

        {/* Sticky button — always visible */}
        <div style={{
          padding: '12px 20px 20px',
          borderTop: '1px solid rgba(168,85,247,0.15)',
          background: '#0f0a1e',
        }}>
          <button
            onClick={accept}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              border: 'none', color: '#fff',
              padding: '14px',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
              fontWeight: '700', cursor: 'pointer',
              letterSpacing: '0.3px',
            }}
          >
            I Understand — Continue
          </button>
        </div>
      </div>
    </div>
  );
}
