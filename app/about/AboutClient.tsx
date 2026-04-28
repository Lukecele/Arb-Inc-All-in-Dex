'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaRocket, FaShieldAlt, FaChartLine, FaCoins, FaWallet, FaClock } from 'react-icons/fa';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030014;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  h1 { font-size: 3rem; margin-bottom: 16px; background: linear-gradient(to right, #fff, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  p { color: #94a3b8; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.6; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 80px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 32px;
  border-radius: 24px;
  transition: transform 0.2s;
  &:hover { transform: translateY(-5px); border-color: #a855f7; }
  .icon { color: #a855f7; font-size: 2rem; margin-bottom: 16px; }
  h3 { font-size: 1.5rem; margin-bottom: 12px; }
  p { color: #94a3b8; line-height: 1.5; }
`;

const TokenomicsBox = styled.div`
  background: linear-gradient(145deg, rgba(168, 85, 247, 0.1), rgba(0, 0, 0, 0));
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 48px;
  border-radius: 32px;
  text-align: center;
  margin-bottom: 80px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const StatItem = styled.div`
  .label { color: #94a3b8; font-size: 0.9rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
  .value { font-size: 2rem; font-weight: bold; color: #a855f7; }
`;

const CTASection = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  padding: 60px;
  border-radius: 32px;
  h2 { font-size: 2rem; margin-bottom: 24px; }
`;

const Button = styled.a`
  display: inline-block;
  background: #a855f7;
  color: white;
  padding: 16px 40px;
  border-radius: 100px;
  text-decoration: none;
  font-weight: bold;
  margin: 10px;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const AboutClient = () => {
  return (
    <PageWrapper>
      <Header activePage="/about" />
      <Content>
        <SectionHeader>
          <h1>About Arbitrage Inception</h1>
          <p>
            A next-generation DeFi protocol on BNB Smart Chain designed to capture market inefficiencies 
            and transform them into consistent BNB rewards for our community.
          </p>
        </SectionHeader>

        <Grid>
          <Card>
            <FaChartLine className="icon" />
            <h3>DEX Revenue Engine</h3>
            <p>Our smart contracts scan decentralized exchanges for price gaps. 100% of the profits generated from these arbitrage trades are funneled directly into the Treasury.</p>
          </Card>
          <Card>
            <FaShieldAlt className="icon" />
            <h3>100% Treasury Inflow</h3>
            <p>Transparency is our core. 100% of the 4% transaction taxes AND 100% of arbitrage revenues go to the Treasury. No hidden splits, no team cuts from rewards.</p>
          </Card>
          <Card>
            <FaClock className="icon" />
            <h3>6-Hour Payout Cycle</h3>
            <p>Efficiency at its peak. The Treasury distributes 100% of its accumulated BNB balance to ARB Inc holders every 6 hours, 4 times a day.</p>
          </Card>
        </Grid>

        <TokenomicsBox>
          <StatItem style={{marginBottom: '32px'}}>
            <div className="label">ARB Inc Token Supply</div>
            <div className="value" style={{fontSize: '3.5rem'}}>1,000,000,000</div>
            <div style={{color: '#a855f7', marginTop: '8px', fontWeight: 'bold'}}>4% Buy/Sell Tax — Sent 100% to Treasury</div>
          </StatItem>
          
          <StatGrid>
            <StatItem>
              <div className="label">DEX + Tax Revenue</div>
              <div className="value">100%</div>
              <div style={{fontSize: '0.8rem', color: '#64748b'}}>To Rewards Treasury</div>
            </StatItem>
            <StatItem>
              <div className="label">Payout Frequency</div>
              <div className="value">6 Hours</div>
              <div style={{fontSize: '0.8rem', color: '#64748b'}}>Continuous BNB Flow</div>
            </StatItem>
            <StatItem>
              <div className="label">Reward Asset</div>
              <div className="value">BNB</div>
              <div style={{fontSize: '0.8rem', color: '#64748b'}}>Direct Native Payouts</div>
            </StatItem>
          </StatGrid>
        </TokenomicsBox>

        <CTASection>
          <h2>Start Earning Native BNB</h2>
          <p style={{marginBottom: '32px', color: '#94a3b8'}}>Hold ARB Inc tokens and claim your share of the protocol's success every 6 hours.</p>
          <Button href="/swap-all">Swap Now</Button>
          <Button href="/rewards" style={{background: 'transparent', border: '1px solid #444'}}>View Dashboard</Button>
        </CTASection>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default AboutClient;
