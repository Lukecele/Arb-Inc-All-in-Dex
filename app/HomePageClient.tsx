'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaExchangeAlt, FaTrophy, FaShieldAlt, FaArrowRight, FaSpinner, FaLock, FaCheckCircle, FaCode, FaCopy, FaExternalLinkAlt } from 'react-icons/fa';

// INDIRIZZO UFFICIALE ARB INC
const CONTRACT_ADDRESS = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"; 

const pulse = keyframes`
  0% { opacity: 1; border-color: rgba(168, 85, 247, 0.3); }
  50% { opacity: 0.7; border-color: #a855f7; }
  100% { opacity: 1; border-color: rgba(168, 85, 247, 0.3); }
`;

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
  padding: 120px 0 60px;
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

const ContractBox = styled.div`
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 100%;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.1);
  
  .addr {
    font-family: 'Monaco', monospace;
    font-size: 0.85rem;
    color: #a855f7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    &:hover { color: white; transform: scale(1.1); }
  }
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

const PulseCard = styled.div<{ $isProcessing?: boolean }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${props => props.$isProcessing && `animation: ${pulse} 2s infinite; border-color: #a855f7;`}
  .label { color: #64748b; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .value { 
    font-size: 1.8rem; 
    font-weight: 700; 
    color: ${props => props.$isProcessing ? '#a855f7' : 'white'};
    display: flex;
    align-items: center;
    gap: 10px;
  }
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
  h3 { font-size: 1.5rem; margin: 20px 0 12px; }
  p { color: #94a3b8; line-height: 1.6; }
  .icon-box {
    width: 48px; height: 48px; background: rgba(168, 85, 247, 0.1);
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    color: #a855f7; font-size: 1.5rem;
  }
`;

const AuditSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, transparent 100%);
  border-radius: 40px;
  border: 1px solid rgba(168, 85, 247, 0.1);
  margin-bottom: 100px;
`;

const AuditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 0 40px;
`;

const AuditCard = styled.div`
  background: rgba(3, 0, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .icon { color: #a855f7; font-size: 1.5rem; }
  h4 { font-size: 1.2rem; color: white; }
  p { font-size: 0.95rem; color: #94a3b8; line-height: 1.5; }
`;

const HomePageClient = () => {
  const [timerDisplay, setTimerDisplay] = useState('...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ANCHOR_TIME = new Date('2026-04-28T10:03:00-03:00').getTime();
    const INTERVAL = 6 * 60 * 60 * 1000;
    const PROCESSING_TIME = 2 * 60 * 1000; 

    const updateTimer = () => {
      const now = new Date().getTime();
      const elapsed = now - ANCHOR_TIME;
      const cycles = Math.floor(elapsed / INTERVAL);
      const lastPayout = ANCHOR_TIME + (cycles * INTERVAL);
      const nextPayout = lastPayout + INTERVAL;
      const timeSinceLast = now - lastPayout;

      if (timeSinceLast >= 0 && timeSinceLast <= PROCESSING_TIME) {
        setIsProcessing(true);
        setTimerDisplay('Processing...');
      } else {
        setIsProcessing(false);
        const diff = nextPayout - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimerDisplay(`${h}h ${m}m ${s}s`);
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <PageWrapper>
      <Header activePage="/" />
      <Container>
        <Hero>
          <Badge>Official Token: ARB Inc</Badge>
          <Title>Unlocking Meritocratic<br />DeFi Yields</Title>
          <Subtitle>
            Aggregated liquidity and a transparent 100% revenue-sharing model 
            powered by our 9-decimal ranking justice.
          </Subtitle>
          <ButtonGroup>
            <PrimaryButton href="/swap-all">
              Swap Now <FaArrowRight />
            </PrimaryButton>
            <SecondaryButton href="/about">How it Works</SecondaryButton>
          </ButtonGroup>

          <ContractBox>
            <span className="addr">{CONTRACT_ADDRESS}</span>
            <button onClick={copyToClipboard} title="Copy Address">
              {copied ? <FaCheckCircle style={{color: '#22c55e'}} /> : <FaCopy />}
            </button>
            <a href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer" title="View on BscScan" style={{color: '#94a3b8', display: 'flex', alignItems: 'center'}}>
              <FaExternalLinkAlt size={14} />
            </a>
          </ContractBox>
        </Hero>

        <LivePulseSection>
          <PulseCard $isProcessing={isProcessing}>
            <span className="label">Next Payout Cycle</span>
            <span className="value">
              {isProcessing && <FaSpinner className="fa-spin" />}
              {timerDisplay}
            </span>
            <span className="sub">{isProcessing ? 'RevShare in Progress' : 'Global Sync (BRT)'}</span>
          </PulseCard>
          <PulseCard>
            <span className="label">Treasury Share</span>
            <span className="value">100%</span>
            <span className="sub">Taxes & DEX Fees</span>
          </PulseCard>
          <PulseCard>
            <span className="label">Reward Asset</span>
            <span className="value">BNB</span>
            <span className="sub">Real-Time Yield</span>
          </PulseCard>
        </LivePulseSection>

        <FeatureGrid>
          <FeatureCard>
            <div className="icon-box"><FaExchangeAlt /></div>
            <h3>Fee Revenue Engine</h3>
            <p>100% of trading fees from our DEX aggregator are funneled directly into the Treasury for ranked holders.</p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon-box"><FaTrophy /></div>
            <h3>9-Decimal Justice</h3>
            <p>Our proprietary ranking system ensures rewards are distributed with absolute mathematical precision.</p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon-box"><FaShieldAlt /></div>
            <h3>Full Transparency</h3>
            <p>Monitor every inflow. 100% of protocol taxes and fees are visible and distributed every 6 hours.</p>
          </FeatureCard>
        </FeatureGrid>

        <AuditSection>
          <div style={{textAlign: 'center', marginBottom: '50px'}}>
            <h2 style={{fontSize: '2.5rem', marginBottom: '16px'}}>Security & Audit</h2>
            <p style={{color: '#94a3b8', maxWidth: '700px', margin: '0 auto'}}>Arbitrage Inception prioritizes safety through strategic simplification.</p>
          </div>
          <AuditGrid>
            <AuditCard>
              <FaCheckCircle className="icon" />
              <h4>KyberSwap Integration</h4>
              <p>We leverage KyberSwap widgets for trading logic, inheriting institutional-grade security audited by ChainSecurity.</p>
            </AuditCard>
            <AuditCard>
              <FaLock className="icon" />
              <h4>Zero-Contract Risk</h4>
              <p>By avoiding custom-coded swap contracts, we eliminate the primary entry point for hacks and exploits.</p>
            </AuditCard>
            <AuditCard>
              <FaCode className="icon" />
              <h4>Frontend Rewards Logic</h4>
              <p>Rankings are processed by a transparent frontend engine, ensuring 9-decimal precision for every holder.</p>
            </AuditCard>
          </AuditGrid>
        </AuditSection>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default HomePageClient;
