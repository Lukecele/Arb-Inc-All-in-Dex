'use client';

import React, { useEffect, useState } from 'react';
import { useWallets, useConnectWallet } from '@web3-onboard/react';

// Tipo per le nostre offerte
type Offer = { title: string; link: string; image: string | null };

export default function RewardsClient() {
  const connectedWallets = useWallets();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);

  const address = connectedWallets?.[0]?.accounts?.[0]?.address;
  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  // Quando l'utente si connette, andiamo a pescare le offerte dalla NOSTRA Api
  useEffect(() => {
    if (address) {
      setLoadingOffers(true);
      fetch(`/api/offers?wallet=${address}`)
        .then(res => res.json())
        .then(data => {
          if (data.offers) setOffers(data.offers);
          setLoadingOffers(false);
        })
        .catch(err => {
          console.error("Errore nel caricamento offerte", err);
          setLoadingOffers(false);
        });
    } else {
      setOffers([]);
    }
  }, [address]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Banner Cointraffic TOP */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px', minHeight: '250px' }}>
        <span id="ct_cmykXXKHPsy"></span>
      </div>

      <h1 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
        Ecosystem Rewards
      </h1>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>
        Earn instant crypto or farm points for the upcoming $ARB-INC Airdrop.
      </p>

      {/* --- ZONA WALLET INTERATTIVA --- */}
      <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {!address ? (
          <button 
            onClick={() => connect()}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: 'white', border: 'none', padding: '12px 28px',
              borderRadius: '100px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)'
            }}
          >
            🔗 Connect Wallet to Track Points
          </button>
        ) : (
          <>
            <span style={{ fontSize: '14px', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(236, 72, 153, 0.3)', fontWeight: 'bold' }}>
              🟢 Tracking to: {displayAddress}
            </span>
            <button onClick={() => disconnect(wallet!)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
              Disconnect
            </button>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginBottom: '40px' }}>

        {/* 1. NATIVE AIRDROP WALL (Ex CPAGrip Iframe) */}
        <section style={{ background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(5, 5, 8, 0) 100%)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '30px', borderRadius: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', color: '#EC4899', margin: 0 }}>🪂 $ARB-INC Native Tasks</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>Complete tasks to farm airdrop points.</p>
          </div>
          
          {!address ? (
            /* STATO BLOCCATO */
            <div style={{ width: '100%', height: '250px', borderRadius: '20px', backgroundColor: 'rgba(236, 72, 153, 0.02)', border: '1px dashed rgba(236, 72, 153, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '48px', marginBottom: '15px' }}>🔒</span>
              <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>Wallet Required</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '350px', marginBottom: '25px', lineHeight: '1.5' }}>Connect your Web3 wallet to load your localized tasks.</p>
              <button onClick={() => connect()} style={{ background: '#EC4899', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer' }}>Unlock Tasks</button>
            </div>
          ) : loadingOffers ? (
            /* STATO CARICAMENTO */
            <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#EC4899' }}>
              <h3>Loading localized tasks... ⏳</h3>
            </div>
          ) : offers.length === 0 ? (
            /* NESSUNA OFFERTA TROVATA */
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
              <p>No tasks currently available in your region. Check back later!</p>
            </div>
          ) : (
            /* LE NUOVE CARD MAGICHE */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {offers.map((offer, index) => (
                <div key={index} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {offer.image && <img src={offer.image} alt="Task" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />}
                    <h3 style={{ fontSize: '16px', color: 'white', marginBottom: '10px', lineHeight: '1.4' }}>{offer.title}</h3>
                  </div>
                  <a href={offer.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899', border: '1px solid #EC4899', padding: '10px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', marginTop: '15px', transition: 'all 0.2s' }}>
                    Complete Task →
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* 2. TIMEWALL (Intatto) */}
        <section style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '30px', borderRadius: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#8B5CF6', marginBottom: '15px', textAlign: 'center' }}>💰 Instant Payouts</h2>
          <div style={{ width: '100%', height: '800px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <iframe src="https://timewall.io/widget/v2/678fdb164b161a3c" style={{ width: '100%', height: '100%', border: 'none' }} title="TimeWall" />
          </div>
        </section>

      </div>

      {/* 3. ESSENTIAL TOOLS (Intatti) */}
      <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px', color: 'white' }}>🔗 Essential Tools</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#8B5CF6' }}>Daily BTC Faucet</h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '15px' }}>Earn free Bitcoin by viewing ads.</p>
          <a href="https://r.adbtc.top/3494539" target="_blank" style={{ display: 'inline-block', backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8B5CF6', color: '#8B5CF6', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', width: '100%' }}>Open adBTC →</a>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#0052ff' }}>Micro-Wallet</h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '15px' }}>Withdraw your TimeWall earnings here.</p>
          <a href="https://faucetpay.io/?r=5296764" target="_blank" style={{ display: 'inline-block', backgroundColor: 'rgba(0, 82, 255, 0.1)', border: '1px solid #0052ff', color: '#0052ff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', width: '100%' }}>Open FaucetPay →</a>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#F59E0B' }}>Bonus: PrizeBear</h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '15px' }}>Complete extra surveys for more rewards.</p>
          <a href="https://prizebear.com/r/OPKQLG" target="_blank" style={{ display: 'inline-block', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B', color: '#F59E0B', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', width: '100%' }}>Open PrizeBear →</a>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '50px 0', minHeight: '250px' }}>
        <span id="ct_c83XILwXy4d"></span>
      </div>

    </div>
  );
}
