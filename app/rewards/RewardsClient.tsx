'use client';

import React, { useEffect, useState } from 'react';
import { useWallets, useConnectWallet } from '@web3-onboard/react';

export default function RewardsClient() {
  const connectedWallets = useWallets();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [offers, setOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [comboId, setComboId] = useState('');

  const address = connectedWallets?.[0]?.accounts?.[0]?.address;

  useEffect(() => {
    if (address) {
      const referrer = typeof window !== 'undefined' ? localStorage.getItem('arb_inc_referrer') || 'none' : 'none';
      setComboId(`${address}--ref--${referrer}`);
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

  const timeWallUrl = comboId 
    ? `https://timewall.io/widget/v2/678fdb164b161a3c?userid=${comboId}`
    : `https://timewall.io/widget/v2/678fdb164b161a3c`;

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '40px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(to right, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Ecosystem Rewards
      </h2>
      
      <div style={{ margin: '20px 0' }}>
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#EC4899', color: 'white', padding: '12px 24px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            🔗 Connect Wallet to Track Points
          </button>
        ) : (
          <div style={{ padding: '10px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '10px', display: 'inline-block' }}>
            <span style={{ color: '#EC4899' }}>🟢 Tracking: {address.slice(0,6)}...{address.slice(-4)}</span>
          </div>
        )}
      </div>

      <section style={{ background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #333', marginTop: '30px' }}>
        <h3 style={{ color: '#EC4899' }}>💰 TimeWall Instant Payouts</h3>
        <div style={{ width: '100%', height: '600px', background: '#000', borderRadius: '15px', marginTop: '20px' }}>
          {address ? (
            <iframe src={timeWallUrl} style={{ width: '100%', height: '100%', border: 'none' }} />
          ) : (
            <div style={{ paddingTop: '200px', color: '#555' }}>Connect wallet to unlock TimeWall</div>
          )}
        </div>
      </section>
    </div>
  );
}
