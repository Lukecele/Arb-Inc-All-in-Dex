/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kyberswap/liquidity-widgets'],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.dexscreener.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // --- NUOVI HEADER DI SICUREZZA ---
          { key: 'X-Frame-Options', value: 'DENY' }, // Previene il clickjacking
          { 
            key: 'Content-Security-Policy', 
            // CSP Ottimizzata per Web3: Consente WSS (WalletConnect) e API esterne necessarie ai DEX
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; connect-src 'self' https: wss:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:; frame-src 'self' https:;" 
          }
        ],
      },
      {
        source: '/:path*.(js|css|woff|woff2|png|jpg|gif|svg|webp|avif|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  poweredByHeader: false,
}

export default nextConfig
