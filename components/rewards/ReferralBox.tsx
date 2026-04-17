'use client';

import React, { useState, useEffect } from 'react';
import { useWallets } from '@web3-onboard/react';

export default function ReferralBox() {
  const connectedWallets = useWallets();
  const address = connectedWallets?.[0]?.accounts?.[0]?.address;
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (address && typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      setReferralLink(`${baseUrl}/rewards?ref=${address}`);
    } else {
      setReferralLink('');
    }
  }, [address]);

  const copyToClipboard = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!address) return null;

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold text-white mb-2">Invite friends, earn points! 🚀</h3>
      <p className="text-white/60 text-sm mb-4">
        Share your link and earn 10% of all points your friends accumulate.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          readOnly 
          value={referralLink}
          className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-purple-300 outline-none"
        />
        <button 
          onClick={copyToClipboard}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          {copied ? 'Copied! ✅' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
