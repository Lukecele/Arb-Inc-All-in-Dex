/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'ethers'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://vercel.live https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org https://mayan.finance https://*.mayan.finance https://*.kyberswap.com; connect-src 'self' https://bsc-dataseed.binance.org https://api.dexscreener.com https://*.mayan.finance https://*.kyberswap.com https://rpc.ankr.com https://*.vercel-storage.com https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org wss://*.walletconnect.com wss://*.walletconnect.org wss://relay.walletconnect.com wss://relay.walletconnect.org https://*.sentry.io https://bsc.publicnode.com https://*.google-analytics.com https://region1.google-analytics.com; frame-src 'self' https://mayan.finance https://*.mayan.finance https://*.kyberswap.com https://vercel.live https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data: https: https://rsms.me;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
