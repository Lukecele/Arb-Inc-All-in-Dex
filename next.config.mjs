/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["ethers"],
  experimental: { optimizePackageImports: ["ethers"] },
  transpilePackages: ["@kyberswap/liquidity-widgets"],
  compiler: { styledComponents: true },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.dexscreener.com" }],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https://*.kyberswap.com https://*.walletconnect.com https://*.web3modal.org; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.kyberswap.com https://*.walletconnect.com https://*.web3modal.org; connect-src 'self' https://*.kyberswap.com https://*.walletconnect.com https://bsc-dataseed.binance.org https://api.dexscreener.com; frame-src 'self' https://*.kyberswap.com https://*.walletconnect.com https://*.web3modal.org; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https: https://rsms.me;"
          },
        ],
      },
    ];
  },
};
export default nextConfig;
