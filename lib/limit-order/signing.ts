import { ethers } from 'ethers';
import { EIP712Domain, EIP712Type } from './types';

// ============================================
// EIP-712 Signing Utilities
// ============================================

/**
 * Signs EIP-712 typed data using ethers.js v5
 * 
 * @param signer - ethers.js Signer instance
 * @param domain - EIP-712 domain
 * @param types - EIP-712 types
 * @param value - Message to sign
 * @returns Promise<string> - Signature
 */
export async function signTypedData(
  signer: ethers.Signer,
  domain: EIP712Domain,
  types: EIP712Type,
  value: Record<string, any>
): Promise<string> {
  try {
    // @ts-ignore - _signTypedData exists in v5
    const signature = await signer._signTypedData(
      domain,
      types,
      value
    );
    
    return signature;
  } catch (error) {
    console.error('Failed to sign EIP-712 data:', error);
    throw new Error('User rejected signing request or signing failed');
  }
}

/**
 * Verifies EIP-712 signature
 * 
 * @param domain - EIP-712 domain
 * @param types - EIP-712 types
 * @param value - Message that was signed
 * @param signature - Signature to verify
 * @returns Promise<string> - Address that signed the message
 */
export async function verifyTypedDataSignature(
  domain: EIP712Domain,
  types: EIP712Type,
  value: Record<string, any>,
  signature: string
): Promise<string> {
  try {
    const recoveredAddress = ethers.utils.verifyTypedData(
      domain,
      types as any,
      value,
      signature
    );
    
    return recoveredAddress;
  } catch (error) {
    console.error('Failed to verify signature:', error);
    throw new Error('Invalid signature');
  }
}

/**
 * Creates EIP-712 domain separator
 * 
 * @param domain - EIP-712 domain
 * @returns string - Domain separator hash
 */
export function createDomainSeparator(domain: EIP712Domain): string {
  return ethers.utils._TypedDataEncoder.hashDomain(domain);
}

/**
 * Encodes EIP-712 typed data for signing
 * 
 * @param domain - EIP-712 domain
 * @param types - EIP-712 types
 * @param value - Message to encode
 * @returns string - Encoded data for signing
 */
export function encodeTypedData(
  domain: EIP712Domain,
  types: EIP712Type,
  value: Record<string, any>
): string {
  return ethers.utils._TypedDataEncoder.encode(
    domain,
    types as any,
    value
  );
}

/**
 * Gets the hash of EIP-712 typed data
 * 
 * @param domain - EIP-712 domain
 * @param types - EIP-712 types
 * @param value - Message to hash
 * @returns string - Hash of the typed data
 */
export function getTypedDataHash(
  domain: EIP712Domain,
  types: EIP712Type,
  value: Record<string, any>
): string {
  return ethers.utils._TypedDataEncoder.hash(
    domain,
    types as any,
    value
  );
}

// ============================================
// Domain Helpers
// ============================================

/**
 * Creates EIP-712 domain for KyberSwap Limit Order
 * 
 * @param chainId - Chain ID
 * @param verifyingContract - Limit Order contract address
 * @returns EIP712Domain
 */
export function createLimitOrderDomain(
  chainId: number,
  verifyingContract: string
): EIP712Domain {
  return {
    name: 'KyberSwapLimitOrder',
    version: '1',
    chainId,
    verifyingContract,
  };
}

/**
 * Creates Order type definition for EIP-712
 * 
 * @returns EIP712Type
 */
export function createOrderType(): EIP712Type {
  return {
    Order: [
      { name: 'makerAsset', type: 'address' },
      { name: 'takerAsset', type: 'address' },
      { name: 'maker', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'allowedSenders', type: 'address[]' },
      { name: 'makingAmount', type: 'uint256' },
      { name: 'takingAmount', type: 'uint256' },
      { name: 'feeRecipient', type: 'address' },
      { name: 'makerTokenFeePercent', type: 'uint256' },
      { name: 'salt', type: 'uint256' },
      { name: 'expiredAt', type: 'uint256' },
    ],
  };
}

/**
 * Creates Cancel Order type definition for EIP-712
 * 
 * @returns EIP712Type
 */
export function createCancelOrderType(): EIP712Type {
  return {
    CancelOrder: [
      { name: 'orderIds', type: 'uint256[]' },
      { name: 'maker', type: 'address' },
      { name: 'salt', type: 'uint256' },
    ],
  };
}

// ============================================
// Signature Helpers
// ============================================

/**
 * Generates random salt for order
 * 
 * @returns string - Random salt as hex string
 */
export function generateSalt(): string {
  return ethers.utils.hexlify(ethers.utils.randomBytes(32));
}

/**
 * Converts signature to r, s, v format
 * 
 * @param signature - Signature hex string
 * @returns Object with r, s, v components
 */
export function splitSignature(signature: string): {
  r: string;
  s: string;
  v: number;
} {
  const sig = ethers.utils.splitSignature(signature);
  return {
    r: sig.r,
    s: sig.s,
    v: sig.v,
  };
}

/**
 * Combines r, s, v into signature string
 * 
 * @param r - r component
 * @param s - s component
 * @param v - v component
 * @returns string - Combined signature
 */
export function joinSignature(r: string, s: string, v: number): string {
  return ethers.utils.joinSignature({ r, s, v });
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Validates signature format
 * 
 * @param signature - Signature to validate
 * @returns boolean - True if valid format
 */
export function isValidSignature(signature: string): boolean {
  try {
    if (!signature || typeof signature !== 'string') return false;
    if (!signature.startsWith('0x')) return false;
    if (signature.length !== 132) return false;
    
    // Try to split signature
    ethers.utils.splitSignature(signature);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates EIP-712 domain
 * 
 * @param domain - Domain to validate
 * @returns boolean - True if valid
 */
export function isValidDomain(domain: EIP712Domain): boolean {
  return !!(
    domain.name &&
    domain.version &&
    domain.chainId &&
    domain.verifyingContract &&
    ethers.utils.isAddress(domain.verifyingContract)
  );
}