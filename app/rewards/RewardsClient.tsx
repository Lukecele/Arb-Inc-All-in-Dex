'use client';

import React, { useEffect, useState } from 'react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import Script from 'next/script';

interface Offer { title: string; link: string; }

export default function RewardsClient() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const address = wallet?.accounts?.[0]?.address || connectedWallets?.[0]?.accounts?.[0]?.address;

  useEffect(() => {
    const fetchWallet = address || '0x0000000000000000000000000000000000000000';
    setLoadingOffers(true);
    fetch(`/api/offers?wallet=${fetchWallet}`)
      .then(res => res.json())
      .then(data => {
        if (data.offers) setOffers(data.offers);
        setLoadingOffers(false);
      })
      .catch(() => setLoadingOffers(false));
  }, [address]);

  const referralLink = address ? `${window.location.origin}/rewards?ref=${address}` : '';

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* 1. REFERRAL BOX (LIFETIME 10% CLARIFICATION) */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #000 100%)', border: '1px solid #4338ca', padding: '30px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Invite & Earn 10% Lifetime 🚀</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
          Get <b>10% commission</b> on all points earned by your friends from <b>Swaps, Zaps, and Tasks</b>. Forever.
        </p>
        
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer' }}>
            {connecting ? 'Connecting...' : 'Connect Wallet to Get Referral Link'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input readOnly value={referralLink} style={{ background: '#000', border: '1px solid #333', color: '#818cf8', padding: '12px', borderRadius: '8px', width: '70%', fontSize: '13px' }} />
            <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} 
                    style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {/* 2. NATIVE TASKS (VISIBLE TO ALL) */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#f472b6', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>🪂 Native Rewards</h3>
          {!address && <span style={{ color: '#f472b6', fontSize: '12px', background: 'rgba(244,114,182,0.1)', padding: '4px 10px', borderRadius: '20px' }}>Connect wallet to track progress</span>}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {loadingOffers ? <p>Scanning for rewards... ⏳</p> : offers.length > 0 ? offers.map((off, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '25px', borderRadius: '16px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}>{off.title}</div>
              {address ? (
                <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: 'white', textDecoration: 'none', textAlign: 'center', display: 'block', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>
                  Complete & Earn →
                </a>
              ) : (
                <button onClick={() => connect()} style={{ width: '100%', background: 'transparent', color: '#f472b6', border: '1px solid #f472b6', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Connect Wallet to Earn
                </button>
              )}
            </div>
          )) : <p style={{ color: '#444' }}>No native tasks available right now.</p>}
        </div>
      </div>

      {/* 3. ESSENTIAL TOOLS */}
      <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '30px', marginBottom: '40px' }}>
        <h3 style={{ color: '#20B8CD', marginTop: 0, marginBottom: '25px' }}>🔗 Essential Crypto Tools</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
          <div style={{ borderLeft: '3px solid #20B8CD', paddingLeft: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>adBTC Faucet</div>
            <a href="https://adbtc.top/r/l/3483445" target="_blank" style={{ color: '#20B8CD', fontSize: '13px', fontWeight: 'bold' }}>Open Website →</a>
          </div>
          <div style={{ borderLeft: '3px solid #22c55e', paddingLeft: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>FaucetPay</div>
            <a href="https://faucetpay.io/?r=103328" target="_blank" style={{ color: '#22c55e', fontSize: '13px', fontWeight: 'bold' }}>Open Website →</a>
          </div>
          <div style={{ borderLeft: '3px solid #facc15', paddingLeft: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>PrizeBear</div>
            <a href="https://prizebear.com/?ref=0xaff5340ecfaf7ce049261cff193f5fed6bdf04e7" target="_blank" style={{ color: '#facc15', fontSize: '13px', fontWeight: 'bold' }}>Open Website →</a>
          </div>
        </div>
      </div>

      {/* 4. COINTRAFFIC BANNER (ID 46650) */}
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', color: '#333', letterSpacing: '2px', marginBottom: '10px' }}>ADVERTISEMENT</p>
        <div style={{ minHeight: '90px', display: 'flex', justifyContent: 'center' }}>
          <Script 
            src="https://app.cointraffic.io/js/?w=46650" 
            strategy="lazyOnload" 
          />
        </div>
      </div>

    </div>
  );
}
