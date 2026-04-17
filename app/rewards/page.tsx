'use client';

import React, { useEffect, useState } from 'react';
import { useWallets } from '@web3-onboard/react';

// Questo comando dice a Vercel di non pre-renderizzare la pagina staticamente
export const dynamic = 'force-dynamic';

export default function RewardsPage() {
  const connectedWallets = useWallets();
  const [mounted, setMounted] = useState(false);

  // Aspettiamo che il componente sia montato nel browser prima di mostrare il wallet
  useEffect(() => {
    setMounted(true);
  }, []);

  // Recuperiamo l'indirizzo solo se siamo nel browser e il wallet è connesso
  const address = mounted ? connectedWallets[0]?.accounts[0]?.address : null;
  
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : 'Wallet Not Connected';

  const trackingId = address || 'guest';

  // Usiamo il link diretto con il dominio che preferisci
  const cpaGripUrl = `https://singingfiles.com/show.php?id=1890760&s1=${trackingId}`;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '30px', minHeight: '250px' }}>
          <span id="ct_cmykXXKHPsy"></span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
          Ecosystem Rewards
        </h1>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '12px', background: 'rgba(236, 72, 153, 0.1)', color: '#EC4899', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(236, 72, 153, 0.2)', fontWeight: 'bold' }}>
            Status: {displayAddress}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          
          {/* TIMEWALL */}
          <section style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '30px', borderRadius: '32px' }}>
            <h2 style={{ fontSize: '24px', color: '#8B5CF6', marginBottom: '15px' }}>💰 Instant Payouts</h2>
            <div style={{ width: '100%', height: '800px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              <iframe src="https://timewall.io/widget/v2/678fdb164b161a3c" style={{ width: '100%', height: '100%', border: 'none' }} title="TimeWall" />
            </div>
          </section>

          {/* CPAGRIP */}
          <section style={{ background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(5, 5, 8, 0) 100%)', border: '1px solid rgba(236, 72, 153, 0.2)', padding: '30px', borderRadius: '32px' }}>
            <h2 style={{ fontSize: '24px', color: '#EC4899', marginBottom: '15px', textAlign: 'center' }}>🪂 $ARB-INC Airdrop Farming</h2>
            <div style={{ width: '100%', height: '700px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              {mounted && (
                <iframe src={cpaGripUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="Airdrop Wall" />
              )}
            </div>
          </section>

        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '50px 0', minHeight: '250px' }}>
          <span id="ct_c83XILwXy4d"></span>
        </div>
      </div>
    </main>
  );
}
