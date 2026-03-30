'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import OrderList from '../../components/limit-orders/OrderList';
import { createLimitOrderMaker } from '../../lib/limit-order/maker';
import { getDefaultClient } from '../../lib/limit-order/api-client';
import {
  init,
  useConnectWallet,
  useSetChain,
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
    {
      id: '0x38',
      token: 'BNB',
      label: 'BNB Smart Chain',
      rpcUrl: 'https://bsc.publicnode.com',
    },
  ],
});

const BSC_CHAIN_ID = 56;

interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

const BSC_TOKENS: Token[] = [
  { address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', symbol: 'BNB', decimals: 18 },
  { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', decimals: 18 },
  { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD', decimals: 18 },
  { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', symbol: 'USDC', decimals: 18 },
  { address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', symbol: 'ETH', decimals: 18 },
  { address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1CD3De553', symbol: 'BTCB', decimals: 18 },
  { address: '0x1AF3F329e8BEe154C83207CC8C12f31e9343F1F3', symbol: 'DAI', decimals: 18 },
  { address: '0x96F7b5C223E1CbB1C3B3C26FBf55d5ea94e815F', symbol: 'CAKE', decimals: 18 },
  { address: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c', symbol: 'ARB', decimals: 18 },
];

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

const Container = styled.div`
  min-height: 100vh;
  background: #000;
  padding: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h1`
  font-family: ${theme.typography.displayFont};
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const NetworkBadge = styled.div`
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

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #27272a;
  border-radius: 8px;
  color: #a1a1aa;
  font-size: 13px;
`;

const MainGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 24px;
    align-items: start;
  }
`;

const Card = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  padding: 16px;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`;

const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #27272a;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.15s;
  
  &:hover {
    background: #3f3f46;
  }
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TokenIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const TokenName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

const TokenBalance = styled.div`
  font-size: 13px;
  color: #a1a1aa;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const ModalContent = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #27272a;
`;

const ModalTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #a1a1aa;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #fff;
  }
`;

const TokenInputGroup = styled.div`
  margin-bottom: 12px;
`;

const TokenInputLabel = styled.div`
  font-size: 12px;
  color: #a1a1aa;
  margin-bottom: 6px;
`;

const TokenInputRow = styled.div`
  display: flex;
  align-items: center;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  padding: 12px;
  
  &:focus-within {
    border-color: #20B8CD;
  }
`;

const TokenInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  outline: none;
  
  &::placeholder {
    color: #52525b;
  }
`;

const TokenSelect = styled.button`
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
  
  &:hover {
    border-color: #20B8CD;
  }
`;

const SwapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 50%;
  color: #20B8CD;
  cursor: pointer;
  margin: -8px auto;
  position: relative;
  z-index: 1;
  
  &:hover {
    background: #3f3f46;
  }
`;

const RateSection = styled.div`
  margin: 12px 0;
  padding: 12px;
  background: #27272a;
  border-radius: 12px;
`;

const RateLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #a1a1aa;
  margin-bottom: 8px;
`;

const RateInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RateInput = styled.input`
  flex: 1;
  background: #18181b;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  padding: 10px 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #20B8CD;
  }
`;

const MarketButton = styled.button`
  padding: 10px 14px;
  background: #20B8CD;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const EstPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: #a1a1aa;
`;

const ExpirySelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-top: 12px;
  
  &:focus {
    outline: none;
    border-color: #20B8CD;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #20B8CD;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConnectMessage = styled.div`
  text-align: center;
  padding: 40px 16px;
`;

const ConnectButton = styled.button`
  padding: 12px 28px;
  background: #20B8CD;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background: ${({ $active }) => $active ? '#27272a' : 'transparent'};
  border: none;
  border-radius: 8px;
  color: ${({ $active }) => $active ? '#fff' : '#a1a1aa'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #27272a;
  }
`;

const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

async function fetchTokenPrices(): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  for (const token of BSC_TOKENS) {
    if (token.address.toLowerCase() === USDT_ADDRESS.toLowerCase()) {
      prices[token.address] = 1;
      continue;
    }
    
    try {
      const response = await fetch(
        `https://aggregator-api.kyberswap.com/bsc/route?tokenIn=${token.address}&tokenOut=${USDT_ADDRESS}&amountIn=1`
      );
      const data = await response.json();
      if (data.amountOut) {
        prices[token.address] = parseFloat(data.amountOut);
      } else {
        prices[token.address] = 1;
      }
    } catch (error) {
      prices[token.address] = 1;
    }
  }
  
  return prices;
}

async function fetchTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: any
): Promise<string> {
  try {
    if (tokenAddress === '0x0000000000000000000000000000000000000000') {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const balance = await ethersProvider.getBalance(walletAddress);
      return ethers.utils.formatEther(balance);
    } else {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, ethersProvider);
      const balance = await contract.balanceOf(walletAddress);
      return ethers.utils.formatEther(balance);
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

export default function LimitOrdersPage() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [chain, setChain] = useSetChain();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'open' | 'my'>('open');
  
  const [balances, setBalances] = useState<Record<string, string>>({});
  
  const [showTokenModal, setShowTokenModal] = useState<'sell' | 'buy' | null>(null);
  
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
  const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (provider && walletAddress) {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const client = getDefaultClient();
      const limitOrderMaker = createLimitOrderMaker(client);
      setMaker(limitOrderMaker);
    } else {
      setMaker(null);
    }
  }, [provider, walletAddress]);

  useEffect(() => {
    fetchTokenPrices().then(setTokenPrices).catch(() => {});
  }, []);

  const fetchBalances = useCallback(async () => {
    if (!walletAddress || !provider) return;
    
    const newBalances: Record<string, string> = {};
    
    for (const token of BSC_TOKENS) {
      const balance = await fetchTokenBalance(token.address, walletAddress, provider);
      newBalances[token.address] = balance;
    }
    
    setBalances(newBalances);
  }, [walletAddress, provider]);

  useEffect(() => {
    if (walletAddress && provider) {
      fetchBalances();
    }
  }, [walletAddress, provider, fetchBalances]);

  const fetchOrders = useCallback(async () => {
    if (!maker || !walletAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await maker.getMakerOrders(walletAddress, {
        page: 1,
        size: 50,
      });
      
      const mappedOrders = (result.orders || []).map((order: any) => ({
        id: order.id,
        makerAsset: order.makerAsset,
        takerAsset: order.takerAsset,
        makingAmount: ethers.utils.formatEther(order.makingAmount),
        takingAmount: ethers.utils.formatEther(order.takingAmount),
        status: order.status || 'active',
        createdAt: order.createdAt,
        expiredAt: order.expiredAt,
        maker: order.maker,
      }));
      
      setOrders(mappedOrders);
    } catch (err: any) {
      console.error('Failed to fetch orders:', err);
      // Don't show error to user, just set empty orders
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [maker, walletAddress]);

  useEffect(() => {
    if (walletAddress && maker) {
      fetchOrders();
    }
  }, [walletAddress, maker, fetchOrders]);

  const getMarketRate = () => {
    const sellPrice = tokenPrices[sellToken.address] || 1;
    const buyPrice = tokenPrices[buyToken.address] || 1;
    return (sellPrice / buyPrice).toFixed(6);
  };

  const handleRateChange = (value: string) => {
    setRate(value);
    setUseMarketRate(false);
    if (sellAmount && value) {
      const parsedRate = parseFloat(value);
      if (parsedRate > 0) {
        setBuyAmount((parseFloat(sellAmount) * parsedRate).toFixed(6));
      }
    }
  };

  const handleMarketRateClick = () => {
    const marketRate = getMarketRate();
    setRate(marketRate);
    setUseMarketRate(true);
    if (sellAmount) {
      setBuyAmount((parseFloat(sellAmount) * parseFloat(marketRate)).toFixed(6));
    }
  };

  const handleSellAmountChange = (value: string) => {
    setSellAmount(value);
    if (value && rate) {
      const parsedRate = parseFloat(rate);
      if (parsedRate > 0) {
        setBuyAmount((parseFloat(value) * parsedRate).toFixed(6));
      }
    } else if (value && useMarketRate) {
      const marketRate = getMarketRate();
      setBuyAmount((parseFloat(value) * parseFloat(marketRate)).toFixed(6));
    }
  };

  const handleFlipTokens = () => {
    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);
    setSellAmount('');
    setBuyAmount('');
    setRate('');
  };

  const handleCreateOrder = async () => {
    if (!wallet || !provider || !sellAmount || !rate) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = await ethersProvider.getSigner();
      
      const client = getDefaultClient();
      const maker = createLimitOrderMaker(client);
      
      const expiredAt = expiry > 0 
        ? Math.floor(Date.now() / 1000) + expiry 
        : Math.floor(Date.now() / 1000) + 86400 * 365;
      
      const order = await maker.createOrder(signer, {
        chainId: BSC_CHAIN_ID.toString(),
        makerAsset: sellToken.address,
        takerAsset: buyToken.address,
        makingAmount: ethers.utils.parseUnits(sellAmount, sellToken.decimals).toString(),
        takingAmount: ethers.utils.parseUnits((parseFloat(sellAmount) * parseFloat(rate)).toFixed(buyToken.decimals), buyToken.decimals).toString(),
        expiredAt,
      });
      
      alert(`Order created! ID: ${order.id}`);
      fetchOrders();
      setSellAmount('');
      setBuyAmount('');
      setRate('');
    } catch (err: any) {
      console.error('Failed to create order:', err);
      alert(err.message || 'Failed to create order');
    }
  };

  const selectToken = (token: Token) => {
    if (showTokenModal === 'sell') {
      setSellToken(token);
    } else if (showTokenModal === 'buy') {
      setBuyToken(token);
    }
    setShowTokenModal(null);
  };

  if (!wallet) {
    return (
      <Container>
        <PageHeader>
          <Title>Limit Order</Title>
        </PageHeader>
        
        <MainGrid>
          <Card>
            <CardTitle>Place Limit Order</CardTitle>
            <ConnectMessage>
              <p style={{ color: '#a1a1aa', marginBottom: '12px', fontSize: '14px' }}>
                Connect your wallet to start trading
              </p>
              <ConnectButton onClick={() => connect()} disabled={connecting}>
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </ConnectButton>
            </ConnectMessage>
          </Card>
          
          <Card>
            <CardTitle>Open Orders</CardTitle>
            <TabsContainer>
              <Tab $active={activeTab === 'open'} onClick={() => setActiveTab('open')}>
                Open Limit Orders
              </Tab>
              <Tab $active={activeTab === 'my'} onClick={() => setActiveTab('my')}>
                My Orders
              </Tab>
            </TabsContainer>
            <div style={{ color: '#71717a', textAlign: 'center', padding: '40px', fontSize: '14px' }}>
              Connect wallet to view orders
            </div>
          </Card>
        </MainGrid>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader>
        <Title>Limit Order</Title>
        <HeaderActions>
          <NetworkBadge>
            <span style={{ color: '#20B8CD' }}>●</span> BNB Chain
          </NetworkBadge>
          <WalletInfo>
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </WalletInfo>
        </HeaderActions>
      </PageHeader>
      
      <MainGrid>
        <Card>
          <CardTitle>Place Limit Order</CardTitle>
          
          <TokenInputGroup>
            <TokenInputLabel>You Sell</TokenInputLabel>
            <TokenInputRow>
              <TokenInput
                type="number"
                placeholder="0.0"
                value={sellAmount}
                onChange={(e) => handleSellAmountChange(e.target.value)}
              />
              <TokenSelect onClick={() => setShowTokenModal('sell')}>
                {sellToken.symbol} ▼
              </TokenSelect>
            </TokenInputRow>
          </TokenInputGroup>
          
          <SwapButton onClick={handleFlipTokens}>⇅</SwapButton>
          
          <TokenInputGroup>
            <TokenInputLabel>You Buy</TokenInputLabel>
            <TokenInputRow>
              <TokenInput
                type="text"
                placeholder="0.0"
                value={buyAmount}
                readOnly
              />
              <TokenSelect onClick={() => setShowTokenModal('buy')}>
                {buyToken.symbol} ▼
              </TokenSelect>
            </TokenInputRow>
          </TokenInputGroup>
          
          <RateSection>
            <RateLabel>
              <span>Sell {sellToken.symbol} at rate</span>
            </RateLabel>
            <RateInputRow>
              <RateInput
                type="number"
                placeholder="0.0"
                value={rate}
                onChange={(e) => handleRateChange(e.target.value)}
              />
              <MarketButton onClick={handleMarketRateClick}>Market</MarketButton>
            </RateInputRow>
            <EstPriceRow>
              <span>Est. Market Price</span>
              <span>1 {sellToken.symbol} = {Object.keys(tokenPrices).length > 0 ? getMarketRate() : '...'} {buyToken.symbol}</span>
            </EstPriceRow>
          </RateSection>
          
          <ExpirySelect value={expiry} onChange={(e) => setExpiry(Number(e.target.value))}>
            <option value={0}>Never expire</option>
            <option value={3600}>1 hour</option>
            <option value={21600}>6 hours</option>
            <option value={43200}>12 hours</option>
            <option value={86400}>1 day</option>
            <option value={259200}>3 days</option>
            <option value={604800}>7 days</option>
          </ExpirySelect>
          
          <SubmitButton onClick={handleCreateOrder}>
            Create Order
          </SubmitButton>
        </Card>
        
        <Card>
          <CardTitle>Open Orders</CardTitle>
          <TabsContainer>
            <Tab $active={activeTab === 'open'} onClick={() => setActiveTab('open')}>
              Open Limit Orders
            </Tab>
            <Tab $active={activeTab === 'my'} onClick={() => setActiveTab('my')}>
              My Orders
            </Tab>
          </TabsContainer>
          
          {error && (
            <div style={{ 
              color: '#ef4444', 
              padding: '12px', 
              marginBottom: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              fontSize: '13px',
            }}>
              Error: {error}
            </div>
          )}
          
          <OrderList
            orders={orders}
            onRefresh={fetchOrders}
            onCancel={async (orderId: string) => {
              alert(`Cancelling order ${orderId} (demo)`);
              await fetchOrders();
            }}
            onFill={async (orderId: string) => {
              alert(`Filling order ${orderId} (demo)`);
            }}
            isLoading={isLoading}
          />
        </Card>
      </MainGrid>

      {showTokenModal && (
        <ModalOverlay onClick={() => setShowTokenModal(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Select Token</ModalTitle>
              <CloseButton onClick={() => setShowTokenModal(null)}>×</CloseButton>
            </ModalHeader>
            {BSC_TOKENS.map((token) => (
              <TokenRow 
                key={token.address} 
                onClick={() => selectToken(token)}
                style={{
                  border: (showTokenModal === 'sell' ? sellToken.address : buyToken.address) === token.address 
                    ? '1px solid #20B8CD' 
                    : '1px solid transparent'
                }}
              >
                <TokenInfo>
                  <TokenIcon>{token.symbol.slice(0, 2)}</TokenIcon>
                  <TokenName>{token.symbol}</TokenName>
                </TokenInfo>
                <TokenBalance>
                  {balances[token.address] ? parseFloat(balances[token.address]).toFixed(4) : '...'}
                </TokenBalance>
              </TokenRow>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
