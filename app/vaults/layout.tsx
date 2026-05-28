import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaults - Arbitrage Inception',
};

export default function VaultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
