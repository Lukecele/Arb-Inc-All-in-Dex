'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaExchangeAlt, FaTrophy, FaShieldAlt, FaArrowRight, FaSpinner, FaLock, FaCheckCircle, FaCode, FaCopy, FaExternalLinkAlt, FaNetworkWired, FaCoins, FaRocket, FaTasks, FaChartPie, FaClock, FaBullseye, FaWallet, FaLayerGroup, FaChartLine, FaWater } from 'react-icons/fa';

const CONTRACT_ADDRESS = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"; 
const TREASURY_WALLET = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f"; 
const ACCUMULATOR_WALLET = "0x4c1caA917FD012b285Ba35E93535675e5B59806C"; 
const SWAP_LINK = `/swap-all?tokenOut=${CONTRACT_ADDRESS}`;

const TOKEN_LOGO_URL = "https://dd.dexscreener.com/ds-data/tokens/bsc/0x5ee54869ecd5e752c31af095187326d4a4d50e1c.png?size=lg&key=96342c";
const TOKEN_SNIFFER_LINK = `https://tokensniffer.com/token/bsc/${CONTRACT_ADDRESS}`;
const ALL_POOLS_LINK = `https://pancakeswap.finance/info/tokens/${CONTRACT_ADDRESS}`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 1; border-color: rgba(168, 85, 247, 0.3); }
  50% { opacity: 0.7; border-color: #a855f7; }
  100% { opacity: 1; border-color: rgba(168, 85, 247, 0.3); }
`;

const livePulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-left: 300px; 
  background-color: #030014;
  background-image: 
    radial-gradient(circle at 50% -20%, #2e1065 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, #1e1b4b 0%, transparent 30%);
  color: white;
  font-family: 'Inter', sans-serif;
  @media (max-width: 991px) { padding-left: 0; padding-top: 64px; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = styled.section`
  padding: 100px 0 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Badge = styled.div`
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: #a855f7;
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const BigLogoWrapper = styled.div`
  margin-bottom: 40px;
  animation: ${float} 4s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.5));
  img { width: 220px; height: 220px; border-radius: 50%; border: 2px solid rgba(168, 85, 247, 0.3); object-fit: contain; background: #000; }
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

const Subtitle = styled.p`font-size: 1.25rem; color: #94a3b8; max-width: 600px; margin-bottom: 40px; line-height: 1.6;`;
const ButtonGroup = styled.div`display: flex; gap: 16px; @media (max-width: 600px) { flex-direction: column; width: 100%; }`;
const PrimaryButton = styled.a`background: #a855f7; color: white; padding: 16px 32px; border-radius: 12px; font-weight: bold; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: all 0.2s; &:hover { background: #9333ea; transform: translateY(-2px); }`;
const SecondaryButton = styled.a`background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: white; padding: 16px 32px; border-radius: 12px; font-weight: bold; text-decoration: none; transition: all 0.2s; &:hover { background: rgba(255, 255, 255, 0.1); }`;

const ContractContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 12px; 
  margin-top: 30px; 
  width: 100%; /* Importante per dare un limite al figlio */
`;

// 🛡️ IL FIX MOBILE È QUI
const ContractBox = styled.div`
  background: rgba(255, 255, 255, 0.03); 
  border: 1px solid rgba(168, 85, 247, 0.2); 
  padding: 12px 20px; 
  border-radius: 12px; 
  display: flex; 
  align-items: center; 
  gap: 15px; 
  
  /* REGOLE CHIAVE PER CONTENERE L'INDIRIZZO */
  width: 100%; 
  max-width: 600px; /* Un po' più largo su desktop */
  box-sizing: border-box; /* I padding non si sommano alla width */
  
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.1); 

  .addr { 
    font-family: 'Monaco', monospace; 
    font-size: 0.85rem; 
    color: #a855f7; 
    
    /* REGOLE CHIAVE PER TRONCARE IL TESTO */
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
    flex: 1; /* Il testo occupa lo spazio rimanente... */
    min-width: 0; /* ...ma questo gli permette di rimpicciolirsi! TRUCCO FLEXBOX */
  } 

  /* Evitiamo che i pulsanti vengano schiacciati */
  .actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0; /* I pulsanti non si restringono mai */
  }

  button, a { 
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

const AuditBadgeLink = styled.a`display: inline-flex; align-items: center; gap: 8px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; padding: 8px 16px; border-radius: 100px; font-size: 0.85rem; font-weight: bold; text-decoration: none; transition: all 0.2s; &:hover { background: rgba(34, 197, 94, 0.2); transform: translateY(-2px); }`;

const LivePulseSection = styled.div`margin: 60px 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;`;
const PulseCard = styled.div<{ $isProcessing?: boolean }>`background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 24px; border-radius: 20px; display: flex; flex-direction: column; gap: 12px; height: 100%; ${props => props.$isProcessing && `animation: ${pulse} 2s infinite; border-color: #a855f7;`} .header-row { display: flex; justify-content: space-between; align-items: center; } .label { color: #64748b; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; } .value { font-size: 1.8rem; font-weight: 700; color: ${props => props.$isProcessing ? '#a855f7' : 'white'}; display: flex; align-items: center; gap: 10px; } .sub { color: #a855f7; font-size: 0.8rem; font-weight: 600; } .verify-link { display: inline-flex; align-items: center; gap: 6px; color: #94a3b8; font-size: 0.8rem; text-decoration: none; transition: color 0.2s; &:hover { color: #22c55e; } } .defillama-btn { display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; padding: 10px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: auto; transition: all 0.2s; &:hover { background: rgba(34, 197, 94, 0.25); transform: translateY(-2px); } }`;
const LiveIndicator = styled.div`display: flex; align-items: center; gap: 6px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); padding: 4px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; color: #22c55e; text-transform: uppercase; letter-spacing: 1px; .dot { width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%; animation: ${livePulse} 2s infinite; }`;
const ActionButton = styled.a`display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%); color: white; padding: 10px 20px; border-radius: 100px; font-weight: bold; text-decoration: none; text-align: center; font-size: 0.9rem; transition: transform 0.2s; &:hover { transform: scale(1.05); }`;

const YieldEngineSection = styled.div`margin: 40px auto; background: linear-gradient(145deg, rgba(16, 10, 30, 0.9) 0%, rgba(5, 5, 10, 0.9) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(168, 85, 247, 0.15); h2 { text-align: center; font-size: 2.2rem; font-weight: 800; margin-bottom: 40px; background: linear-gradient(to right, #a855f7, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; } .yield-card { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 25px; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: flex-start; &:hover { border-color: rgba(168, 85, 247, 0.4); transform: translateY(-5px); } .icon-head { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; .icon { font-size: 1.8rem; color: #a855f7; } h3 { font-size: 1.3rem; margin: 0; } } p { color: #94a3b8; line-height: 1.6; font-size: 0.95rem; margin-bottom: 0; flex-grow: 1; } }`;
const ProtocolSpecsSection = styled.section`padding: 80px 0; text-align: center; background: rgba(168, 85, 247, 0.02); border-radius: 40px; border: 1px solid rgba(168, 85, 247, 0.1); margin: 60px 0; h2 { font-size: 2.2rem; margin-bottom: 50px; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } .supply-box { margin-bottom: 50px; .label { color: #94a3b8; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; } .value { font-size: 3.5rem; font-weight: 900; color: #a855f7; display: block; margin: 10px 0; text-shadow: 0 0 30px rgba(168, 85, 247, 0.3); } .sub { color: #facc15; font-weight: bold; font-size: 1rem; } } .spec-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; padding: 0 20px; }`;
const SpecCard = styled.div`background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; align-items: center; gap: 12px; .icon { font-size: 1.5rem; color: #a855f7; } .label { color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; } .value { font-size: 1.6rem; font-weight: 800; color: white; } .desc { font-size: 0.8rem; color: #94a3b8; }`;
const FeatureGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; padding: 60px 0;`;
const FeatureCard = styled.div`padding: 40px; background: rgba(255, 255, 255, 0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 24px; h3 { font-size: 1.5rem; margin: 20px 0 12px; } p { color: #94a3b8; line-height: 1.6; } .icon-box { width: 48px; height: 48px; background: rgba(168, 85, 247, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #a855f7; font-size: 1.5rem; }`;
const AuditSection = styled.section`padding: 80px 0; background: linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, transparent 100%); border-radius: 40px; border: 1px solid rgba(168, 85, 247, 0.1); margin-bottom: 100px; h2 { font-size: 2.5rem; margin-bottom: 16px; text-align: center; } p.audit-sub { color: #94a3b8; text-align: center; max-width: 700px; margin: 0 auto 50px; } .audit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; padding: 0 40px; }`;
const AuditCard = styled.div`background: rgba(3, 0, 20, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 24px; display: flex; flex-direction: column; gap: 15px; .icon { color: #a855f7; font-size: 1.5rem; } h4 { font-size: 1.2rem; color: white; } p { font-size: 0.95rem; color: #94a3b8; line-height: 1.5; }`;

const HomePageClient = () => {
  const [timerDisplay, setTimerDisplay] = useState('...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [tokenVolume24h, setTokenVolume24h] = useState<number | null>(null);
  const [tokenLiquidity, setTokenLiquidity] = useState<number | null>(null);
  const [treasuryBnb, setTreasuryBnb] = useState('...');
  const [accBnb, setAccBnb] = useState('...');
  const [accTokens, setAccTokens] = useState('...');
  const volume30d = 27863;

  const [protocolDebt, setProtocolDebt] = useState('...');
  const [globalApr, setGlobalApr] = useState('...');

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const resDex = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`);
        const dataDex = await resDex.json();
        if (dataDex.pairs) {
          const totalVol = dataDex.pairs.reduce((acc: number, pair: any) => acc + (pair.volume?.h24 || 0), 0);
          const totalLiq = dataDex.pairs.reduce((acc: number, pair: any) => acc + (pair.liquidity?.usd || 0), 0);
          setTokenVolume24h(totalVol);
          setTokenLiquidity(totalLiq);
        }

        const rpcBody = (method: string, params: (string | object)[]) => JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 });
        const rpcUrl = 'https://bsc-dataseed.binance.org/';
        const [resT, resAB, resAT] = await Promise.all([
          fetch(rpcUrl, { method: 'POST', body: rpcBody('eth_getBalance', [TREASURY_WALLET, 'latest']) }),
          fetch(rpcUrl, { method: 'POST', body: rpcBody('eth_getBalance', [ACCUMULATOR_WALLET, 'latest']) }),
          fetch(rpcUrl, { method: 'POST', body: rpcBody('eth_call', [{ to: CONTRACT_ADDRESS, data: '0x70a08231' + ACCUMULATOR_WALLET.substring(2).padStart(64, '0') }, 'latest']) })
        ]);
        const dT = await resT.json(); if(dT.result) setTreasuryBnb((Number(BigInt(dT.result)) / 1e18).toFixed(4));
        const dAB = await resAB.json(); if(dAB.result) setAccBnb((Number(BigInt(dAB.result)) / 1e18).toFixed(4));
        const dAT = await resAT.json(); if(dAT.result && dAT.result !== '0x') setAccTokens((Number(BigInt(dAT.result)) / 1e9).toLocaleString(undefined, {maximumFractionDigits: 0}));

        const statsRes = await fetch('/api/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setProtocolDebt(statsData.protocolDebt || '0.0000');
        }

        const aprRes = await fetch('/api/apr');
        if (aprRes.ok) {
          const aprData = await aprRes.json();
          if (aprData.apr) setGlobalApr(aprData.apr + '%');
        }

      } catch (e) { console.error(e); }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);

    const ANCHOR_TIME = new Date('2026-04-28T10:03:00-03:00').getTime();
    const INTERVAL = 6 * 60 * 60 * 1000;
    const updateTimer = () => {
      const now = new Date().getTime();
      const elapsed = now - ANCHOR_TIME;
      const cycles = Math.floor(elapsed / INTERVAL);
      const lastPayout = ANCHOR_TIME + (cycles * INTERVAL);
      const nextPayout = lastPayout + INTERVAL;
      const timeSinceLast = now - lastPayout;
      if (timeSinceLast >= 0 && timeSinceLast <= 120000) { setIsProcessing(true); setTimerDisplay('Processing...'); }
      else {
        setIsProcessing(false);
        const diff = nextPayout - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimerDisplay(`${h}h ${m}m ${s}s`);
      }
    };
    const tInterval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => { clearInterval(interval); clearInterval(tInterval); };
  }, []);

  const copyToClipboard = () => { navigator.clipboard.writeText(CONTRACT_ADDRESS); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  
  // CALCOLO HEALTH CHECK AL VOLO
  const debtNum = parseFloat(protocolDebt);
  const treasuryNum = parseFloat(treasuryBnb);
  let ratioStr = "...";
  let statusStr = "Analyzing...";
  let statusColor = "#94a3b8";

  if (!isNaN(debtNum) && !isNaN(treasuryNum) && treasuryNum > 0) {
      const ratio = (debtNum / treasuryNum) * 100;
      ratioStr = ratio.toFixed(2) + "%";
      if (ratio <= 55) {
          statusStr = "✅ SECURE";
          statusColor = "#22c55e"; 
      } else if (ratio <= 90) {
          statusStr = "⚠️ WARNING";
          statusColor = "#facc15"; 
      } else {
          statusStr = "🚨 DANGER";
          statusColor = "#ef4444"; 
      }
  }

  if (!mounted) return null;

  return (
    <PageWrapper>
      <Header activePage="/" />
      <Container>
        <Hero>
          <Badge>Official Token: ARB Inc</Badge>
          <BigLogoWrapper>
            <img src={TOKEN_LOGO_URL} alt="ARB Inc High-Res Logo" />
          </BigLogoWrapper>
          <Title>Unlocking Meritocratic<br />DeFi Yields</Title>
          <Subtitle>Aggregated liquidity and a transparent 100% revenue-sharing model powered by our 9-decimal ranking justice.</Subtitle>
          <ButtonGroup><PrimaryButton href={SWAP_LINK}>Swap Now <FaArrowRight /></PrimaryButton><SecondaryButton href="#protocol-specs">Technical Specs</SecondaryButton></ButtonGroup>
          
          <ContractContainer>
            <ContractBox>
              <span className="addr">{CONTRACT_ADDRESS}</span>
              <div className="actions">
                  <button onClick={copyToClipboard}>{copied ? <FaCheckCircle style={{color: '#22c55e'}} /> : <FaCopy />}</button>
                  <a href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer"><FaExternalLinkAlt size={14} /></a>
              </div>
            </ContractBox>
            <AuditBadgeLink href={TOKEN_SNIFFER_LINK} target="_blank" rel="noreferrer">
              <FaShieldAlt /> Audit on TokenSniffer
            </AuditBadgeLink>
          </ContractContainer>

        </Hero>

        <LivePulseSection>
          {/* COLONNA 1: TIMER + ACCUMULATOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <PulseCard $isProcessing={isProcessing}>
              <span className="label">Next Payout Cycle</span>
              <span className="value">{isProcessing && <FaSpinner className="fa-spin" />}{timerDisplay}</span>
              <span className="sub" style={{marginBottom: '15px'}}>Global Sync (BRT)</span>
              
              <div style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '15px', marginTop: 'auto' }}>
                <div style={{ fontSize: '0.75rem', color: '#a855f7', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Accumulator (Pending)</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}><span style={{color: '#94a3b8'}}>Pending BNB</span><span style={{ color: 'white' }}>{accBnb} BNB</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{color: '#94a3b8'}}>Pending ARB</span><span style={{ color: 'white' }}>{accTokens} ARB</span></div>
              </div>
              <a href={`https://bscscan.com/address/${ACCUMULATOR_WALLET}`} target="_blank" rel="noreferrer" className="verify-link" style={{marginTop: '10px', alignSelf: 'center'}}><FaExternalLinkAlt size={10} /> View Accumulator Wallet</a>
            </PulseCard>
            <ActionButton href="/rewards" style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: '14px', borderRadius: '16px', fontSize: '1rem' }}>Go to Rewards</ActionButton>
          </div>
          
          {/* COLONNA 2: TRADING VOLUME + DEFILLAMA */}
          <PulseCard>
            <div className="header-row"><span className="label">Trading Volume (24h)</span><LiveIndicator><div className="dot"></div>Live</LiveIndicator></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '15px 0' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Aggregated Token Volume</span>
                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.8rem', display: 'block' }}>
                  {tokenVolume24h !== null ? `$${tokenVolume24h.toLocaleString(undefined, {maximumFractionDigits: 0})}` : <FaSpinner className="fa-spin" size={20} />}
                </span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}><FaWater size={10} /> Total Token Liquidity</span>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {tokenLiquidity !== null ? `$${tokenLiquidity.toLocaleString(undefined, {maximumFractionDigits: 0})}` : <FaSpinner className="fa-spin" size={14} />}
                </span>
              </div>
            </div>
            <a href={ALL_POOLS_LINK} target="_blank" rel="noreferrer" className="verify-link" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
              <FaChartLine /> View All Pools on PancakeSwap <FaExternalLinkAlt size={10} />
            </a>

            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '15px', marginTop: 'auto', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}><span style={{color: '#64748b', textTransform: 'uppercase'}}>DefiLlama Stats</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{color: '#94a3b8'}}>30d Volume</span><span style={{ color: 'white', fontWeight: 'bold' }}>${volume30d.toLocaleString()}</span></div>
            </div>
            <a href="https://defillama.com/protocol/arbitrage-inc" target="_blank" rel="noreferrer" className="defillama-btn">🦙 Open DefiLlama</a>
          </PulseCard>
          
          {/* COLONNA 3: TREASURY LIVE BALANCE + PROTOCOL HEALTH + APR */}
          <PulseCard>
            <div className="header-row"><span className="label">Treasury Wallet</span><FaShieldAlt style={{color: '#22c55e'}} /></div>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', margin: '15px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>Live Balance</span>
                <span style={{ color: '#facc15', fontWeight: 'bold', fontSize: '1.8rem' }}>{treasuryBnb} BNB</span>
              </div>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '12px', padding: '15px', marginTop: 'auto' }}>
              <div style={{ fontSize: '0.75rem', color: '#22c55e', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Protocol Health</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}><span style={{color: '#94a3b8'}}>Total User Debt</span><span style={{ color: '#ef4444', fontWeight: 'bold' }}>{protocolDebt} BNB</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}><span style={{color: '#94a3b8'}}>Utilization Ratio</span><span style={{ color: 'white', fontWeight: 'bold' }}>{ratioStr}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}><span style={{color: '#94a3b8'}}>System Status</span><span style={{ color: statusColor, fontWeight: 'bold' }}>{statusStr}</span></div>
            </div>

            {/* BOX APR ESPLOSIVO */}
            <div style={{ background: 'rgba(250, 204, 21, 0.15)', border: '1px solid rgba(250, 204, 21, 0.4)', borderRadius: '12px', padding: '15px', marginTop: '10px', textAlign: 'center', boxShadow: '0 0 20px rgba(250,204,21,0.1)' }}>
              <div style={{ fontSize: '0.8rem', color: '#facc15', textTransform: 'uppercase', marginBottom: '5px', letterSpacing: '2px', fontWeight: 'bold' }}>Current Global APR</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', textShadow: '0 0 15px rgba(250,204,21,0.5)' }}>
                {globalApr} <span style={{fontSize: '1.8rem'}}>🔥</span>
              </div>
            </div>
            
            <a href={`https://bscscan.com/address/${TREASURY_WALLET}`} target="_blank" rel="noreferrer" className="verify-link" style={{marginTop: '10px', alignSelf: 'center'}}><FaExternalLinkAlt size={10} /> View Treasury Wallet</a>
          </PulseCard>
        </LivePulseSection>

        <YieldEngineSection>
          <h2>The Ultimate Yield Engine</h2>
          <div className="grid-3">
            <div className="yield-card" style={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}><div className="icon-head"><FaRocket className="icon" /><h3>Trade & Farm</h3></div><p>Stack points with every action: <strong>Swap (100), Zap (150)</strong> or <strong>Limit Orders (200)</strong>. Every trade fuels the treasury.</p></div>
            <div className="yield-card"><div className="icon-head"><FaCoins className="icon" /><h3>Earn Real BNB</h3></div><p>Hold <strong>2M+ tokens</strong> for Diamond Status. Our engine distributes <strong>Real BNB</strong> from protocol fees directly to holders.</p></div>
            <div className="yield-card" style={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}><div className="icon-head"><FaTasks className="icon" style={{ color: '#3b82f6' }} /><h3>Free Point Tasks</h3></div><p>No capital? No problem. Complete <strong>Free Tasks</strong> and invite friends to earn a <strong>10% Lifetime Bonus</strong>.</p></div>
          </div>
        </YieldEngineSection>

        <ProtocolSpecsSection id="protocol-specs">
          <h2>Protocol Transparency</h2>
          <div className="supply-box"><span className="label">Total Supply</span><span className="value">1 Billion</span><span className="sub">4% Buy/Sell Tax for Rewards</span></div>
          <div className="spec-grid">
            <SpecCard><FaChartPie className="icon" /><span className="label">Fee Destination</span><span className="value">100%</span><span className="desc">To Ranked Treasury</span></SpecCard>
            <SpecCard><FaClock className="icon" /><span className="label">Reward Frequency</span><span className="value">6 Hours</span><span className="desc">Automated Distribution</span></SpecCard>
            <SpecCard><FaBullseye className="icon" /><span className="label">Ranking Precision</span><span className="value">9 Decimals</span><span className="desc">Fair & Precise math</span></SpecCard>
          </div>
        </ProtocolSpecsSection>

        <FeatureGrid>
          <FeatureCard><div className="icon-box"><FaExchangeAlt /></div><h3>Fee Revenue Engine</h3><p>100% of trading fees from our DEX aggregator are funneled directly into the Treasury.</p></FeatureCard>
          <FeatureCard><div className="icon-box"><FaTrophy /></div><h3>9-Decimal Justice</h3><p>Our proprietary ranking system ensures rewards are distributed with mathematical precision.</p></FeatureCard>
          <FeatureCard><div className="icon-box"><FaShieldAlt /></div><h3>Full Transparency</h3><p>Monitor every inflow. 100% of protocol taxes and fees are visible and distributed every 6 hours.</p></FeatureCard>
        </FeatureGrid>

        <AuditSection>
          <h2>Security & Audit</h2>
          <p className="audit-sub">Arbitrage Inception prioritizes safety through strategic simplification.</p>
          <div className="audit-grid">
            <AuditCard><FaCheckCircle className="icon" /><h4>KyberSwap Integration</h4><p>We leverage KyberSwap widgets for trading logic, audited by ChainSecurity.</p></AuditCard>
            <AuditCard><FaLock className="icon" /><h4>Zero-Contract Risk</h4><p>By avoiding custom swap contracts, we eliminate the primary entry point for hacks.</p></AuditCard>
            <AuditCard><FaCode className="icon" /><h4>Frontend Rewards Logic</h4><p>Rankings are processed by a transparent frontend engine with 9-decimal precision.</p></AuditCard>
          </div>
        </AuditSection>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default HomePageClient;
