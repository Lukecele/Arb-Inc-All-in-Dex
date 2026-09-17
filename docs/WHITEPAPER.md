# Arbitrage Inception — Technical Whitepaper & Protocol Architecture

**Version:** 2.0.0  
**Network:** BNB Smart Chain (BSC)  
**License:** MIT (100% Open Source)  
**Main dApp:** [https://arbitrage-inc.exchange](https://arbitrage-inc.exchange)  
**Earn Portal:** [https://arbitrage-inc-earn.vercel.app](https://arbitrage-inc-earn.vercel.app)  
**DefiLlama:** [Protocol ID 7591](https://defillama.com/protocol/arbitrage-inc)  

---

## 1. Abstract

Arbitrage Inception is a permissionless, non-custodial decentralized finance (DeFi) execution terminal and yield routing ecosystem built natively on BNB Smart Chain. 

The protocol unifies:
1. Multi-pool DEX swap aggregation with split routing via KyberSwap Aggregator.
2. Non-custodial on-chain limit orders.
3. Cross-chain bridging between Solana, Ethereum, and EVM chains via Mayan Finance.
4. Direct single-transaction routing into BNB Chain blue-chip money markets (Venus Protocol) and liquid staking (Lista DAO).
5. A deterministic, mathematically verified Real Yield distribution engine rewarding active community participants.

---

## 2. Token Architecture & Tokenomics

The ecosystem utilizes a native utility and real-yield incentive token on BNB Smart Chain:

* **Token Name:** Arbitrage Inception
* **Ticker:** `$ARB INC`
* **Contract Address:** `0x5ee54869ecd5e752c31af095187326d4a4d50e1c`
* **Decimals:** 9
* **Total Supply:** 1,000,000,000 (Fixed Supply, No Mint Function)
* **Ownership:** Renounced (Immutable contract parameters, zero admin control)

### On-Chain Transfer Tax Mechanics (4% Tax)
Every buy and sell transaction on automated market maker (AMM) liquidity pools triggers an on-chain transfer tax of **4.0%**, distributed programmatically:
* **40.0% to Token Holders Leaderboard:** Allocated for proportional yield distribution to eligible token holders.
* **40.0% to Primary Development:** Infrastructure, RPC nodes, and continuous development (Dev 1).
* **10.0% to Operations & Security:** Continuous maintenance and contract tooling (Dev 3).
* **10.0% to Ecosystem Growth:** Integration development and multi-pool liquidity support (Dev 4).

### Net Real Yield Calculation (GAAP & DefiLlama Compliant)
To guarantee strict accounting standards and preserve solvency:
* **Gross Holder Tax Allocation:** 40.0% of the 4% tax (1.6% of total trade volume).
* **Safety Factor (`SAFE_FACTOR = 0.73`):** 73% of the allocated tax is net distributed to active holders.
* **Net Distributable Yield:** **29.2% of total tax** (1.168% of trade volume) is distributed as net real yield.
* **Execution Gas Reserve Buffer:** The remaining 27% (10.8% of total tax) is retained on-chain as a dedicated execution gas buffer for leaderboard distribution transactions.

---

## 3. Protocol Revenue Streams

Arbitrage Inception operates three self-sustaining, non-custodial revenue channels:

1. **Token Transfer Tax:** 4.0% automated on-chain fee across all AMM pairs (PancakeSwap v2/v3).
2. **DEX Swap Routing Fee:** **0.50% (50 PCM / bps)** fee applied via the KyberSwap aggregator client (`client="arbitrage-inception"`, `feeReceiver="0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7"`).
3. **Cross-Chain Bridge Fee:** **0.30% (30 bps)** fee via Mayan Finance cross-chain protocol (`referrerBps: 30`, `evmReferrerAddress="0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7"`).

---

## 4. Deterministic Financial Mathematics & Solvency Diagnostics

All yield allocation logic is governed by deterministic mathematical models implemented in `lib/financial-math.ts` and validated by automated unit test suites:

### Pro-Rata Yield Distribution
User rewards are calculated proportionally based on active holding points over total qualified points:
$$\text{User Reward} = \text{Distributable Yield} \times \frac{\text{User Holding Points}}{\text{Total Qualified Points}}$$

### Diamond vs Paper Hands Malus (5% Penalty)
To protect long-term community members and disincentivize dump-and-run volatility, an automated **5% malus penalty** is applied to accumulated leaderboard points whenever an address sells tokens:
$$\text{Adjusted Points} = \text{Current Points} \times 0.95$$

### Automated Solvency Health Check
The protocol incorporates real-time health-check telemetry monitoring pool reserves and treasury obligations:
* **SECURE:** Treasury reserve utilization $\le 80\%$.
* **WARNING:** Utilization between $80\%$ and $95\%$.
* **CRITICAL:** Utilization $> 95\%$ or reserve empty while obligations exist.

---

## 5. Non-Custodial Architecture & Regulatory Compliance

1. **Zero Custodial Risk:** Arbitrage Inception never takes custody of user assets. All swaps, bridges, deposits, and claims execute strictly peer-to-contract between the user's connected Web3 wallet and the underlying smart contracts.
2. **EU MiCA & D.Lgs. 129/2024 Non-Custodial Compliance:** In accordance with **Recital 22 of the EU Markets in Crypto-Assets (MiCA) Regulation (EU) 2023/1114** and Italian transposing legislation (**D.Lgs. 129/2024** transitioning from the legacy OAM VASP register to CONSOB / Banca d'Italia CASP oversight), the software operates exclusively as an open-source decentralized interface without intermediary custody, centralized brokerage, or discretionary fund management.
3. **Automated Security Analysis & Ecosystem Listings:**
   * **HashDit Automated Static Review:** Evaluated with **zero vulnerabilities detected** by HashDit Bot on the official BNB Chain Developer Tools List ([PR #98](https://github.com/bnb-chain/developer-tools-list/pull/98#issuecomment-5652788720)). As disclosed, automated scanning does not substitute an independent manual audit; see [docs/SECURITY.md](./SECURITY.md) and [AUDIT.md](../AUDIT.md).
   * **DefiLlama Production Merge:** Officially integrated into DefiLlama's production codebase under [PR #9453](https://github.com/DefiLlama/dimension-adapters/pull/9453).

---

## 6. Risk Disclosures

Interacting with decentralized finance protocols involves inherent technological risks:
* **Third-Party Smart Contract Risk:** While Arbitrage Inception uses audited third-party liquidity providers (KyberSwap, PancakeSwap, Venus Protocol, Lista DAO, Mayan Finance), vulnerabilities in third-party protocols remain outside our control.
* **Market Volatility & Slippage:** AMM swap executions are subject to price slippage during periods of extreme market volatility.
* **Network & RPC Congestion:** On-chain transaction confirmation times depend on BNB Smart Chain block utilization and RPC node responsiveness.
