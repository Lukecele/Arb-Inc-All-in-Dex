import type { Metadata } from 'next';
import AboutClient from './AboutClient';

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
};

export default function AboutPage() {
  return <AboutClient />;
}
