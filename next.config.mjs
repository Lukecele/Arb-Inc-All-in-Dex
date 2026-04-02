/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kyberswap/liquidity-widgets'],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dexscreener.com',
      },
    ],
  },
}

export default nextConfig
