'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RewardsClient = dynamic(() => import('./RewardsClient'), { ssr: false });

export default function RewardsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050508' }}>
      <Header activePage="/rewards" />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: '900', 
          textAlign: 'center', 
          background: 'linear-gradient(to right, #facc15, #eab308)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          marginBottom: '40px' 
        }}>
          Arbitrage Inc Rewards
        </h1>

        <RewardsClient />
      </div>

      <Footer />
    </main>
  );
}
