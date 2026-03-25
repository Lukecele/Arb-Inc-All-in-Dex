'use client'

import styled from 'styled-components'
import { pools, pcsV3Pools } from '../pools'
import type { PoolInfo } from '../pools'

const allPools = [...pools, ...pcsV3Pools]

const SelectorContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 10px;
`

const Label = styled.label`
  display: block;
  color: #A9A9A9;
  font-size: 12px;
  margin-bottom: 4px;
  font-weight: 500;
`

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    border-color: #8B5CF6;
  }
  
  option {
    background: #1a1a3e;
    color: #FFFFFF;
    padding: 8px;
  }
  
  optgroup {
    background: #0f0f1a;
    color: #FF9900;
    font-weight: 700;
    padding: 10px;
    font-size: 13px;
  }
  
  optgroup option {
    background: #1a1a3e;
    color: #FFFFFF;
    padding: 10px;
    font-weight: 400;
  }
`

const PoolDetails = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  font-size: 13px;
  color: #A9A9A9;
`

const PoolInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const Badge = styled.span<{ $isArbitrage: boolean }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.$isArbitrage ? 'rgba(139, 92, 246, 0.2)' : 'rgba(40, 224, 185, 0.2)'};
  color: ${props => props.$isArbitrage ? '#8B5CF6' : '#28E0B9'};
`

const PoolTypeBadge = styled.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 152, 0, 0.15);
  color: #FF9900;
  margin-left: 8px;
`

interface PoolSelectorProps {
  selectedPoolId: string
  onPoolChange: (pool: PoolInfo) => void
}

export default function PoolSelector({ selectedPoolId, onPoolChange }: PoolSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pool = allPools.find(p => p.id === e.target.value)
    if (pool) {
      onPoolChange(pool)
    }
  }

  const selectedPool = allPools.find(p => p.id === selectedPoolId) || allPools[0]

  const getPoolTypeLabel = (poolType: string) => {
    return poolType.replace('DEX_', '')
  }

  return (
    <SelectorContainer>
      <Label>Select Liquidity Pool</Label>
      <Select value={selectedPoolId} onChange={handleChange}>
        <optgroup label="📈 Arbitrage Inception">
          {allPools.filter(p => p.isArbitrageInception).map(pool => (
            <option key={pool.id} value={pool.id}>
              [{getPoolTypeLabel(pool.poolType)}] {pool.name} - ${pool.liquidityUSD.toLocaleString()}
            </option>
          ))}
        </optgroup>
        <optgroup label="🥞 PancakeSwap V2">
          {allPools.filter(p => !p.isArbitrageInception && p.poolType === 'DEX_PANCAKESWAPV2').map(pool => (
            <option key={pool.id} value={pool.id}>
              [{getPoolTypeLabel(pool.poolType)}] {pool.name} - ${pool.liquidityUSD.toLocaleString()} {pool.apr ? `(${pool.apr})` : ''}
            </option>
          ))}
        </optgroup>
        <optgroup label="🥞 PancakeSwap V3">
          {allPools.filter(p => p.poolType === 'DEX_PANCAKESWAPV3').map(pool => (
            <option key={pool.id} value={pool.id}>
              [{getPoolTypeLabel(pool.poolType)}] {pool.name} - ${pool.liquidityUSD.toLocaleString()} {pool.apr ? `(${pool.apr})` : ''}
            </option>
          ))}
        </optgroup>
      </Select>
      
      <PoolDetails>
        <PoolInfo>
          <div>
            <strong>{selectedPool.name}</strong>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              {selectedPool.token0.symbol} / {selectedPool.token1.symbol}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Badge $isArbitrage={selectedPool.isArbitrageInception}>
              {selectedPool.dex}
            </Badge>
            <PoolTypeBadge>
              {selectedPool.poolType.replace('DEX_', '')}
            </PoolTypeBadge>
          </div>
        </PoolInfo>
        <div style={{ fontSize: '12px' }}>
          Pool: {selectedPool.address.slice(0, 6)}...{selectedPool.address.slice(-4)}
          <br />
          TVL: ${selectedPool.liquidityUSD.toLocaleString()}
          {selectedPool.apr && <> | {selectedPool.apr}</>}
        </div>
      </PoolDetails>
    </SelectorContainer>
  )
}
