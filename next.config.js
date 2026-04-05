/** @type {import('next').Next.js} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Forza l'output in formato moderno (ESM) per eliminare polyfill inutili
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['react-icons'],
  }
}

module.exports = nextConfig
