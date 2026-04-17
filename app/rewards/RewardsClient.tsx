'use client';

import React from 'react';
import { useWallets, useConnectWallet } from '@web3-onboard/react';

export default function RewardsClient() {
  const connectedWallets = useWallets();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  
  const address = connectedWallets?.[0]?.accounts?.[0]?.address;
  
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : null;

  const trackingId = address || 'guest';
  const cpaGripUrl = `https://singingfiles.com/show.php?id=1890760&s1=${trackingId}`;

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
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              color: 'white',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)'
            }}
          >
            🔗 Connect Wallet to Track Points
          </button>
        ) : (
          <>
            <span style={{ fontSize: '14px', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(236, 72, 153, 0.3)', fontWeight: 'bold' }}>
              🟢 Status: {displayAddress}
            </span>
            <button 
              onClick={() => disconnect(wallet!)}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
            >
              Disconnect
            </button>
          </>
        )}
      </div>
      {/* ------------------------------- */}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginBottom: '40px' }}>

        {/* 1. CPAGRIP (Lucchettato se non connesso) */}
        <section style={{ background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(5, 5, 8, 0) 100%)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '30px', borderRadius: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', color: '#EC4899', margin: 0 }}>🪂 $ARB-INC Airdrop Farming</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>
              Complete tasks to earn points. Offers are geo-targeted.
            </p>
          </div>
          
          {!address ? (
            /* STATO BLOCCATO */
            <div style={{ 
              width: '100%', height: '350px', borderRadius: '20px', 
              backgroundColor: 'rgba(236, 72, 153, 0.02)', 
              border: '1px dashed rgba(236, 72, 153, 0.3)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              padding: '20px', textAlign: 'center'
            }}>
              <span style={{ fontSize: '48px', marginBottom: '15px' }}>🔒</span>
              <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>Wallet Required</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '350px', marginBottom: '25px', lineHeight: '1.5' }}>
                You must connect your Web3 wallet before accessing the Airdrop tasks. This ensures your points are accurately tracked on the blockchain.
              </p>
              <button 
                onClick={() => connect()}
                style={{ background: '#EC4899', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Connect to Unlock Wall
              </button>
            </div>
          ) : (
            /* STATO SBLOCCATO (Mostra iframe) */
            <div style={{ width: '100%', height: '700px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <iframe 
                src={cpaGripUrl} 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                title="Airdrop Wall" 
              />
            </div>
          )}
        </section>
        
        {/* 2. TIMEWALL (Sempre aperto perché ha il suo login) */}
        <section style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '30px', borderRadius: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#8B5CF6', marginBottom: '15px' }}>💰 Instant Payouts</h2>
          <div style={{ width: '100%', height: '800px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
            <iframe src="https://timewall.io/widget/v2/678fdb164b161a3c" style={{ width: '100%', height: '100%', border: 'none' }} title="TimeWall" />
          </div>
        </section>

      </div>

      {/* 3. I TUOI REFERRAL (Bentornati!) */}
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
      </div>

      {/* Banner Cointraffic BOTTOM */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '50px 0', minHeight: '250px' }}>
        <span id="ct_c83XILwXy4d"></span>
      </div>

    </div>
  );
}
