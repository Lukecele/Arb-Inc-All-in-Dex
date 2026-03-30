'use client';

import { useEffect, useState } from 'react';

export default function BridgePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090b', padding: '24px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', marginBottom: 24 }}>Bridge</h1>
        
        {loading ? (
          <div style={{ color: '#71717a', padding: 100 }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a 
              href="https://jumper.exchange/?integrator=081a94df-4e42-4367-90df-64c86a9a0419.3cc7b9d9-c559-4a38-98f7-b7a4cce0cd3c"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '20px 32px',
                background: '#20B8CD',
                color: '#fff',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Open Bridge (Jumper Exchange) ↗
            </a>
            <p style={{ color: '#71717a', fontSize: 14 }}>
              Click above to open bridge in new tab.<br/>
              Powered by Jumper with 0.1% dev fee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
