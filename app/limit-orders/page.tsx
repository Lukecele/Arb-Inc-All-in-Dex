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

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-family: ${theme.typography.displayFont};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
`;

const NetworkBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
`;

const CardTitle = styled.h2`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: 20px;
`;

const TokenInputGroup = styled.div`
  margin-bottom: 16px;
`;

const TokenInputLabel = styled.div`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 8px;
`;

const TokenInputRow = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  padding: 12px 16px;
  transition: border-color ${theme.transitions.fast};
  
  &:focus-within {
    border-color: #20B8CD;
  }
`;

const TokenInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  outline: none;
  
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

const TokenSelect = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: #20B8CD;
  }
`;

const BalanceText = styled.div`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  margin-top: 4px;
  text-align: right;
`;

const RateSection = styled.div`
  margin: 20px 0;
  padding: 16px;
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
`;

const RateLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 12px;
`;

const RateInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RateInput = styled.input`
  flex: 1;
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.sm};
  padding: 10px 12px;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  outline: none;
  
  &:focus {
    border-color: #20B8CD;
  }
`;

const MarketButton = styled.button`
  padding: 10px 16px;
  background: #20B8CD;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  color: white;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: opacity ${theme.transitions.fast};
  
  &:hover {
    opacity: 0.9;
  }
`;

const EstPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const FlipButton = styled.button`
  background: transparent;
  border: none;
  color: #20B8CD;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ExpirySelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  cursor: pointer;
  margin-top: 16px;
  
  &:focus {
    outline: none;
    border-color: #20B8CD;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #20B8CD;
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  margin-top: 24px;
  transition: all ${theme.transitions.fast};
  
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConnectMessage = styled.div`
  text-align: center;
  padding: 60px 24px;
`;

const ConnectButton = styled.button`
  padding: 14px 32px;
  background: #20B8CD;
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  margin-top: 16px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background: ${({ $active }) => $active ? theme.colors.background.tertiary : 'transparent'};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  color: ${({ $active }) => $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.background.tertiary};
  }
`;

interface Token {
  address: string;
  symbol: string;
  decimals: number;
  icon?: string;
}

const TOKENS: Token[] = [
  { address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', symbol: 'BNB', decimals: 18 },
  { address: '0x55d398326f99059fF775485246999027B3197955', symbol: 'USDT', decimals: 18 },
  { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', symbol: 'BUSD', decimals: 18 },
  { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', symbol: 'USDC', decimals: 18 },
  { address: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c', symbol: 'ARB', decimals: 18 },
];

export default function LimitOrdersPage() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [chain, setChain] = useSetChain();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'open' | 'my'>('open');
  
  const walletAddress = wallet?.accounts?.[0]?.address;
  const provider = wallet?.provider;
  
  const [maker, setMaker] = useState<any>(null);
  
  const [sellToken, setSellToken] = useState<Token>(TOKENS[0]);
  const [buyToken, setBuyToken] = useState<Token>(TOKENS[1]);
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [rate, setRate] = useState('');
  const [expiry, setExpiry] = useState(0);
  const [useMarketRate, setUseMarketRate] = useState(false);

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

  const fetchOrders = useCallback(async () => {
    if (!maker || !walletAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await maker.getMakerOrders(walletAddress, {
        page: 1,
        size: 50,
      });
      
      const mappedOrders = result.orders.map((order: any) => ({
        id: order.id,
        makerAsset: order.makerAsset,
        takerAsset: order.takerAsset,
        makingAmount: ethers.utils.formatEther(order.makingAmount),
        takingAmount: ethers.utils.formatEther(order.takingAmount),
        status: order.status,
        createdAt: order.createdAt,
        expiredAt: order.expiredAt,
        maker: order.maker,
      }));
      
      setOrders(mappedOrders);
    } catch (err: any) {
      console.error('Failed to fetch orders:', err);
      setError(err.message || 'Failed to fetch orders');
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

  const handleSellAmountChange = (value: string) => {
    setSellAmount(value);
    if (value && rate) {
      const parsedRate = parseFloat(rate);
      if (parsedRate > 0) {
        setBuyAmount((parseFloat(value) * parsedRate).toFixed(6));
      }
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

  const handleCreateOrder = () => {
    window.location.href = '/limit-orders/create';
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
              <p style={{ color: theme.colors.text.secondary, marginBottom: '16px' }}>
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
            <div style={{ color: theme.colors.text.muted, textAlign: 'center', padding: '40px' }}>
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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <NetworkBadge>
            <span>BNB Chain</span>
          </NetworkBadge>
          <WalletInfo>
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </WalletInfo>
        </div>
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
              <TokenSelect>{sellToken.symbol}</TokenSelect>
            </TokenInputRow>
            <BalanceText>Balance: ---</BalanceText>
          </TokenInputGroup>
          
          <RateSection>
            <RateLabel>
              <span>Sell {sellToken.symbol} at rate</span>
              <FlipButton onClick={handleFlipTokens}>⇅</FlipButton>
            </RateLabel>
            <RateInputRow>
              <RateInput
                type="number"
                placeholder="0.0"
                value={rate}
                onChange={(e) => handleRateChange(e.target.value)}
              />
              <MarketButton onClick={() => setUseMarketRate(true)}>Market</MarketButton>
            </RateInputRow>
            <EstPriceRow>
              <span>Est. Market Price</span>
              <span>1 {sellToken.symbol} = 1.00 {buyToken.symbol}</span>
            </EstPriceRow>
          </RateSection>
          
          <TokenInputGroup>
            <TokenInputLabel>You Buy</TokenInputLabel>
            <TokenInputRow>
              <TokenInput
                type="text"
                placeholder="0.0"
                value={buyAmount}
                readOnly
              />
              <TokenSelect>{buyToken.symbol}</TokenSelect>
            </TokenInputRow>
          </TokenInputGroup>
          
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
              color: theme.colors.status.error, 
              padding: '12px', 
              marginBottom: '16px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
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
    </Container>
  );
}
