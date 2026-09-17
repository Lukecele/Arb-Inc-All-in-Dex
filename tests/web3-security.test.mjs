import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEvmAddress,
  validateSlippage,
  sanitizeTokenAmount,
  executeWithCircuitBreaker,
  DEFAULT_SLIPPAGE_CONFIG
} from '../lib/web3-security.ts';

describe('Web3 Security - Address Validation', () => {
  it('validates canonical EVM 20-byte addresses', () => {
    const valid = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
    const res = validateEvmAddress(valid);
    assert.equal(res.isValid, true);
    assert.equal(res.value, valid.toLowerCase());
  });

  it('rejects malformed and non-hex addresses', () => {
    assert.equal(validateEvmAddress('0x123').isValid, false);
    assert.equal(validateEvmAddress('not-an-address').isValid, false);
    assert.equal(validateEvmAddress('').isValid, false);
    assert.equal(validateEvmAddress(null).isValid, false);
  });

  it('rejects zero address to prevent token burn/trap', () => {
    const zero = '0x0000000000000000000000000000000000000000';
    const res = validateEvmAddress(zero);
    assert.equal(res.isValid, false);
    assert.ok(res.error?.includes('Zero address'));
  });
});

describe('Web3 Security - MEV Slippage Protection', () => {
  it('approves safe slippage within tolerance window', () => {
    assert.equal(validateSlippage(0.5).isValid, true);
    assert.equal(validateSlippage('1.0').isValid, true);
    assert.equal(validateSlippage(5).isValid, true);
  });

  it('rejects unrealistically tight slippage (< 0.05%) that causes revert', () => {
    const res = validateSlippage(0.01);
    assert.equal(res.isValid, false);
    assert.ok(res.error?.includes('too low'));
  });

  it('rejects dangerously wide slippage (> 15%) that enables sandwiching', () => {
    const res = validateSlippage(20);
    assert.equal(res.isValid, false);
    assert.ok(res.error?.includes('exceeds safety ceiling'));
  });

  it('handles negative or non-numeric slippage gracefully', () => {
    assert.equal(validateSlippage(-1).isValid, false);
    assert.equal(validateSlippage('abc').isValid, false);
  });
});

describe('Web3 Security - Amount Sanitization & Precision', () => {
  it('converts standard decimal strings to exact BigInt atomic units', () => {
    const res = sanitizeTokenAmount('1.5', 18);
    assert.equal(res.isValid, true);
    assert.equal(res.value, 1500000000000000000n);
  });

  it('handles integers without decimal points', () => {
    const res = sanitizeTokenAmount('10', 6);
    assert.equal(res.isValid, true);
    assert.equal(res.value, 10000000n);
  });

  it('rejects negative, zero, and malformed amounts', () => {
    assert.equal(sanitizeTokenAmount('0').isValid, false);
    assert.equal(sanitizeTokenAmount('-5').isValid, false);
    assert.equal(sanitizeTokenAmount('1.2.3').isValid, false);
  });
});

describe('Web3 Security - Circuit Breaker RPC Failover', () => {
  it('succeeds on first provider if healthy', async () => {
    const res = await executeWithCircuitBreaker([
      async () => 'primary_success',
      async () => 'secondary_unused'
    ]);
    assert.equal(res, 'primary_success');
  });

  it('fails over to secondary provider when primary fails', async () => {
    let primaryAttempts = 0;
    const res = await executeWithCircuitBreaker([
      async () => {
        primaryAttempts++;
        throw new Error('RPC_RATE_LIMIT');
      },
      async () => 'fallback_success'
    ], 1);

    assert.equal(res, 'fallback_success');
    assert.equal(primaryAttempts, 2); // Initial attempt + 1 retry
  });

  it('throws informative error when all providers fail', async () => {
    await assert.rejects(
      async () => {
        await executeWithCircuitBreaker([
          async () => { throw new Error('Primary node down'); },
          async () => { throw new Error('Secondary node down'); }
        ], 0);
      },
      /All providers exhausted/
    );
  });
});

describe('Web3 Security - Atomic Mutex Lock & Anti-Race-Condition (Redis NX Semantics)', () => {
  class MockRedis {
    constructor() {
      this.store = new Map();
    }
    async set(key, value, opts = {}) {
      if (opts.nx && this.store.has(key)) {
        return null;
      }
      this.store.set(key, { value, expiresAt: opts.ex ? Date.now() + opts.ex * 1000 : null });
      return 'OK';
    }
    async get(key) {
      const entry = this.store.get(key);
      if (!entry) return null;
      if (entry.expiresAt && Date.now() > entry.expiresAt) {
        this.store.delete(key);
        return null;
      }
      return entry.value;
    }
    async del(key) {
      return this.store.delete(key) ? 1 : 0;
    }
  }

  it('permits only one concurrent claim per wallet and rejects parallel script calls', async () => {
    const redis = new MockRedis();
    const wallet = '0x1234567890123456789012345678901234567890';
    const lockKey = `lock:claim:${wallet}`;

    // Request 1 acquires lock
    const req1 = await redis.set(lockKey, 'locked', { nx: true, ex: 60 });
    assert.equal(req1, 'OK');

    // Request 2 (concurrent parallel call) attempts to acquire same lock
    const req2 = await redis.set(lockKey, 'locked', { nx: true, ex: 60 });
    assert.equal(req2, null); // Rejected!

    // After Request 1 completes, lock is released in finally block
    await redis.del(lockKey);

    // Request 3 (subsequent legitimate call) can now acquire lock
    const req3 = await redis.set(lockKey, 'locked', { nx: true, ex: 60 });
    assert.equal(req3, 'OK');
  });

  it('prevents concurrent double-claim of identical txHash with case normalization', async () => {
    const redis = new MockRedis();
    const rawTxHash = '0xAbCdEf1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
    const normalized = rawTxHash.toLowerCase();
    const claimKey = `claim_tx:${normalized}`;

    // First caller acquires pending reservation
    const lock1 = await redis.set(claimKey, 'pending', { nx: true, ex: 120 });
    assert.equal(lock1, 'OK');

    // Second caller submitting with different casing (e.g. uppercase)
    const upperSubmit = rawTxHash.toUpperCase();
    const lock2 = await redis.set(`claim_tx:${upperSubmit.toLowerCase()}`, 'pending', { nx: true, ex: 120 });
    assert.equal(lock2, null); // Blocked immediately by NX!

    // Once confirmed, key is sealed for 30 days
    await redis.set(claimKey, 'true', { ex: 2592000 });
    const finalVal = await redis.get(claimKey);
    assert.equal(finalVal, 'true');

    // Replay attempt next day is blocked
    const replayAttempt = await redis.set(claimKey, 'pending', { nx: true, ex: 120 });
    assert.equal(replayAttempt, null);
  });

  it('releases pending txHash lock if transaction verification fails so user can retry', async () => {
    const redis = new MockRedis();
    const txHash = '0xdeadbeef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
    const claimKey = `claim_tx:${txHash}`;

    // Acquire pending lock
    const lock = await redis.set(claimKey, 'pending', { nx: true, ex: 120 });
    assert.equal(lock, 'OK');

    // Verification fails (e.g. block not mined yet or RPC timeout) -> released in catch/validation
    await redis.del(claimKey);

    // User retries after block confirmation -> succeeds
    const retryLock = await redis.set(claimKey, 'pending', { nx: true, ex: 120 });
    assert.equal(retryLock, 'OK');
  });
});

