# Autonomous Daemons & Operations Tooling

This directory contains the operational daemons, health auditors, and incident recovery tools for Arbitrage Inc.

---

## 🚀 Active Background Daemons

### 1. Protocol Solvency & Health Watcher (`watcher.js`)
- **Role:** Autonomous real-time background service monitoring BSC RPC blocks.
- **Solvency Buffer:** Enforces `SAFE_FACTOR = 0.73` to guarantee protocol liquidity margins.
- **Yield Calculation:** Detects inbound transaction fee deltas in the treasury, computes proportional distribution shares for token holders, and commits pending rewards to Upstash Redis.
- **Holding Tracker:** Audits token balances on-chain to apply Diamond-Hand multipliers and Paper-Hand maluses (5% penalty on selling).

### 2. Live Health Auditor (`health_check.js`)
- **Role:** Validates real-time treasury solvency against user obligations.
- **Diagnostic Thresholds:**
  - `ratio <= 80%`: **SECURE** (Ample solvency buffer).
  - `80% < ratio <= 95%`: **WARNING** (Safety margin narrowing).
  - `ratio > 95%`: **CRITICAL** (Emergency threshold alert).

### 3. Yield Pool Aggregator (`generate_beefy_candidates.js`)
- **Role:** Queries external yield APIs (Beefy Finance) to curate high-APY pools on BNB Chain for the `/vaults` page.

---

## 🛠️ Directory Structure

```
scripts/
├── watcher.js                      # Core real-time yield distribution & holding daemon
├── health_check.js                 # Solvency diagnostic auditor
├── generate_beefy_candidates.js    # Vault APY aggregator
├── maintenance/                    # Scheduled health routines & Playwright smoke tests
│   └── test-pages.mjs              # Automated E2E smoke testing suite
└── recovery/                       # Incident response archive & ledger reconciliation tools
    ├── settlement/                 # Final settlement execution scripts
    └── ...                         # Historical post-mortem & emergency patch scripts
```

---

## 🛡️ Incident Response & Post-Mortem Tooling (`recovery/`)

The `recovery/` directory archives historical, single-use scripts deployed during real-time on-chain events on BNB Smart Chain:
- **Ledger Balance Reconciliation:** Dry-run and execution tools used to verify user point allocations and resolve rounding discrepancies.
- **Contract Exploit Mitigation:** Emergency containment scripts used during historical third-party protocol incidents.
- All recovery scripts are archived for audit transparency and security review.
