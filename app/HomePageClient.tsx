'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaRocket, FaCoins, FaTasks, FaChartPie, FaClock, FaBullseye } from 'react-icons/fa';

const CONTRACT_ADDRESS = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"; 
const SWAP_LINK = `/swap-all?tokenOut=${CONTRACT_ADDRESS}`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-left: 300px; /* <--- Match con Sidebar */
  background-color: #030014;
  color: white;
  font-family: 'Inter', sans-serif;
  @media (max-width: 991px) { padding-left: 0; padding-top: 64px; }
`;

const Container = styled.div`
  max-width: 1000px; /* <--- Più stretto per eleganza */
  margin: 0 auto;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  background: linear-gradient(to bottom, #fff 40%, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HomePageClient = () => {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ points: "...", health: "..." });

  useEffect(() => {
    setMounted(true);
    fetch('/api/stats').then(r => r.json()).then(d => setStats({ points: d.totalPoints, health: d.treasuryHealth }));
  }, []);

  if (!mounted) return null;

  return (
    <PageWrapper>
      <Header />
      <Container>
        <Title>Unlocking Meritocratic<br />DeFi Yields</Title>
        <p style={{textAlign:'center', color:'#94a3b8', marginBottom:'40px'}}>Aggregated liquidity and 100% revenue-sharing.</p>
        
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'20px', marginBottom:'60px'}}>
           <div style={{background:'rgba(255,255,255,0.03)', padding:'24px', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.05)'}}>
             <div style={{color:'#64748b', fontSize:'12px', textTransform:'uppercase', marginBottom:'8px'}}>Ecosystem Points</div>
             <div style={{fontSize:'24px', fontWeight:'bold', color:'#3b82f6'}}>{stats.points}</div>
           </div>
           <div style={{background:'rgba(255,255,255,0.03)', padding:'24px', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.05)'}}>
             <div style={{color:'#64748b', fontSize:'12px', textTransform:'uppercase', marginBottom:'8px'}}>Treasury Health</div>
             <div style={{fontSize:'24px', fontWeight:'bold', color:'#10b981'}}>{stats.health}</div>
           </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px'}}>
          <div style={{background:'rgba(168, 85, 247, 0.05)', padding:'30px', borderRadius:'20px', border:'1px solid rgba(168, 85, 247, 0.2)'}}>
            <FaRocket style={{fontSize:'24px', color:'#a855f7', marginBottom:'15px'}}/>
            <h3>Trade & Farm</h3>
            <p style={{color:'#94a3b8', fontSize:'14px'}}>Swap, Zap or Limit Orders. Fuel the treasury and earn points.</p>
          </div>
          <div style={{background:'rgba(59, 130, 246, 0.05)', padding:'30px', borderRadius:'20px', border:'1px solid rgba(59, 130, 246, 0.2)'}}>
            <FaCoins style={{fontSize:'24px', color:'#3b82f6', marginBottom:'15px'}}/>
            <h3>Real BNB Rewards</h3>
            <p style={{color:'#94a3b8', fontSize:'14px'}}>Hold 2M+ tokens for Diamond Status and earn real BNB.</p>
          </div>
        </div>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default HomePageClient;
