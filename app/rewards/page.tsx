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

        {/* Video Tutorial */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px', margin: '0 auto 40px auto', borderRadius: '12px', boxShadow: '0 0 15px rgba(0,255,255,0.2)' }}>
          <iframe 
            src="https://www.youtube.com/embed/QBbtZDfWLBA" 
            title="Arbitrage Inception Airdrop Tutorial" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '1px solid rgba(0,255,255,0.3)', borderRadius: '12px' }}
          ></iframe>
        </div>

        <RewardsClient />
      </div>

      <Footer />
    </main>
  );
}
