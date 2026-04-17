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
        <button onClick={() => connect()} style={{ background: 'linear-gradient(to right, #8B5CF6, #EC4899)', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer' }}>
          {connecting ? 'Connecting...' : '🔗 CONNECT WALLET'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* 1. REFERRAL BOX */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', border: '1px solid #4338ca', padding: '30px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Invite & Earn 10% Lifetime 🚀</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
          Get 10% of ALL points earned by your friends from Swaps, Zaps, and Tasks!
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input readOnly value={referralLink} style={{ background: '#000', border: '1px solid #333', color: '#818cf8', padding: '12px', borderRadius: '8px', width: '70%', fontSize: '13px' }} />
          <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} 
                  style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* 2. NATIVE TASKS */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#f472b6', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>🪂 Native Rewards</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {loadingOffers ? <p>Scanning for rewards... ⏳</p> : offers.length > 0 ? offers.map((off, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '25px', borderRadius: '16px', transition: '0.3s' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}>{off.title}</div>
              <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Complete & Earn Points →</a>
            </div>
          )) : <p style={{ color: '#444' }}>No native tasks available in your region.</p>}
        </div>
      </div>

      {/* 3. ESSENTIAL TOOLS */}
      <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '30px' }}>
        <h3 style={{ color: '#20B8CD', marginTop: 0, marginBottom: '25px' }}>🔗 Essential Crypto Tools</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
          <div style={{ borderLeft: '3px solid #20B8CD', paddingLeft: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>adBTC Faucet</div>
            <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>Earn free BTC by viewing ads.</p>
            <a href="https://adbtc.top/r/l/3483445" target="_blank" style={{ color: '#20B8CD', fontSize: '13px', fontWeight: 'bold' }}>Open Website →</a>
          </div>
          <div style={{ borderLeft: '3px solid #22c55e', paddingLeft: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>FaucetPay</div>
            <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>The ultimate micro-wallet.</p>
            <a href="https://faucetpay.io/?r=103328" target="_blank" style={{ color: '#22c55e', fontSize: '13px', fontWeight: 'bold' }}>Open Website →</a>
          </div>
          <div style={{ borderLeft: '3px solid #facc15', paddingLeft: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>PrizeBear</div>
            <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px 0' }}>Extra surveys and rewards.</p>
            <a href="https://prizebear.com/?ref=0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7" target="_blank" style={{ color: '#facc15', fontSize: '13px', fontWeight: 'bold' }}>Open Website →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
