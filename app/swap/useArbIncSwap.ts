'use client'

import { useState, useCallback } from 'react'
import { ethers, BigNumber } from 'ethers'

// Contract addresses
const ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E' // PancakeSwap V2 Router
const ARB_INC = '0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c'
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

// Router ABI (minimal required functions)
const ROUTER_ABI = [
  'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)',
  'function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)',
  'function factory() view returns (address)',
  'function WETH() view returns (address)'
]

// ERC20 ABI
const ERC20_ABI = [
  'function approve(address spender, uint256 amount) returns (boolean)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address account) view returns (uint256)'
]

interface SwapState {
  loading: boolean
  error: string | null
  txHash: string | null
  estimatedOutput: string | null
}

interface UseArbIncSwapReturn extends SwapState {
  swap: (signer: ethers.Signer, amountIn: string, slippagePercent?: number) => Promise<ethers.ContractTransaction | null>
  getEstimatedOutput: (provider: ethers.providers.JsonRpcProvider, amountIn: string) => Promise<string | null>
}

export function useArbIncSwap(): UseArbIncSwapReturn {
  const [state, setState] = useState<SwapState>({
    loading: false,
    error: null,
    txHash: null,
    estimatedOutput: null
  })

  const getEstimatedOutput = useCallback(async (
    provider: ethers.providers.JsonRpcProvider,
    amountIn: string
  ): Promise<string | null> => {
    try {
      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider)
      const token = new ethers.Contract(ARB_INC, ERC20_ABI, provider)
      
      const decimals = await token.decimals()
      const amountInWei = ethers.utils.parseUnits(amountIn, decimals)
      
      const amounts = await router.getAmountsOut(amountInWei, [ARB_INC, WBNB])
      const expectedOutput = ethers.utils.formatUnits(amounts[1], 18)
      
      // Account for 4% tax on ARB Inc
      const afterTax = parseFloat(expectedOutput) * 0.96
      
      setState(prev => ({ ...prev, estimatedOutput: afterTax.toFixed(6) }))
      return afterTax.toFixed(6)
    } catch (err: any) {
      console.error('Error estimating output:', err)
      return null
    }
  }, [])

  const swap = useCallback(async (
    signer: ethers.Signer,
    amountIn: string,
    slippagePercent: number = 3
  ): Promise<ethers.ContractTransaction | null> => {
    setState({ loading: true, error: null, txHash: null, estimatedOutput: null })
    
    try {
      const provider = signer.provider!
      const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer)
      const token = new ethers.Contract(ARB_INC, ERC20_ABI, signer)
      const owner = await signer.getAddress()
      
      // Get token decimals
      const decimals = await token.decimals()
      const amountInWei = ethers.utils.parseUnits(amountIn, decimals)
      
      // Check balance
      const balance = await token.balanceOf(owner)
      if (balance.lt(amountInWei)) {
        throw new Error(`Insufficient ARB Inc balance. You have ${ethers.utils.formatUnits(balance, decimals)} ARB Inc`)
      }
      
      // Step 1: Get expected output amount
      const amounts = await router.getAmountsOut(amountInWei, [ARB_INC, WBNB])
      const expectedOutput = amounts[1]
      
      // Account for 4% tax: actual output will be ~96% of expected
      const afterTax = expectedOutput.mul(96).div(100)
      
      // Apply slippage tolerance
      const amountOutMin = afterTax.mul(10000 - slippagePercent * 100).div(10000)
      
      console.log(`Expected output: ${ethers.utils.formatUnits(expectedOutput, 18)} WBNB`)
      console.log(`After 4% tax: ${ethers.utils.formatUnits(afterTax, 18)} WBNB`)
      console.log(`Minimum with ${slippagePercent}% slippage: ${ethers.utils.formatUnits(amountOutMin, 18)} WBNB`)
      
      // Step 2: Ensure token approval
      const currentAllowance = await token.allowance(owner, ROUTER_ADDRESS)
      if (currentAllowance.lt(amountInWei)) {
        console.log('Approving ARB Inc for swap...')
        const approveTx = await token.approve(ROUTER_ADDRESS, ethers.constants.MaxUint256)
        await approveTx.wait()
        console.log('ARB Inc approved:', approveTx.hash)
      }
      
      // Step 3: Execute the swap with deadline
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10 // 10 minutes
      
      // CRITICAL: Use SupportingFeeOnTransferTokens for ARB Inc's 4% tax
      console.log('Executing swap ARB Inc -> WBNB...')
      const tx = await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        amountInWei,
        amountOutMin,
        [ARB_INC, WBNB],
        owner,
        deadline
      )
      
      console.log('Swap transaction submitted:', tx.hash)
      
      // Wait for confirmation
      const receipt = await tx.wait()
      console.log('Swap confirmed in block:', receipt.blockNumber)
      
      setState({ loading: false, error: null, txHash: tx.hash, estimatedOutput: null })
      return tx
    } catch (err: any) {
      console.error('Swap error:', err)
      let errorMessage = err.message
      
      // Provide more user-friendly error messages
      if (err.message.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
        errorMessage = 'Insufficient output amount. Try increasing slippage tolerance.'
      } else if (err.message.includes('TRANSFER_FAILED')) {
        errorMessage = 'Token transfer failed. Check your ARB Inc balance and approve the token.'
      } else if (err.message.includes('INSUFFICIENT_LIQUIDITY')) {
        errorMessage = 'Insufficient liquidity in the pool.'
      } else if (err.message.includes('user rejected')) {
        errorMessage = 'Transaction rejected by user.'
      }
      
      setState({ loading: false, error: errorMessage, txHash: null, estimatedOutput: null })
      throw new Error(errorMessage)
    }
  }, [])

  return { ...state, swap, getEstimatedOutput }
}

export default useArbIncSwap
