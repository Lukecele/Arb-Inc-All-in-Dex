import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | How Arbitrage Inception Works',
  description: 'Learn how Arbitrage Inception generates passive BNB rewards through automated arbitrage trading on BSC. Understand our tokenomics, distribution model, and how to earn rewards.',
  keywords: ['Arbitrage Inception', 'How it works', 'BNB Rewards', 'Arbitrage Trading', 'DeFi', 'BSC', 'Tokenomics', 'Passive Income'],
  alternates: {
    canonical: 'https://arbitrage-inc.exchange/about',
  },
  openGraph: {
    title: 'About | How Arbitrage Inception Works',
    description: 'Learn how Arbitrage Inception generates passive BNB rewards through automated arbitrage trading on BSC.',
    type: 'website',
    url: 'https://arbitrage-inc.exchange/about',
    siteName: 'Arbitrage Inception',
  },
}

// FAQ data for JSON-LD schema
const faqData = [
  {
    question: 'What is the minimum holding requirement for rewards?',
    answer: 'You need to hold a minimum of 2,000,000 ARB Inc tokens to be eligible for BNB rewards distributions.'
  },
  {
    question: 'How often are rewards distributed?',
    answer: 'Rewards are distributed every 12 hours automatically — 40% to holders and dev, 20% for buyback & burn.'
  },
  {
    question: 'What is the token tax?',
    answer: 'There is a 4% tax on both buy and sell transactions that funds the reward distribution and protocol operations.'
  },
  {
    question: 'How does the burn mechanism work?',
    answer: '20% of every distribution is burned permanently, plus 20% buyback & burn every 12 hours — creating constant deflationary pressure.'
  },
  {
    question: 'Which blockchain does this run on?',
    answer: 'Arbitrage Inception operates on BNB Smart Chain (BSC), providing fast transactions and low fees for all operations.'
  }
]

// Breadcrumb schema
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arbitrage-inc.exchange/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://arbitrage-inc.exchange/about' },
  ],
}

// FAQPage schema for rich snippets
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
