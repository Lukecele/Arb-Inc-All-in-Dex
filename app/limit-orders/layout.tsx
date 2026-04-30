import { Metadata } from 'next';
import LayoutClient from './LayoutClient';

export const metadata: Metadata = {
  title: 'Limit Orders | ARB Inc',
  description: 'Place limit orders on BNB Smart Chain and trade automatically when the market hits your target price. Powered by KyberSwap aggregator.',
  keywords: ['Limit Order', 'BSC', 'DeFi', 'Crypto Trading', 'KyberSwap', 'ARB Inc', 'DEX Aggregator', 'automated trading'],
};

export default function LimitOrdersLayout({ children }: { children: React.ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
