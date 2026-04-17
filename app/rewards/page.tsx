'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ReferralBox from '@/components/rewards/ReferralBox';
import Leaderboard from '@/components/rewards/Leaderboard';

// Magia Nera di Next.js: "ssr: false" impedisce a Vercel di far crashare il server
// Carichiamo il componente in modo isolato
const RewardsClient = dynamic(() => import('./RewardsClient'), { ssr: false });

export default function RewardsPage() {
  
  // Catturiamo il wallet del "Padrino" dall'URL appena l'utente entra
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref && ref.startsWith('0x')) {
        localStorage.setItem('arb_inc_referrer', ref);
        console.log("Sistema Referral: Padrino salvato con successo!", ref);
      }
    }
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-yellow-500 mb-8">
          Arbitrage Inc Rewards
        </h1>

        {/* 1. LA TESTA: Il link per invitare gli amici */}
        <ReferralBox />
        
        {/* 2. LA PANCIA: Il componente Web3 con tutti i tuoi task intatti */}
        <RewardsClient />

        {/* 3. I PIEDI: La classifica dei campioni */}
        <Leaderboard />

      </div>
    </main>
  );
}
