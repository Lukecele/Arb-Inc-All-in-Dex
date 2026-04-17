'use client';

import React, { useEffect, useState } from 'react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';

interface Offer { title: string; link: string; }

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
      <div style={{ padding: '60px 20px', textAlign: 'center', background: '#111', borderRadius: '24px', border: '1px solid #4f46e5' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Wallet Required 🔒</h2>
        <button onClick={() => connect()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer' }}>
          {connecting ? 'Connecting...' : '🔗 CONNECT WALLET'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* 1. REFERRAL SECTION */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', border: '1px solid #4338ca', padding: '24px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Invite friends & earn 10% 🚀</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input readOnly value={referralLink} style={{ background: '#000', border: '1px solid #333', color: '#818cf8', padding: '10px', borderRadius: '8px', width: '70%' }} />
          <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} 
                  style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* 2. NATIVE TASKS (CPA) */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#f472b6', marginBottom: '20px', textTransform: 'uppercase' }}>🪂 $ARB-INC Native Tasks</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
          {offers.length > 0 ? offers.map((off, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '16px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>{off.title}</div>
              <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'none', fontWeight: 'bold' }}>Complete & Earn →</a>
            </div>
          )) : <p style={{ color: '#666' }}>Loading tasks or no tasks available...</p>}
        </div>
      </div>

      {/* 3. ESSENTIAL TOOLS (RIPRISTINATI) */}
      <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '24px', marginBottom: '40px' }}>
        <h3 style={{ color: '#20B8CD', marginTop: 0 }}>🔗 Essential Tools</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ borderLeft: '3px solid #20B8CD', paddingLeft: '15px' }}>
            <div style={{ fontWeight: 'bold' }}>Daily BTC Faucet</div>
            <a href="https://adbtc.top/r/l/3483445" target="_blank" style={{ color: '#20B8CD', fontSize: '13px' }}>Open adBTC →</a>
          </div>
          <div style={{ borderLeft: '3px solid #22c55e', paddingLeft: '15px' }}>
            <div style={{ fontWeight: 'bold' }}>Micro-Wallet</div>
            <a href="https://faucetpay.io/?r=103328" target="_blank" style={{ color: '#22c55e', fontSize: '13px' }}>Open FaucetPay →</a>
          </div>
          <div style={{ borderLeft: '3px solid #facc15', paddingLeft: '15px' }}>
            <div style={{ fontWeight: 'bold' }}>Bonus: PrizeBear</div>
            <a href="https://prizebear.com/?ref=0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7" target="_blank" style={{ color: '#facc15', fontSize: '13px' }}>Open PrizeBear →</a>
          </div>
        </div>
      </div>

    </div>
  );
}
