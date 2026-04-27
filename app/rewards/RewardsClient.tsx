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
          <button onClick={() => connect()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Connect to Get Link</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input readOnly value={referralLink} style={{ background: '#000', color: '#818cf8', padding: '10px', borderRadius: '5px', width: '60%' }} />
            <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} style={{ background: '#4f46e5', border: 'none', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
        )}
      </div>

      {/* 2. DIVIDENDS BOX (Aggiornato con testo esplicativo) */}
      <div style={{ background: 'linear-gradient(135deg, #2e1065, #000)', border: '1px solid #a78bfa', padding: '25px', borderRadius: '16px', textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#a78bfa', margin: '0 0 15px 0', fontSize: '26px' }}>💎 BNB Dividends Pool</h3>
        
        <p style={{ fontSize: '15px', color: '#e2e8f0', marginBottom: '25px', maxWidth: '700px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
          All points generated from <b>Auto-Staking, Swaps, Native Tasks, and Referrals</b> automatically increase your share of the BNB collected from platform trading fees!
        </p>

        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff' }}>{address ? claimableBnb.toFixed(6) : "0.000000"} BNB</div>
        <p style={{ fontSize: '14px', color: '#a78bfa', marginBottom: '20px', fontWeight: 'bold' }}>Your Total Points: {address ? userPoints.toLocaleString() : "0"}</p>
        
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#a78bfa', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            CONNECT WALLET TO CLAIM
          </button>
        ) : (
          <button onClick={handleClaim} disabled={claimLoading || claimableBnb < 0.005} style={{ background: claimableBnb < 0.005 ? '#333' : '#a78bfa', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            {claimLoading ? 'Processing...' : 'CLAIM BNB NOW'}
          </button>
        )}
        {claimStatus && <p style={{ fontSize: '13px', marginTop: '15px', color: '#a78bfa' }}>{claimStatus}</p>}
      </div>

      {/* 3. VIRTUAL STAKING INFO BOX */}
      <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #000 100%)', border: '1px solid #10b981', padding: '20px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>🏦 Auto-Staking (Hold to Earn Points)</h3>
        <p style={{ fontSize: '14px', color: '#a7f3d0', marginBottom: '15px' }}>
          No lock-ups. No gas fees for staking. Keep your tokens safe in your wallet!
        </p>
        <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed #10b981', padding: '12px 20px', borderRadius: '8px', fontSize: '13px', color: '#fff' }}>
          Hold at least <b>2,000,000 tokens</b>.<br/> 
          Our system auto-scans the blockchain and airdrops you <b>1,000 Points per 1M tokens</b> continuously!
        </div>
      </div>

      {/* 4. NATIVE TASKS */}
      <h3 style={{ color: '#f472b6', marginBottom: '15px' }}>🪂 Native Rewards (Complete to Earn Points)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {offers.map((off, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
            <div style={{ fontWeight: 'bold' }}>{off.title}</div>
            <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'none', fontWeight: 'bold', display: 'block', marginTop: '10px' }}>
              Complete →
            </a>
          </div>
        ))}
      </div>

      {/* 5. LEADERBOARD */}
      <div style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ color: '#facc15' }}>🏆 Top 100 Farmers</h3>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#666', textAlign: 'left', fontSize: '12px', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>RANK</th>
                <th style={{ padding: '10px' }}>WALLET</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>POINTS</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222', background: address?.toLowerCase() === u.address.toLowerCase() ? 'rgba(250,204,21,0.05)' : 'transparent' }}>
                  <td style={{ padding: '10px', color: i < 3 ? '#facc15' : '#fff' }}>#{i + 1}</td>
                  <td style={{ padding: '10px', fontSize: '12px', fontFamily: 'monospace' }}>
                    {u.address.slice(0,6)}...{u.address.slice(-4)}
                    {address?.toLowerCase() === u.address.toLowerCase() && <span style={{ marginLeft: '8px', color: '#facc15', fontSize: '10px' }}>(YOU)</span>}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>{u.points.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
