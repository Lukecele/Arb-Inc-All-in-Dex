/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  experimental: { optimizePackageImports: ['react-icons'] },
  async redirects() {
    return [
      {
        source: '/swap',
        destination: '/swap-all',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
