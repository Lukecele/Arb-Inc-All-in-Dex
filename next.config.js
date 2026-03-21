/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kyberswap/liquidity-widgets'],
  compiler: {
    styledComponents: true,
  },
}
 
module.exports = nextConfig