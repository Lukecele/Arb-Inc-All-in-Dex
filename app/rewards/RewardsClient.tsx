'use client';

import React, { useEffect, useState } from 'react';
import { useWallets, useConnectWallet } from '@web3-onboard/react';

type Offer = { title: string; link: string; image: string | null };

export default function RewardsClient() {
  const connectedWallets = useWallets();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [comboId, setComboId] = useState<string>('');

  const address = connectedWallets?.[0]?.accounts?.[0]?.address;
  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  useEffect(() => {
    if (address) {
      // 🚨 FIX CRUCIALE: Prepara l'ID per TimeWall (Utente + Referrer)
      const referrer = localStorage.getItem('arb_inc_referrer') || 'none';
      setComboId(`${address}--ref--${referrer}`);

      // Fetch Offerte
      setLoadingOffers(true);
      fetch(`/api/offers?wallet=${address}`)
        .then(res => res.json())
        .then(data => {
          if (data.offers) setOffers(data.offers);
          setLoadingOffers(false);
        })
        .catch(err => {
          console.error("Errore nel caricamento offerte", err);
          setLoadingOffers(false);
        });
    } else {
      setOffers([]);
      setComboId('');
    }
  }, [address]);

  // Genera l'URL di TimeWall dinamicamente agganciando il wallet per il postback
  const timeWallUrl = comboId 
    ? `https://timewall.io/widget/v2/678fdb164b161a3c?userid=${comboId}`
    : `https://timewall.io/widget/v2/678fdb164b161a3c`;

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* Banner Cointraffic TOP */}
      <div className="flex justify-center w-full min-h-[250px]">
        <span id="ct_cmykXXKHPsy"></span>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Ecosystem Rewards
        </h2>
        <p className="text-white/60">
          Earn instant crypto or farm points for the upcoming $ARB-INC Airdrop.
        </p>
      </div>

      {/* --- ZONA WALLET INTERATTIVA --- */}
      <div className="flex flex-col items-center gap-3">
        {!address ? (
          <button 
            onClick={() => connect()}
            className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_4px_20px_rgba(236,72,153,0.4)] hover:scale-105 transition-transform"
          >
            🔗 Connect Wallet to Track Points
          </button>
        ) : (
          <>
            <span className="bg-pink-500/10 text-pink-500 border border-pink-500/30 font-bold py-2 px-5 rounded-full text-sm">
              🟢 Tracking to: {displayAddress}
            </span>
            <button 
              onClick={() => disconnect(wallet!)} 
              className="text-white/40 text-sm hover:text-white underline transition-colors"
            >
              Disconnect
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10">

        {/* 1. NATIVE AIRDROP WALL */}
        <section className="bg-gradient-to-b from-pink-500/5 to-transparent border border-pink-500/20 p-8 rounded-[32px]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-pink-500">🪂 $ARB-INC Native Tasks</h2>
            <p className="text-sm text-white/50 mt-1">Complete tasks to farm airdrop points.</p>
          </div>
          
          {!address ? (
            <div className="w-full h-[250px] rounded-3xl bg-pink-500/5 border border-dashed border-pink-500/30 flex flex-col justify-center items-center text-center p-6">
              <span className="text-5xl mb-4">🔒</span>
              <h3 className="text-white text-xl font-bold mb-2">Wallet Required</h3>
              <p className="text-white/60 max-w-sm mb-6">Connect your Web3 wallet to load your localized tasks.</p>
              <button 
                onClick={() => connect()} 
                className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors"
              >
                Unlock Tasks
              </button>
            </div>
          ) : loadingOffers ? (
            <div className="w-full h-[200px] flex justify-center items-center text-pink-500 font-bold text-lg">
              Loading localized tasks... ⏳
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center p-10 text-white/50">
              <p>No tasks currently available in your region. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer, index) => (
                <div key={index} className="bg-white/5 border border-pink-500/20 rounded-2xl p-5 flex flex-col justify-between hover:border-pink-500/50 transition-colors">
                  <div>
                    {offer.image && <img src={offer.image} alt="Task" className="w-full h-[120px] object-cover rounded-lg mb-4" />}
                    <h3 className="text-white text-base font-semibold leading-snug mb-3">{offer.title}</h3>
                  </div>
                  <a 
                    href={offer.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-center bg-pink-500/10 text-pink-500 border border-pink-500 font-bold py-3 rounded-xl hover:bg-pink-500 hover:text-white transition-all mt-4"
                  >
                    Complete Task →
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* 2. TIMEWALL */}
        <section className="bg-purple-500/5 border border-purple-500/20 p-8 rounded-[32px]">
          <h2 className="text-2xl font-bold text-purple-500 mb-6 text-center">💰 Instant Payouts</h2>
          <div className="w-full h-[800px] rounded-2xl overflow-hidden bg-white shadow-2xl">
            {!address ? (
               <div className="w-full h-full flex flex-col justify-center items-center bg-[#050508] text-white/50">
                 <span className="text-4xl mb-4">🔒</span>
                 <p>Connect wallet to unlock TimeWall.</p>
               </div>
            ) : (
               <iframe src={timeWallUrl} className="w-full h-full border-none" title="TimeWall" />
            )}
          </div>
        </section>

      </div>

      {/* 3. ESSENTIAL TOOLS */}
      <div className="pt-8">
        <h2 className="text-2xl font-bold text-center text-white mb-8">🔗 Essential Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-purple-500/50 transition-colors">
            <h3 className="text-lg font-bold text-purple-500 mb-2">Daily BTC Faucet</h3>
            <p className="text-sm text-white/60 mb-6 flex-1">Earn free Bitcoin by viewing ads.</p>
            <a href="https://r.adbtc.top/3494539" target="_blank" className="w-full bg-purple-500/10 text-purple-500 border border-purple-500 font-bold py-2.5 rounded-xl hover:bg-purple-500 hover:text-white transition-colors">Open adBTC →</a>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/50 transition-colors">
            <h3 className="text-lg font-bold text-blue-500 mb-2">Micro-Wallet</h3>
            <p className="text-sm text-white/60 mb-6 flex-1">Withdraw your TimeWall earnings here.</p>
            <a href="https://faucetpay.io/?r=5296764" target="_blank" className="w-full bg-blue-500/10 text-blue-500 border border-blue-500 font-bold py-2.5 rounded-xl hover:bg-blue-500 hover:text-white transition-colors">Open FaucetPay →</a>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-orange-500/50 transition-colors">
            <h3 className="text-lg font-bold text-orange-500 mb-2">Bonus: PrizeBear</h3>
            <p className="text-sm text-white/60 mb-6 flex-1">Complete extra surveys for more rewards.</p>
            <a href="https://prizebear.com/r/OPKQLG" target="_blank" className="w-full bg-orange-500/10 text-orange-500 border border-orange-500 font-bold py-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-colors">Open PrizeBear →</a>
          </div>

        </div>
      </div>

      <div className="flex justify-center w-full min-h-[250px] mt-12">
        <span id="ct_c83XILwXy4d"></span>
      </div>

    </div>
  );
}
