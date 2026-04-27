'use client';

import React, { useEffect, useState } from 'react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';

interface Offer { title: string; link: string; }
interface Leader { address: string; points: number; }

export default function RewardsClient() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
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
    } catch (err) { console.error(err); }
  };

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
      } catch (err) { console.error(err); }
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
    <div style={{ color: 'white', fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* 1. REFERRAL */}
      <div style={{ background: '#1e1b4b', border: '1px solid #4338ca', padding: '25px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Invite & Earn 10% 🚀</h3>
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Connect to Get Link</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input readOnly value={referralLink} style={{ background: '#000', color: '#818cf8', padding: '10px', borderRadius: '5px', width: '60%', border: '1px solid #333' }} />
            <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} style={{ background: '#4f46e5', border: 'none', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
        )}
      </div>

      {/* 2. DIVIDENDS BOX */}
      <div style={{ background: 'linear-gradient(135deg, #2e1065, #000)', border: '1px solid #a78bfa', padding: '30px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#a78bfa', margin: '0 0 15px 0' }}>💎 BNB Dividends Pool</h2>
        <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
          Tutti i punti accumulati aumentano la tua quota dei BNB raccolti dalle tasse di trading.<br/>
          <b>Punti = Potere di Claim.</b>
        </p>

        <div style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '5px' }}>{address ? claimableBnb.toFixed(6) : "0.000000"} BNB</div>
        <p style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '25px' }}>I tuoi Punti Totali: {address ? userPoints.toLocaleString() : "0"}</p>
        
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#a78bfa', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>CONNECT WALLET TO START</button>
        ) : (
          <button onClick={handleClaim} disabled={claimLoading || claimableBnb < 0.005} style={{ background: claimableBnb < 0.005 ? '#333' : '#a78bfa', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {claimLoading ? 'Processing...' : 'CLAIM BNB NOW'}
          </button>
        )}
        {claimStatus && <p style={{ fontSize: '12px', marginTop: '10px' }}>{claimStatus}</p>}
      </div>

      {/* 3. DIAMOND VS PAPER HANDS (Coerente con V3) */}
      <div style={{ background: '#000', border: '1px solid #333', padding: '25px', borderRadius: '16px', marginBottom: '30px' }}>
        <h3 style={{ textAlign: 'center', color: '#10b981', marginTop: 0 }}>🛡️ Diamond Hands Protection</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10b981', padding: '15px', borderRadius: '12px' }}>
            <h4 style={{ color: '#10b981', margin: '0 0 10px 0' }}>✅ Diamond Status</h4>
            <p style={{ fontSize: '13px', color: '#a7f3d0' }}>Hold 2M+ Token: Guadagni 10pt/1M ogni 15 minuti in automatico.</p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #ef4444', padding: '15px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>🩸 Paper Hands Penalty</h4>
            <p style={{ fontSize: '13px', color: '#fca5a5' }}>Se vendi dopo essere stato Diamond: perdi il 5% dei punti ogni 15 min.</p>
          </div>
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid #3b82f6', padding: '15px', borderRadius: '12px', gridColumn: '1 / -1' }}>
            <h4 style={{ color: '#3b82f6', margin: '0 0 10px 0' }}>🛡️ Task Safe Zone</h4>
            <p style={{ fontSize: '13px', color: '#93c5fd' }}>Non hai mai holdato 2M token? I tuoi punti dalle task sono <b>protetti al 100%</b> e non scadranno mai.</p>
          </div>
        </div>
      </div>

      {/* 4. NATIVE TASKS */}
      <h3 style={{ color: '#f472b6', marginBottom: '15px' }}>🪂 Guadagna Punti Extra</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {offers.map((off, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{off.title}</div>
            <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ color: '#f472b6', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Vai alla Task →</a>
          </div>
        ))}
      </div>

      {/* 5. LEADERBOARD */}
      <div style={{ background: '#111', border: '1px solid #333', padding: '25px', borderRadius: '16px' }}>
        <h3 style={{ color: '#facc15', marginTop: 0 }}>🏆 Top 100 Farmers</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#666', textAlign: 'left', fontSize: '12px', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>RANK</th>
                <th style={{ padding: '10px' }}>WALLET</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>PUNTI</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222', background: address?.toLowerCase() === u.address.toLowerCase() ? 'rgba(250,204,21,0.05)' : 'transparent' }}>
                  <td style={{ padding: '10px', color: i < 3 ? '#facc15' : '#fff' }}>#{i + 1}</td>
                  <td style={{ padding: '10px', fontSize: '12px', fontFamily: 'monospace' }}>{u.address.slice(0,6)}...{u.address.slice(-4)}</td>
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
