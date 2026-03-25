'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import useArbIncSwap, { SwapType, SWAP_TOKENS, SwapToken } from './useArbIncSwap'
import theme from '../styles/theme'

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

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  background: ${theme.colors.glass.medium};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 8px;
  color: ${theme.colors.text.primary};
  outline: none;
  cursor: pointer;
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

const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 4px;
`

const BalanceLink = styled.span`
  color: ${theme.colors.accent.DEFAULT};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const SwapDirection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -8px 0;
  position: relative;
  z-index: 1;
`

const ArrowButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.glass.medium};
  border: 1px solid ${theme.colors.border.DEFAULT};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.fast};
  &:hover {
    background: ${theme.colors.glass.heavy};
    transform: rotate(180deg);
  }
`

const TaxNotice = styled.div`
  font-size: 11px;
  color: #FF9901;
  margin-top: 4px;
`

const SWAP_OPTIONS: { from: SwapToken; to: SwapToken; type: SwapType }[] = [
  { from: SWAP_TOKENS[2], to: SWAP_TOKENS[0], type: 'ARB_INC_TO_BNB' },
  { from: SWAP_TOKENS[0], to: SWAP_TOKENS[2], type: 'BNB_TO_ARB_INC' },
  { from: SWAP_TOKENS[0], to: SWAP_TOKENS[1], type: 'BNB_TO_WBNB' },
  { from: SWAP_TOKENS[1], to: SWAP_TOKENS[0], type: 'WBNB_TO_BNB' },
]

export default function ArbIncSwap({ ethersProvider, walletAddress, onSuccess }: ArbIncSwapProps) {
  const [fromTokenIdx, setFromTokenIdx] = useState(0)
  const [amount, setAmount] = useState('')
  const [estimatedOutput, setEstimatedOutput] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>('0')
  const { loading, error, txHash, swap, getEstimatedOutput, getBalance } = useArbIncSwap()

  const currentSwap = SWAP_OPTIONS[fromTokenIdx]
  const fromToken = currentSwap.from
  const toToken = currentSwap.to
  const swapType = currentSwap.type

  useEffect(() => {
    const updateEstimation = async () => {
      if (!ethersProvider || !amount || parseFloat(amount) <= 0) {
        setEstimatedOutput(null)
        return
      }
      
      const output = await getEstimatedOutput(ethersProvider, amount, swapType)
      setEstimatedOutput(output)
    }
    
    const debounceTimer = setTimeout(updateEstimation, 500)
    return () => clearTimeout(debounceTimer)
  }, [amount, ethersProvider, swapType, getEstimatedOutput])

  useEffect(() => {
    const updateBalance = async () => {
      if (!ethersProvider || !walletAddress) {
        setBalance('0')
        return
      }
      
      const bal = await getBalance(ethersProvider, walletAddress, swapType)
      setBalance(bal)
    }
    
    updateBalance()
  }, [ethersProvider, walletAddress, swapType, getBalance])

  const handleSwapDirection = () => {
    const reverseIdx = SWAP_OPTIONS.findIndex(o => o.type === swapType && 
      o.from.symbol === toToken.symbol && o.to.symbol === fromToken.symbol)
    if (reverseIdx >= 0) {
      setFromTokenIdx(reverseIdx)
      setAmount('')
      setEstimatedOutput(null)
    }
  }

  const handleSwap = async () => {
    if (!ethersProvider || !walletAddress || !amount) return
    
    try {
      const signer = ethersProvider.getSigner()
      await swap(signer, amount, swapType, 3)
      
      if (onSuccess) onSuccess()
      
      setAmount('')
      setEstimatedOutput(null)
      
      const bal = await getBalance(ethersProvider, walletAddress, swapType)
      setBalance(bal)
    } catch (err) {
      console.error('Swap failed:', err)
    }
  }

  const setMaxAmount = () => {
    setAmount(balance)
  }

  const getOutputLabel = () => {
    if (swapType === 'BNB_TO_WBNB' || swapType === 'WBNB_TO_BNB') {
      return `Estimated ${toToken.symbol} output:`
    }
    if (swapType === 'ARB_INC_TO_BNB') {
      return `Estimated BNB output:`
    }
    return `Estimated ${toToken.symbol} output:`
  }

  const getOutputSuffix = () => {
    if (swapType === 'ARB_INC_TO_BNB') {
      return '(after 4% tax)'
    }
    if (swapType === 'BNB_TO_ARB_INC') {
      return '(after 4% tax)'
    }
    return ''
  }

  const getSwapButtonLabel = () => {
    if (loading) return 'Processing...'
    if (swapType === 'BNB_TO_WBNB') return 'Wrap BNB → WBNB'
    if (swapType === 'WBNB_TO_BNB') return 'Unwrap WBNB → BNB'
    if (swapType === 'ARB_INC_TO_BNB') return 'Swap ARB Inc → BNB'
    if (swapType === 'BNB_TO_ARB_INC') return 'Swap BNB → ARB Inc'
    return 'Swap'
  }

  if (!ethersProvider || !walletAddress) {
    return (
      <Container>
        <Title>Custom Swap</Title>
        <Status $type="info">Please connect your wallet to swap tokens</Status>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Custom Swap</Title>
      
      <InputGroup>
        <Label>From</Label>
        <Select 
          value={fromTokenIdx} 
          onChange={(e) => {
            setFromTokenIdx(Number(e.target.value))
            setAmount('')
            setEstimatedOutput(null)
          }}
        >
          {SWAP_OPTIONS.map((opt, idx) => (
            <option key={opt.type} value={idx}>
              {opt.from.symbol} → {opt.to.symbol}
            </option>
          ))}
        </Select>
      </InputGroup>

      <SwapDirection>
        <ArrowButton onClick={handleSwapDirection} title="Swap direction">
          ↓
        </ArrowButton>
      </SwapDirection>
      
      <InputGroup>
        <Label>Amount</Label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="any"
            style={{ flex: 1 }}
          />
          <button 
            onClick={setMaxAmount}
            style={{
              padding: '8px 12px',
              background: theme.colors.glass.medium,
              border: `1px solid ${theme.colors.border.DEFAULT}`,
              borderRadius: '8px',
              color: theme.colors.accent.DEFAULT,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            MAX
          </button>
        </div>
        <BalanceRow>
          <span style={{ color: theme.colors.text.secondary, fontSize: '12px' }}>
            Balance: {parseFloat(balance).toFixed(6)}
          </span>
          <BalanceLink onClick={setMaxAmount}>Use max</BalanceLink>
        </BalanceRow>
      </InputGroup>
      
      {estimatedOutput && (
        <InfoRow>
          <span>{getOutputLabel()}</span>
          <span>{estimatedOutput} {toToken.symbol} {getOutputSuffix()}</span>
        </InfoRow>
      )}
      
      <SwapButton 
        onClick={handleSwap}
        $disabled={loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(balance)}
      >
        {getSwapButtonLabel()}
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
        <span>Slippage:</span>
        <span>3%</span>
      </InfoRow>
      {(swapType === 'ARB_INC_TO_BNB' || swapType === 'BNB_TO_ARB_INC') && (
        <TaxNotice>4% transfer tax automatically accounted for</TaxNotice>
      )}
    </Container>
  )
}
