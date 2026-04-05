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
  margin-bottom: 20px;
`

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #fff;
  margin-bottom: 30px;
  text-transform: uppercase;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 60px;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
`

const TOKEN_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'

export default function HomePageClient() {
  const [tokenData, setTokenData] = useState({ price: 0, liquidity: 0, volume: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadData = () => {
      fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
        .then(res => res.json())
        .then(data => {
          if (data.pairs && data.pairs.length > 0) {
            // SOMMA AGGREGATA: iteriamo su tutte le pool
            let totalLiquidity = 0;
            let totalVolume = 0;
            
            data.pairs.forEach((pair: any) => {
              totalLiquidity += parseFloat(pair.liquidity?.usd || 0);
              totalVolume += parseFloat(pair.volume?.h24 || 0);
            });

            // Il prezzo lo prendiamo dalla pool principale (solitamente la prima)
            const mainPrice = parseFloat(data.pairs[0].priceUsd || 0);

            setTokenData({
              price: mainPrice,
              liquidity: totalLiquidity,
              volume: totalVolume
            });
          }
        }).catch(() => {});
    };
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadData);
    else setTimeout(loadData, 2000);
  }, []);

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
              <Link href="/swap" style={{ background: '#7c3aed', color: 'white', padding: '14px 40px', borderRadius: '100px', fontWeight: 'bold' }}>Swap Now</Link>
              <Link href="/swap-all" style={{ border: '1px solid #444', color: 'white', padding: '14px 40px', borderRadius: '100px' }}>Explore</Link>
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
        </MainContent>
        <Footer />
      </Container>
    </>
  )
}
