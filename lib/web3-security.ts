/**
 * Web3 Input Sanitization, MEV Protection, and RPC Circuit Breaker Suite
 */

export interface ValidationResult<T> {
  isValid: boolean;
  value?: T;
  error?: string;
}

export interface SlippageConfig {
  minAllowedPercent: number;
  maxAllowedPercent: number;
  defaultPercent: number;
}

export const DEFAULT_SLIPPAGE_CONFIG: SlippageConfig = {
  minAllowedPercent: 0.05,  // 0.05% minimum to prevent inevitable revert on volatile blocks
  maxAllowedPercent: 15.0,  // 15% maximum warning threshold to protect against MEV / sandwiching
  defaultPercent: 0.5       // 0.5% standard default
};

/**
 * Validates and normalizes an EVM address.
 */
export function validateEvmAddress(address: unknown): ValidationResult<string> {
  if (typeof address !== 'string') {
    return { isValid: false, error: 'Address must be a string' };
  }
  const clean = address.trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(clean)) {
    return { isValid: false, error: 'Invalid EVM address format' };
  }
  if (clean === '0x0000000000000000000000000000000000000000') {
    return { isValid: false, error: 'Zero address is not permitted for trades' };
  }
  return { isValid: true, value: clean.toLowerCase() };
}

/**
 * Validates and clamps slippage tolerances to defend against MEV sandwich attacks.
 */
export function validateSlippage(
  inputSlippage: unknown,
  config: SlippageConfig = DEFAULT_SLIPPAGE_CONFIG
): ValidationResult<number> {
  const num = Number(inputSlippage);
  if (isNaN(num) || num <= 0) {
    return {
      isValid: false,
      error: `Slippage must be a positive number. Minimum is ${config.minAllowedPercent}%.`
    };
  }
  if (num < config.minAllowedPercent) {
    return {
      isValid: false,
      error: `Slippage (${num}%) is too low and will cause transaction reverts. Minimum is ${config.minAllowedPercent}%.`
    };
  }
  if (num > config.maxAllowedPercent) {
    return {
      isValid: false,
      error: `Slippage (${num}%) exceeds safety ceiling (${config.maxAllowedPercent}%). Vulnerable to front-running and MEV sandwich bots.`
    };
  }
  return { isValid: true, value: num };
}

/**
 * Sanitizes numeric token input amounts into discrete non-negative BigInt representation.
 */
export function sanitizeTokenAmount(
  amount: unknown,
  decimals: number = 18
): ValidationResult<bigint> {
  if (typeof amount === 'bigint') {
    if (amount <= 0n) return { isValid: false, error: 'Amount must be greater than zero' };
    return { isValid: true, value: amount };
  }

  const str = String(amount || '').trim();
  if (!str || str === '0' || str.startsWith('-')) {
    return { isValid: false, error: 'Amount must be a positive number' };
  }

  const parts = str.split('.');
  if (parts.length > 2) {
    return { isValid: false, error: 'Invalid decimal representation' };
  }

  const whole = parts[0] || '0';
  const frac = (parts[1] || '').slice(0, decimals).padEnd(decimals, '0');

  try {
    const rawUnits = BigInt(whole) * (10n ** BigInt(decimals)) + BigInt(frac);
    if (rawUnits <= 0n) {
      return { isValid: false, error: 'Parsed amount evaluates to zero' };
    }
    return { isValid: true, value: rawUnits };
  } catch {
    return { isValid: false, error: 'Failed to parse token amount as BigInt' };
  }
}

/**
 * Executes an RPC call with exponential backoff and circuit breaker failover.
 */
export async function executeWithCircuitBreaker<T>(
  providers: Array<() => Promise<T>>,
  maxRetriesPerProvider: number = 2
): Promise<T> {
  let lastError: Error | null = null;

  for (let pIdx = 0; pIdx < providers.length; pIdx++) {
    const providerCall = providers[pIdx];
    for (let retry = 0; retry <= maxRetriesPerProvider; retry++) {
      try {
        return await providerCall();
      } catch (err: any) {
        lastError = err;
        if (retry < maxRetriesPerProvider) {
          // Exponential backoff
          await new Promise(r => setTimeout(r, 50 * (2 ** retry)));
        }
      }
    }
  }

  throw new Error(`All providers exhausted. Last error: ${lastError?.message || 'Unknown error'}`);
}
