import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator',
  description: 'Swap, zap, and earn free crypto rewards.',
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#050508' }}>
      
      {/* 1. A-Ads Banner Superiore */}
      <div style={{ 
        width: '100%', 
        backgroundColor: '#0a0a0f', 
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        padding: '10px 0'
      }}>
        <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99 }}>
          <iframe 
            data-aa='2433982' 
            src='//acceptable.a-ads.com/2433982/?size=Adaptive' 
            style={{ 
              border: 0, 
              padding: 0, 
              width: '100%', 
              maxWidth: '970px', 
              height: '90px', 
              overflow: 'hidden', 
              display: 'block', 
              margin: 'auto' 
            }}
          />
        </div>
      </div>

      {/* 2. Pulsante FaucetPay "ULTRA ATTRACTIVE" */}
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '25px 0',
        background: 'linear-gradient(180deg, rgba(0, 82, 255, 0.1) 0%, transparent 100%)'
      }}>
        <a 
          href="https://faucetpay.io/?r=5296764" 
          target="_blank" 
          rel="noopener noreferrer"
          className="faucetpay-premium-btn"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            backgroundColor: '#0052ff',
            backgroundImage: 'linear-gradient(135deg, #0052ff 0%, #00d1ff 100%)',
            color: 'white',
            padding: '16px 35px',
            borderRadius: '50px', // Più arrotondato, più moderno
            textDecoration: 'none',
            fontWeight: '900',
            fontSize: '18px',
            boxShadow: '0 10px 40px rgba(0, 82, 255, 0.5)',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255,255,255,0.3)',
            overflow: 'hidden'
          }}
        >
          {/* Etichetta "FREE" dorata */}
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '20px',
            backgroundColor: '#fbbf24',
            color: '#000',
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>FREE</span>

          <span style={{ fontSize: '28px' }}>💰</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#e0f2fe' }}>Earn Daily Rewards</span>
            <span>GET FREE CRYPTO NOW</span>
          </div>

          {/* Animazione "Shine" e "Pulse" via CSS */}
          <style dangerouslySetInnerHTML={{ __html: `
            .faucetpay-premium-btn {
              animation: fp-pulse 2s infinite;
            }
            .faucetpay-premium-btn::before {
              content: "";
              position: absolute;
              top: 0;
              left: -100%;
              width: 50%;
              height: 100%;
              background: linear-gradient(
                to right,
                transparent,
                rgba(255, 255, 255, 0.4),
                transparent
              );
              transform: skewX(-25deg);
              animation: fp-shine 3s infinite;
            }
            @keyframes fp-shine {
              0% { left: -100%; }
              20% { left: 150%; }
              100% { left: 150%; }
            }
            @keyframes fp-pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); box-shadow: 0 10px 50px rgba(0, 209, 255, 0.8); }
              100% { transform: scale(1); }
            }
            .faucetpay-premium-btn:hover {
              filter: brightness(1.2);
              letter-spacing: 0.5px;
            }
          `}} />
        </a>
      </div>

      {/* 3. Il DEX originale */}
      <HomePageClient />
      
    </main>
  )
}
