'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaCoins, FaFire, FaChartLine, FaShieldAlt, FaRocket, FaCubes, FaClock, FaWallet, FaExchangeAlt } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import theme from '../styles/theme';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  background: ${theme.colors.background.primary};
  @media (min-width: 769px) {
    padding: 32px 24px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0 48px;
`;

/* ── PAGE HEADER ── */
const PageHero = styled.div`
  text-align: center;
  padding: 40px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const PageBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 100px;
  padding: 6px 18px;
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.text.accent};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const BadgeDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.primary.DEFAULT};
  box-shadow: 0 0 8px ${theme.colors.primary.DEFAULT};
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(135deg, #E2D9F3 0%, #C4B5FD 40%, #F472B6 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 6s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  line-height: 1.1;
  @media (min-width: 769px) {
    font-size: 56px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.75;
  @media (min-width: 769px) {
    font-size: 18px;
  }
`;

/* ── SECTIONS ── */
const Section = styled.section`
  position: relative;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(147,51,234,0.1), rgba(236,72,153,0.15));
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(135deg, rgba(124,58,237,0.4), rgba(147,51,234,0.2), rgba(236,72,153,0.3));
  }
  @media (min-width: 769px) {
    border-radius: 28px;
  }
`;

const SectionInner = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: 19px;
  padding: 24px 18px;
  @media (min-width: 769px) {
    padding: 40px 40px;
    border-radius: 27px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 28px;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 10px;
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(124,58,237,0.3), transparent);
  }
  @media (min-width: 769px) {
    font-size: 28px;
  }
`;

/* ── STEP CARDS ── */
const StepGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StepCard = styled(motion.div)`
  background: ${theme.colors.glass.light};
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  transition: all 0.25s ease;
  cursor: default;
  &:hover {
    border-color: rgba(124, 58, 237, 0.35);
    background: rgba(124, 58, 237, 0.05);
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.glow};
  }
`;

const StepNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2));
  font-size: 13px;
  font-weight: 800;
  color: ${theme.colors.text.accent};
  margin-bottom: 12px;
`;

const StepIconWrap = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
  color: ${theme.colors.primary.light};
  animation: ${float} 3s ease-in-out infinite;
`;

const StepTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
  letter-spacing: -0.01em;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
`;

/* ── TOKENOMICS ── */
const TokenomicsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SupplyBanner = styled.div`
  grid-column: 1 / -1;
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.08));
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`;

const SupplyValue = styled.div`
  font-size: 36px;
  font-weight: 900;
  background: linear-gradient(135deg, #C4B5FD, #F472B6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  margin-bottom: 4px;
  @media (min-width: 769px) { font-size: 48px; }
`;

const SupplyLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const TaxBadge = styled.span`
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 100px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.accent.gold};
`;

const TokenCard = styled.div`
  background: ${theme.colors.glass.light};
  border-radius: 16px;
  padding: 22px;
  border: 1px solid ${theme.colors.border.DEFAULT};
`;

const TokenCardTitle = styled.h3`
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
`;

const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  &:last-of-type { border-bottom: none; }
`;

const TokenLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

const TokenDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
  box-shadow: 0 0 8px ${props => props.$color}60;
  flex-shrink: 0;
`;

const TokenValue = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: ${theme.colors.text.primary};
`;

const TokenNote = styled.p`
  font-size: 12px;
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.04);
`;

/* ── FAQ ── */
const FaqItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; padding-bottom: 0; }
`;

const FaqQ = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
  letter-spacing: -0.01em;
`;

const FaqA = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.75;
`;

/* ── CTA ── */
const CTASection = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.07));
  border-radius: 24px;
  border: 1px solid rgba(124,58,237,0.2);
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  color: ${theme.colors.text.primary};
  margin-bottom: 12px;
  letter-spacing: -0.02em;
  @media (min-width: 769px) { font-size: 36px; }
`;

const CTADescription = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #7C3AED, #9333EA, #EC4899);
  background-size: 200% 200%;
  animation: ${gradientShift} 4s ease infinite;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(124, 58, 237, 0.55);
  }
`;

const CTAButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s ease;
  &:hover {
    background: rgba(255,255,255,0.09);
    transform: translateY(-2px);
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  }),
};

export default function AboutClient() {
  return (
    <Container>
      <Header activePage="/about" />

      <MainContent>

        {/* HERO */}
        <PageHero>
          <PageBadge><BadgeDot /> Protocol Overview</PageBadge>
          <PageTitle>About Arbitrage Inception</PageTitle>
          <PageSubtitle>
            An automated DeFi protocol on BNB Smart Chain that generates passive BNB rewards through cross-DEX arbitrage trading and deflationary tokenomics.
          </PageSubtitle>
        </PageHero>

        {/* HOW IT WORKS */}
        <Section>
          <SectionInner>
            <SectionTitle>How It Works</SectionTitle>
            <StepGrid>
              {[
                { icon: <FaExchangeAlt />, num: '1', title: 'Trading', desc: 'Users swap tokens through our integrated DEX interface. Each trade incurs a 4% tax that feeds the reward distribution system.' },
                { icon: <FaChartLine />, num: '2', title: 'Arbitrage', desc: 'Our smart contract identifies price discrepancies across DEXes and executes arbitrage trades, generating profit from market inefficiencies.' },
                { icon: <FaCoins />, num: '3', title: 'Revenue Collection', desc: '50% of all DEX revenue is automatically converted to BNB and sent to the distribution wallet every 12 hours.' },
                { icon: <FaWallet />, num: '4', title: 'Rewards Distribution', desc: 'Every 12 hours, 40% of distributions go to holders (min 2M tokens) and dev, while 20% is buybacked and burned forever.' },
              ].map((s, i) => (
                <StepCard key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <StepNumber>{s.num}</StepNumber>
                  <StepIconWrap style={{ animationDelay: `${i * 0.4}s` }}>{s.icon}</StepIconWrap>
                  <StepTitle>{s.title}</StepTitle>
                  <StepDescription>{s.desc}</StepDescription>
                </StepCard>
              ))}
            </StepGrid>
          </SectionInner>
        </Section>

        {/* TOKENOMICS */}
        <Section>
          <SectionInner>
            <SectionTitle>Tokenomics</SectionTitle>
            <TokenomicsGrid>
              <SupplyBanner>
                <SupplyValue>1,000,000,000</SupplyValue>
                <SupplyLabel>
                  Total ARB Inc Supply
                  <TaxBadge>4% Tax Buy/Sell</TaxBadge>
                </SupplyLabel>
              </SupplyBanner>

              <TokenCard>
                <TokenCardTitle>Revenue Flow</TokenCardTitle>
                <TokenRow>
                  <TokenLabel><TokenDot $color="#F59E0B" />DEX Revenue → BNB</TokenLabel>
                  <TokenValue>50%</TokenValue>
                </TokenRow>
                <TokenRow>
                  <TokenLabel><TokenDot $color="#EF4444" />Burn on Distribution</TokenLabel>
                  <TokenValue>20%</TokenValue>
                </TokenRow>
                <TokenNote>50% of all DEX revenue is converted to BNB and sent to the distribution wallet automatically.</TokenNote>
              </TokenCard>

              <TokenCard>
                <TokenCardTitle>Every 12 Hours</TokenCardTitle>
                <TokenRow>
                  <TokenLabel><TokenDot $color="#10B981" />BNB Rewards (Holders & Dev)</TokenLabel>
                  <TokenValue>40%</TokenValue>
                </TokenRow>
                <TokenRow>
                  <TokenLabel><TokenDot $color="#06B6D4" />Buyback & Burn</TokenLabel>
                  <TokenValue>20%</TokenValue>
                </TokenRow>
                <TokenNote>Min 2,000,000 tokens required. Buyback & burn permanently reduces supply every cycle.</TokenNote>
              </TokenCard>
            </TokenomicsGrid>
          </SectionInner>
        </Section>

        {/* KEY FEATURES */}
        <Section>
          <SectionInner>
            <SectionTitle>Key Features</SectionTitle>
            <StepGrid>
              {[
                { icon: <FaFire />, title: 'Deflationary Model', desc: '20% burn on every distribution + 20% buyback & burn every 12 hours creates continuous deflationary pressure on the token supply.' },
                { icon: <FaClock />, title: '12-Hour Reward Cycles', desc: 'Consistent passive income distributed every 12 hours to holders meeting the 2,000,000 minimum token requirement.' },
                { icon: <FaShieldAlt />, title: 'Transparent & Verifiable', desc: 'All transactions are recorded on-chain. The protocol code is open-source and verifiable by anyone.' },
                { icon: <FaCubes />, title: 'Multi-DEX Aggregation', desc: 'Aggregates liquidity from PancakeSwap, KyberSwap, and other DEXes to find the best rates for every trade.' },
              ].map((f, i) => (
                <StepCard key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <StepIconWrap style={{ animationDelay: `${i * 0.4}s` }}>{f.icon}</StepIconWrap>
                  <StepTitle>{f.title}</StepTitle>
                  <StepDescription>{f.desc}</StepDescription>
                </StepCard>
              ))}
            </StepGrid>
          </SectionInner>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionInner>
            <SectionTitle>FAQ</SectionTitle>
            {[
              { q: 'What is the minimum holding requirement for rewards?', a: 'You need to hold a minimum of 2,000,000 ARB Inc tokens to be eligible for BNB rewards distributions.' },
              { q: 'How often are rewards distributed?', a: 'Rewards are distributed every 12 hours automatically — 40% to holders and dev, 20% for buyback & burn.' },
              { q: 'What is the token tax?', a: 'There is a 4% tax on both buy and sell transactions that funds the reward distribution and protocol operations.' },
              { q: 'How does the burn mechanism work?', a: '20% of every distribution is burned permanently, plus 20% buyback & burn every 12 hours — creating constant deflationary pressure.' },
              { q: 'Which blockchain does this run on?', a: 'Arbitrage Inception operates on BNB Smart Chain (BSC), providing fast transactions and low fees for all operations.' },
            ].map((f, i) => (
              <FaqItem key={i}>
                <FaqQ>{f.q}</FaqQ>
                <FaqA>{f.a}</FaqA>
              </FaqItem>
            ))}
          </SectionInner>
        </Section>

        {/* CTA */}
        <CTASection>
          <CTATitle>Ready to Start Earning?</CTATitle>
          <CTADescription>
            Connect your wallet, hold ARB Inc tokens, and earn passive BNB rewards automatically every 12 hours.
          </CTADescription>
          <CTAButtons>
            <CTAButton href="/swap"><FaRocket /> Start Trading</CTAButton>
            <CTAButtonSecondary href="/zap">Add Liquidity</CTAButtonSecondary>
          </CTAButtons>
        </CTASection>

      </MainContent>

      <Footer />
    </Container>
  );
}
