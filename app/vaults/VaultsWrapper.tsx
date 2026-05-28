'use client';

import dynamic from 'next/dynamic';

const VaultsClient = dynamic(() => import('./VaultsClient'), { ssr: false });

export default function VaultsWrapper() {
  return <VaultsClient />;
}
