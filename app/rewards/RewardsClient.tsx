'use client';

import React, { useEffect, useState } from 'react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { useSearchParams } from 'next/navigation';

interface Offer { title: string; link: string; }
interface Leader { address: string; points: number; }

export default function RewardsClient() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const searchParams = useSearchParams();
  
  const [offers, setOffers] = useState<Offer[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const [claimableBnb, setClaimableBnb] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState('');

  const address = wallet?.accounts?.[0]?.address || connectedWallets?.[0]?.accounts?.[0]?.address;

  const fetchRewardsData = async () => {
    if (!address) return;
    try {
      const ref = searchParams?.get('ref');
      let url = `/api/rewards/stats?wallet=${address.toLowerCase()}`;
      if (ref) url += `&ref=${ref.toLowerCase()}`;

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.claimable !== undefined) setClaimableBnb(data.claimable);
      if (data.points !== undefined) setUserPoints(data.points);
      if (data.referralCount !== undefined) setReferralCount(data.referralCount);
      if (data.referralEarnings !== undefined) setReferralEarnings(data.referralEarnings);
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
  }, [address, searchParams]);

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
      
      {/* 1. REFERRAL - DINAMICO */}
      <div style={{ background: '#1e1b4b', border: '1px solid #4338ca', padding: '25px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Invite & Earn 10% 🚀</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '10px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#818cf8' }}>{referralCount}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Friends Invited</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '10px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{referralEarnings.toFixed(2)}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Points Earned</div>
            </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
          Get <b>10% commission</b> on all points earned by your friends. Forever.
        </p>

        {!address ? (
          <button onClick={() => connect()} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Connect to Get Link</button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
                <input readOnly value={referralLink} style={{ background: '#000', color: '#818cf8', padding: '10px', borderRadius: '5px', width: '60%', border: '1px solid #333', fontSize: '12px' }} />
                <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} style={{ background: '#4f46e5', border: 'none', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', minWidth: '80px' }}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <p style={{ fontSize: '11px', color: '#4338ca', marginTop: '5px' }}>Share this link to grow your dividends share!</p>
          </div>
        )}
      </div>

      {/* 2. DIVIDENDS BOX */}
      <div style={{ background: 'linear-gradient(135deg, #2e1065, #000)', border: '1px solid #a78bfa', padding: '30px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#a78bfa', margin: '0 0 15px 0' }}>💎 BNB Dividends Pool</h2>
        <p style={{ color: '#cbd5e1', fontSize: '15px', marginBottom: '25px', lineHeight: '1.6' }}>
          Boost your rank to increase your share of the BNB trading fees!<br/><br/><b>🟣 Active DEX Rewards:</b><br/>🔄 Swap: <b>+100 Pts</b> &nbsp;|&nbsp; ⚡ Zap: <b>+150 Pts</b> &nbsp;|&nbsp; 🎯 Limit Order: <b>+200 Pts</b><br/>
          <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>Points = Claim Power.</span>
        </p>

        <div style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '5px' }}>{address ? claimableBnb.toFixed(6) : "0.000000"} BNB</div>
        <p style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '25px' }}>Your Total Points: {address ? Math.round(userPoints).toLocaleString('en-US') : "0"}</p>
        
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#a78bfa', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>CONNECT WALLET TO START</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={handleClaim} 
              disabled={claimLoading || claimableBnb < 0.002} 
              style={{ 
                background: claimableBnb < 0.002 ? '#222' : '#a78bfa', 
                color: claimableBnb < 0.002 ? '#666' : 'white', 
                border: claimableBnb < 0.002 ? '1px solid #444' : 'none', 
                padding: '15px 40px', 
                borderRadius: '8px', 
                cursor: claimableBnb < 0.002 ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold' 
              }}
            >
              {claimLoading ? 'Processing...' : claimableBnb < 0.002 ? 'MIN. 0.002 BNB TO CLAIM' : 'CLAIM BNB NOW'}
            </button>
            
            {claimableBnb < 0.002 && (
              <div style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '450px', lineHeight: '1.4', marginTop: '5px' }}>
                <span style={{ color: '#facc15' }}>⚠️ Security Note:</span> A minimum threshold of 0.002 BNB is required to cover blockchain gas fees.
              </div>
            )}
          </div>
        )}
        {claimStatus && <p style={{ fontSize: '12px', marginTop: '10px', color: claimStatus.includes('✅') ? '#10b981' : '#ef4444' }}>{claimStatus}</p>}
      </div>

      {/* 3. DIAMOND VS PAPER HANDS */}
      <div style={{ background: '#000', border: '1px solid #333', padding: '25px', borderRadius: '16px', marginBottom: '30px' }}>
        <h3 style={{ textAlign: 'center', color: '#10b981', marginTop: 0 }}>🛡️ Diamond Hands Protection</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10b981', padding: '15px', borderRadius: '12px' }}>
            <h4 style={{ color: '#10b981', margin: '0 0 10px 0' }}>✅ Diamond Status</h4>
            <p style={{ fontSize: '13px', color: '#a7f3d0' }}>Hold 2M+ Tokens: Earn 10pt/1M automatically every 15 minutes.</p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #ef4444', padding: '15px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>🩸 Paper Hands Penalty</h4>
            <p style={{ fontSize: '13px', color: '#fca5a5' }}>If you sell after being Diamond: lose 5% of your points every 15 mins.</p>
          </div>
        </div>
      </div>

      {/* 4. NATIVE TASKS */}
      <h3 style={{ color: '#f472b6', marginBottom: '5px' }}>🪂 Earn Extra Points</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {offers.map((off, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{off.title}</div>
            <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: '#111', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'inline-block' }}>Complete Task (+250 Pts) →</a>
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
                <th style={{ padding: '10px', textAlign: 'right' }}>POINTS</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222', background: address?.toLowerCase() === u.address.toLowerCase() ? 'rgba(250,204,21,0.05)' : 'transparent' }}>
                  <td style={{ padding: '10px', color: i < 3 ? '#facc15' : '#fff' }}>#{i + 1}</td>
                  <td style={{ padding: '10px', fontSize: '12px', fontFamily: 'monospace' }}>{u.address.slice(0,6)}...{u.address.slice(-4)}</td>
                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>{Math.round(u.points).toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
