"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const DynamicWeb3 = dynamic(
  () => import('./Web3Provider').then(mod => mod.Web3Provider),
  { ssr: false }
);

export const ClientWeb3Provider = ({ children }: { children: React.ReactNode }) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Carichiamo il grosso del JS solo dopo che la pagina è pronta
    const timer = setTimeout(() => setLoad(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!load) return <>{children}</>;
  return <DynamicWeb3>{children}</DynamicWeb3>;
};
