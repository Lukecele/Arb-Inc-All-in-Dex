'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaExchangeAlt, FaTrophy, FaShieldAlt, FaClock, FaChartLine, FaArrowRight } from 'react-icons/fa';

// --- STYLED COMPONENTS ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030014;
  background-image: 
    radial-gradient(circle at 50% -20%, #2e1065 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, #1e1b4b 0%, transparent 30%);
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = styled.section`
  padding: 120px 0 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badge = styled.span`
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: #a855f7;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(to bottom, #fff 40%, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 600px) { flex-direction: column; width: 100%; }
`;

const PrimaryButton = styled.a`
  background: #a855f7;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  &:hover { background: #9333ea; transform: translateY(-2px); }
`;

const SecondaryButton = styled.a`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s;
  &:hover { background: rgba(255, 255, 255, 0.1); }
`;

const LivePulseSection = styled.div`
  margin: 60px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const PulseCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .label { color: #64748b; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .value { font-size: 1.8rem; font-weight: 700; font-variant-numeric: tabular-nums; }
  .sub { color: #a855f7; font-size: 0.8rem; font-weight: 600; }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  padding: 80px 0;
`;

const FeatureCard = styled.div`
  padding: 40px;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #a855f7, transparent);
  }
  h3 { font-size: 1.5rem; margin: 20px 0 12px; }
  p { color: #94a3b8; line-height: 1.6; }
  .icon-box {
    width: 48px; height: 48px; background: rgba(168, 85, 247, 0.1);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    color: #a855f7; font-size: 1.5rem;
  }
`;

const HomePageClient = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextPayout = new Date();
      
      const hours = now.getUTCHours();
      const nextWindow = (Math.floor(hours / 6) + 1) * 6;
      
      nextPayout.setUTCHours(nextWindow, 0, 0, 0);
      
      const diff = nextPayout.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageWrapper>
      <Header activePage="/" />
      
      <Container>
        <Hero>
          <Badge>Protocol Live on BNB Chain</Badge>
          <Title>Unlocking Meritocratic<br />DeFi Yields</Title>
          <Subtitle>
            Aggregated liquidity, professional tools, and a transparent 
            revenue-sharing model powered by our 9-decimal ranking justice.
          </Subtitle>
          <ButtonGroup>
            <PrimaryButton href="/swap-all">
              Launch Swap <FaArrowRight />
            </PrimaryButton>
            <SecondaryButton href="/about">How it Works</SecondaryButton>
          </ButtonGroup>
        </Hero>

        <LivePulseSection>
          <PulseCard>
            <span className="label">Next Payout Cycle</span>
            <span className="value">{timeLeft}</span>
            <span className="sub">Every 6 Hours</span>
          </PulseCard>
          <PulseCard>
            <span className="label">Treasury Share</span>
            <span className="value">100%</span>
            <span className="sub">Fees & Taxes</span>
          </PulseCard>
          <PulseCard>
            <span className="label">Reward Asset</span>
            <span className="value">BNB</span>
            <span className="sub">Native Distribution</span>
          </PulseCard>
        </LivePulseSection>

        <FeatureGrid>
          <FeatureCard>
            <div className="icon-box"><FaExchangeAlt /></div>
            <h3>Intelligent Aggregator</h3>
            <p>
              Our Swap All engine sources liquidity from PancakeSwap, Biswap, 
              and other major BSC DEXes to guarantee minimal slippage.
            </p>
          </FeatureCard>
          
          <FeatureCard>
            <div className="icon-box"><FaTrophy /></div>
            <h3>Ranked Rewards</h3>
            <p>
              Rewards are distributed based on our precise on-chain leaderboard. 
              The more points you earn, the larger your share of the Treasury.
            </p>
          </FeatureCard>

          <FeatureCard>
            <div className="icon-box"><FaShieldAlt /></div>
            <h3>Protocol Treasury</h3>
            <p>
              A fully transparent vault where 100% of platform revenue is 
              accumulated before being sent back to top-ranked participants.
            </p>
          </FeatureCard>
        </FeatureGrid>
      </Container>

      <Footer />
    </PageWrapper>
  );
};

export default HomePageClient;
