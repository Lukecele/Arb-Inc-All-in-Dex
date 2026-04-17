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
  const [copied, setCopied] = useState(false);
  
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

  const referralLink = address ? `${window.location.origin}/rewards?ref=${address}` : '';

  if (!address) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', borderRadius: '24px', border: '2px solid #4f46e5', margin: '20px 0' }}>
        <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '15px' }}>Wallet Required 🔒</h2>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Connect your wallet to unlock Referral Link and CPA Tasks.</p>
        <button onClick={() => connect()} style={{ background: 'linear-gradient(to right, #8B5CF6, #EC4899)', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>
          {connecting ? 'Connecting...' : '🔗 CONNECT WALLET'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 1. REFERRAL BOX (RIPRISTINATO) */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', border: '1px solid #4338ca', padding: '24px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Invite friends & earn 10% 🚀</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '15px' }}>Share your link and get 10% of all points earned by your referrals.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input readOnly value={referralLink} style={{ background: '#000', border: '1px solid #333', color: '#818cf8', padding: '10px', borderRadius: '8px', width: '70%' }} />
          <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} 
                  style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* 2. CPA SECTION (NATIVE TASKS) */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#f472b6', fontSize: '22px', marginBottom: '20px', fontWeight: '800', textTransform: 'uppercase' }}>
          🪂 $ARB-INC Native Tasks (CPA)
        </h3>
        {loadingOffers ? (
          <p>Loading tasks... ⏳</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {offers.length > 0 ? offers.map((off, i) => (
              <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>{off.title}</div>
                <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: 'white', textDecoration: 'none', textAlign: 'center', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>
                  Complete & Earn →
                </a>
              </div>
            )) : <p style={{ color: '#666' }}>No tasks available right now.</p>}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#333' }}>
        <p>TimeWall has been removed as requested.</p>
      </div>

    </div>
  );
}
