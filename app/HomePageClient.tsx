'use client'

import styled, { createGlobalStyle, keyframes } from 'styled-components'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTelegram, FaTwitter, FaChartLine, FaGlobe, FaRocket, FaShieldAlt, FaCubes, FaCoins, FaClock, FaDollarSign, FaWater } from 'react-icons/fa'
import theme from './styles/theme'
import { useState, useEffect } from 'react'

// Caricamento Dinamico per alleggerire il primo rendering
const Section = styled.section`
  background: rgba(255, 255, 255, 0.015);
  border-radius: 20px;
  padding: 24px 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 12px 0;
  contain: content; /* Ottimizzazione rendering browser */
  @media (min-width: 769px) {
    padding: 44px 36px;
    margin: 24px 0;
    border-radius: 28px;
  }
`

const GlobalStyle = createGlobalStyle`
  @keyframes gradientBackground {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', sans-serif;
    background: #030309;
    background-image: linear-gradient(135deg, #030309 0%, #0c0c1e 100%);
    color: #F8FAFC;
    overflow-x: hidden;
  }
`

const HeroTitle = styled.h1`
  font-size: clamp(36px, 8vw, 80px);
  font-weight: 900;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  letter-spacing: -0.03em;
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
`

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 10px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  width: 100%;
  margin: 24px 0;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
`

const CTAButton = styled.div`
  padding: 14px 36px;
  font-weight: 600;
  background: #7c3aed;
  border-radius: 100px;
  color: white;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
`

const TOKEN_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'

export default function HomePageClient() {
  const [tokenData, setTokenData] = useState({ price: 0, marketCap: 0, liquidity: 0, volume24h: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
      .then(res => res.json())
      .then(data => {
        if (data.pairs?.[0]) {
          const p = data.pairs[0];
          setTokenData({
            price: parseFloat(p.priceUsd),
            marketCap: parseFloat(p.priceUsd) * 1000000000,
            liquidity: parseFloat(p.liquidity.usd),
            volume24h: parseFloat(p.volume.h24)
          });
        }
      });
  }, []);

  if (!mounted) return null;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header activePage="/" />
        <main style={{ width: '100%', maxWidth: '1200px' }}>
          <HeroSection>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <HeroTitle>Trade Smarter with Arbitrage Inception</HeroTitle>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '30px' }}>
                50% of DEX revenue distributed in BNB to our community.
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <Link href="/swap"><CTAButton>Launch App</CTAButton></Link>
                <Link href="/swap-all" style={{ border: '1px solid #444', padding: '14px 36px', borderRadius: '100px' }}>Tokens</Link>
              </div>
            </motion.div>
          </HeroSection>

          <StatsGrid>
            <StatCard>
              <div style={{ color: '#6b7280', fontSize: '12px' }}>PRICE</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>${tokenData.price.toFixed(8)}</div>
            </StatCard>
            <StatCard>
              <div style={{ color: '#6b7280', fontSize: '12px' }}>MARKET CAP</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>${tokenData.marketCap.toLocaleString()}</div>
            </StatCard>
            <StatCard>
              <div style={{ color: '#6b7280', fontSize: '12px' }}>LIQUIDITY</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#a78bfa' }}>${tokenData.liquidity.toLocaleString()}</div>
            </StatCard>
          </StatsGrid>

          <Section>
             <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Deflationary Tokenomics</h2>
             <p style={{ color: '#94a3b8', textAlign: 'center' }}>4% Tax | 20% Buyback & Burn | 40% BNB Rewards Every 12h</p>
          </Section>
        </main>
        <Footer />
      </Container>
    </>
  )
}
