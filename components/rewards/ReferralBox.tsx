'use client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function ReferralBox() {
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = useState(false);
  const [refUrl, setRefUrl] = useState('');

  useEffect(() => {
    if (address) {
      setRefUrl(`${window.location.origin}/rewards?ref=${address}`);
    }
  }, [address]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/50 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        📢 Invita Amici e Guadagna il 10%
      </h3>
      <p className="text-gray-300 text-sm mb-4">
        Condividi il tuo link: guadagnerai il 10% di tutti i punti airdrop accumulati dai tuoi amici, a vita!
      </p>
      
      <div className="flex flex-col md:flex-row gap-3">
        <input 
          readOnly 
          value={refUrl}
          className="bg-black/40 border border-gray-700 rounded-lg px-4 py-2 text-gray-400 font-mono text-sm flex-1 outline-none"
        />
        <button 
          onClick={copyToClipboard}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-all"
        >
          {copied ? 'Copiato! ✅' : 'Copia Link'}
        </button>
      </div>
    </div>
  );
}
