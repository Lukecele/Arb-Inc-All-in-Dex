'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { createLimitOrderMaker } from '../../lib/limit-order/maker';
import { getDefaultClient } from '../../lib/limit-order/api-client';
import {
  init,
  useConnectWallet,
} from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { ethers } from 'ethers';

const injected = injectedModule();
const walletConnect = walletConnectModule({
  projectId: 'b03ed6d8451c1e05022897815db0ad0b',
  requiredChains: [56],
  optionalChains: [1, 137, 42161, 8453, 10],
  dappUrl: 'https://arbitrage-inc.exchange',
});

init({
  wallets: [injected, walletConnect],
  chains: [
    { id: '0x38', token: 'BNB', label: 'BNB Smart Chain', rpcUrl: 'https://bsc.publicnode.com' },
  ],
});

const BSC_CHAIN_ID = 56;
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

const BSC_TOKENS: Token[] = [
  { address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', symbol: 'BNB', decimals: 18 },
  { address: USDT_ADDRESS, symbol: 'USDT', decimals: 18 },
  { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD', decimals: 18 },
  { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', symbol: 'USDC', decimals: 18 },
  { address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', symbol: 'ETH', decimals: 18 },
  { address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1CD3De553', symbol: 'BTCB', decimals: 18 },
  { address: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c', symbol: 'ARB', decimals: 18 },
];

const ERC20_ABI = ['function balanceOf(address owner) view returns (uint256)'];

async function fetchTokenPrices(): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  const promises = BSC_TOKENS.map(async (token) => {
    if (token.address.toLowerCase() === USDT_ADDRESS.toLowerCase()) {
      prices[token.address] = 1;
      return;
    }
    try {
      const res = await fetch(
        `https://aggregator-api.kyberswap.com/bsc/api/v1/routes?tokenIn=${token.address}&tokenOut=${USDT_ADDRESS}&amountIn=1000000000000000000`,
        { headers: { 'x-client-id': 'arb-inc' } }
      );
      const data = await res.json();
      if (data.data?.routeSummary?.amountOut) {
        prices[token.address] = parseFloat(data.data.routeSummary.amountOut) / 1e18;
      } else {
        prices[token.address] = 1;
      }
    } catch {
      prices[token.address] = 1;
    }
  });
  
  await Promise.all(promises);
  prices[USDT_ADDRESS] = 1;
  return prices;
}

async function fetchBalance(tokenAddr: string, wallet: string, provider: any): Promise<string> {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    if (tokenAddr === '0x0000000000000000000000000000000000000000') {
      return ethers.utils.formatEther(await ethersProvider.getBalance(wallet));
    }
    const contract = new ethers.Contract(tokenAddr, ERC20_ABI, ethersProvider);
    return ethers.utils.formatEther(await contract.balanceOf(wallet));
  } catch {
    return '0';
  }
}

const Container = styled.div`
  min-height: 100vh;
  background: #000;
  padding: 16px;
`;

const NavTabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  font-size: 14px;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${p => p.$active ? '#20B8CD' : '#71717a'};
  text-decoration: none;
  font-weight: 500;
  &:hover { color: #20B8CD; }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ChainBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 20px;
  color: #a1a1aa;
  font-size: 13px;
`;

const WalletBadge = styled.div`
  padding: 6px 12px;
  background: #27272a;
  border-radius: 8px;
  color: #a1a1aa;
  font-size: 13px;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  
  @media (min-width: 900px) {
    grid-template-columns: 420px 1fr;
  }
`;

const Card = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  margin-bottom: 12px;
`;

const InputLabel = styled.div`
  font-size: 12px;
  color: #a1a1aa;
  margin-bottom: 6px;
`;

const InputRow = styled.div`
  display: flex;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  padding: 14px;
  &:focus-within { border-color: #20B8CD; }
`;

const AmountInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  outline: none;
  &::placeholder { color: #52525b; }
`;

const TokenButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover { border-color: #20B8CD; }
`;

const SwapIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 50%;
  color: #20B8CD;
  margin: -8px auto;
  cursor: pointer;
  &:hover { background: #3f3f46; }
`;

const RateBox = styled.div`
  background: #27272a;
  border-radius: 12px;
  padding: 14px;
  margin: 12px 0;
`;

const RateLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #a1a1aa;
  margin-bottom: 10px;
`;

const RateInput = styled.input`
  width: 100%;
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  padding: 10px;
  color: #fff;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #20B8CD; }
`;

const MarketBtn = styled.button`
  padding: 10px 14px;
  background: #20B8CD;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
  &:hover { opacity: 0.9; }
`;

const RateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 12px;
  color: #a1a1aa;
`;

const ExpirySelect = styled.select`
  width: 100%;
  padding: 12px;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-top: 12px;
  &:focus { outline: none; border-color: #20B8CD; }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: #20B8CD;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  &:hover:not(:disabled) { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const TabsRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background: ${p => p.$active ? '#27272a' : 'transparent'};
  border: none;
  border-radius: 8px;
  color: ${p => p.$active ? '#fff' : '#a1a1aa'};
  font-size: 13px;
  cursor: pointer;
  &:hover { background: #27272a; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #71717a;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalInner = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  width: 100%;
  max-width: 360px;
  max-height: 70vh;
  overflow: auto;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #27272a;
  font-weight: 600;
  color: #fff;
`;

const TokenItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  &:hover { background: #27272a; }
`;

const TokenName = styled.div`
  font-weight: 500;
  color: #fff;
`;

const TokenBal = styled.div`
  color: #a1a1aa;
  font-size: 13px;
`;

export default function LimitOrdersPage() {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'open' | 'my'>('open');
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [showTokenModal, setShowTokenModal] = useState<'sell' | 'buy' | null>(null);
  const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({});
  
  const walletAddress = wallet?.accounts?.[0]?.address;
  const provider = wallet?.provider;
  const [maker, setMaker] = useState<any>(null);
  
  const [sellToken, setSellToken] = useState<Token>(BSC_TOKENS[0]);
  const [buyToken, setBuyToken] = useState<Token>(BSC_TOKENS[1]);
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [rate, setRate] = useState('');
  const [expiry, setExpiry] = useState(0);
  const [useMarketRate, setUseMarketRate] = useState(false);

  useEffect(() => {
    fetchTokenPrices().then(setTokenPrices).catch(() => {});
  }, []);

  useEffect(() => {
    if (provider && walletAddress) {
      setMaker(createLimitOrderMaker(getDefaultClient()));
    } else {
      setMaker(null);
    }
  }, [provider, walletAddress]);

  const loadBalances = useCallback(async () => {
    if (!walletAddress || !provider) return;
    const bals: Record<string, string> = {};
    for (const t of BSC_TOKENS) {
      bals[t.address] = await fetchBalance(t.address, walletAddress, provider);
    }
    setBalances(bals);
  }, [walletAddress, provider]);

  useEffect(() => {
    if (walletAddress && provider) loadBalances();
  }, [walletAddress, provider, loadBalances]);

  const loadOrders = useCallback(async () => {
    if (!maker || !walletAddress) return;
    setLoading(true);
    try {
      const res = await maker.getMakerOrders(walletAddress, { page: 1, size: 50 });
      setOrders((res.orders || []).map((o: any) => ({
        id: o.id,
        makerAsset: o.makerAsset,
        takerAsset: o.takerAsset,
        makingAmount: ethers.utils.formatEther(o.makingAmount),
        takingAmount: ethers.utils.formatEther(o.takingAmount),
        status: o.status || 'active',
      })));
    } catch { setOrders([]); }
    finally { setLoading(false); }
  }, [maker, walletAddress]);

  useEffect(() => {
    if (walletAddress && maker) loadOrders();
  }, [walletAddress, maker, loadOrders]);

  const getMarketRate = () => {
    const sp = tokenPrices[sellToken.address] || 1;
    const bp = tokenPrices[buyToken.address] || 1;
    return (sp / bp).toFixed(6);
  };

  const handleRate = (v: string) => {
    setRate(v);
    setUseMarketRate(false);
    if (sellAmount && v) setBuyAmount((parseFloat(sellAmount) * parseFloat(v)).toFixed(6));
  };

  const handleMarket = () => {
    const r = getMarketRate();
    setRate(r);
    setUseMarketRate(true);
    if (sellAmount) setBuyAmount((parseFloat(sellAmount) * parseFloat(r)).toFixed(6));
  };

  const handleSell = (v: string) => {
    setSellAmount(v);
    if (v && rate) setBuyAmount((parseFloat(v) * parseFloat(rate)).toFixed(6));
    else if (v && useMarketRate) setBuyAmount((parseFloat(v) * parseFloat(getMarketRate())).toFixed(6));
  };

  const handleFlip = () => {
    const t = sellToken;
    setSellToken(buyToken);
    setBuyToken(t);
    setSellAmount('');
    setBuyAmount('');
    setRate('');
  };

  const handleCreate = async () => {
    if (!wallet || !provider || !sellAmount || !rate) return;
    try {
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = await prov.getSigner();
      const mk = createLimitOrderMaker(getDefaultClient());
      const exp = expiry > 0 ? Math.floor(Date.now()/1000)+expiry : Math.floor(Date.now()/1000)+86400*365;
      await mk.createOrder(signer, {
        chainId: BSC_CHAIN_ID.toString(),
        makerAsset: sellToken.address,
        takerAsset: buyToken.address,
        makingAmount: ethers.utils.parseUnits(sellAmount, sellToken.decimals).toString(),
        takingAmount: ethers.utils.parseUnits((parseFloat(sellAmount)*parseFloat(rate)).toFixed(buyToken.decimals), buyToken.decimals).toString(),
        expiredAt: exp,
      });
      alert('Order created!');
      loadOrders();
      setSellAmount(''); setBuyAmount(''); setRate('');
    } catch (e: any) {
      alert(e.message || 'Error creating order');
    }
  };

  const selectToken = (t: Token) => {
    if (showTokenModal === 'sell') setSellToken(t);
    else setBuyToken(t);
    setShowTokenModal(null);
  };

  const getSym = (a: string) => BSC_TOKENS.find(t => t.address.toLowerCase() === a.toLowerCase())?.symbol || a.slice(0,6);

  if (!wallet) {
    return (
      <Container>
        <NavTabs>
          <NavLink href="/swap">Swap</NavLink>
          <NavLink href="/limit-orders" $active>Limit Order</NavLink>
        </NavTabs>
        <Header><Title>Limit Order</Title></Header>
        <MainGrid>
          <Card>
            <CardTitle>Place Limit Order</CardTitle>
            <EmptyState>
              <p style={{marginBottom:12}}>Connect your wallet to start trading</p>
              <SubmitBtn onClick={() => connect()}>{connecting ? 'Connecting...' : 'Connect Wallet'}</SubmitBtn>
            </EmptyState>
          </Card>
          <Card>
            <CardTitle>Open Orders</CardTitle>
            <TabsRow><Tab $active={activeTab==='open'} onClick={()=>setActiveTab('open')}>Open Limit Orders</Tab><Tab $active={activeTab==='my'} onClick={()=>setActiveTab('my')}>My Orders</Tab></TabsRow>
            <EmptyState>Connect wallet to view orders</EmptyState>
          </Card>
        </MainGrid>
      </Container>
    );
  }

  return (
    <Container>
      <NavTabs>
        <NavLink href="/swap">Swap</NavLink>
        <NavLink href="/limit-orders" $active>Limit Order</NavLink>
      </NavTabs>
      <Header>
        <Title>Limit Order</Title>
        <HeaderRight>
          <ChainBadge><span style={{color:'#20B8CD'}}>●</span> BNB Chain</ChainBadge>
          <WalletBadge>{walletAddress?.slice(0,6)}...{walletAddress?.slice(-4)}</WalletBadge>
        </HeaderRight>
      </Header>
      <MainGrid>
        <Card>
          <CardTitle>Place Limit Order</CardTitle>
          
          <InputGroup><InputLabel>You Sell</InputLabel>
            <InputRow>
              <AmountInput type="number" placeholder="0.0" value={sellAmount} onChange={e=>handleSell(e.target.value)} />
              <TokenButton onClick={()=>setShowTokenModal('sell')}>{sellToken.symbol} ▼</TokenButton>
            </InputRow>
          </InputGroup>
          
          <SwapIcon onClick={handleFlip}>⇅</SwapIcon>
          
          <InputGroup><InputLabel>You Buy</InputLabel>
            <InputRow>
              <AmountInput type="text" placeholder="0.0" value={buyAmount} readOnly />
              <TokenButton onClick={()=>setShowTokenModal('buy')}>{buyToken.symbol} ▼</TokenButton>
            </InputRow>
          </InputGroup>
          
          <RateBox>
            <RateLabel><span>Sell {sellToken.symbol} at rate</span></RateLabel>
            <div style={{display:'flex',gap:8}}>
              <RateInput type="number" placeholder="0.0" value={rate} onChange={e=>handleRate(e.target.value)} />
              <MarketBtn onClick={handleMarket}>Market</MarketBtn>
            </div>
            <RateRow><span>Est. Market Price</span><span>1 {sellToken.symbol} = {Object.keys(tokenPrices).length ? getMarketRate() : '...'} {buyToken.symbol}</span></RateRow>
          </RateBox>
          
          <ExpirySelect value={expiry} onChange={e=>setExpiry(Number(e.target.value))}>
            <option value={0}>Never expire</option>
            <option value={3600}>1 hour</option>
            <option value={86400}>1 day</option>
            <option value={604800}>7 days</option>
          </ExpirySelect>
          
          <SubmitBtn onClick={handleCreate}>Create Order</SubmitBtn>
        </Card>
        
        <Card>
          <CardTitle>Open Orders</CardTitle>
          <TabsRow><Tab $active={activeTab==='open'} onClick={()=>setActiveTab('open')}>Open Limit Orders</Tab><Tab $active={activeTab==='my'} onClick={()=>setActiveTab('my')}>My Orders</Tab></TabsRow>
          
          {orders.length === 0 ? (
            <EmptyState>No orders found</EmptyState>
          ) : (
            <div>
              {orders.map(o => (
                <div key={o.id} style={{padding:'12px',borderBottom:'1px solid #27272a',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{color:'#fff',fontWeight:500}}>{getSym(o.makerAsset)} → {getSym(o.takerAsset)}</div>
                    <div style={{color:'#a1a1aa',fontSize:13}}>{parseFloat(o.makingAmount).toFixed(4)} {getSym(o.makerAsset)}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'#F472B6',fontWeight:500}}>{(parseFloat(o.takingAmount)/parseFloat(o.makingAmount)).toFixed(4)} {getSym(o.takerAsset)}</div>
                    <div style={{color:'#20B8CD',fontSize:12}}>{o.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </MainGrid>

      {showTokenModal && (
        <Modal onClick={()=>setShowTokenModal(null)}>
          <ModalInner onClick={e=>e.stopPropagation()}>
            <ModalTitle>Select Token <button type="button" onClick={()=>setShowTokenModal(null)} style={{background:'none',border:'none',color:'#a1a1aa',fontSize:20,cursor:'pointer'}}>×</button></ModalTitle>
            {BSC_TOKENS.map(t => (
              <TokenItem key={t.address} onClick={()=>selectToken(t)} style={{border: (showTokenModal==='sell'?sellToken.address:buyToken.address) === t.address ? '1px solid #20B8CD' : '1px solid transparent'}}>
                <TokenName>{t.symbol}</TokenName>
                <TokenBal>{balances[t.address] ? parseFloat(balances[t.address]).toFixed(4) : '...'}</TokenBal>
              </TokenItem>
            ))}
          </ModalInner>
        </Modal>
      )}
    </Container>
  );
}
