import React from 'react';

export default function CoinAd() {
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      zIndex: 9999,
      backgroundColor: 'rgba(5, 5, 8, 0.8)', // Colore scuro per armonizzarsi al tuo sito
      padding: '8px',
      borderRadius: '12px',
      border: '1px solid #333',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
    }}>
      <iframe 
        src="//ads.coinserom.com/pub?adsunit=333931&size=120x60" 
        style={{ 
          width: '120px', 
          height: '60px', 
          border: '0px', 
          padding: '0', 
          backgroundColor: 'transparent', 
          overflow: 'hidden' 
        }}
        title="Ads by Coinserom"
      />
      <a 
        style={{ 
          display: 'block', 
          textAlign: 'right', 
          fontSize: '9px', 
          width: '120px', 
          color: '#888', 
          textDecoration: 'none',
          marginTop: '2px'
        }} 
        href="https://coinserom.com/?affiliate=3537313432" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Ads by coinserom
      </a>
    </div>
  );
}
