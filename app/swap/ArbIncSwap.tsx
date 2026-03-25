'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import useArbIncSwap from './useArbIncSwap'
import theme from '../styles/theme'

const ARB_INC_ADDRESS = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'
const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

interface ArbIncSwapProps {
  ethersProvider: ethers.providers.Web3Provider | null
  walletAddress: string | null
  onSuccess?: () => void
}

const Container = styled.div`
  background: ${theme.colors.glass.light};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border.DEFAULT};
  padding: 20px;
  margin: 20px 0;
  max-width: 400px;
  width: 100%;
`

const Title = styled.h3`
  color: ${theme.colors.text.primary};
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
`

const InputGroup = styled.div`
  margin-bottom: 16px;
`

const Label = styled.label`
  display: block;
  color: ${theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: ${theme.colors.glass.medium};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 8px;
  color: ${theme.colors.text.primary};
  outline: none;
  &:focus {
    border-color: ${theme.colors.accent.DEFAULT};
  }
`

const SwapButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background: ${props => props.$disabled 
    ? theme.colors.glass.medium 
    : 'linear-gradient(135deg, #28E0B9 0%, #189470 100%)'};
  color: ${props => props.$disabled ? theme.colors.text.muted : '#fff'};
  border: none;
  border-radius: 12px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: ${theme.transitions.fast};
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`

const Status = styled.div<{ $type: 'info' | 'error' | 'success' }>`
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 14px;
  background: ${props => {
    switch (props.$type) {
      case 'error': return 'rgba(255, 83, 123, 0.1)'
      case 'success': return 'rgba(24, 148, 112, 0.1)'
      default: return 'rgba(40, 224, 185, 0.1)'
    }
  }};
  border: 1px solid ${props => {
    switch (props.$type) {
      case 'error': return 'rgba(255, 83, 123, 0.3)'
      case 'success': return 'rgba(24, 148, 112, 0.3)'
      default: return 'rgba(40, 224, 185, 0.3)'
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'error': return '#FF537B'
      case 'success': return '#189470'
      default: return '#28E0B9'
    }
  }};
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${theme.colors.text.secondary};
  margin-top: 8px;
`

export default function ArbIncSwap({ ethersProvider, walletAddress, onSuccess }: ArbIncSwapProps) {
  const [amount, setAmount] = useState('')
  const [estimatedOutput, setEstimatedOutput] = useState<string | null>(null)
  const { loading, error, txHash, swap, getEstimatedOutput } = useArbIncSwap()

  // Update estimation when amount changes
  useEffect(() => {
    const updateEstimation = async () => {
      if (!ethersProvider || !amount || parseFloat(amount) <= 0) {
        setEstimatedOutput(null)
        return
      }
      
      const output = await getEstimatedOutput(ethersProvider, amount)
      setEstimatedOutput(output)
    }
    
    const debounceTimer = setTimeout(updateEstimation, 500)
    return () => clearTimeout(debounceTimer)
  }, [amount, ethersProvider, getEstimatedOutput])

  const handleSwap = async () => {
    if (!ethersProvider || !walletAddress || !amount) return
    
    try {
      const signer = ethersProvider.getSigner()
      await swap(signer, amount, 3) // 3% slippage for tax token
      
      if (onSuccess) onSuccess()
      
      // Clear input after successful swap
      setAmount('')
      setEstimatedOutput(null)
    } catch (err) {
      console.error('Swap failed:', err)
    }
  }

  if (!ethersProvider || !walletAddress) {
    return (
      <Container>
        <Title>ARB Inc → BNB Swap (Direct)</Title>
        <Status $type="info">Please connect your wallet to swap ARB Inc</Status>
      </Container>
    )
  }

  return (
    <Container>
      <Title>ARB Inc → BNB Swap (Direct PancakeSwap)</Title>
      
      <InputGroup>
        <Label>ARB Inc Amount</Label>
        <Input
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="any"
        />
      </InputGroup>
      
      {estimatedOutput && (
        <InfoRow>
          <span>Estimated BNB output:</span>
          <span>{estimatedOutput} BNB (after 4% tax)</span>
        </InfoRow>
      )}
      
      <SwapButton 
        onClick={handleSwap}
        $disabled={loading || !amount || parseFloat(amount) <= 0}
      >
        {loading ? 'Swapping...' : 'Swap ARB Inc → BNB'}
      </SwapButton>
      
      {error && (
        <Status $type="error">{error}</Status>
      )}
      
      {txHash && (
        <Status $type="success">
          Transaction successful! 
          <a 
            href={`https://bscscan.com/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', marginLeft: '8px', textDecoration: 'underline' }}
          >
            View on BscScan
          </a>
        </Status>
      )}
      
      <InfoRow>
        <span>Slippage tolerance:</span>
        <span>3% (accounts for 4% tax)</span>
      </InfoRow>
      <InfoRow>
        <span>Router:</span>
        <span>PancakeSwap V2 (direct)</span>
      </InfoRow>
    </Container>
  )
}
