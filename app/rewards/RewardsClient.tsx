'use client';

import React, { useEffect, useState } from 'react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';

interface Offer {
  title: string;
  link: string;
}

export default function RewardsClient() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  
  // Prendiamo l'indirizzo in modo ultra-sicuro
  const address = wallet?.accounts?.[0]?.address || connectedWallets?.[0]?.accounts?.[0]?.address;

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

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', textAlign: 'center' }}>
      
      {!address ? (
        <div style={{ padding: '40px', background: '#111', borderRadius: '20px', border: '2px dashed #EC4899', marginBottom: '30px' }}>
          <h2 style={{ color: '#EC4899' }}>Wallet Required 🔒</h2>
          <p style={{ marginBottom: '20px', color: '#a1a1aa' }}>Connect your wallet to unlock CPA Tasks and Leaderboard points.</p>
          <button 
            onClick={() => connect()} 
            style={{ background: 'linear-gradient(to right, #8B5CF6, #EC4899)', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
          >
            {connecting ? 'Connecting...' : '🔗 CONNECT WALLET NOW'}
          </button>
        </div>
      ) : (
        <>
          {/* SEZIONE CPA / NATIVE TASKS */}
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '24px', marginBottom: '30px', textAlign: 'left' }}>
            <h3 style={{ color: '#EC4899', marginTop: 0 }}>🪂 $ARB-INC Native Tasks (CPA)</h3>
            {loadingOffers ? <p>Loading tasks... ⏳</p> : offers.length === 0 ? (
              <p style={{ color: '#666' }}>No tasks available for {address.slice(0,6)}. Try again later!</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                {offers.map((off, i) => (
                  <div key={i} style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #444' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{off.title}</div>
                    <a href={off.link} target="_blank" style={{ color: '#EC4899', textDecoration: 'none', fontWeight: 'bold', display: 'block' }}>Complete & Earn Points →</a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEZIONE TIMEWALL */}
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '24px', textAlign: 'left' }}>
            <h3 style={{ color: '#8B5CF6', marginTop: 0 }}>💰 Instant Payouts (TimeWall)</h3>
            <iframe 
              src={`https://timewall.io/widget/v2/678fdb164b161a3c?userid=${address}`} 
              style={{ width: '100%', height: '700px', border: 'none', background: '#000', borderRadius: '15px', marginTop: '15px' }} 
            />
          </div>
        </>
      )}
    </div>
  );
}
