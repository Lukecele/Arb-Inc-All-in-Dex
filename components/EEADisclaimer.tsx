'use client';
import { useState, useEffect } from 'react';

export default function EEADisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('eea_disclaimer_v1');
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: '#0f0f1a', border: '1px solid rgba(239,68,68,0.4)',
        borderRadius: '16px', padding: '32px', maxWidth: '560px', textAlign: 'center', color: '#fff'
      }}>
        <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>⚠️ Risk & Access Notice</h2>
        <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>
          This is an <strong style={{color:'#fff'}}>experimental, non-regulated open-source DeFi interface</strong>.
          It has not been authorized by any financial regulator including EU/MiCA authorities or Italy's OAM/CONSOB/Banca d'Italia.
        </p>
        <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>
          <strong style={{color:'#ef4444'}}>Crypto-assets are highly volatile. You may lose all invested capital. 
          Displayed APR figures are not guaranteed returns.</strong>
        </p>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>
          If you are a resident of the European Economic Area (EEA), please be aware this service 
          is not currently authorized under MiCA regulation in your jurisdiction.
        </p>
        <button
          onClick={() => { localStorage.setItem('eea_disclaimer_v1', '1'); setVisible(false); }}
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)', border: 'none',
            color: '#fff', padding: '12px 32px', borderRadius: '10px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}
        >
          I Understand — Continue
        </button>
      </div>
    </div>
  );
}
