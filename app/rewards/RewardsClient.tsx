'use client';

import React, { useEffect, useState } from 'react';
import { useWallets } from '@web3-onboard/react';

interface Offer {
  title: string;
  link: string;
}

export default function RewardsClient() {
  const connectedWallets = useWallets();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  
  const address = connectedWallets?.[0]?.accounts?.[0]?.address;

  useEffect(() => {
    if (address) {
      setLoadingOffers(true);
      fetch(`/api/offers?wallet=${address}`)
        .then(res => res.json())
        .then(data => {
          if (data.offers) setOffers(data.offers);
          setLoadingOffers(false);
        })
        .catch(() => setLoadingOffers(false));
    }
  }, [address]);

  if (!address) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#0a0a0a', borderRadius: '15px', border: '1px solid #333', color: '#666' }}>
        Per favore, connetti il wallet dal menu in alto per vedere le tue ricompense.
      </div>
    );
  }

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. STATUS BAR */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', padding: '8px 20px', borderRadius: '50px', color: '#22c55e', fontWeight: 'bold', fontSize: '14px' }}>
          ● Tracking Active: {address.slice(0,6)}...{address.slice(-4)}
        </div>
      </div>

      {/* 2. SEZIONE CPA (NATIVE TASKS) */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#f472b6', fontSize: '22px', marginBottom: '20px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🪂 $ARB-INC Native Tasks (CPA)
        </h3>
        
        {loadingOffers ? (
          <p style={{ color: '#666' }}>Caricamento offerte...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {offers.length > 0 ? offers.map((off, i) => (
              <div key={i} style={{ background: '#111', border: '1px solid #333', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: '0.3s' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ color: '#f472b6', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>OFFERTA DISPONIBILE</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '1.4' }}>{off.title}</div>
                </div>
                <a href={off.link} target="_blank" rel="noopener noreferrer" style={{ background: '#f472b6', color: 'white', textDecoration: 'none', textAlign: 'center', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                  Completa e Guadagna →
                </a>
              </div>
            )) : (
              <p style={{ color: '#666' }}>Nessuna task disponibile al momento per la tua regione.</p>
            )}
          </div>
        )}
      </div>

      {/* 3. SEZIONE TIMEWALL */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#818cf8', fontSize: '22px', marginBottom: '20px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
          💰 Instant Payouts (TimeWall)
        </h3>
        <div style={{ background: '#000', borderRadius: '20px', border: '1px solid #333', height: '800px', overflow: 'hidden' }}>
          <iframe 
            src={`https://timewall.io/widget/v2/678fdb164b161a3c?userid=${address}`} 
            style={{ width: '100%', height: '100%', border: 'none' }} 
          />
        </div>
      </div>

    </div>
  );
}
