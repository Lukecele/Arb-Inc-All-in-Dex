'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../app/styles/theme';

// ============================================
// Styled Components
// ============================================

const FormContainer = styled.div`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: ${theme.typography.displayFont};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[6]};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]};
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  transition: border-color ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.border.focus};
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  transition: border-color ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.border.focus};
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${theme.spacing[4]};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: transform ${theme.transitions.fast}, opacity ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewSection = styled.div`
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
`;

const PreviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[2]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PreviewLabel = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const PreviewValue = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.medium};
`;

// ============================================
// Types
// ============================================

interface TokenOption {
  address: string;
  symbol: string;
  decimals: number;
}

interface LimitOrderFormProps {
  availableTokens: TokenOption[];
  onSubmit: (order: OrderFormData) => void;
  isLoading?: boolean;
}

export interface OrderFormData {
  makerAsset: string;
  takerAsset: string;
  makingAmount: string;
  takingAmount: string;
  expiredAt: number;
}

// ============================================
// Constants
// ============================================

const EXPIRY_OPTIONS = [
  { label: '1 hour', value: 3600 },
  { label: '6 hours', value: 21600 },
  { label: '12 hours', value: 43200 },
  { label: '1 day', value: 86400 },
  { label: '3 days', value: 259200 },
  { label: '7 days', value: 604800 },
];

// ============================================
// Component
// ============================================

export const LimitOrderForm: React.FC<LimitOrderFormProps> = ({
  availableTokens,
  onSubmit,
  isLoading = false,
}) => {
  const [makerAsset, setMakerAsset] = useState('');
  const [takerAsset, setTakerAsset] = useState('');
  const [makingAmount, setMakingAmount] = useState('');
  const [takingAmount, setTakingAmount] = useState('');
  const [expiry, setExpiry] = useState(3600);
  const [showPreview, setShowPreview] = useState(false);

  const selectedMakerToken = availableTokens.find(t => t.address === makerAsset);
  const selectedTakerToken = availableTokens.find(t => t.address === takerAsset);

  const isValid = makerAsset && takerAsset && makingAmount && takingAmount && makerAsset !== takerAsset;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    const expiredAt = Math.floor(Date.now() / 1000) + expiry;
    
    onSubmit({
      makerAsset,
      takerAsset,
      makingAmount,
      takingAmount,
      expiredAt,
    });
  };

  const handlePreview = () => {
    if (isValid) {
      setShowPreview(true);
    }
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  // Calculate price per token
  const pricePerToken = React.useMemo(() => {
    if (!makingAmount || !takingAmount || !selectedMakerToken || !selectedTakerToken) {
      return '0';
    }
    
    const makingAmountNum = parseFloat(makingAmount);
    const takingAmountNum = parseFloat(takingAmount);
    
    if (makingAmountNum === 0) return '0';
    
    return (takingAmountNum / makingAmountNum).toFixed(6);
  }, [makingAmount, takingAmount, selectedMakerToken, selectedTakerToken]);

  if (showPreview) {
    return (
      <FormContainer>
        <Title>Order Preview</Title>
        
        <PreviewSection>
          <PreviewRow>
            <PreviewLabel>You pay:</PreviewLabel>
            <PreviewValue>
              {makingAmount} {selectedMakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>
          
          <PreviewRow>
            <PreviewLabel>You receive:</PreviewLabel>
            <PreviewValue>
              {takingAmount} {selectedTakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>
          
          <PreviewRow>
            <PreviewLabel>Price:</PreviewLabel>
            <PreviewValue>
              1 {selectedMakerToken?.symbol} = {pricePerToken} {selectedTakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>
          
          <PreviewRow>
            <PreviewLabel>Expires:</PreviewLabel>
            <PreviewValue>
              {EXPIRY_OPTIONS.find(o => o.value === expiry)?.label}
            </PreviewValue>
          </PreviewRow>
          
          <PreviewRow>
            <PreviewLabel>Dev Fee:</PreviewLabel>
            <PreviewValue>
              0.1% (included in amounts)
            </PreviewValue>
          </PreviewRow>
        </PreviewSection>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <Button 
            type="button" 
            onClick={handleBackToEdit}
            style={{ background: theme.colors.background.tertiary }}
          >
            Back
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Order'}
          </Button>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Title>Create Limit Order</Title>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="makerAsset">You pay (Token)</Label>
          <Select
            id="makerAsset"
            value={makerAsset}
            onChange={(e) => setMakerAsset(e.target.value)}
            required
          >
            <option value="">Select token</option>
            {availableTokens.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="makingAmount">Amount</Label>
          <Input
            id="makingAmount"
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            value={makingAmount}
            onChange={(e) => setMakingAmount(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="takerAsset">You receive (Token)</Label>
          <Select
            id="takerAsset"
            value={takerAsset}
            onChange={(e) => setTakerAsset(e.target.value)}
            required
          >
            <option value="">Select token</option>
            {availableTokens.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="takingAmount">Amount</Label>
          <Input
            id="takingAmount"
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            value={takingAmount}
            onChange={(e) => setTakingAmount(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="expiry">Expires in</Label>
          <Select
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(Number(e.target.value))}
          >
            {EXPIRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <Button 
          type="button" 
          onClick={handlePreview}
          disabled={!isValid}
          style={{ marginTop: '16px' }}
        >
          Preview Order
        </Button>
      </form>
    </FormContainer>
  );
};

export default LimitOrderForm;