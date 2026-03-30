'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import LimitOrderForm from '../../../components/limit-orders/LimitOrderForm';
import { createLimitOrderMaker } from '../../../lib/limit-order/maker';
import { getDefaultClient } from '../../../lib/limit-order/api-client';

// ============================================
// Styled Components
// ============================================

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  padding: ${theme.spacing[8]};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[8]};
`;

const Title = styled.h1`
  font-family: ${theme.typography.displayFont};
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[4]};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const SuccessMessage = styled.div`
  background: ${theme.colors.status.success};
  color: white;
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing[4]};
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: ${theme.colors.status.error};
  color: white;
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing[4]};
  text-align: center;
`;

// ============================================
// Page Component
// ============================================

export default function CreateLimitOrderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Mock tokens for demo
  const availableTokens = [
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      symbol: 'WBNB',
      decimals: 18,
    },
    {
      address: '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c',
      symbol: 'ARB INC',
      decimals: 18,
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      symbol: 'USDT',
      decimals: 18,
    },
  ];

  const handleCreateOrder = async (orderData: any) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // In a real implementation, you would:
      // 1. Get the wallet signer from your Web3 provider
      // 2. Call the LimitOrderMaker.createOrder function
      
      // For demo, we'll simulate the order creation
      console.log('Creating order with data:', orderData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful order creation
      const mockOrder = {
        id: Math.random().toString(36).substr(2, 9),
        ...orderData,
        status: 'active',
        createdAt: Math.floor(Date.now() / 1000),
      };
      
      setCreatedOrder(mockOrder);
      setSuccess(true);
      
    } catch (err: any) {
      console.error('Failed to create order:', err);
      setError(err.message || 'Failed to create order');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError(null);
    setCreatedOrder(null);
  };

  return (
    <Container>
      <Header>
        <Title>Create Limit Order</Title>
        <Subtitle>
          Set your desired price and let the market come to you. 
          Your order will be filled when the market price reaches your limit.
        </Subtitle>
      </Header>
      
      {success ? (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <SuccessMessage>
            Order created successfully!
            <br />
            Order ID: {createdOrder?.id}
          </SuccessMessage>
          <button
            type="button"
            onClick={handleReset}
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '12px',
              background: theme.colors.primary.DEFAULT,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Create Another Order
          </button>
        </div>
      ) : error ? (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <ErrorMessage>
            Error: {error}
          </ErrorMessage>
          <button
            type="button"
            onClick={() => setError(null)}
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '12px',
              background: theme.colors.background.tertiary,
              border: `1px solid ${theme.colors.border.DEFAULT}`,
              borderRadius: theme.borderRadius.md,
              color: theme.colors.text.primary,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <LimitOrderForm
          availableTokens={availableTokens}
          onSubmit={handleCreateOrder}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
}