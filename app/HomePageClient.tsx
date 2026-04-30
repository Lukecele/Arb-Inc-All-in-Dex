'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaExchangeAlt, FaTrophy, FaShieldAlt, FaArrowRight, FaSpinner, FaLock, FaCheckCircle, FaCode, FaCopy, FaExternalLinkAlt, FaNetworkWired, FaCoins, FaRocket, FaTasks, FaChartPie, FaClock, FaBullseye, FaWallet, FaLayerGroup, FaChartLine } from 'react-icons/fa';

const CONTRACT_ADDRESS = "0x5ee54869ecd5e752c31af095187326d4a4d50e1c"; 
const TREASURY_WALLET = "0x66BB01F14229E2179bAD84D52A69C0e4628dE63f"; 
const ACCUMULATOR_WALLET = "0x4c1caA917FD012b285Ba35E93535675e5B59806C"; 
const SWAP_LINK = `/swap-all?tokenOut=${CONTRACT_ADDRESS}`;
const TOKEN_LOGO = "https://dd.dexscreener.com/ds-data/tokens/bsc/0x5ee54869ecd5e752c31af095187326d4a4d50e1c.png";

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
  padding: 120px 0 60px;
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
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  img { width: 20px; height: 20px; border-radius: 50%; }
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
  .addr { font-family: 'Monaco', monospace; font-size: 0.85rem; color: #a855f7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  button { background: none; border: none; color: #94a3b8; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; &:hover { color: white; transform: scale(1.1); } }
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
  margin: 60px 0 20px;
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
  gap: 12px;
  height: 100%;
  ${props => props.$isProcessing && `animation: ${pulse} 2s infinite; border-color: #a855f7;`}
  .header-row { display: flex; justify-content: space-between; align-items: center; }
  .label { color: #64748b; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
  .value { font-size: 1.8rem; font-weight: 700; color: ${props => props.$isProcessing ? '#a855f7' : 'white'}; display: flex; align-items: center; gap: 10px; }
  .sub { color: #a855f7; font-size: 0.8rem; font-weight: 600; }
  .verify-link { display: inline-flex; align-items: center; gap: 6px; color: #94a3b8; font-size: 0.8rem; text-decoration: none; transition: color 0.2s; &:hover { color: #22c55e; } }
  .defillama-btn { display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; padding: 10px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: auto; transition: all 0.2s; &:hover { background: rgba(34, 197, 94, 0.25); transform: translateY(-2px); } }
`;

const LiveIndicator = styled.div`
  display: flex; align-items: center; gap: 6px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); padding: 4px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; color: #22c55e; text-transform: uppercase; letter-spacing: 1px;
  .dot { width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%; animation: ${livePulse} 2s infinite; }
`;

const ActionButton = styled.a`
  display: inline-block; background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%); color: white; padding: 10px 20px; border-radius: 100px; font-weight: bold; text-decoration: none; text-align: center; font-size: 0.9rem; transition: transform 0.2s; &:hover { transform: scale(1.05); }
`;

const HomePageClient = () => {
  const [timerDisplay, setTimerDisplay] = useState('...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // LIVE VOLUMES
  const [tokenVolume24h, setTokenVolume24h] = useState<number | null>(null);
  const [dexVolume24h, setDexVolume24h] = useState<number | null>(null);

  const [treasuryBnb, setTreasuryBnb] = useState('...');
  const [accBnb, setAccBnb] = useState('...');
  const [accTokens, setAccTokens] = useState('...');

  useEffect(() => {
    setMounted(true);

    const fetchAllData = async () => {
      try {
        // 1. Fetch Token Volume (Aggregated pools) from DexScreener
        const resDexScreener = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`);
        const dataDex = await resDexScreener.json();
        if (dataDex.pairs) {
          const totalVol = dataDex.pairs.reduce((acc: number, pair: any) => acc + (pair.volume?.h24 || 0), 0);
          setTokenVolume24h(totalVol);
        }

        // 2. Fetch Aggregator Volume from DefiLlama
        const resLlama = await fetch('https://api.llama.fi/protocol/arbitrage-inc');
        const dataLlama = await resLlama.json();
        if (dataLlama && dataLlama.total24h) setDexVolume24h(dataLlama.total24h);

        // 3. Blockchain Balances
        const rpcBody = (method: string, params: (string | object)[]) => JSON.stringify({ jsonrpc: '2.0', method, params, id: 1 });
        const rpcUrl = 'https://bsc-dataseed.binance.org/';

        const [resTreasury, resAccBnb, resAccTokens] = await Promise.all([
          fetch(rpcUrl, { method: 'POST', body: rpcBody('eth_getBalance', [TREASURY_WALLET, 'latest']) }),
          fetch(rpcUrl, { method: 'POST', body: rpcBody('eth_getBalance', [ACCUMULATOR_WALLET, 'latest']) }),
          fetch(rpcUrl, { method: 'POST', body: rpcBody('eth_call', [{ to: CONTRACT_ADDRESS, data: '0x70a08231' + ACCUMULATOR_WALLET.substring(2).padStart(64, '0') }, 'latest']) })
        ]);

        const dTreasury = await resTreasury.json();
        if(dTreasury.result) setTreasuryBnb((Number(BigInt(dTreasury.result)) / 1e18).toFixed(4));

        const dAccBnb = await resAccBnb.json();
        if(dAccBnb.result) setAccBnb((Number(BigInt(dAccBnb.result)) / 1e18).toFixed(4));

        const dAccTokens = await resAccTokens.json();
        if(dAccTokens.result && dAccTokens.result !== '0x') setAccTokens((Number(BigInt(dAccTokens.result)) / 1e9).toLocaleString(undefined, {maximumFractionDigits: 0}));

      } catch (e) { console.error('Data Fetch Error:', e); }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 60000);

    const ANCHOR_TIME = new Date('2026-04-28T10:03:00-03:00').getTime();
    const INTERVAL = 6 * 60 * 60 * 1000;
    const updateTimer = () => {
      const now = new Date().getTime();
      const elapsed = now - ANCHOR_TIME;
      const lastPayout = ANCHOR_TIME + (Math.floor(elapsed / INTERVAL) * INTERVAL);
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
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => { clearInterval(interval); clearInterval(timerInterval); };
  }, []);

  const copyToClipboard = () => { navigator.clipboard.writeText(CONTRACT_ADDRESS); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  if (!mounted) return null;

  return (
    <PageWrapper>
      <Header activePage="/" />
      <Container>
        <Hero>
          <Badge><img src={TOKEN_LOGO} alt="ARB" />Official Token: ARB Inc</Badge>
          <Title>Unlocking Meritocratic<br />DeFi Yields</Title>
          <Subtitle>Aggregated liquidity and a transparent 100% revenue-sharing model powered by our 9-decimal ranking justice.</Subtitle>
          <ButtonGroup style={{ display: 'flex', gap: '16px' }}>
            <PrimaryButton href={SWAP_LINK}>Swap Now <FaArrowRight /></PrimaryButton>
            <SecondaryButton href="#protocol-specs">Technical Specs</SecondaryButton>
          </ButtonGroup>
          <ContractBox>
            <span className="addr">{CONTRACT_ADDRESS}</span>
            <button onClick={copyToClipboard}>{copied ? <FaCheckCircle style={{color: '#22c55e'}} /> : <FaCopy />}</button>
            <a href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`} target="_blank" rel="noreferrer"><FaExternalLinkAlt size={14} /></a>
          </ContractBox>
        </Hero>

        <LivePulseSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <PulseCard $isProcessing={isProcessing}>
              <span className="label">Next Payout Cycle</span>
              <span className="value">{isProcessing && <FaSpinner className="fa-spin" />}{timerDisplay}</span>
              <span className="sub">Global Sync (BRT)</span>
            </PulseCard>
            <ActionButton href="/rewards" style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: '14px', borderRadius: '16px', fontSize: '1rem' }}>Go to Rewards</ActionButton>
          </div>
          
          <PulseCard>
            <div className="header-row"><span className="label">Trading Volume (24h)</span><LiveIndicator><div className="dot"></div>Live</LiveIndicator></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '10px 0' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Token Volume (All Pools)</span>
                <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.6rem' }}>
                  {tokenVolume24h !== null ? `$${tokenVolume24h.toLocaleString(undefined, {maximumFractionDigits: 0})}` : <FaSpinner className="fa-spin" size={16} />}
                </span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>DEX Aggregator Volume</span>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {dexVolume24h !== null ? `$${dexVolume24h.toLocaleString(undefined, {maximumFractionDigits: 0})}` : <FaSpinner className="fa-spin" size={14} />}
                </span>
              </div>
            </div>
            <span className="sub" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaChartLine /> Real-time Market Data</span>
          </PulseCard>
          
          <PulseCard>
            <div className="header-row"><span className="label">Treasury & Taxes</span><FaShieldAlt style={{color: '#22c55e'}} /></div>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', margin: '4px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', alignItems: 'center' }}>
                <span style={{color: '#94a3b8'}}>Treasury Balance</span> 
                <span style={{ color: '#facc15', fontWeight: 'bold' }}>{treasuryBnb} BNB</span>
              </div>
            </div>
            <div style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: '#a855f7', textTransform: 'uppercase', marginBottom: '6px' }}>Accumulator (Pending)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}><span style={{color: '#94a3b8'}}>Pending BNB</span> <span style={{ color: 'white' }}>{accBnb}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}><span style={{color: '#94a3b8'}}>Pending Tokens</span> <span style={{ color: 'white' }}>{accTokens}</span></div>
            </div>
            <a href="https://defillama.com/protocol/arbitrage-inc" target="_blank" rel="noreferrer" className="defillama-btn">🦙 Open DefiLlama</a>
          </PulseCard>
        </LivePulseSection>

        <ProtocolSpecsSection id="protocol-specs">
          <h2>Protocol Transparency</h2>
          <div className="supply-box"><span className="label">Total Supply</span><span className="value">1 Billion</span><span className="sub">4% Buy/Sell Tax for Rewards</span></div>
          <div className="spec-grid">
            <SpecCard><FaChartPie className="icon" /><span className="label">Fee Destination</span><span className="value">100%</span><span className="desc">To Ranked Treasury</span></SpecCard>
            <SpecCard><FaClock className="icon" /><span className="label">Reward Frequency</span><span className="value">6 Hours</span><span className="desc">Automated Distribution</span></SpecCard>
            <SpecCard><FaBullseye className="icon" /><span className="label">Ranking Precision</span><span className="value">9 Decimals</span><span className="desc">Fair & Precise math</span></SpecCard>
          </div>
        </ProtocolSpecsSection>

        <AuditSection>
          <div style={{textAlign: 'center', marginBottom: '50px'}}><h2 style={{fontSize: '2.5rem'}}>Security & Audit</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '0 40px' }}>
            <PulseCard><h4>KyberSwap Integration</h4><p style={{color:'#94a3b8', fontSize:'0.9rem'}}>Leveraging KyberSwap widgets for audited trading logic by ChainSecurity.</p></PulseCard>
            <PulseCard><h4>Zero-Contract Risk</h4><p style={{color:'#94a3b8', fontSize:'0.9rem'}}>Eliminating main hack entry points by avoiding custom swap contracts.</p></PulseCard>
            <PulseCard><h4>Frontend Rewards Logic</h4><p style={{color:'#94a3b8', fontSize:'0.9rem'}}>Rankings processed by a transparent engine with 9-decimal precision.</p></PulseCard>
          </div>
        </AuditSection>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default HomePageClient;
