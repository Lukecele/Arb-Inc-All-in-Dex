/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Questo evita i reflow causati dagli stili dinamici!
  },
}

module.exports = nextConfig
