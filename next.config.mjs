/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["ethers"],
  experimental: { optimizePackageImports: ["ethers"] },
  transpilePackages: ["@kyberswap/liquidity-widgets"],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.dexscreener.com" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org https://*.kyberswap.com; connect-src 'self' https://bsc-dataseed.binance.org https://api.dexscreener.com https://*.kyberswap.com https://rpc.ankr.com https://*.sentry.io https://bsc.publicnode.com wss://relay.walletconnect.com; frame-src 'self' https://*.kyberswap.com https://vercel.live https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https: https://rsms.me;",
          },
        ],
      },
      {
        source: "/:path*.(js|css|woff|woff2|png|jpg|gif|svg|webp|avif|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  poweredByHeader: false,
};

export default nextConfig;
