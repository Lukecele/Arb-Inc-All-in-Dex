'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../app/styles/theme';

// ============================================
// Styled Components
// ============================================

const Container = styled.div`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[6]};
`;

const Title = styled.h2`
  font-family: ${theme.typography.displayFont};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background: ${({ active }) => 
    active ? theme.colors.primary.DEFAULT : theme.colors.background.tertiary};
  border: 1px solid ${({ active }) => 
    active ? theme.colors.primary.light : theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: ${({ active }) => 
    active ? 'white' : theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.primary.light};
    color: ${active => active ? 'white' : theme.colors.text.primary};
  }
`;

const OrderTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 120px;
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[4]};
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing[2]};
  }
`;

const TokenPair = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[1]};
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

const Price = styled.div`
  font-size: ${theme.typography.sizes.md};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.medium};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background: ${({ status }) => {
    switch (status) {
      case 'active': return theme.colors.status.success;
      case 'filled': return theme.colors.status.info;
      case 'cancelled': return theme.colors.status.error;
      case 'expired': return theme.colors.status.warning;
      default: return theme.colors.text.muted;
    }
  }};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.medium};
  color: white;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background: ${({ variant }) => 
    variant === 'primary' ? theme.colors.primary.DEFAULT : theme.colors.background.secondary};
  border: 1px solid ${({ variant }) => 
    variant === 'primary' ? theme.colors.primary.light : theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.sm};
  color: ${({ variant }) => 
    variant === 'primary' ? 'white' : theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.sm};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.primary.light};
    color: ${({ variant }) => 
      variant === 'primary' ? 'white' : theme.colors.text.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[10]};
  color: ${theme.colors.text.muted};
`;

// ============================================
// Types
// ============================================

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

// ============================================
// Component
// ============================================

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  onRefresh,
  onCancel,
  onFill,
  isLoading = false,
}) => {
  const [filter, setFilter] = React.useState<string>('all');
  
  const filteredOrders = React.useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  }, [orders, filter]);
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  
  const calculatePrice = (makingAmount: string, takingAmount: string) => {
    const making = parseFloat(makingAmount);
    const taking = parseFloat(takingAmount);
    if (making === 0) return '0';
    return (taking / making).toFixed(6);
  };
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Container>
      <Header>
        <Title>Limit Orders</Title>
        <FilterGroup>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'active'} 
            onClick={() => setFilter('active')}
          >
            Active
          </FilterButton>
          <FilterButton 
            active={filter === 'filled'} 
            onClick={() => setFilter('filled')}
          >
            Filled
          </FilterButton>
          <FilterButton 
            active={filter === 'cancelled'} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </FilterButton>
        </FilterGroup>
      </Header>
      
      {filteredOrders.length === 0 ? (
        <EmptyState>
          No orders found
        </EmptyState>
      ) : (
        <OrderTable>
          {filteredOrders.map((order) => (
            <OrderRow key={order.id}>
              <TokenPair>
                <TokenSymbol>{order.makerAsset}</TokenSymbol>
                <TokenAmount>{order.makingAmount}</TokenAmount>
              </TokenPair>
              
              <TokenPair>
                <TokenSymbol>{order.takerAsset}</TokenSymbol>
                <TokenAmount>{order.takingAmount}</TokenAmount>
              </TokenPair>
              
              <Price>
                {calculatePrice(order.makingAmount, order.takingAmount)}
              </Price>
              
              <StatusBadge status={order.status}>
                {order.status}
              </StatusBadge>
              
              <Actions>
                {order.status === 'active' && onCancel && (
                  <ActionButton 
                    onClick={() => onCancel(order.id)}
                    disabled={isLoading}
                  >
                    Cancel
                  </ActionButton>
                )}
                {order.status === 'active' && onFill && (
                  <ActionButton 
                    variant="primary"
                    onClick={() => onFill(order.id)}
                    disabled={isLoading}
                  >
                    Fill
                  </ActionButton>
                )}
              </Actions>
            </OrderRow>
          ))}
        </OrderTable>
      )}
      
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <ActionButton onClick={onRefresh} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Orders'}
        </ActionButton>
      </div>
    </Container>
  );
};

export default OrderList;