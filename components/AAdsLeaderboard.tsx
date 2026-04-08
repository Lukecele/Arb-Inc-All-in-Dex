import React from 'react';

export default function AAdsLeaderboard() {
  return (
    <div style={{ 
      width: '100%', 
      margin: '20px auto', 
      position: 'relative', 
      zIndex: 10,
      textAlign: 'center'
    }}>
      <iframe 
        data-aa="2433421" 
        src="//acceptable.a-ads.com/2433421/?size=Adaptive" 
        style={{ 
          border: 0, 
          padding: 0, 
          width: '70%', 
          height: '90px', // Altezza standard per i leaderboard adaptive
          overflow: 'hidden', 
          display: 'block', 
          margin: '0 auto' 
        }}
      />
    </div>
  );
}
