'use client';

export default function BridgePage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#09090b', padding: '24px 16px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: 24 }}>Bridge</h1>
        <iframe
          src="https://jumper.exchange/?integrator=081a94df-4e42-4367-90df-64c86a9a0419.3cc7b9d9-c559-4a38-98f7-b7a4cce0cd3c"
          style={{
            width: '100%',
            height: 600,
            border: 'none',
            borderRadius: 16,
            background: '#18181b'
          }}
          title="Bridge"
        />
      </div>
    </div>
  );
}
