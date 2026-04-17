'use client';

import React from 'react';
import { useWallets } from '@web3-onboard/react';

export default function RewardsPage() {
  const connectedWallets = useWallets();
  
  // Prendiamo l'indirizzo direttamente
  const address = connectedWallets[0]?.accounts[0]?.address;
  
  // Logica Display: usiamo la presenza o meno di 'address' invece del confronto con 'guest'
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : 'Wallet Not Connected';

  // Tracking ID per CPAGrip: se non c'è l'indirizzo, passiamo 'guest'
  const trackingId = address || 'guest';

  // LINK CORRETTO: Usiamo il dominio del tuo screenshot e l'ID verificato
  const cpaGripUrl = `https://singingfiles.com/show.php?id=1890760&s1=${trackingId}`;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Banner Cointraffic TOP */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px', minHeight: '250px' }}>
          <span id="ct_cmykXXKHPsy"></span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
          Ecosystem Rewards
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
          Earn instant crypto or farm points for the upcoming $ARB-INC Airdrop.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          
          {/* SEZIONE 1: TIMEWALL */}
          <section style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '30px', borderRadius: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', color: '#8B5CF6', margin: 0 }}>💰 Instant Payouts</h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Managed by TimeWall. Withdraw directly to FaucetPay.</p>
            </div>
            <div style={{ width: '100%', height: '800px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <iframe src="https://timewall.io/widget/v2/678fdb164b161a3c" style={{ width: '100%', height: '100%', border: 'none' }} title="TimeWall" />
            </div>
          </section>

          {/* SEZIONE 2: CPAGRIP (AIRDROP FARMING) */}
          <section style={{ background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(5, 5, 8, 0) 100%)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '30px', borderRadius: '32px' }}>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', color: '#EC4899', margin: 0 }}>🪂 $ARB-INC Airdrop Farming</h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Every task here adds points to your wallet address for the future Airdrop.</p>
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '12px', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(236, 72, 153, 0.2)', fontWeight: 'bold' }}>
                  Status: {displayAddress}
                </span>
              </div>
            </div>
            <div style={{ width: '100%', height: '700px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <iframe 
                src={cpaGripUrl} 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                title="Airdrop Wall" 
              />
            </div>
          </section>

        </div>

        {/* Banner Cointraffic BOTTOM */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '50px 0', minHeight: '250px' }}>
          <span id="ct_c83XILwXy4d"></span>
        </div>

      </div>
    </main>
  );
}
