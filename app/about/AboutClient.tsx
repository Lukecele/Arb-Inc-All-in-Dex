'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCoins, FaFire, FaChartLine, FaShieldAlt, FaRocket, FaCubes, FaClock, FaWallet, FaExchangeAlt, FaPercent } from 'react-icons/fa';
import Header, { navItems } from '../../components/Header';
import Footer from '../../components/Footer';
import theme from '../styles/theme';

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
  gap: 40px;
  padding: 24px 0;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  @media (min-width: 769px) {
    font-size: 48px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  max-width: 600px;
  margin: -24px auto 0;
  line-height: 1.7;
  @media (min-width: 769px) {
    font-size: 18px;
  }
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.018);
  border-radius: 20px;
  padding: 24px 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  @media (min-width: 769px) {
    padding: 40px 36px;
    border-radius: 28px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 24px;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.02em;
  @media (min-width: 769px) {
    font-size: 32px;
  }
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.25s ease;
  &:hover {
    border-color: rgba(139, 92, 246, 0.2);
    background: rgba(139, 92, 246, 0.04);
    transform: translateY(-2px);
  }
`;

const StepIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  color: ${theme.colors.primary.DEFAULT};
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
`;

const TokenomicsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TokenomicsCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const TokenomicsCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
`;

const TokenomicsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  &:last-child {
    border-bottom: none;
  }
`;

const TokenomicsRowLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

const TokenomicsDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
  box-shadow: 0 0 8px ${props => props.$color}40;
`;

const TokenomicsRowValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
`;

const TokenomicsNote = styled.p`
  font-size: 13px;
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.06));
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  grid-column: 1 / -1;
`;

const HighlightValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 4px;
`;

const HighlightLabel = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

const FaqItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const FaqQuestion = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
`;

const FaqAnswer = styled.p`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
`;

const CTASection = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.06));
  border-radius: 20px;
  border: 1px solid rgba(139, 92, 246, 0.12);
`;

const CTATitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${theme.colors.text.primary};
  margin-bottom: 12px;
`;

const CTADescription = styled.p`
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  margin-bottom: 24px;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #9333ea);
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.5);
  }
`;

export default function AboutClient() {
  return (
    <Container>
      <Header activePage="/about" />
      
      <MainContent>
        <div>
          <PageTitle>About Arbitrage Inception</PageTitle>
          <PageSubtitle>
            An automated DeFi protocol on BNB Smart Chain that generates passive BNB rewards through cross-DEX arbitrage trading.
          </PageSubtitle>
        </div>

        <Section>
          <SectionTitle>How It Works</SectionTitle>
          <StepGrid>
            <StepCard>
              <StepIcon><FaExchangeAlt /></StepIcon>
              <StepTitle>1. Trading</StepTitle>
              <StepDescription>
                Users swap tokens through our integrated DEX interface. Each trade incurs a minimal 4% tax that feeds the reward distribution system.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepIcon><FaChartLine /></StepIcon>
              <StepTitle>2. Arbitrage</StepTitle>
              <StepDescription>
                Our smart contract identifies price discrepancies across DEXes and executes arbitrage trades, generating profit from market inefficiencies.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepIcon><FaCoins /></StepIcon>
              <StepTitle>3. Revenue Collection</StepTitle>
              <StepDescription>
                50% of all DEX revenue is automatically converted to BnB and sent to the distribution wallet every 12 hours.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepIcon><FaWallet /></StepIcon>
              <StepTitle>4. Rewards Distribution</StepTitle>
              <StepDescription>
                Every 12 hours, 40% of the distribution goes to holders (minimum 2M tokens) and dev, while 20% is buybacked and burned forever.
              </StepDescription>
            </StepCard>
          </StepGrid>
        </Section>

        <Section>
          <SectionTitle>Tokenomics</SectionTitle>
          <TokenomicsGrid>
            <HighlightBox>
              <HighlightValue>1,000,000,000</HighlightValue>
              <HighlightLabel>Total Supply • 4% Tax (Buy/Sell)</HighlightLabel>
            </HighlightBox>

            <TokenomicsCard>
              <TokenomicsCardTitle>Revenue Flow</TokenomicsCardTitle>
              <TokenomicsRow>
                <TokenomicsRowLabel>
                  <TokenomicsDot $color="#F59E0B" />
                  DEX Revenue → BnB
                </TokenomicsRowLabel>
                <TokenomicsRowValue>50%</TokenomicsRowValue>
              </TokenomicsRow>
              <TokenomicsRow>
                <TokenomicsRowLabel>
                  <TokenomicsDot $color="#EF4444" />
                  Burn on Distribution
                </TokenomicsRowLabel>
                <TokenomicsRowValue>20%</TokenomicsRowValue>
              </TokenomicsRow>
              <TokenomicsNote>
                50% of all DEX revenue is converted to BnB and sent to the distribution wallet.
              </TokenomicsNote>
            </TokenomicsCard>

            <TokenomicsCard>
              <TokenomicsCardTitle>Every 12 Hours</TokenomicsCardTitle>
              <TokenomicsRow>
                <TokenomicsRowLabel>
                  <TokenomicsDot $color="#10B981" />
                  BNB Rewards to Holders & Dev
                </TokenomicsRowLabel>
                <TokenomicsRowValue>40%</TokenomicsRowValue>
              </TokenomicsRow>
              <TokenomicsRow>
                <TokenomicsRowLabel>
                  <TokenomicsDot $color="#06B6D4" />
                  Buyback & Burn
                </TokenomicsRowLabel>
                <TokenomicsRowValue>20%</TokenomicsRowValue>
              </TokenomicsRow>
              <TokenomicsNote>
                Minimum 2,000,000 tokens required to receive rewards. Buyback & burn reduces supply forever.
              </TokenomicsNote>
            </TokenomicsCard>
          </TokenomicsGrid>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <StepGrid>
            <StepCard>
              <StepIcon><FaFire /></StepIcon>
              <StepTitle>Deflationary Model</StepTitle>
              <StepDescription>
                20% burn on every distribution + 20% buyback & burn every 12 hours means tokens are permanently removed from circulation, increasing scarcity over time.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepIcon><FaClock /></StepIcon>
              <StepTitle>12-Hour Reward Cycles</StepTitle>
              <StepDescription>
                Rewards are distributed every 12 hours, providing consistent passive income for holders who meet the minimum 2,000,000 token requirement.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepIcon><FaShieldAlt /></StepIcon>
              <StepTitle>Transparent & Verifiable</StepTitle>
              <StepDescription>
                All transactions are recorded on-chain and verifiable. The protocol code is open-source and auditable by anyone.
              </StepDescription>
            </StepCard>
            
            <StepCard>
              <StepIcon><FaCubes /></StepIcon>
              <StepTitle>Multi-DEX Aggregation</StepTitle>
              <StepDescription>
                Our protocol aggregates liquidity from PancakeSwap, KyberSwap, and other DEXes to find the best rates for every trade.
              </StepDescription>
            </StepCard>
          </StepGrid>
        </Section>

        <Section>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          
          <FaqItem>
            <FaqQuestion>What is the minimum holding requirement for rewards?</FaqQuestion>
            <FaqAnswer>
              You need to hold a minimum of 2,000,000 ARB Inc tokens to be eligible for BNB rewards distributions.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>How often are rewards distributed?</FaqQuestion>
            <FaqAnswer>
              Rewards are distributed every 12 hours automatically. 40% goes to holders and dev, while 20% is used for buyback and burn.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>What is the token tax?</FaqQuestion>
            <FaqAnswer>
              There is a 4% tax on both buy and sell transactions. This tax funds the reward distribution system and protocol operations.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>How does the burn mechanism work?</FaqQuestion>
            <FaqAnswer>
              20% of every distribution is burned permanently, plus an additional 20% is buybacked and burned every 12 hours. This creates a continuous deflationary pressure on the token supply.
            </FaqAnswer>
          </FaqItem>
          
          <FaqItem>
            <FaqQuestion>Which blockchain does this run on?</FaqQuestion>
            <FaqAnswer>
              Arbitrage Inception operates on BNB Smart Chain (BSC), providing fast transactions and low fees for all operations.
            </FaqAnswer>
          </FaqItem>
        </Section>

        <CTASection>
          <CTATitle>Ready to Start Earning?</CTATitle>
          <CTADescription>
            Connect your wallet, hold ARB Inc tokens, and start earning passive BNB rewards every 12 hours.
          </CTADescription>
          <CTAButton href="/swap">
            <FaRocket /> Start Trading
          </CTAButton>
        </CTASection>
      </MainContent>

      <Footer />
    </Container>
  );
}
