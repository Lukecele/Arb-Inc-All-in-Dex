import HomePageClient from './HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbitrage Inception | DEX Aggregator & Liquidity Hub',
  description: 'Swap, zap, and provide liquidity on BSC with the best rates. Features custom ARB Inc swaps, liquidity pools, and cross-DEX aggregation powered by PancakeSwap & KyberSwap.',
  keywords: ['DeFi', 'BSC', 'Cryptocurrency', 'Swap', 'Liquidity', 'PancakeSwap', 'Arbitrage', 'ARB Inc', 'DEX Aggregator'],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Arbitrage Inception?', acceptedAnswer: { '@type': 'Answer', text: 'Arbitrage Inception is an all-in-one DeFi platform on BNB Smart Chain. It combines swap, zap, cross-chain bridge, and limit orders with a deflationary token (ARB Inc) that automatically distributes BNB rewards to holders every 12 hours.' } },
    { '@type': 'Question', name: 'What is the ARB Inc token?', acceptedAnswer: { '@type': 'Answer', text: 'ARB Inc is a deflationary BEP-20 token on BNB Smart Chain with a total supply of 1 billion tokens. It features a 4% buy/sell tax, automated buyback & burn, and BNB reward distributions powered by DEX revenue.' } },
    { '@type': 'Question', name: 'How do I earn BNB rewards?', acceptedAnswer: { '@type': 'Answer', text: 'Hold at least 2,000,000 ARB Inc tokens in your wallet. Every 12 hours, 40% of the collected BNB from DEX revenue is automatically distributed to qualifying holders. No staking or claiming needed.' } },
    { '@type': 'Question', name: 'What is the minimum holding to receive rewards?', acceptedAnswer: { '@type': 'Answer', text: 'You need a minimum of 2,000,000 ARB Inc tokens to be eligible for BNB reward distributions.' } },
    { '@type': 'Question', name: 'How often are rewards distributed?', acceptedAnswer: { '@type': 'Answer', text: 'BNB rewards are distributed every 12 hours automatically to all eligible holders.' } },
    { '@type': 'Question', name: 'What chains does Arbitrage Inception support?', acceptedAnswer: { '@type': 'Answer', text: 'The ARB Inc token and native DEX functions (swap, zap, limit orders) run on BNB Smart Chain (BSC). The bridge feature powered by Mayan Finance supports cross-chain swaps to and from multiple EVM and non-EVM chains.' } },
    { '@type': 'Question', name: 'How do I buy ARB Inc tokens?', acceptedAnswer: { '@type': 'Answer', text: 'You can buy ARB Inc directly on the Swap page using BNB. The swap is powered by PancakeSwap V2. Connect your wallet (MetaMask, Coinbase, WalletConnect) and swap BNB for ARB Inc in seconds.' } },
    { '@type': 'Question', name: 'What are the trading fees?', acceptedAnswer: { '@type': 'Answer', text: 'ARB Inc has a 4% buy/sell tax that funds the reward distribution and buyback & burn mechanism. Additionally, a 0.1% dev fee applies to swaps on the platform.' } },
    { '@type': 'Question', name: 'What is the deflationary mechanism?', acceptedAnswer: { '@type': 'Answer', text: '20% of every BNB distribution is used for buyback & burn, permanently removing ARB Inc from circulation. This continuous reduction in supply creates deflationary pressure over time.' } },
    { '@type': 'Question', name: 'What is the Zap feature?', acceptedAnswer: { '@type': 'Answer', text: 'Zap lets you add or remove liquidity from BSC pools with a single transaction. Instead of manually splitting tokens and providing both sides of a pair, Zap handles everything automatically using PancakeSwap and KyberSwap pools.' } },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient />
    </>
  )
}
