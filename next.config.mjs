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
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org https://mayan.finance https://*.mayan.finance https://*.kyberswap.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://bsc-dataseed.binance.org https://api.dexscreener.com https://*.mayan.finance https://*.kyberswap.com https://rpc.ankr.com https://*.vercel-storage.com https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org wss://*.walletconnect.com wss://*.walletconnect.org wss://relay.walletconnect.com wss://relay.walletconnect.org https://*.sentry.io https://bsc.publicnode.com https://www.google-analytics.com; frame-src 'self' https://mayan.finance https://*.mayan.finance https://*.kyberswap.com https://vercel.live https://*.walletconnect.com https://*.walletconnect.org https://*.web3modal.org; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https: https://rsms.me https://fonts.gstatic.com;",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
		];
	},
	poweredByHeader: false,
};

export default nextConfig;
