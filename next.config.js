/** @type {import('next').Next.js} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  }
}

module.exports = nextConfig
