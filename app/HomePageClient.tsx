'use client'

import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background: #030309;
    color: #F8FAFC;
    -webkit-font-smoothing: antialiased;
  }
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
`

const MainContent = styled.main`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`

const HeroSection = styled.section`
  text-align: center;
  padding: 100px 10px;
`

const HeroTitle = styled.h1`
  font-size: clamp(32px, 8vw, 72px);
  font-weight: 900;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #fff;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 40px;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
`

const InfoLink = styled(Link)`
  color: #a78bfa;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  &:hover {
    color: #c4b5fd;
    transform: translateY(-2px);
  }
`

const ContractSection = styled.div`
  background: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 15px 25px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 600px;
`

const TOKEN_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'

export default function HomePageClient() {
  const [tokenData, setTokenData] = useState({ price: 0, liquidity: 0, volume: 0 });
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadData = () => {
      fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
        .then(res => res.json())
        .then(data => {
          if (data.pairs && data.pairs.length > 0) {
            let totalLiquidity = 0;
            let totalVolume = 0;
            data.pairs.forEach((pair: any) => {
              totalLiquidity += parseFloat(pair.liquidity?.usd || 0);
              totalVolume += parseFloat(pair.volume?.h24 || 0);
            });
            const mainPair = data.pairs.sort((a: any, b: any) => 
              parseFloat(b.liquidity?.usd || 0) - parseFloat(a.liquidity?.usd || 0)
            )[0];
            setTokenData({
              price: parseFloat(mainPair.priceUsd || 0),
              liquidity: totalLiquidity,
              volume: totalVolume
            });
          }
        }).catch(() => {});
    };
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadData);
    else setTimeout(loadData, 2000);
  }, []);

  // Funzione per tracciare la conversione in Google Ads
  const trackConversion = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18071424132/nahxCLjv3JYcENGM6aZD'
      });
      console.log('Conversion tracked!');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(TOKEN_ADDRESS);
    setCopied(true);
    trackConversion(); // Traccia quando qualcuno copia il contratto
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header activePage="/" />
        <MainContent id="main-content">
          <HeroSection>
            <HeroTitle>Trade Smarter</HeroTitle>
            <p style={{ color: '#cbd5e1', fontSize: '1.2rem', marginBottom: '40px' }}>
              All-in-One DeFi Aggregator on BNB Smart Chain
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link 
                href="/swap" 
                onClick={trackConversion}
                style={{ background: '#7c3aed', color: 'white', padding: '14px 40px', borderRadius: '100px', fontWeight: 'bold', textDecoration: 'none' }}
              >
                Swap Now
              </Link>
              <Link href="/swap-all" style={{ border: '1px solid #444', color: 'white', padding: '14px 40px', borderRadius: '100px', textDecoration: 'none' }}>Explore</Link>
            </div>
          </HeroSection>

          <SectionTitle>Live Protocol Stats</SectionTitle>
          <StatsGrid>
            <StatCard>
              <div style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>ARB INC PRICE</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#a78bfa' }}>
                {tokenData.price > 0 ? `$${tokenData.price.toFixed(8)}` : '---'}
              </div>
            </StatCard>
            <StatCard>
              <div style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>AGGREGATE LIQUIDITY</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#a78bfa' }}>
                {tokenData.liquidity > 0 ? `$${Math.round(tokenData.liquidity).toLocaleString()}` : '---'}
              </div>
            </StatCard>
            <StatCard>
              <div style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>24H VOLUME</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#a78bfa' }}>
                {tokenData.volume > 0 ? `$${Math.round(tokenData.volume).toLocaleString()}` : '---'}
              </div>
            </StatCard>
          </StatsGrid>

          <InfoLink href="/about">
             Learn more about Arbitrage Inception tokenomics →
          </InfoLink>

          <ContractSection>
            <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: 'bold' }}>OFFICIAL CONTRACT ADDRESS (BEP-20)</div>
            <div 
              onClick={copyToClipboard}
              style={{ 
                color: '#fff', 
                fontSize: 'clamp(10px, 3vw, 14px)', 
                fontFamily: 'monospace', 
                background: 'rgba(0,0,0,0.3)', 
                padding: '10px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                border: '1px dashed rgba(167, 139, 250, 0.4)',
                width: '100%',
                textAlign: 'center'
              }}
            >
              {TOKEN_ADDRESS} {copied ? '✅ COPIED!' : '📋'}
            </div>
          </ContractSection>
        </MainContent>
        <Footer />
      </Container>
    </>
  )
}
