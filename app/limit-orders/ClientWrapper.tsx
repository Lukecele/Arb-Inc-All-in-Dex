'use client';
import { triggerDexReward } from "@/lib/triggerReward";

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { createLimitOrderMaker } from '../../lib/limit-order/maker';
import { getDefaultClient } from '../../lib/limit-order/api-client';
import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BSC_CHAIN_ID = 56;
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const LIMIT_ORDER_CONTRACT = '0xcab2FA2eeab7065B45CBcF6E3936dDE2506b4f6C';

interface Token {
  address: string;
  symbol: string;
  decimals: number;
  logoUrl?: string;
}

const NATIVE_BNB_ADDRESS = '0x0000000000000000000000000000000000000000';
const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

// Token logos from Coingecko CDN
const BSC_TOKENS: Token[] = [
  { address: NATIVE_BNB_ADDRESS, symbol: 'BNB', decimals: 18, logoUrl: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { address: WBNB_ADDRESS, symbol: 'WBNB', decimals: 18, logoUrl: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { address: USDT_ADDRESS, symbol: 'USDT', decimals: 18, logoUrl: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD', decimals: 18, logoUrl: 'https://assets.coingecko.com/coins/images/9576/small/busd_3.png' },
  { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', symbol: 'USDC', decimals: 18, logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png' },
  { address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', symbol: 'CAKE', decimals: 18, logoUrl: 'https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png' },
];

const ERC20_ABI = ['function balanceOf(address owner) view returns (uint256)', 'function approve(address spender, uint256 amount) returns (bool)', 'function allowance(address owner, address spender) view returns (uint256)'];
const WBNB_ABI = ['function deposit() payable', 'function withdraw(uint256 wad)', 'function balanceOf(address) view returns (uint256)'];

const getTokenAddressForContract = (addr: string) => {
  if (addr.toLowerCase() === NATIVE_BNB_ADDRESS.toLowerCase()) {
    return WBNB_ADDRESS;
  }
  return addr;
};

// Map native BNB to WBNB address for API calls
const getApiTokenAddress = (addr: string) => {
  if (addr.toLowerCase() === NATIVE_BNB_ADDRESS.toLowerCase()) {
    return WBNB_ADDRESS;
  }
  return addr;
};

async function fetchTokenPrices(): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  const promises = BSC_TOKENS.map(async (token) => {
    if (token.address.toLowerCase() === USDT_ADDRESS.toLowerCase()) {
      prices[token.address] = 1;
      return;
    }
    try {
      const apiToken = getApiTokenAddress(token.address);
      const res = await fetch(
        `https://aggregator-api.kyberswap.com/bsc/api/v1/routes?tokenIn=${apiToken}&tokenOut=${USDT_ADDRESS}&amountIn=1000000000000000000`,
        { headers: { 'x-client-id': 'arb-inc' } }
      );
      const data = await res.json();
      if (data.data?.routeSummary?.amountOutUsd) {
        prices[token.address] = parseFloat(data.data.routeSummary.amountOutUsd);
      } else if (data.data?.routeSummary?.amountOut) {
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
  padding: 12px;
  @media (min-width: 640px) {
    padding: 16px 24px;
  }
`;

const NavTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
  font-size: 14px;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    gap: 4px;
    margin-bottom: 12px;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: #71717a;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.2s;
  &:hover { color: #fff; background: #1e293b; }
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  @media (min-width: 640px) {
    font-size: 24px;
  }
`;

const DescriptionCard = styled.div`
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 16px;
  color: #a1a1aa;
  font-size: 13px;
  line-height: 1.5;
  @media (min-width: 640px) {
    padding: 16px;
    margin-bottom: 24px;
    font-size: 14px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
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
  gap: 16px;
  
  @media (min-width: 900px) {
    grid-template-columns: 420px 1fr;
    gap: 24px;
  }
`;

const Card = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 16px;
  @media (min-width: 640px) {
    padding: 20px;
  }
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
  padding: 10px 12px;
  &:focus-within { border-color: #20B8CD; }
  @media (min-width: 640px) {
    padding: 14px;
  }
`;

const AmountInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  min-width: 0;
  &::placeholder { color: #52525b; }
  @media (min-width: 640px) {
    font-size: 22px;
  }
`;

const TokenIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const TokenButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  &:hover { border-color: #20B8CD; }
  @media (min-width: 640px) {
    gap: 8px;
    padding: 8px 12px;
    font-size: 14px;
  }
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
  padding: 12px;
  margin: 12px 0;
  @media (min-width: 640px) {
    padding: 14px;
  }
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
  white-space: nowrap;
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
  padding: 14px;
  background: #20B8CD;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  &:hover:not(:disabled) { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  @media (min-width: 640px) {
    padding: 16px;
    font-size: 15px;
    margin-top: 16px;
  }
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
  width: 90%;
  max-width: 360px;
  max-height: 70vh;
  overflow: auto;
  @media (min-width: 640px) {
    width: 100%;
  }
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

const formatNumber = (num: string | number) => {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return '0';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return n.toFixed(4);
};

export default function ClientWrapper() {
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
  const [wrapLoading, setWrapLoading] = useState(false);
  const [approvalNeeded, setApprovalNeeded] = useState(false);
  const [approving, setApproving] = useState(false);
  const [activeMakingAmount, setActiveMakingAmount] = useState<string>('0');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

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
    const prov = new ethers.providers.Web3Provider(provider);
    const nativeBal = await prov.getBalance(walletAddress);
    bals['0x0000000000000000000000000000000000000000'] = ethers.utils.formatEther(nativeBal);
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
      console.log('Loading orders for:', walletAddress);
      const res = await maker.getMakerOrders(walletAddress, { page: 1, size: 50 });
      console.log('Orders response:', res);
      setOrders((res.orders || []).map((o: any) => ({
        id: o.id,
        makerAsset: o.makerAsset,
        takerAsset: o.takerAsset,
        makingAmount: ethers.utils.formatEther(o.makingAmount),
        takingAmount: ethers.utils.formatEther(o.takingAmount),
        status: o.status || 'active',
      })));
    } catch (e) { 
      console.error('Failed to load orders:', e);
      setOrders([]); 
    }
    finally { setLoading(false); }
  }, [maker, walletAddress]);

  useEffect(() => {
    if (walletAddress && maker) loadOrders();
  }, [walletAddress, maker, loadOrders]);

  const handleCancel = async (orderId: string) => {
    if (!provider || !walletAddress || !maker) return;
    if (!confirm('Cancel this order?')) return;
    
    setCancellingId(orderId);
    try {
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = await prov.getSigner();
      await maker.cancelOrders(signer, [orderId]);
      alert('Order cancelled!');
      loadOrders();
    } catch (e: any) {
      console.error('Cancel error:', e);
      alert(e.message || 'Failed to cancel order');
    }
    setCancellingId(null);
  };

  const checkApproval = useCallback(async () => {
    if (!walletAddress || !provider || !maker) return;
    try {
      const tokenAddr = getTokenAddressForContract(sellToken.address);
      const res = await maker.getMakerActiveAmount(walletAddress, tokenAddr);
      const currentAmount = ethers.BigNumber.from(res.activeMakingAmount || '0');
      const newAmount = ethers.utils.parseUnits(sellAmount || '0', sellToken.decimals);
      const totalNeeded = currentAmount.add(newAmount);
      const prov = new ethers.providers.Web3Provider(provider);
      const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, prov);
      const allowance = await tokenContract.allowance(walletAddress, LIMIT_ORDER_CONTRACT);
      setActiveMakingAmount(res.activeMakingAmount || '0');
      setApprovalNeeded(allowance.lt(totalNeeded));
    } catch (e) {
      console.error('Approval check error:', e);
      setApprovalNeeded(true);
    }
  }, [walletAddress, provider, maker, sellToken, sellAmount]);

  const handleApprove = async () => {
    if (!provider || !walletAddress || !sellAmount) return;
    setApproving(true);
    try {
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = await prov.getSigner();
      const tokenAddr = getTokenAddressForContract(sellToken.address);
      const tokenContract = new ethers.Contract(tokenAddr, ERC20_ABI, signer);
      const amount = ethers.utils.parseUnits(sellAmount, sellToken.decimals).add(ethers.utils.parseUnits(activeMakingAmount || '0', 18));
      const tx = await tokenContract.approve(LIMIT_ORDER_CONTRACT, amount);
      await tx.wait();
      setApprovalNeeded(false);
      alert('Approval successful!');
    } catch (e: any) {
      alert(e.message || 'Approval failed');
    }
    setApproving(false);
  };

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

  const handleWrap = () => {
    window.location.href = '/swap?mode=wrap';
  };

  useEffect(() => {
    if (walletAddress && provider && sellAmount) {
      checkApproval();
    }
  }, [walletAddress, provider, sellAmount, checkApproval]);

  const handleCreate = async () => {
    if (!wallet || !provider || !sellAmount || !rate) {
      alert('Please enter amount and rate');
      return;
    }
    
    await checkApproval();
    if (approvalNeeded) {
      alert('Please approve the token first');
      return;
    }
    
    const sellFloat = parseFloat(sellAmount);
    const rateFloat = parseFloat(rate);
    
    if (isNaN(sellFloat) || isNaN(rateFloat) || sellFloat <= 0 || rateFloat <= 0) {
      alert('Invalid amount or rate');
      return;
    }
    
    const makingAmount = ethers.utils.parseUnits(sellFloat.toString(), sellToken.decimals);
    const takingAmountNum = sellFloat * rateFloat;
    const takingAmount = ethers.utils.parseUnits(takingAmountNum.toString(), buyToken.decimals);
    
    console.log('Creating order:', {
      makingAmount: makingAmount.toString(),
      takingAmount: takingAmount.toString(),
      sellFloat,
      rateFloat,
      decimals: sellToken.decimals
    });
    
    try {
      const prov = new ethers.providers.Web3Provider(provider);
      const signer = await prov.getSigner();
      const mk = createLimitOrderMaker(getDefaultClient());
      const exp = expiry > 0 ? Math.floor(Date.now()/1000)+expiry : Math.floor(Date.now()/1000)+86400*365;
      
      await mk.createOrder(signer, {
        chainId: BSC_CHAIN_ID.toString(),
        makerAsset: getApiTokenAddress(sellToken.address),
        takerAsset: getApiTokenAddress(buyToken.address),
        makingAmount: makingAmount.toString(),
        takingAmount: takingAmount.toString(),
        expiredAt: exp,
      });
      
      alert('Order created!');
      triggerDexReward(walletAddress, "limit-order", "offchain");
      triggerDexReward(walletAddress, "limit-order", "offchain");
      loadOrders();
      setSellAmount(''); setBuyAmount(''); setRate('');
    } catch (e: any) {
      console.error('Order error:', e);
      const msg = e?.response?.data?.message || e?.message || 'Error creating order';
      alert(msg);
    }
  };

  const selectToken = (t: Token) => {
    if (showTokenModal === 'sell') setSellToken(t);
    else setBuyToken(t);
    setShowTokenModal(null);
  };

  const getSym = (a: string) => BSC_TOKENS.find(t => t.address.toLowerCase() === a.toLowerCase())?.symbol || a.slice(0,6);

  return (
    <Container>
      <Header activePage="/limit-orders" />
      <PageHeader>
        <Title>Limit Order</Title>
        <HeaderRight>
          <ChainBadge><span style={{color:'#20B8CD'}}>●</span> BNB Chain</ChainBadge>
          <WalletBadge onClick={() => !walletAddress && connect()} style={{cursor: walletAddress ? 'default' : 'pointer'}}>
            {walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </WalletBadge>
        </HeaderRight>
      </PageHeader>
      <DescriptionCard>
        Place limit orders on BSC with the best rates. Set your price and trade automatically when the market reaches your target. Powered by <strong>KyberSwap</strong>.
      </DescriptionCard>
      <MainGrid>
        <Card>
          <CardTitle>Place Limit Order</CardTitle>
          
          <InputGroup>
            <InputLabel>
              <span>You Sell</span>
              <span style={{color:'#a1a1aa',float:'right',fontSize:12}}>
                {walletAddress ? (balances[sellToken.address] ? parseFloat(balances[sellToken.address]).toFixed(4) : '...') : 'Connect wallet'}
              </span>
            </InputLabel>
              <InputRow>
              <AmountInput type="number" placeholder="0.0" value={sellAmount} onChange={e=>handleSell(e.target.value)} />
              <TokenButton onClick={()=>setShowTokenModal('sell')}>
                {sellToken.logoUrl && <TokenIcon src={sellToken.logoUrl} />}
                {sellToken.symbol} ▼
              </TokenButton>
            </InputRow>
            {sellAmount && (
              <div style={{fontSize:12,color:'#a1a1aa',marginTop:4}}>
                ~${sellAmount && tokenPrices[sellToken.address] ? (parseFloat(sellAmount) * tokenPrices[sellToken.address]).toFixed(2) : '0.00'} USD
              </div>
            )}
          </InputGroup>
          
          <SwapIcon onClick={handleFlip}>⇅</SwapIcon>
          
          <InputGroup>
            <InputLabel>
              <span>You Buy</span>
            </InputLabel>
            <InputRow>
              <AmountInput type="text" placeholder="0.0" value={buyAmount} readOnly />
              <TokenButton onClick={()=>setShowTokenModal('buy')}>
                {buyToken.logoUrl && <TokenIcon src={buyToken.logoUrl} />}
                {buyToken.symbol} ▼
              </TokenButton>
            </InputRow>
            {buyAmount && (
              <div style={{fontSize:12,color:'#a1a1aa',marginTop:4}}>
                ~${buyAmount && tokenPrices[buyToken.address] ? (parseFloat(buyAmount) * tokenPrices[buyToken.address]).toFixed(2) : '0.00'} USD
              </div>
            )}
          </InputGroup>
          
          <RateBox>
            <RateLabel><span>Sell {sellToken.symbol} at rate</span></RateLabel>
            <div style={{display:'flex',gap:8}}>
              <RateInput type="number" placeholder="0.0" value={rate} onChange={e=>handleRate(e.target.value)} />
              <MarketBtn onClick={handleMarket}>Market</MarketBtn>
            </div>
            <RateRow><span>Est. Market Price</span><span>1 {sellToken.symbol} = {Object.keys(tokenPrices).length ? getMarketRate() : '...'} {buyToken.symbol}</span></RateRow>
          </RateBox>
          
          <div style={{marginTop:12}}>
            <span style={{fontSize:13,color:'#a1a1aa',display:'block',marginBottom:6}}>Expires in</span>
            <ExpirySelect value={expiry} onChange={e=>setExpiry(Number(e.target.value))}>
              <option value={0}>Forever</option>
              <option value={3600}>1 hour</option>
              <option value={86400}>1 day</option>
              <option value={604800}>7 days</option>
            </ExpirySelect>
          </div>
          
                    { (sellToken.address.toLowerCase() === WBNB_ADDRESS.toLowerCase() || sellToken.address.toLowerCase() === NATIVE_BNB_ADDRESS.toLowerCase()) && (
            <SubmitBtn onClick={handleWrap} disabled={wrapLoading} style={{background:'#22c55e', marginBottom:8}}>
              {wrapLoading ? 'Wrapping...' : 'Wrap BNB'}
            </SubmitBtn>
          )}
          {approvalNeeded && sellAmount && (
            <SubmitBtn onClick={handleApprove} disabled={approving} style={{background:'#f59e0b', marginBottom:8}}>
              {approving ? 'Approving...' : `Approve ${sellToken.symbol}`}
            </SubmitBtn>
          )}
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
                <div key={o.id} style={{padding:'12px',borderBottom:'1px solid #27272a',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                  <div style={{minWidth:0}}>
                    <div style={{color:'#fff',fontWeight:500}}>{getSym(o.makerAsset)} → {getSym(o.takerAsset)}</div>
                    <div style={{color:'#a1a1aa',fontSize:13}}>{formatNumber(o.makingAmount)} {getSym(o.makerAsset)}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
                    <div style={{textAlign:'right'}}>
                      <div style={{color:'#F472B6',fontWeight:500}}>{(parseFloat(o.takingAmount)/parseFloat(o.makingAmount)).toFixed(4)} {getSym(o.takerAsset)}</div>
                      <div style={{color:'#20B8CD',fontSize:12}}>{o.status}</div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleCancel(o.id)} 
                      disabled={cancellingId === o.id}
                      style={{padding:'6px 12px',background:'#ef4444',border:'none',borderRadius:6,color:'#fff',fontSize:12,cursor:'pointer',opacity: cancellingId === o.id ? 0.5 : 1}}
                    >
                      {cancellingId === o.id ? '...' : 'Cancel'}
                    </button>
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
      
      <Footer />
    </Container>
  );
}
