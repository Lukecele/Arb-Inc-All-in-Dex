'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ReferralBox from '@/components/rewards/ReferralBox';
import Leaderboard from '@/components/rewards/Leaderboard';

const RewardsClient = dynamic(() => import('./RewardsClient'), { ssr: false });

export default function RewardsPage() {
  
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
    <main className="min-h-screen bg-[#050508] text-white font-sans py-10 px-5">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8">
          Arbitrage Inc Rewards
        </h1>

        <ReferralBox />
        <RewardsClient />
        <Leaderboard />

      </div>
    </main>
  );
}
