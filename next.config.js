/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kyberswap/liquidity-widgets', '@lifi/widget', '@lifi/wallet-management'],
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@bigmi/react': false,
      '@mysten/dapp-kit': false,
      '@mysten/sui': false,
      '@solana/wallet-adapter-react': false,
      '@solana/wallet-adapter-base': false,
      'svelte/store': false,
      'svelte-i18n': false,
    };
    return config;
  },
}
 
module.exports = nextConfig
