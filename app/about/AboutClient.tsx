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
            L'ecosistema DeFi su BNB Smart Chain che trasforma il trading di arbitraggio in rendita passiva reale. 
            Semplice, automatico e focalizzato sulla massimizzazione del valore per gli holder.
          </p>
        </SectionHeader>

        <Grid>
          <Card>
            <FaChartLine className="icon" />
            <h3>Cross-DEX Arbitrage</h3>
            <p>Il nostro protocollo scansiona costantemente i DEX della rete BSC, catturando profitti dalle discrepanze di prezzo e alimentando il Treasury.</p>
          </Card>
          <Card>
            <FaShieldAlt className="icon" />
            <h3>100% Revenue Flow</h3>
            <p>Non ci sono divisioni opache: il 100% delle tasse di transazione e dei profitti generati dal DEX finisce direttamente nel Tesoro.</p>
          </Card>
          <Card>
            <FaClock className="icon" />
            <h3>Rewards ogni 6 ore</h3>
            <p>Il Tesoro distribuisce automaticamente l'intero ammontare accumulato sotto forma di BNB a tutti i detentori di ARB Inc ogni 6 ore.</p>
          </Card>
        </Grid>

        <TokenomicsBox>
          <StatItem style={{marginBottom: '32px'}}>
            <div className="label">ARB Inc Total Supply</div>
            <div className="value" style={{fontSize: '3.5rem'}}>1,000,000,000</div>
            <div style={{color: '#a855f7', marginTop: '8px', fontWeight: 'bold'}}>4% Buy/Sell Tax for Treasury</div>
          </StatItem>
          
          <StatGrid>
            <StatItem>
              <div className="label">Revenue to Treasury</div>
              <div className="value">100%</div>
              <div style={{fontSize: '0.8rem', color: '#64748b'}}>Total Transparency</div>
            </StatItem>
            <StatItem>
              <div className="label">BNB Reward Frequency</div>
              <div className="value">6 Ore</div>
              <div style={{fontSize: '0.8rem', color: '#64748b'}}>Continuous Distribution</div>
            </StatItem>
            <StatItem>
              <div className="label">Reward Token</div>
              <div className="value">BNB</div>
              <div style={{fontSize: '0.8rem', color: '#64748b'}}>Native Assets Only</div>
            </StatItem>
          </StatGrid>
        </TokenomicsBox>

        <CTASection>
          <h2>Pronto a ricevere BNB?</h2>
          <p style={{marginBottom: '32px', color: '#94a3b8'}}>Accumula ARB Inc e guarda il tuo bilancio BNB crescere quattro volte al giorno.</p>
          <Button href="/swap-all">Buy ARB Inc</Button>
          <Button href="/rewards" style={{background: 'transparent', border: '1px solid #444'}}>Check Dashboard</Button>
        </CTASection>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default AboutClient;
