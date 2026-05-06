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
  const [globalApr, setGlobalApr] = useState('...');

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
    if (address) fetchRewardsData();

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
      } catch (err) { console.error("Error fetching generic data:", err); }

      try {
        const resApr = await fetch('/api/apr');
        if (resApr.ok) {
            const dataApr = await resApr.json();
            if (dataApr.apr) setGlobalApr(dataApr.apr + '%');
        }
      } catch(e) { console.error("Error fetching APR:", e); }

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
    <div  style={{ color: 'white', fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', width: '100%', boxSizing: 'border-box', margin: '0 auto', overflowX: 'hidden', overflowWrap: 'break-word' }}>
      
      {/* 1. REFERRAL */}
      <div style={{ background: '#1e1b4b', border: '1px solid #4338ca', padding: '25px', boxSizing: 'border-box', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
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
          </div>
        )}
      </div>

      {/* 2. DIVIDENDS BOX */}
      <div style={{ background: 'linear-gradient(135deg, #2e1065, #000)', border: '1px solid #a78bfa', padding: '30px', boxSizing: 'border-box', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#a78bfa', margin: '0 0 15px 0' }}>💎 BNB Dividends Pool</h2>
        <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '25px', lineHeight: '1.6' }}>
          The Treasury is fueled by 3 powerful streams: <b>4% Token Tax (Buy/Sell)</b>, <b>0.1% DEX Fees</b>, and <b>Free Tasks Income</b>.<br/>
          <b>100%</b> of this revenue goes to the Treasury: <b>80%</b> distributed to Holders and <b>20%</b> reserved for project growth.<br/><br/>
          <b>🟣 Active DEX Rewards <span style={{ color: '#a78bfa', fontSize: '13px', fontWeight: 'normal' }}>(0.1% Fee)</span>:</b><br/>
          🔄 Swap: <b>+100 Pts</b> | ⚡ Zap: <b>+150 Pts</b> | 🎯 Limit: <b>+200 Pts</b>
        </p>

        <div style={{ background: 'rgba(250, 204, 21, 0.1)', border: '1px solid #facc15', padding: '15px 30px', borderRadius: '12px', display: 'inline-block', marginBottom: '25px' }}>
            <div style={{ fontSize: '13px', color: '#facc15', textTransform: 'uppercase', fontWeight: 'bold' }}>Real-Time Global APR</div>
            <div style={{ fontSize: '38px', color: '#fff', fontWeight: '900' }}>{globalApr} 🔥</div>
        </div>

        <div style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '5px' }}>{address ? claimableBnb.toFixed(6) : "0.000000"} BNB</div>
        <p style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '25px' }}>Your Points: {address ? Math.round(userPoints).toLocaleString('en-US') : "0"}</p>
        
        {!address ? (
          <button onClick={() => connect()} style={{ background: '#a78bfa', color: 'white', border: 'none', padding: '15px 20px', width: '100%', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>CONNECT WALLET TO START</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={handleClaim} 
              disabled={claimLoading || claimableBnb < 0.001} 
              style={{ 
                background: claimableBnb < 0.001 ? '#222' : '#a78bfa', 
                color: 'white', 
                padding: '15px 20px', width: '100%', 
                borderRadius: '8px', 
                cursor: claimableBnb < 0.001 ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold' 
              }}
            >
              {claimLoading ? 'Processing...' : claimableBnb < 0.001 ? 'MIN. 0.001 BNB TO CLAIM' : 'CLAIM BNB NOW'}
            </button>
          </div>
        )}
      </div>

      {/* 3. DIAMOND VS PAPER HANDS */}
      <div style={{ background: '#000', border: '1px solid #333', padding: '25px', boxSizing: 'border-box', borderRadius: '16px', marginBottom: '30px' }}>
        <h3 style={{ textAlign: 'center', color: '#10b981', marginTop: 0 }}>🛡️ Diamond Hands Protection</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10b981', padding: '15px', borderRadius: '12px' }}>
            <h4 style={{ color: '#10b981', margin: '0 0 10px 0' }}>✅ Diamond Status</h4>
            <p style={{ fontSize: '13px', color: '#a7f3d0' }}>No minimum holding. Every token generates points every 15 minutes. High holding = High Points.</p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid #ef4444', padding: '15px', borderRadius: '12px' }}>
            <h4 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>🩸 Paper Hands Penalty</h4>
            <p style={{ fontSize: '13px', color: '#fca5a5' }}>If you sell: lose 5% of your points every 15 mins. Protect your rank!</p>
          </div>
        </div>
      </div>

      {/* 4. NATIVE TASKS (RIpristinate!) */}
      <h3 style={{ color: '#f472b6', marginBottom: '5px' }}>🪂 Earn Extra Points</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px', marginBottom: '40px' }}>
        {offers.map((off, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{off.title}</div>
            <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: '#111', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', display: 'inline-block' }}>Complete Task (+250 Pts) →</a>
          </div>
        ))}
      </div>

      {/* 5. LEADERBOARD */}
      <div style={{ background: '#111', border: '1px solid #333', padding: '25px', boxSizing: 'border-box', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: '#facc15', margin: 0 }}>🏆 Top 100 Farmers</h3>
          <span style={{ fontSize: '11px', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '20px', border: '1px solid #333' }}>
             Reset: 1st & 15th of month
          </span>
        </div>
        <p style={{ fontSize: '10px', color: '#6b7280', marginBottom: '10px', lineHeight: '1.5' }}>⚠️ The wallet marked as <strong style={{ color: '#a855f7' }}>Team</strong> belongs to the protocol founder. It participates in the leaderboard and receives a 0.1% DEX commission. All participation is transparent and on-chain verifiable.</p>
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
              {leaderboard.map((u, i) => {
                const isMe = address?.toLowerCase() === u.address.toLowerCase();
                return (
                  <tr key={i} style={{ 
                    borderBottom: '1px solid #222', 
                    background: isMe ? 'rgba(250, 204, 21, 0.2)' : 'transparent',
                    borderLeft: isMe ? '4px solid #facc15' : 'none'
                  }}>
                    <td style={{ padding: '10px', color: i < 3 ? '#facc15' : '#fff' }}>#{i + 1}</td>
                    <td style={{ padding: '10px', fontSize: '12px', fontFamily: 'monospace' }}>
                      {u.address.slice(0,6)}...{u.address.slice(-4)}
                      {u.address.toLowerCase().startsWith('0xaff5') && u.address.toLowerCase().endsWith('04e7') && (
                        <span style={{ marginLeft: '6px', fontSize: '10px', background: 'rgba(168,85,247,0.15)', color: '#a855f7', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(168,85,247,0.35)' }}>Team</span>
                      )}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>{Math.round(u.points).toLocaleString('en-US')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
