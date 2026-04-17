'use client';
import React, { useState, useEffect } from 'react';
import { useWallets } from '@web3-onboard/react';

export default function ReferralBox() {
  const connectedWallets = useWallets();
  const address = connectedWallets?.[0]?.accounts?.[0]?.address;
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  const link = `${typeof window !== 'undefined' ? window.location.origin : ''}/rewards?ref=${address}`;

  return (
    <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', border: '1px solid #4338ca', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
      <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Invite friends & earn 10% 🚀</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input readOnly value={link} style={{ background: '#000', border: '1px solid #333', color: '#818cf8', padding: '8px', borderRadius: '8px', width: '60%' }} />
        <button onClick={() => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} 
                style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
