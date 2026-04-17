'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Magia Nera di Next.js: "ssr: false" impedisce a Vercel di far crashare il server
// Carichiamo il componente in modo isolato
const RewardsClient = dynamic(() => import('./RewardsClient'), { ssr: false });

export default function RewardsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050508', color: 'white', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      {/* Il componente Web3 viene caricato solo nel browser */}
      <RewardsClient />
    </main>
  );
}
