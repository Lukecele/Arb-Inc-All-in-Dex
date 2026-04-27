'use client';

import React, { useEffect, useState } from 'react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { ethers } from 'ethers';

interface Offer { title: string; link: string; }
interface Leader { address: string; points: number; }

export default function RewardsClient() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // STATO PER BNB REWARDS
  const [claimableBnb, setClaimableBnb] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState('');

  const address = wallet?.accounts?.[0]?.address || connectedWallets?.[0]?.accounts?.[0]?.address;

  // Carica i BNB accumulati
  const fetchRewardsData = async () => {
    if (!address) return;
    try {
      const res = await fetch(`/api/rewards/stats?wallet=${address.toLowerCase()}`);
      const data = await res.json();
      if (data.claimable !== undefined) setClaimableBnb(data.claimable);
      if (data.points !== undefined) setUserPoints(data.points);
    } catch (err) {
      console.error("Error fetching rewards stats:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) window.localStorage.setItem('arb_inc_referrer', ref);
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const fetchWallet = address || '0x0000000000000000000000000000000000000000';
      try {
        const resOffers = await fetch(`/api/offers?wallet=${fetchWallet}`);
        const dataOffers = await resOffers.json();
        if (dataOffers.offers) setOffers(dataOffers.offers);

        const resLeader = await fetch(`/api/leaderboard`);
        const dataLeader = await resLeader.json();
        if (dataLeader.leaderboard) setLeaderboard(dataLeader.leaderboard);
        
        if (address) fetchRewardsData();
      } catch (err) { console.error("Fetch error:", err); }
      setLoading(false);
    };
    fetchStats();
  }, [address]);

  const handleClaim = async () => {
    if (!address) return;
    setClaimLoading(true);
    setClaimStatus('Processing...');
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address }),
      });
      const resData = await res.json();
      if (resData.success) {
        setClaimStatus(`✅ Hash: ${resData.hash.substring(0, 10)}...`);
        fetchRewardsData();
      } else {
        setClaimStatus(`❌ ${resData.error}`);
      }
    } catch (e) { setClaimStatus('❌ Error'); }
    setClaimLoading(false);
  };

  const referralLink = address ? `${window.location.origin}/rewards?ref=${address}` : '';

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      {/* 1. REFERRAL */}
      <div style={{ background: '#1e1b4b', border: '1px solid #4338ca', padding: '25px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h3>Invite & Earn 10% 🚀</h3>
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px' }}>Connect</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input readOnly value={referralLink} style={{ background: '#000', color: '#818cf8', padding: '10px', borderRadius: '5px', width: '60%' }} />
            <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} style={{ background: '#4f46e5', border: 'none', color: 'white', padding: '10px', borderRadius: '5px' }}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
        )}
      </div>

      {/* 2. DIVIDENDS BOX */}
      {address && (
        <div style={{ background: 'linear-gradient(135deg, #2e1065, #000)', border: '1px solid #a78bfa', padding: '25px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#a78bfa' }}>💎 Your BNB Dividends</h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{claimableBnb.toFixed(6)} BNB</div>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Points: {userPoints}</p>
          <button onClick={handleClaim} disabled={claimLoading || claimableBnb < 0.005} style={{ background: claimableBnb < 0.005 ? '#333' : '#a78bfa', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
            {claimLoading ? 'Wait...' : 'CLAIM BNB'}
          </button>
          {claimStatus && <p style={{ fontSize: '10px', marginTop: '10px' }}>{claimStatus}</p>}
        </div>
      )}

      {/* 3. NATIVE TASKS */}
      <h3 style={{ color: '#f472b6' }}>🪂 Native Rewards</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {offers.map((off, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
            <div>{off.title}</div>
            <a href={off.link} target="_blank" style={{ color: '#f472b6', textDecoration: 'none', fontWeight: 'bold', display: 'block', marginTop: '10px' }}>Complete →</a>
          </div>
        ))}
      </div>

      {/* 4. LEADERBOARD */}
      <div style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ color: '#facc15' }}>🏆 Top 100 Farmers</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ color: '#666', textAlign: 'left' }}><th>#</th><th>Wallet</th><th style={{ textAlign: 'right' }}>Points</th></tr></thead>
          <tbody>
            {leaderboard.map((u, i) => (
              <tr key={i} style={{ borderTop: '1px solid #222', background: address?.toLowerCase() === u.address.toLowerCase() ? '#222' : 'transparent' }}>
                <td style={{ padding: '10px' }}>{i + 1}</td>
                <td style={{ padding: '10px', fontSize: '12px' }}>{u.address.slice(0,6)}...{u.address.slice(-4)}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>{u.points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
