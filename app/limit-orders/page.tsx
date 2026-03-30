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
import { ethers, providers } from 'ethers';

// ============================================
// Web3-Onboard Initialization
// ============================================

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

// ============================================
// Styled Components
// ============================================

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  padding: ${theme.spacing[8]};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[6]};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-family: ${theme.typography.displayFont};
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
`;

const CreateButton = styled.button`
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: transform ${theme.transitions.fast}, opacity ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ConnectWalletMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing[10]};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const ConnectButton = styled.button`
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  margin-top: ${theme.spacing[4]};
  transition: transform ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
`;

// ============================================
// Page Component
// ============================================

export default function LimitOrdersPage() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [chain, setChain] = useSetChain();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const walletAddress = wallet?.accounts?.[0]?.address;
  const provider = wallet?.provider;
  
  const [maker, setMaker] = useState<any>(null);
  
  useEffect(() => {
    if (provider && walletAddress) {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
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

  const handleRefresh = () => {
    fetchOrders();
  };

  const handleCancel = async (orderId: string) => {
    if (!maker) return;
    
    try {
      setIsLoading(true);
      alert(`Cancelling order ${orderId} (gasless cancel) - Real implementation would call maker.cancelOrders()`);
      await fetchOrders();
    } catch (err: any) {
      console.error('Failed to cancel order:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFill = async (orderId: string) => {
    if (!maker) return;
    
    try {
      setIsLoading(true);
      alert(`Filling order ${orderId} - Real implementation would call fill order API`);
      await fetchOrders();
    } catch (err: any) {
      console.error('Failed to fill order:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!wallet) {
    return (
      <Container>
        <ConnectWalletMessage>
          <Title>Limit Orders</Title>
          <p style={{ color: theme.colors.text.secondary, marginBottom: '24px' }}>
            Connect your wallet to view and manage your limit orders.
          </p>
          <ConnectButton 
            onClick={() => connect()} 
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </ConnectButton>
        </ConnectWalletMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Limit Orders</Title>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <WalletInfo>
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </WalletInfo>
          <CreateButton onClick={() => window.location.href = '/limit-orders/create'}>
            Create Order
          </CreateButton>
        </div>
      </Header>
      
      {error && (
        <div style={{ 
          color: theme.colors.status.error, 
          padding: '12px', 
          marginBottom: '16px',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '0 auto 16px'
        }}>
          Error: {error}
        </div>
      )}
      
      <OrderList
        orders={orders}
        onRefresh={handleRefresh}
        onCancel={handleCancel}
        onFill={handleFill}
        isLoading={isLoading}
      />
    </Container>
  );
}