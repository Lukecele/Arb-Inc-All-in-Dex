import { ethers } from 'ethers';
import { LimitOrderTaker } from './taker';
import { LimitOrderApiClient } from './api-client';
import { createLimitOrderTaker } from './taker';
import { Order } from './types';

// ============================================
// Order Filling Logic
// ============================================

export class OrderFiller {
  private taker: LimitOrderTaker;
  private contractAddress: string;

  constructor(taker: LimitOrderTaker, contractAddress: string) {
    this.taker = taker;
    this.contractAddress = contractAddress;
  }

  /**
   * Fills a single limit order
   */
  async fillOrder(
    signer: ethers.Signer,
    order: Order,
    fillPercentage: number = 100
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    filledAmount: string;
    paidAmount: string;
    gasUsed?: string;
  }> {
    const signerAddress = await signer.getAddress();

    try {
      // Step 1: Get operator signature
      const operatorSignatures = await this.taker.getOperatorSignature(
        [order.id],
        signerAddress
      );
      
      if (operatorSignatures.length === 0) {
        throw new Error('No operator signature available');
      }

      // Step 2: Calculate taking amount
      const takingAmount = this.taker.calculateTakingAmount(order, fillPercentage);
      
      // Step 3: Get fill order encoded data
      const encodedData = await this.taker.getFillOrderEncodedData(
        parseInt(order.id),
        takingAmount,
        '0',
        signerAddress,
        operatorSignatures[0].operatorSignature
      );

      // Estimate gas
      const gasEstimate = await signer.estimateGas({
        to: this.contractAddress,
        data: encodedData,
        from: signerAddress,
      });

      // Step 4: Send transaction
      const tx = await signer.sendTransaction({
        to: this.contractAddress,
        data: encodedData,
        gasLimit: gasEstimate.mul(120).div(100), // 20% buffer
      });

      // Step 5: Wait for confirmation
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        filledAmount: takingAmount,
        paidAmount: takingAmount,
        gasUsed: receipt.gasUsed.toString(),
      };
    } catch (error) {
      console.error('Fill order failed:', error);
      throw error;
    }
  }
}

// ============================================
// Factory Function
// ============================================

export function createOrderFiller(
  contractAddress: string,
  client?: LimitOrderApiClient
): OrderFiller {
  const taker = createLimitOrderTaker(client);
  return new OrderFiller(taker, contractAddress);
}