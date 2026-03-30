'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import OrderList from '../../components/limit-orders/OrderList';
import { createLimitOrderMaker } from '../../lib/limit-order/maker';
import { getDefaultClient } from '../../lib/limit-order/api-client';

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

// ============================================
// Mock Data
// ============================================

const MOCK_ORDERS = [
  {
    id: '1',
    makerAsset: 'WBNB',
    takerAsset: 'USDT',
    makingAmount: '1.0',
    takingAmount: '300.0',
    status: 'active' as const,
    createdAt: Math.floor(Date.now() / 1000) - 3600,
    expiredAt: Math.floor(Date.now() / 1000) + 86400,
    maker: '0x1234567890123456789012345678901234567890',
  },
  {
    id: '2',
    makerAsset: 'ARB INC',
    takerAsset: 'WBNB',
    makingAmount: '100.0',
    takingAmount: '0.5',
    status: 'filled' as const,
    createdAt: Math.floor(Date.now() / 1000) - 7200,
    expiredAt: Math.floor(Date.now() / 1000) + 86400,
    maker: '0x1234567890123456789012345678901234567890',
  },
  {
    id: '3',
    makerAsset: 'USDT',
    takerAsset: 'ARB INC',
    makingAmount: '50.0',
    takingAmount: '200.0',
    status: 'cancelled' as const,
    createdAt: Math.floor(Date.now() / 1000) - 10800,
    expiredAt: Math.floor(Date.now() / 1000) + 86400,
    maker: '0x1234567890123456789012345678901234567890',
  },
];

// ============================================
// Page Component
// ============================================

export default function LimitOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Mock wallet connection
  const handleConnectWallet = () => {
    setIsConnected(true);
    setWalletAddress('0x1234567890123456789012345678901234567890');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders([...MOCK_ORDERS]);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = (orderId: string) => {
    console.log('Cancelling order:', orderId);
    // In real implementation, call gasless cancel
    alert(`Cancelling order ${orderId} (gasless cancel)`);
  };

  const handleFill = (orderId: string) => {
    console.log('Filling order:', orderId);
    // In real implementation, call fill order
    alert(`Filling order ${orderId}`);
  };

  if (!isConnected) {
    return (
      <Container>
        <ConnectWalletMessage>
          <Title>Limit Orders</Title>
          <p style={{ color: theme.colors.text.secondary, marginBottom: '24px' }}>
            Connect your wallet to view and manage your limit orders.
          </p>
          <ConnectButton onClick={handleConnectWallet}>
            Connect Wallet
          </ConnectButton>
        </ConnectWalletMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Limit Orders</Title>
        <CreateButton onClick={() => window.location.href = '/limit-orders/create'}>
          Create Order
        </CreateButton>
      </Header>
      
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