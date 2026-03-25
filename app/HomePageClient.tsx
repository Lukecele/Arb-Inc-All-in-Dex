'use client'

import styled, { createGlobalStyle, keyframes } from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTelegram, FaTwitter, FaChartLine, FaGlobe, FaRocket, FaShieldAlt, FaCubes, FaCoins, FaClock, FaDollarSign, FaWater } from 'react-icons/fa'
import theme from './styles/theme'
import { useState, useEffect } from 'react'

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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, ${theme.colors.background.primary} 0%, #1a1a3e 50%, ${theme.colors.background.secondary} 100%);
    background-size: 400% 400%;
    animation: gradientBackground 15s ease infinite;
    color: #FFFFFF;
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ::selection {
    background: #8B5CF6;
    color: white;
  }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const floatOrb = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`

const BackgroundOrbs = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`

const Orb = styled.div<{ $color: string; $size: string; $top: string; $left: string; $delay: string }>`
  position: absolute;
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: ${props => props.$color};
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  top: ${props => props.$top};
  left: ${props => props.$left};
  animation: ${floatOrb} ${props => props.$delay} ease-in-out infinite;
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  background: ${theme.colors.background.primary};
  @media (min-width: 769px) {
    padding: 40px 20px;
  }
`

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
  @media (min-width: 769px) {
    padding: 20px 0;
  }
`

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (min-width: 769px) {
    gap: 15px;
  }
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  box-shadow: ${theme.shadows.glow};
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
  }
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 28px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  @media (min-width: 769px) {
    gap: 12px;
    padding: 10px 20px;
  }
`

const NavLink = styled.a`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: ${theme.transitions.fast};
  &:hover {
    color: ${theme.colors.text.primary};
    background: ${theme.colors.glass.heavy};
  }
  @media (min-width: 769px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  @media (min-width: 769px) {
    gap: 60px;
    padding: 40px 0;
  }
`

const HeroSection = styled.section`
  text-align: center;
  padding: 20px 10px;
  @media (min-width: 769px) {
    padding: 40px 20px;
  }
`

const HeroTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 15px;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: ${theme.typography.lineHeights.tight};
  @media (min-width: 769px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
`

const HeroSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeights.normal};
  max-width: 800px;
  margin: 0 auto 20px;
  @media (min-width: 769px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;
`

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.3);
  }
`

const FeatureIcon = styled.div`
  font-size: 36px;
  margin-bottom: 12px;
  animation: ${float} 3s ease-in-out infinite;
`

const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #8B5CF6;
  margin-bottom: 8px;
`

const FeatureDescription = styled.p`
  font-size: 13px;
  color: #A9A9A9;
  line-height: 1.4;
`

const TokenomicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const TokenomicsChart = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #10B981 0% 50%,
    #06B6D4 50% 100%
  );
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: #0f0f1a;
    border-radius: 50%;
  }
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    &::after {
      width: 60px;
      height: 60px;
    }
  }
`

const TokenomicsList = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`

const TokenomicsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TokenomicsColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${props => props.$color};
`

const TokenomicsLabel = styled.div`
  font-size: 14px;
  color: #A9A9A9;
`

const TokenomicsPercent = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  margin-left: auto;
`

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(180deg, #8B5CF6, #EC4899);
    transform: translateX(-50%);
  }
  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`

const TimelineItem = styled.div<{ $index: number }>`
  position: relative;
  margin-bottom: 60px;
  display: flex;
  justify-content: ${props => props.$index % 2 === 0 ? 'flex-start' : 'flex-end'};
  width: 100%;
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 50px;
  }
`

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const TimelineDot = styled.div<{ $status?: 'done' | 'coming' }>`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: ${props => props.$status === 'done' ? '#10B981' : '#8B5CF6'};
  border-radius: 50%;
  border: 3px solid #0f0f1a;
  z-index: 1;
  box-shadow: ${props => props.$status === 'done' ? '0 0 8px rgba(16, 185, 129, 0.5)' : 'none'};
  @media (max-width: 768px) {
    left: 20px;
  }
`

const TimelineDate = styled.div`
  font-size: 14px;
  color: #8B5CF6;
  font-weight: 600;
  margin-bottom: 8px;
`

const TimelineTitle = styled.h4`
  font-size: 18px;
  color: #FFFFFF;
  margin-bottom: 8px;
`

const TimelineDescription = styled.p`
  font-size: 14px;
  color: #A9A9A9;
  line-height: 1.5;
`

const Section = styled.section`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 20px 15px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 15px 0;
  @media (min-width: 769px) {
    padding: 40px 30px;
    margin: 30px 0;
    border-radius: 24px;
  }
`

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 769px) {
    font-size: 32px;
    margin-bottom: 30px;
  }
`

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  line-height: 1.8;
  color: #A9A9A9;
  max-width: 900px;
  margin: 0 auto;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 40px 0;
`

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const StatLabel = styled.div`
  font-size: 16px;
  color: #A9A9A9;
  margin-bottom: 12px;
`

const StatIcon = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
  opacity: 0.8;
`

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #8B5CF6;
`

const StatSubLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`

const CTAButton = styled.div`
  display: inline-block;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  border: none;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
  }
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`

const SwapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #28E0B9 0%, #189470 100%);
  border: none;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(40, 224, 185, 0.3);
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(40, 224, 185, 0.5);
  }
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  text-align: center;
  color: ${theme.colors.text.muted};
  font-size: 14px;
`

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  a {
    color: ${theme.colors.text.secondary};
    text-decoration: none;
    font-size: 13px;
    transition: ${theme.transitions.fast};
    &:hover {
      color: ${theme.colors.accent.DEFAULT};
    }
  }
`

const Disclaimer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: 8px;
  color: #FF9900;
  font-size: 12px;
  line-height: 1.5;
`

const DEXSCREENER_WATCHLIST_URL = 'https://dexscreener.com/watchlist/KvE6lgnr30b0Z2yFhxlB'
const TOKEN_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'

interface TokenStats {
  price: number
  marketCap: number
  liquidity: number
  volume24h: number
  poolCount: number
  contract: string
}

const defaultTokenData: TokenStats = {
  price: 0.000004402,
  marketCap: 4402,
  liquidity: 3970,
  volume24h: 128,
  poolCount: 34,
  contract: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c',
}

export default function HomePageClient() {
  const [tokenData, setTokenData] = useState<TokenStats>(defaultTokenData)
  const [loading, setLoading] = useState(true)

  const fetchTokenStats = async () => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`)
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      
      if (data.pairs && data.pairs.length > 0) {
        let totalLiquidity = 0
        let totalVolume24h = 0
        
        data.pairs.forEach((pair: any) => {
          totalLiquidity += parseFloat(pair.liquidity?.usd || 0)
          totalVolume24h += parseFloat(pair.volume?.h24 || 0)
        })

        const mainPair = data.pairs.reduce((a: any, b: any) => 
          (parseFloat(a.liquidity?.usd || 0) > parseFloat(b.liquidity?.usd || 0)) ? a : b
        )

        const price = parseFloat(mainPair.priceUsd || 0)
        const marketCap = price * 1000000000

        setTokenData({
          price,
          marketCap: Math.round(marketCap),
          liquidity: Math.round(totalLiquidity),
          volume24h: Math.round(totalVolume24h),
          poolCount: data.pairs.length,
          contract: TOKEN_ADDRESS
        })
      }
    } catch (error) {
      console.error('Error fetching token stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenStats()
    const interval = setInterval(fetchTokenStats, 30000)
    
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <GlobalStyle />
      <Container>
        <BackgroundOrbs>
          <Orb $color="#8B5CF6" $size="400px" $top="-100px" $left="-100px" $delay="20s" />
          <Orb $color="#EC4899" $size="300px" $top="60%" $left="70%" $delay="25s" />
          <Orb $color="#06B6D4" $size="250px" $top="30%" $left="60%" $delay="30s" />
        </BackgroundOrbs>
        <Header>
          <LogoSection>
            <Logo src="https://cdn.dexscreener.com/cms/images/3db2502d596330f75db19c4275c3acd833d9f35d370a39ed28933073d75edc7f?width=800&height=800&quality=95&format=auto" alt="Arbitrage Inception" />
            <Title>Arbitrage Inception</Title>
          </LogoSection>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/swap">Swap (Custom)</NavLink>
            <NavLink href="/swap-all">Swap All</NavLink>
            <NavLink href="/zap">Zap</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Nav>
        </Header>

        <MainContent>
          <HeroSection as={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroTitle>Trade Smarter with Arbitrage Inception</HeroTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroSubtitle>
                The future of reward-driven DeFi is here. Generate volume across paired assets,
                strengthening liquidity and delivering consistent BNB rewards to holders.
              </HeroSubtitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <SwapButton href="/swap?tokenIn=BNB&tokenOut=ARBINc">
                <span>BNB</span>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>→</span>
                <span>Arb Inc</span>
              </SwapButton>
              <Link href="/swap" passHref>
                <Link href="/swap-all" passHref>
                  <CTAButton>All Tokens</CTAButton>
                </Link>
              </Link>
            </motion.div>
          </HeroSection>

          <Section>
            <SectionTitle>About Arbitrage Inception</SectionTitle>
            <AboutContent>
              <p>
                Arbitrage Inception is designed to generate volume across paired assets, strengthening liquidity and delivering consistent BNB rewards to holders. Our innovative protocol combines advanced arbitrage mechanisms with reward distribution, creating a sustainable DeFi ecosystem.
              </p>
              <p>
                The project is built on BNB Smart Chain, leveraging low transaction fees and high speed to enable efficient arbitrage trading. Every trade contributes to liquidity pools and generates rewards for token holders, creating a win-win scenario for traders and investors alike.
              </p>
              <p>
                With a focus on transparency and innovation, Arbitrage Inception provides real-time analytics, secure smart contracts, and a community-driven governance model. Join us in revolutionizing DeFi through intelligent arbitrage and sustainable rewards.
              </p>
            </AboutContent>
          </Section>

          <Section>
            <SectionTitle>Key Features</SectionTitle>
            <FeaturesGrid as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                {
                  icon: <FaCoins size={48} color="#8B5CF6" />,
                  title: "BNB Rewards Protocol",
                  description: "Earn passive income through BNB rewards distributed to holders. Every trade generates rewards proportional to your holdings."
                },
                {
                  icon: <FaRocket size={48} color="#EC4899" />,
                  title: "Arbitrage Pairs",
                  description: "Leverage arbitrage opportunities across multiple trading pairs. Our algorithm identifies and executes profitable trades automatically."
                },
                {
                  icon: <FaCubes size={48} color="#06B6D4" />,
                  title: "Smart Volume Mechanics",
                  description: "Intelligent volume generation to strengthen liquidity pools. Higher volume means better prices for traders and more rewards for holders."
                },
                {
                  icon: <FaShieldAlt size={48} color="#10B981" />,
                  title: "Transparency & Innovation",
                  description: "Fully transparent protocol with cutting-edge DeFi technology. All transactions are verifiable on-chain, and the code is open-source."
                }
              ].map((feature, index) => (
                <FeatureCard
                  as={motion.div}
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </Section>

          <Section>
            <SectionTitle>Live Statistics</SectionTitle>
            <StatsGrid as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                { label: "Current Price", value: `$${tokenData.price.toFixed(9)}`, icon: <FaDollarSign /> },
                { label: "Market Cap", value: `$${tokenData.marketCap.toLocaleString()}`, icon: <FaChartLine /> },
                { 
                  label: "Liquidity", 
                  value: `$${tokenData.liquidity.toLocaleString()}`, 
                  sublabel: `across over ${tokenData.poolCount} pools`,
                  zapLink: true,
                  icon: <FaWater /> 
                },
                { label: "24h Volume", value: `$${tokenData.volume24h.toLocaleString()}`, icon: <FaClock /> }
              ].map((stat, index) => (
                <StatCard
                  as={motion.div}
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <StatIcon>{stat.icon}</StatIcon>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                  {stat.sublabel && <StatSubLabel>{stat.sublabel}</StatSubLabel>}
                  {stat.zapLink && (
                    <Link href="/zap" passHref style={{ marginTop: '12px', display: 'inline-block' }}>
                      <span style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#fff',
                        background: 'linear-gradient(90deg, #28E0B9, #00D4FF)',
                        borderRadius: '20px',
                        textDecoration: 'none',
                        transition: 'transform 0.2s',
                        display: 'inline-block',
                      }}>
                        ⚡ Use Zap
                      </span>
                    </Link>
                  )}
                </StatCard>
              ))}
            </StatsGrid>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <a href={DEXSCREENER_WATCHLIST_URL} target="_blank" rel="noopener noreferrer">
                <CTAButton>View Live Chart on DexScreener</CTAButton>
              </a>
              <div style={{ marginTop: '15px' }}>
                <a 
                  href={DEXSCREENER_WATCHLIST_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    color: '#28E0B9',
                    textDecoration: 'underline',
                    fontWeight: 500
                  }}
                >
                  View all pools
                </a>
              </div>
            </div>
          </Section>

          <Section>
            <SectionTitle>How It Works</SectionTitle>
            <AboutContent>
              <p>
                <strong>1. Trading:</strong> Users swap tokens through our integrated PancakeSwap widget. Each trade incurs a minimal fee (0.1%) that is distributed to the fee receiver.
              </p>
              <p>
                <strong>2. Arbitrage:</strong> Our smart contract identifies price discrepancies across DEXes and executes arbitrage trades, generating profit from market inefficiencies.
              </p>
              <p>
                <strong>3. Rewards:</strong> A portion of arbitrage profits is converted to BNB and distributed to token holders automatically. Rewards are proportional to holdings and distributed in real-time.
              </p>
              <p>
                <strong>4. Liquidity:</strong> Trading fees and arbitrage profits are used to deepen liquidity pools, ensuring better prices for traders and reducing slippage.
              </p>
            </AboutContent>
          </Section>

          <Section>
            <SectionTitle>Tokenomics</SectionTitle>
            <TokenomicsContainer>
              <TokenomicsChart />
              <TokenomicsList>
                {[
                  { label: "Total Supply", percent: "1,000,000,000", color: "#8B5CF6" },
                  { label: "Tax (Buy/Sell)", percent: "4%", color: "#EC4899" },
                  { label: "BNB Rewards to Holders", percent: "50%", color: "#10B981" },
                  { label: "Marketing & Development", percent: "50%", color: "#06B6D4" },
                ].map((item, index) => (
                  <TokenomicsItem key={index}>
                    <TokenomicsColor $color={item.color} />
                    <TokenomicsLabel>{item.label}</TokenomicsLabel>
                    <TokenomicsPercent>{item.percent}</TokenomicsPercent>
                  </TokenomicsItem>
                ))}
              </TokenomicsList>
            </TokenomicsContainer>
          </Section>

          <Section>
            <SectionTitle>Roadmap</SectionTitle>
            <TimelineContainer>
              {[
                {
                  status: "done",
                  title: "Launch on RevShare",
                  description: "Successfully launched with RevShare integration."
                },
                {
                  status: "done",
                  title: "Build Arbitrage Pools",
                  description: "Multiple arbitrage pools deployed with more coming."
                },
                {
                  status: "done",
                  title: "DEX Update",
                  description: "Platform updated with latest DEX aggregators."
                },
                {
                  status: "done",
                  title: "Swap",
                  description: "Swap functionality integrated and operational."
                },
                {
                  status: "done",
                  title: "Liquidity Zap",
                  description: "Zap feature for adding/removing liquidity live."
                },
                {
                  status: "coming",
                  title: "Limit Orders",
                  description: "Limit orders coming soon."
                },
                {
                  status: "coming",
                  title: "Bridge",
                  description: "Cross-chain bridge integration coming soon."
                },
                {
                  status: "coming",
                  title: "Fiat On-Ramp",
                  description: "Buy crypto with fiat directly on platform."
                },
                {
                  status: "coming",
                  title: "More to Come",
                  description: "Stay tuned for exciting new features."
                },
              ].map((item, index) => (
                <TimelineItem key={index} $index={index}>
                  <TimelineDot $status={item.status as 'done' | 'coming'} />
                  <TimelineContent>
                    <TimelineTitle style={{ color: item.status === 'done' ? '#10B981' : '#8B5CF6' }}>
                      {item.status === 'done' ? '✓ ' : ''}{item.title}
                    </TimelineTitle>
                    <TimelineDescription>{item.description}</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </Section>

          <Section>
            <SectionTitle>Get Started</SectionTitle>
            <AboutContent style={{ textAlign: 'center' }}>
              <p>
                Ready to experience the future of DeFi? Connect your wallet and start trading today.
              </p>
              <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/swap" passHref>
                  <CTAButton>Go to Swap Page</CTAButton>
                </Link>
                <Link href="/zap" passHref>
                  <CTAButton style={{ background: 'linear-gradient(90deg, #28E0B9, #00D4FF)' }}>Go to Zap Page</CTAButton>
                </Link>
              </div>
            </AboutContent>
          </Section>

          <Section>
            <SectionTitle>Connect With Us</SectionTitle>
            <SocialLinks as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                { href: "https://dexscreener.com/watchlist/KvE6lgnr30b0Z2yFhxlB", icon: <FaChartLine size={20} />, label: "DexScreener" },
                { href: "https://x.com/Arbitrageincept", icon: <FaTwitter size={20} />, label: "Twitter" },
                { href: "https://t.me/ArbitrageInception", icon: <FaTelegram size={20} />, label: "Telegram" },
                { href: "https://revshare.dev/token/0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c", icon: <FaChartLine size={20} />, label: "RevShare" },
                { href: "https://arbitageinception.luca-celebrano1.workers.dev/", icon: <FaGlobe size={20} />, label: "Website" }
              ].map((social, index) => (
                <SocialLink
                  as={motion.a}
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon} {social.label}
                </SocialLink>
              ))}
            </SocialLinks>
          </Section>

          <Section>
            <SectionTitle>Contract Information</SectionTitle>
            <AboutContent style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>
                {tokenData.contract}
              </p>
              <p style={{ marginTop: '20px', fontSize: '16px', color: '#A9A9A9' }}>
                BNB Smart Chain (BEP-20) • 9 Decimals • Tax: 4% Buy/Sell
              </p>
            </AboutContent>
          </Section>
        </MainContent>

        <Footer>
          <FooterLinks>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="/contact">Contact</a>
          </FooterLinks>
          <Disclaimer>
            <strong>⚠️ Risk Disclaimer:</strong> Cryptocurrency trading involves high risk. Arbitrage Inception provides a frontend interface powered by PancakeSwap & KyberSwap and is not responsible for any financial losses. Please trade responsibly.
          </Disclaimer>
          <p style={{ marginTop: '10px' }}>© 2026 Arbitrage Inception. All rights reserved. | Powered by PancakeSwap & KyberSwap</p>
        </Footer>
      </Container>
    </>
  )
}
