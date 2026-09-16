# Arbitrage Inc: All-in-Dex Suite

[![CI](https://github.com/Lukecele/Arb-Inc-All-in-Dex/actions/workflows/ci.yml/badge.svg)](https://github.com/Lukecele/Arb-Inc-All-in-Dex/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Network: BSC](https://img.shields.io/badge/Network-BNB_Smart_Chain-F0B90B?logo=binance&logoColor=white)](https://bscscan.com)
[![Next.js](https://img.shields.io/badge/Next.js-15_App_Router-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![DeFiLlama](https://img.shields.io/badge/DeFiLlama-Listed-brightgreen)](https://defillama.com/protocol/arbitrage-inc)
[![Awesome-Web3](https://awesome.re/mentioned-badge.svg)](https://github.com/ahmet/awesome-web3/blob/main/README.md#L409)
[![BNB Chain Audit](https://img.shields.io/badge/BNB_Chain_Tools-Hashdit_Passed-F0B90B?logo=binance)](https://github.com/bnb-chain/developer-tools-list/pull/98#issuecomment-5652788720)
[![X / Twitter](https://img.shields.io/badge/X-@Arbitrageincept-black?logo=x)](https://x.com/Arbitrageincept)
[![PWA](https://img.shields.io/badge/PWA-Ready-9B51E0?logo=pwa&logoColor=white)](#)
[![GitHub stars](https://img.shields.io/github/stars/Lukecele/Arb-Inc-All-in-Dex?style=social)](https://github.com/Lukecele/Arb-Inc-All-in-Dex)

An open-source, non-custodial decentralized exchange aggregator, cross-chain bridge, limit order client, and real-yield telemetry engine on **BNB Smart Chain (BSC)**. Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **PWA (Progressive Web App)** capabilities.

**Live Application:** [https://arbitrage-inc.exchange](https://arbitrage-inc.exchange)  
**DeFiLlama Protocol:** [https://defillama.com/protocol/arbitrage-inc](https://defillama.com/protocol/arbitrage-inc)  
**Awesome-Web3 Directory:** [Open Source Projects (Line 409)](https://github.com/ahmet/awesome-web3/blob/main/README.md#L409) ([Merged PR #796](https://github.com/ahmet/awesome-web3/pull/796))  
**BNB Chain Security Audit:** [Hashdit Bot Cleared (PR #98)](https://github.com/bnb-chain/developer-tools-list/pull/98#issuecomment-5652788720)  
**Smart Contract:** [0x5ee54869ecd5e752c31af095187326d4a4d50e1c (BscScan)](https://bscscan.com/address/0x5ee54869ecd5e752c31af095187326d4a4d50e1c#readContract)  
**Audit & Transparency:** [AUDIT.md](./AUDIT.md) | **Community:** [Telegram](https://t.me/ArbitrageInception) · [X / Twitter](https://x.com/Arbitrageincept) | **License:** MIT

---

## 🏛️ Architecture & System Topology

```mermaid
flowchart TD
    User(["User Wallet / Client (PWA)"]) --> Router{"Client App Router (Next.js 15)"}
    
    subgraph Frontend["Frontend and User Experience"]
        Router --> SwapUI["DEX Aggregator UI (/swap)"]
        Router --> BridgeUI["Cross-Chain Bridge UI (/bridge)"]
        Router --> LimitUI["Decentralized Limit Orders (/limit-orders)"]
        Router --> VaultsUI["Yield Vaults and Pools (/vaults)"]
        Router --> DashUI["Yield and Health Dashboard (/)"]
    end
    
    subgraph Web3Core["Web3 Multi-Chain Connectors"]
        SwapUI --> Connectors["Wagmi / Viem / Ethers / Web3-Onboard<br/>(MetaMask, Coinbase, WalletConnect, Solana, Sui)"]
        BridgeUI --> Connectors
        LimitUI --> Connectors
    end
    
    subgraph ExecutionEngine["Liquidity and Routing Protocols"]
        Connectors --> Kyber["KyberSwap Aggregator and Split Routing<br/>(PancakeSwap, Uniswap V3, Biswap)"]
        Connectors --> Mayan["Mayan Finance Cross-Chain Bridge<br/>(Solana, EVM and Wormhole Swift Protocol)"]
        Connectors --> LimitOrders["On-Chain Non-Custodial Limit Engine"]
        Connectors --> Beefy["Automated Compounding Vaults"]
    end
    
    subgraph DaemonSecurity["Background Telemetry and On-Chain Security Daemons"]
        Watcher["Security and Solvency Watcher Daemon<br/>(scripts/watcher.js - SAFE_FACTOR 0.73)"]
        HealthCheck["Real-Time Health Auditor<br/>(scripts/health_check.js - Max 80% SECURE)"]
        YieldDistributor["Automated 12-Hour Yield Engine<br/>(100% BNB Distribution to Holders)"]
        DefiLlama["DefiLlama Verified Fee and TVL Adapters<br/>(fees/arbitrage-inc.ts)"]
        Watcher -.-> DashUI
        HealthCheck -.-> DashUI
        YieldDistributor --> Holders["ARB Inc Token Holders"]
    end
```

---

## 🚀 Key Platform Capabilities

### 1. Multi-DEX Aggregator & Split-Order Routing (`/swap`, `/swap-all`)
- Routes swaps across multiple BSC decentralized exchanges (including PancakeSwap V2/V3, Uniswap V3, Biswap, and KyberSwap) to achieve optimal price execution, minimal price impact, and slippage protection.
- Smart order splitting algorithms reduce gas overhead and prevent front-running / MEV sandwich attacks.

### 2. Cross-Chain Bridge Integration (`/bridge`)
- Powered by **Mayan Finance** and the **Mayan Swift Protocol** (via Wormhole), allowing users to execute fast, high-liquidity cross-chain swaps between Solana, Ethereum, Arbitrum, Polygon, Avalanche, Optimism, Base, and BNB Smart Chain at optimal rates.

### 3. Non-Custodial Limit Orders (`/limit-orders`)
- Decentralized conditional trade execution on-chain without requiring deposits into centralized orderbooks or third-party custody.
- Direct wallet-to-contract signature authorizations.

### 4. Automated Yield Vaults & Staking Pools (`/vaults`)
- Curated integration with decentralized liquidity pools and auto-compounding strategies, maximizing APY/APR for liquidity providers on BSC.

### 5. 100% Real-Yield Community Distribution Engine
- **Zero Team Allocation, Zero Token Burns:** 100% of accumulated protocol fees and DEX revenue are converted into BNB and directed to the distribution contract.
- **Automated 12-Hour Payouts:** Every 12 hours, 100% of accumulated BNB is distributed programmatically to ARB Inc token holders relative to their wallet balances.

### 6. Real-Time On-Chain Security & Health Watcher Daemons
- **Solvency & Contract Watcher (`scripts/watcher.js`):** Continuously monitors RPC nodes, liquidity pool ratios, and reserve solvency using an algorithmic risk factor (`SAFE_FACTOR = 0.73`).
- **Live Health Status (`scripts/health_check.js`):** Verifies wallet balances, gas reserve health, and system safety thresholds (`<= 80% SECURE`), streaming real-time status directly to the frontend header.

### 7. Verified DeFiLlama Protocol & Fee Telemetry
- Officially verified and tracked on **DeFiLlama** ([arbitrage-inc](https://defillama.com/protocol/arbitrage-inc)) for DEX aggregator volume and protocol revenue.
- Open-source dimension adapter ([DefiLlama/dimension-adapters #6275](https://github.com/DefiLlama/dimension-adapters/pull/6275)) providing transparent, public on-chain fee accounting.

### 8. Mobile-First Progressive Web App (PWA)
- **Instant 1-Tap Installation:** Configured with a full PWA manifest (`public/manifest.json`) in `"display": "standalone"` mode, eliminating browser address bars for a clean mobile app experience on iOS and Android.
- **Cross-Platform OS Integration:** Dedicated metadata and assets configured for **iOS Safari** (`apple-touch-icon`, customized `Viewport` and `#8B5CF6` theme colors), **Android Chrome** (192x192 & 512x512 maskable icons), and **Windows** (`browserconfig.xml`).
- **Decentralized Mobile Distribution:** Bypasses centralized mobile app store censorship, arbitrary delistings, and 30% fees, giving users direct non-custodial trading on any mobile browser.
- **High-Contrast Dark Interface:** Styled with Tailwind CSS and Framer Motion for responsive mobile navigation, high contrast readability, and fluid touch interactions.

### 9. Multi-Chain Wallet Connectors
- Universal Web3 authentication supporting MetaMask, Coinbase Wallet, WalletConnect v2, Phantom, OKX, and emerging multi-chain ecosystems (Solana Wallet Adapter, Sui dApp Kit).

### 10. Automated End-to-End Testing Suite
- Playwright automated smoke test suite (`scripts/maintenance/test-pages.mjs` & `playwright.config.ts`) testing critical user journeys, page loading, RPC responsiveness, and UI state integrity.

---

## 🔒 Smart Contract Verification & Technical Disclosures

The ARB Inc token contract ownership has been **permanently renounced** to the zero address (`0x000...dEaD`).

- **Contract Address:** `0x5ee54869ecd5e752c31af095187326d4a4d50e1c`
- **Network:** BNB Smart Chain (BSC)
- **Explorer Verification:** [BscScan Read Contract](https://bscscan.com/address/0x5ee54869ecd5e752c31af095187326d4a4d50e1c#readContract)
- **Immutable Guarantee:** `owner()` returns `0x000000000000000000000000000000000000dEaD`. No entity can mint new tokens, modify tax parameters, pause trading, or alter contract rules.
- **Full Transparency & Disclosures:** See [AUDIT.md](./AUDIT.md) for immutable contract parameters and architecture disclosures.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & Animation** | Tailwind CSS, Framer Motion, Styled-Components |
| **Web3 & Blockchain** | Viem 2, Wagmi 3, Ethers 5, Web3-Onboard, KyberSwap Widgets, Mayan Finance SDK |
| **Infrastructure** | Node.js 22 LTS, Upstash Redis, Vercel Edge Network |
| **Testing & CI** | Playwright E2E Test Runner, Biome Linter |
| **Monitoring** | Custom RPC Watcher Daemons, DeFiLlama Dimension Adapters |

---

## 💻 Getting Started

### Prerequisites
- Node.js 20+
- npm, pnpm, or yarn

### Local Setup
```bash
# Clone repository
git clone https://github.com/Lukecele/Arb-Inc-All-in-Dex.git
cd Arb-Inc-All-in-Dex

# Install dependencies
npm install

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Automated Smoke Tests
```bash
# Run Playwright automated smoke tests across all routes
node scripts/maintenance/test-pages.mjs
```

---

## 🌐 Ecosystem Integrations & Directory Listings

- **[DefiLlama Protocol Analytics](https://defillama.com/protocol/arbitrage-inc):** Live protocol metrics, DEX volume, and platform revenue tracking (Adapter: [PR #6275](https://github.com/DefiLlama/dimension-adapters/pull/6275)).
- **[Awesome-Web3 Directory](https://github.com/ahmet/awesome-web3):** Officially reviewed and indexed under [Open Source Projects (Line 409)](https://github.com/ahmet/awesome-web3/blob/main/README.md#L409) via [Merged PR #796](https://github.com/ahmet/awesome-web3/pull/796).
- **[BNB Chain Developer Tooling](https://github.com/bnb-chain/developer-tools-list/pull/98):** Ecosystem catalog submission, [security audit passed via Hashdit Bot (Zero issues detected)](https://github.com/bnb-chain/developer-tools-list/pull/98#issuecomment-5652788720).

---

## ⭐ Support the Project

If you find this open-source suite or any part of the codebase useful for your research, trading bots, or DeFi development, please consider dropping a **Star** on GitHub. It directly supports continuous open-source maintenance, community visibility, and decentralized ecosystem indexing!

[![GitHub stars](https://img.shields.io/github/stars/Lukecele/Arb-Inc-All-in-Dex?style=social)](https://github.com/Lukecele/Arb-Inc-All-in-Dex)

---

## ⚖️ Open-Source Architecture & Regulatory Notice (MiCA Recital 22)

This repository contains free, open-source client software (MIT License) developed and maintained by independent open-source software engineers and researchers.

- **Non-Custodial Client:** This software functions strictly as a graphical user interface (GUI) and computational reference implementation for interacting with autonomous public smart contracts on BNB Smart Chain. It does not constitute a centralized exchange, broker, investment service, or custodial institution.
- **MiCA Exemption (Recital 22):** Under **Regulation (EU) 2023/1114 (Markets in Crypto-Assets - MiCA)**, fully decentralized peer-to-peer crypto-asset services provided without intermediaries fall outside the scope of crypto-asset service regulations.
- **Immutable Smart Contracts:** The token and distribution logic operate on immutable, renounced smart contracts (`0x000...dEaD`) with zero administrative backdoors, minting capabilities, or developer custody.
- **Self-Custodial Operation:** All transactions are executed peer-to-peer directly between the user's non-custodial wallet and autonomous decentralized liquidity pools. Contributors do not hold, manage, or access user funds.

For detailed documentation, see:
- [Privacy Policy](https://arbitrage-inc.exchange/privacy-policy)
- [Terms of Service](https://arbitrage-inc.exchange/terms-of-service)
- [Italian Legal Disclaimer](./DISCLAIMER_IT.md)

---

## 📜 License

Released under the [MIT License](./LICENSE). All community contributions are welcome.

