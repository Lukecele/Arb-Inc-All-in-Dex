import dynamic from 'next/dynamic';

const ZapPageClient = dynamic(() => import('./ZapPageClient'), { 
  ssr: false,
  loading: () => <div style={{padding: '100px', textAlign: 'center', color: '#94a3b8'}}>Loading Zap Widget...</div>
});

export default function ZapPage() {
  return <ZapPageClient />;
}
