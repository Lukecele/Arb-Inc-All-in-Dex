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

  if (!address) {
    return (
      <div style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', 
        borderRadius: '24px', 
        border: '2px solid #4f46e5',
        boxShadow: '0 10px 30px rgba(79, 70, 229, 0.2)',
        margin: '20px 0'
      }}>
        <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '15px' }}>Wallet Required 🔒</h2>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Connect your wallet to unlock CPA Tasks and accumulate Airdrop points.</p>
        <button 
          onClick={() => connect()} 
          style={{ 
            background: 'linear-gradient(to right, #8B5CF6, #EC4899)', 
            color: 'white', 
            border: 'none', 
            padding: '15px 40px', 
            borderRadius: '100px', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            fontSize: '18px',
            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)'
          }}
        >
          {connecting ? 'Connecting...' : '🔗 CONNECT WALLET'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', padding: '8px 20px', borderRadius: '50px', color: '#22c55e', fontWeight: 'bold', fontSize: '14px' }}>
          ● Tracking Active: {address.slice(0,6)}...{address.slice(-4)}
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#f472b6', fontSize: '22px', marginBottom: '20px', fontWeight: '800', textTransform: 'uppercase' }}>
          🪂 $ARB-INC Native Tasks (CPA)
        </h3>
        
        {loadingOffers ? (
          <p style={{ color: '#666' }}>Loading tasks...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {offers.length > 0 ? offers.map((off, i) => (
              <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '1.4' }}>{off.title}</div>
                </div>
                <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: 'white', textDecoration: 'none', textAlign: 'center', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>
                  Complete & Earn →
                </a>
              </div>
            )) : (
              <p style={{ color: '#666' }}>No tasks available for your region.</p>
            )}
          </div>
        )}
      </div>

      <div style={{ background: '#000', borderRadius: '20px', border: '1px solid #333', height: '800px', overflow: 'hidden' }}>
        <iframe 
          src={`https://timewall.io/widget/v2/678fdb164b161a3c?userid=${address}`} 
          style={{ width: '100%', height: '100%', border: 'none' }} 
        />
      </div>

    </div>
  );
}
