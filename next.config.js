/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://vercel.live https://mayan.finance https://*.mayan.finance https://*.kyberswap.com; connect-src 'self' https://bsc-dataseed.binance.org https://api.dexscreener.com https://*.mayan.finance https://*.kyberswap.com https://rpc.ankr.com https://*.vercel-storage.com https://*.walletconnect.com https://*.sentry.io https://bsc.publicnode.com; frame-src 'self' https://mayan.finance https://*.mayan.finance https://*.kyberswap.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
