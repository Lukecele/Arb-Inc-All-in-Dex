'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../app/styles/theme';

const Container = styled.div`
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 12px 16px;
  background: ${theme.colors.background.secondary};
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
  align-items: center;
  transition: background ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.background.secondary};
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TokenSymbol = styled.span`
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
`;

const TokenAmount = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const Rate = styled.div`
  font-size: ${theme.typography.sizes.md};
  color: #F472B6;
  font-weight: ${theme.typography.weights.medium};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.medium};
  text-transform: uppercase;
  
  ${({ status }) => {
    switch (status) {
      case 'active':
        return `
          background: rgba(32, 184, 205, 0.15);
          color: #20B8CD;
        `;
      case 'filled':
        return `
          background: rgba(59, 130, 246, 0.15);
          color: #3B82F6;
        `;
      case 'cancelled':
      case 'expired':
        return `
          background: rgba(239, 68, 68, 0.15);
          color: #EF4444;
        `;
      default:
        return `
          background: ${theme.colors.background.tertiary};
          color: ${theme.colors.text.secondary};
        `;
    }
  }}
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant?: 'primary' }>`
  padding: 6px 12px;
  background: ${({ $variant }) => $variant === 'primary' ? '#20B8CD' : theme.colors.background.secondary};
  border: 1px solid ${({ $variant }) => $variant === 'primary' ? '#20B8CD' : theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.sm};
  color: ${({ $variant }) => $variant === 'primary' ? 'white' : theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.xs};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    opacity: 0.8;
    border-color: ${({ $variant }) => $variant === 'primary' ? '#20B8CD' : theme.colors.border.hover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background: transparent;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.background.tertiary};
    border-color: #20B8CD;
    color: #20B8CD;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: ${theme.colors.text.muted};
`;

interface Order {
  id: string;
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  takingAmount: string;
  status: 'active' | 'filled' | 'cancelled' | 'expired';
  createdAt: number;
  expiredAt: number;
  maker: string;
}

interface OrderListProps {
  orders: Order[];
  onRefresh: () => void;
  onCancel?: (orderId: string) => void;
  onFill?: (orderId: string) => void;
  isLoading?: boolean;
}

const getTokenSymbol = (address: string): string => {
  const tokenMap: Record<string, string> = {
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c': 'BNB',
    '0x55d398326f99059fF775485246999027B3197955': 'USDT',
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56': 'BUSD',
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d': 'USDC',
    '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c': 'ARB',
  };
  return tokenMap[address] || address.slice(0, 6) + '...';
};

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  onRefresh,
  onCancel,
  onFill,
  isLoading = false,
}) => {
  const calculateRate = (makingAmount: string, takingAmount: string) => {
    const making = parseFloat(makingAmount);
    const taking = parseFloat(takingAmount);
    if (making === 0) return '0';
    return (taking / making).toFixed(6);
  };

  if (orders.length === 0) {
    return (
      <Container>
        <TableHeader>
          <span>Pair</span>
          <span>Rate</span>
          <span>Amount</span>
          <span>Status</span>
          <span></span>
        </TableHeader>
        <EmptyState>
          No orders found
        </EmptyState>
        <RefreshButton onClick={onRefresh} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </RefreshButton>
      </Container>
    );
  }

  return (
    <Container>
      <TableHeader>
        <span>Pair</span>
        <span>Rate</span>
        <span>Amount</span>
        <span>Status</span>
        <span></span>
      </TableHeader>
      
      {orders.map((order) => (
        <OrderRow key={order.id}>
          <TokenInfo>
            <TokenSymbol>
              {getTokenSymbol(order.makerAsset)} → {getTokenSymbol(order.takerAsset)}
            </TokenSymbol>
            <TokenAmount>
              {parseFloat(order.makingAmount).toFixed(4)} {getTokenSymbol(order.makerAsset)}
            </TokenAmount>
          </TokenInfo>
          
          <Rate>
            {calculateRate(order.makingAmount, order.takingAmount)} {getTokenSymbol(order.takerAsset)}/{getTokenSymbol(order.makerAsset)}
          </Rate>
          
          <TokenAmount>
            {parseFloat(order.takingAmount).toFixed(4)} {getTokenSymbol(order.takerAsset)}
          </TokenAmount>
          
          <StatusBadge status={order.status}>
            {order.status}
          </StatusBadge>
          
          <Actions>
            {order.status === 'active' && onCancel && (
              <ActionButton onClick={() => onCancel(order.id)} disabled={isLoading}>
                Cancel
              </ActionButton>
            )}
            {order.status === 'active' && onFill && (
              <ActionButton $variant="primary" onClick={() => onFill(order.id)} disabled={isLoading}>
                Fill
              </ActionButton>
            )}
          </Actions>
        </OrderRow>
      ))}
      
      <RefreshButton onClick={onRefresh} disabled={isLoading}>
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </RefreshButton>
    </Container>
  );
};

export default OrderList;
