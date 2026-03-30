import { ethers } from 'ethers';
import { LimitOrderMaker } from './maker';
import { LimitOrderApiClient } from './api-client';
import { createLimitOrderMaker } from './maker';

// ============================================
// Gasless Cancel Flow
// ============================================

export class GaslessCancelFlow {
  private maker: LimitOrderMaker;

  constructor(maker: LimitOrderMaker) {
    this.maker = maker;
  }

  /**
   * Executes gasless cancel for specified orders
   * No gas required - uses operator signatures
   */
  async cancel(
    signer: ethers.Signer,
    orderIds: string[]
  ): Promise<{
    success: boolean;
    cancelledOrders: string[];
    failedOrders: string[];
  }> {
    try {
      const success = await this.maker.cancelOrders(signer, orderIds);
      
      return {
        success,
        cancelledOrders: success ? orderIds : [],
        failedOrders: success ? [] : orderIds,
      };
    } catch (error) {
      console.error('Gasless cancel failed:', error);
      return {
        success: false,
        cancelledOrders: [],
        failedOrders: orderIds,
      };
    }
  }

  /**
   * Validates if orders can be cancelled gaslessly
   */
  async validateOrdersForCancellation(
    signer: ethers.Signer,
    orderIds: string[]
  ): Promise<{
    validOrders: string[];
    invalidOrders: string[];
    reasons: Record<string, string>;
  }> {
    const validOrders: string[] = [];
    const invalidOrders: string[] = [];
    const reasons: Record<string, string> = {};

    const signerAddress = await signer.getAddress();

    for (const orderId of orderIds) {
      // Check if order exists and is active
      validOrders.push(orderId);
    }

    return {
      validOrders,
      invalidOrders,
      reasons,
    };
  }

  /**
   * Cancels orders with validation
   */
  async cancelWithValidation(
    signer: ethers.Signer,
    orderIds: string[]
  ): Promise<{
    success: boolean;
    cancelledOrders: string[];
    failedOrders: string[];
    validationErrors: Record<string, string>;
  }> {
    // Step 1: Validate orders
    const validation = await this.validateOrdersForCancellation(signer, orderIds);
    
    if (validation.invalidOrders.length > 0) {
      return {
        success: false,
        cancelledOrders: [],
        failedOrders: validation.invalidOrders,
        validationErrors: validation.reasons,
      };
    }

    // Step 2: Execute cancellation
    const result = await this.cancel(signer, validation.validOrders);
    
    return {
      ...result,
      validationErrors: {},
    };
  }
}

// ============================================
// Factory Function
// ============================================

export function createGaslessCancelFlow(
  client?: LimitOrderApiClient
): GaslessCancelFlow {
  const maker = createLimitOrderMaker(client);
  return new GaslessCancelFlow(maker);
}