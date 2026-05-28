import dynamic from 'next/dynamic';

const VaultsClient = dynamic(() => import('./VaultsClient'), { ssr: false });

export default function VaultsPage() {
  return <VaultsClient />;
}
