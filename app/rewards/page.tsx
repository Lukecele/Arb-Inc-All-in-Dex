import React from 'react';
import dynamic from 'next/dynamic';

// Magia Nera di Next.js: "ssr: false" impedisce a Vercel di far crashare il server
// durante la fase di build per colpa della libreria Web3
const RewardsClient = dynamic(() => import('./RewardsClient'), { ssr: false });

export default function RewardsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      {/* Carichiamo il componente solo lato client */}
      <RewardsClient />
    </main>
  );
}
