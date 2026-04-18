'use client'

import { useState, useCallback } from 'react'
import { ethers, BigNumber } from 'ethers'

// Contract addresses
const ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E' // PancakeSwap V2 Router
const ARB_INC = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

// Dev fee configuration
const FEE_RECEIVER = '0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7'
const FEE_PCM = 10 // 0.1%

// Router ABI (minimal required functions)
const ROUTER_ABI = [
  'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)',
  'function swapExactETHForTokensSupportingFeeOnTransferTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline) payable',
  'function swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)',
  'function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)',
  'function getAmountsIn(uint256 amountOut, address[] path) view returns (uint256[] amounts)',
  'function factory() view returns (address)',
  'function WETH() view returns (address)'
]

// WBNB ABI for wrap/unwrap
const WBNB_ABI = [
  'function deposit() payable',
  'function withdraw(uint256 wad)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)' // <-- FIX: AGGIUNTO TRANSFER
]

// ERC20 ABI
const ERC20_ABI = [
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)' // <-- FIX: AGGIUNTO TRANSFER
]

// Swap types
export type SwapType = 'ARB_INC_TO_BNB' | 'BNB_TO_ARB_INC' | 'BNB_TO_WBNB' | 'WBNB_TO_BNB'

export interface SwapToken {
  symbol: string
  name: string
  address: string | null // null for native BNB
  decimals: number
  isNative: boolean
  isTaxToken: boolean
}

export const SWAP_TOKENS: SwapToken[] = [
  { symbol: 'BNB', name: 'BNB', address: null, decimals: 18, isNative: true, isTaxToken: false },
  { symbol: 'WBNB', name: 'Wrapped BNB', address: WBNB, decimals: 18, isNative: false, isTaxToken: false },
  { symbol: 'ARB_INC', name: 'Arbitrage Inception', address: ARB_INC, decimals: 9, isNative: false, isTaxToken: true },
]

interface SwapState {
  loading: boolean
  error: string | null
  txHash: string | null
  estimatedOutput: string | null
}

interface UseArbIncSwapReturn extends SwapState {
  swap: (signer: ethers.Signer, amountIn: string, swapType: SwapType, slippagePercent?: number) => Promise<ethers.ContractTransaction | null>
  getEstimatedOutput: (provider: ethers.providers.JsonRpcProvider, amountIn: string, swapType: SwapType) => Promise<string | null>
  getBalance: (provider: ethers.providers.JsonRpcProvider, address: string, swapType: SwapType) => Promise<string>
}

export function useArbIncSwap(): UseArbIncSwapReturn {
  const [state, setState] = useState<SwapState>({
    loading: false,
    error: null,
    txHash: null,
    estimatedOutput: null
  })

  const getBalance = useCallback(async (
    provider: ethers.providers.JsonRpcProvider,
    address: string,
    swapType: SwapType
  ): Promise<string> => {
    try {
      if (swapType === 'BNB_TO_WBNB') {
        const balance = await provider.getBalance(address)
        return ethers.utils.formatEther(balance)
      } else if (swapType === 'WBNB_TO_BNB') {
        const wbnb = new ethers.Contract(WBNB, WBNB_ABI, provider)
        const balance = await wbnb.balanceOf(address)
        return ethers.utils.formatEther(balance)
      } else if (swapType === 'ARB_INC_TO_BNB') {
        const token = new ethers.Contract(ARB_INC, ERC20_ABI, provider)
        const balance = await token.balanceOf(address)
        return ethers.utils.formatUnits(balance, 9)
      } else if (swapType === 'BNB_TO_ARB_INC') {
        const balance = await provider.getBalance(address)
        return ethers.utils.formatEther(balance)
      }
      return '0'
    } catch (err) {
      console.error('Error getting balance:', err)
      return '0'
    }
  }, [])

  const getEstimatedOutput = useCallback(async (
    provider: ethers.providers.JsonRpcProvider,
    amountIn: string,
    swapType: SwapType
  ): Promise<string | null> => {
    try {
      const amountNum = parseFloat(amountIn)
      if (amountNum <= 0) return null

      if (swapType === 'BNB_TO_WBNB' || swapType === 'WBNB_TO_BNB') {
        setState(prev => ({ ...prev, estimatedOutput: amountIn }))
        return amountIn
      }

      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider)

      if (swapType === 'ARB_INC_TO_BNB') {
        const token = new ethers.Contract(ARB_INC, ERC20_ABI, provider)
        const decimals = await token.decimals()
        const amountInWei = ethers.utils.parseUnits(amountIn, decimals)
        const amounts = await router.getAmountsOut(amountInWei, [ARB_INC, WBNB])
        const expectedOutput = ethers.utils.formatUnits(amounts[1], 18)
        const afterTax = parseFloat(expectedOutput) * 0.96
        const afterDevFee = afterTax * (1 - FEE_PCM / 10000)
        setState(prev => ({ ...prev, estimatedOutput: afterDevFee.toFixed(6) }))
        return afterDevFee.toFixed(6)
      } else if (swapType === 'BNB_TO_ARB_INC') {
        const amountInWei = ethers.utils.parseEther(amountIn)
        const amounts = await router.getAmountsOut(amountInWei, [WBNB, ARB_INC])
        const expectedOutput = ethers.utils.formatUnits(amounts[1], 9)
        const afterTax = parseFloat(expectedOutput) * 0.96
        const afterDevFee = afterTax * (1 - FEE_PCM / 10000)
        setState(prev => ({ ...prev, estimatedOutput: afterDevFee.toFixed(6) }))
        return afterDevFee.toFixed(6)
      }

      return null
    } catch (err: any) {
      console.error('Error estimating output:', err)
      return null
    }
  }, [])

  const swap = useCallback(async (
    signer: ethers.Signer,
    amountIn: string,
    swapType: SwapType,
    slippagePercent: number = 3
  ): Promise<ethers.ContractTransaction | null> => {
    setState({ loading: true, error: null, txHash: null, estimatedOutput: null })
    
    try {
      const provider = signer.provider!
      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer)
      const owner = await signer.getAddress()
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10

      if (swapType === 'BNB_TO_WBNB') {
        const amountInWei = ethers.utils.parseEther(amountIn)
        const balance = await provider.getBalance(owner)
        if (balance.lt(amountInWei)) {
          throw new Error(`Insufficient BNB balance. You have ${ethers.utils.formatEther(balance)} BNB`)
        }
        
        const wbnb = new ethers.Contract(WBNB, WBNB_ABI, signer)
        const devFee = amountInWei.mul(FEE_PCM).div(10000)
        const userAmount = amountInWei.sub(devFee)
        
        console.log('Wrapping BNB to WBNB...')
        const tx = await wbnb.deposit({ value: userAmount })
        
        const receipt = await tx.wait()
        console.log('Wrap confirmed in block:', receipt.blockNumber)
        
        const feeTx = await wbnb.transfer(FEE_RECEIVER, devFee)
        await feeTx.wait()
        console.log('Dev fee sent:', devFee.toString())
        
        setState({ loading: false, error: null, txHash: tx.hash, estimatedOutput: null })
        return tx
      }

      if (swapType === 'WBNB_TO_BNB') {
        const amountInWei = ethers.utils.parseEther(amountIn)
        const wbnb = new ethers.Contract(WBNB, WBNB_ABI, signer)
        const balance = await wbnb.balanceOf(owner)
        if (balance.lt(amountInWei)) {
          throw new Error(`Insufficient WBNB balance. You have ${ethers.utils.formatEther(balance)} WBNB`)
        }
        
        const devFee = amountInWei.mul(FEE_PCM).div(10000)
        const userAmount = amountInWei.sub(devFee)
        
        console.log('Unwrapping WBNB to BNB...')
        const tx = await wbnb.withdraw(userAmount)
        
        const receipt = await tx.wait()
        console.log('Unwrap confirmed in block:', receipt.blockNumber)
        
        const feeTx = await wbnb.transfer(FEE_RECEIVER, devFee)
        await feeTx.wait()
        console.log('Dev fee sent:', devFee.toString())
        
        setState({ loading: false, error: null, txHash: tx.hash, estimatedOutput: null })
        return tx
      }

      if (swapType === 'ARB_INC_TO_BNB') {
        const token = new ethers.Contract(ARB_INC, ERC20_ABI, signer)
        const wbnb = new ethers.Contract(WBNB, WBNB_ABI, signer)
        const decimals = 9
        const amountInWei = ethers.utils.parseUnits(amountIn, decimals)
        
        const balance = await token.balanceOf(owner)
        if (balance.lt(amountInWei)) {
          throw new Error(`Insufficient ARB Inc balance. You have ${ethers.utils.formatUnits(balance, decimals)} ARB Inc`)
        }
        
        const amounts = await router.getAmountsOut(amountInWei, [ARB_INC, WBNB])
        const expectedOutput = amounts[1]
        const afterTax = expectedOutput.mul(96).div(100)
        
        const devFee = afterTax.mul(FEE_PCM).div(10000)
        const userOutput = afterTax.sub(devFee)
        const amountOutMin = userOutput.mul(10000 - slippagePercent * 100).div(10000)
        
        const currentAllowance = await token.allowance(owner, ROUTER_ADDRESS)
        if (currentAllowance.lt(amountInWei)) {
          console.log('Approving ARB Inc for swap...')
          const approveTx = await token.approve(ROUTER_ADDRESS, ethers.constants.MaxUint256)
          await approveTx.wait()
        }
        
        console.log('Executing swap ARB Inc -> BNB...')
        const tx = await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
          amountInWei,
          amountOutMin,
          [ARB_INC, WBNB],
          owner,
          deadline
        )
        
        const receipt = await tx.wait()
        console.log('Swap confirmed in block:', receipt.blockNumber)
        
        const wbnbBalance = await wbnb.balanceOf(owner)
        const feeTx = await wbnb.transfer(FEE_RECEIVER, devFee)
        await feeTx.wait()
        console.log('Dev fee sent:', devFee.toString())
        
        setState({ loading: false, error: null, txHash: tx.hash, estimatedOutput: null })
        return tx
      }

      if (swapType === 'BNB_TO_ARB_INC') {
        const token = new ethers.Contract(ARB_INC, ERC20_ABI, signer)
        const amountInWei = ethers.utils.parseEther(amountIn)
        const balance = await provider.getBalance(owner)
        if (balance.lt(amountInWei)) {
          throw new Error(`Insufficient BNB balance. You have ${ethers.utils.formatEther(balance)} BNB`)
        }
        
        const amounts = await router.getAmountsOut(amountInWei, [WBNB, ARB_INC])
        const expectedOutput = amounts[1]
        const afterTax = expectedOutput.mul(96).div(100)
        
        const devFee = afterTax.mul(FEE_PCM).div(10000)
        const userOutput = afterTax.sub(devFee)
        const amountOutMin = userOutput.mul(10000 - slippagePercent * 100).div(10000)
        
        console.log('Executing swap BNB -> ARB Inc...')
        const tx = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
          amountOutMin,
          [WBNB, ARB_INC],
          owner,
          deadline,
          { value: amountInWei }
        )
        
        const receipt = await tx.wait()
        console.log('Swap confirmed in block:', receipt.blockNumber)
        
        const tokenBalance = await token.balanceOf(owner)
        const feeTx = await token.transfer(FEE_RECEIVER, devFee)
        await feeTx.wait()
        console.log('Dev fee sent:', devFee.toString())
        
        setState({ loading: false, error: null, txHash: tx.hash, estimatedOutput: null })
        return tx
      }

      throw new Error('Unknown swap type')
    } catch (err: any) {
      console.error('Swap error:', err)
      let errorMessage = err.message || 'Unknown error'
      
      if (err.message?.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
        errorMessage = 'Insufficient output amount. Try increasing slippage tolerance.'
      } else if (err.message?.includes('TRANSFER_FAILED')) {
        errorMessage = 'Token transfer failed.'
      } else if (err.message?.includes('INSUFFICIENT_LIQUIDITY')) {
        errorMessage = 'Insufficient liquidity in the pool.'
      } else if (err.message?.includes('user rejected')) {
        errorMessage = 'Transaction rejected by user.'
      }
      
      setState({ loading: false, error: errorMessage, txHash: null, estimatedOutput: null })
      throw new Error(errorMessage)
    }
  }, [])

  return { ...state, swap, getEstimatedOutput, getBalance }
}

export default useArbIncSwap
