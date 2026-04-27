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
  
  // NUOVE STATO PER BNB REWARDS
  const [claimableBnb, setClaimableBnb] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState('');

  const address = wallet?.accounts?.[0]?.address || connectedWallets?.[0]?.accounts?.[0]?.address;

  // FUNZIONE PER CARICARE I BNB (NUOVA)
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

  // 1. CATTURA REFERRAL (Tua logica originale)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        window.localStorage.setItem('arb_inc_referrer', ref);
      }
    }
  }, []);

  // 2. CARICA STATISTICHE (Tua logica originale + refresh BNB)
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
        
        // Se il wallet è connesso, carichiamo anche i BNB claimabili
        if (address) fetchRewardsData();
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    };

    fetchStats();
  }, [address]);

  // LOGICA PER IL CLAIM (NUOVA)
  const handleClaim = async () => {
    if (!address) return;
    setClaimLoading(true);
    setClaimStatus('Processing transaction...');
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address }),
      });
      const resData = await res.json();
      if (resData.success) {
        setClaimStatus(`✅ Success! TX: ${resData.hash.substring(0, 10)}...`);
        fetchRewardsData(); // Reset del contatore BNB
      } else {
        setClaimStatus(`❌ Error: ${resData.error}`);
      }
    } catch (e) {
      setClaimStatus('❌ Network error');
    }
    setClaimLoading(false);
  };

  const referralLink = address ? `${window.location.origin}/rewards?ref=${address}` : '';

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* 1. REFERRAL BOX (Originale) */}
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

      {/* 2. DIVIDENDS BOX (Aggiunto) */}
      {address && (
        <div style={{ background: 'linear-gradient(135deg, #2e1065 0%, #000 100%)', border: '1px solid #a78bfa', padding: '25px', borderRadius: '16px', textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ color: '#a78bfa', margin: '0 0 5px 0' }}>💎 Your BNB Dividends</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>{claimableBnb.toFixed(6)} BNB</div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Based on {userPoints.toLocaleString()} points</p>
          
          <button 
            onClick={handleClaim} 
            disabled={claimLoading || claimableBnb < 0.005}
            style={{ 
              background: claimableBnb < 0.005 ? '#333' : '#a78bfa', 
              color: 'white', 
              border: 'none', 
              padding: '12px 40px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              cursor: claimableBnb < 0.005 ? 'not-allowed' : 'pointer'
            }}
          >
            {claimLoading ? 'Processing...' : claimableBnb < 0.005 ? 'Min. 0.005 BNB to Claim' : 'CLAIM BNB NOW'}
          </button>
          {claimStatus && <p style={{ fontSize: '12px', marginTop: '10px', color: '#a78bfa' }}>{claimStatus}</p>}
        </div>
      )}

      {/* 3. NATIVE TASKS (Originale) */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#f472b6', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>🪂 Native Rewards</h3>
          {!address && <span style={{ color: '#f472b6', fontSize: '12px', background: 'rgba(244,114,182,0.1)', padding: '4px 10px', borderRadius: '20px' }}>Connect wallet to track progress</span>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {loading ? <p>Scanning for rewards... ⏳</p> : offers.length > 0 ? offers.map((off, i) => (
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

      {/* 4. ESSENTIAL TOOLS (Originale) */}
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

      {/* 5. LEADERBOARD (Originale - mostra tutti) */}
      <div style={{ background: '#111', border: '1px solid #333', borderRadius: '20px', padding: '30px' }}>
        <h3 style={{ color: '#facc15', marginTop: 0, marginBottom: '20px', textTransform: 'uppercase' }}>🏆 Top Farmers</h3>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#666', fontSize: '12px', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>RANK</th>
                <th style={{ padding: '10px' }}>ADDRESS</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>POINTS</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222', background: address?.toLowerCase() === user.address.toLowerCase() ? 'rgba(250,204,21,0.05)' : 'transparent' }}>
                  <td style={{ padding: '12px', color: i < 3 ? '#facc15' : '#fff' }}>#{i + 1}</td>
                  <td style={{ padding: '12px', fontSize: '13px', fontFamily: 'monospace' }}>
                    {user.address.slice(0,6)}...{user.address.slice(-4)}
                    {address?.toLowerCase() === user.address.toLowerCase() && <span style={{ marginLeft: '8px', color: '#facc15', fontSize: '10px' }}>(YOU)</span>}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>{user.points.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
