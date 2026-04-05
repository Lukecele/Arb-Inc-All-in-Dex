"use client";

import dynamic from 'next/dynamic';

export const ClientWeb3Provider = dynamic(
  () => import('./Web3Provider').then(mod => mod.Web3Provider),
  { ssr: false }
);
