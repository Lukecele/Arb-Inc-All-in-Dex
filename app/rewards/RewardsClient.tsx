'use client';

import React, { useEffect, useState } from 'react';
import { useWallets, useConnectWallet } from '@web3-onboard/react';

export default function RewardsClient() {
  const connectedWallets = useWallets();
  const [{ wallet }, connect] = useConnectWallet();
  const [offers, setOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  
  const address = connectedWallets?.[0]?.accounts?.[0]?.address;

  // Caricamento Offerte CPA
  useEffect(() => {
    if (address) {
      setLoadingOffers(true);
      fetch(`/api/offers?wallet=${address}`)
        .then(res => res.json())
        .then(data => {
          if (data.offers) setOffers(data.offers);
          setLoadingOffers(false);
        })
        .catch(() => setLoadingOffers(false));
    }
  }, [address]);

  const timeWallUrl = address 
    ? `https://timewall.io/widget/v2/678fdb164b161a3c?userid=${address}`
    : `https://timewall.io/widget/v2/678fdb164b161a3c`;

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* SEZIONE CPA / NATIVE TASKS */}
      <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '24px', marginBottom: '30px', textAlign: 'left' }}>
        <h3 style={{ color: '#EC4899', marginTop: 0 }}>🪂 $ARB-INC Native Tasks</h3>
        {!address ? (
          <p style={{ color: '#666' }}>Connect wallet to see tasks.</p>
        ) : loadingOffers ? (
          <p>Loading tasks... ⏳</p>
        ) : offers.length === 0 ? (
          <p style={{ color: '#666' }}>No tasks in your region. Check back later!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {offers.map((off, i) => (
              <div key={i} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '12px', border: '1px solid #444' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>{off.title}</div>
                <a href={off.link} target="_blank" style={{ color: '#EC4899', textDecoration: 'none', fontWeight: 'bold' }}>Earn Points →</a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEZIONE TIMEWALL */}
      <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '24px', textAlign: 'left' }}>
        <h3 style={{ color: '#8B5CF6', marginTop: 0 }}>💰 Instant Payouts (TimeWall)</h3>
        <div style={{ width: '100%', height: '700px', background: '#000', borderRadius: '15px', overflow: 'hidden', marginTop: '15px' }}>
          {address ? (
            <iframe src={timeWallUrl} style={{ width: '100%', height: '100%', border: 'none' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#444' }}>Connect wallet to unlock</div>
          )}
        </div>
      </div>

    </div>
  );
}
