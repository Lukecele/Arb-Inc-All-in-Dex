import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientWeb3Provider from "../components/ClientWeb3Provider";
import CookieConsent from "../components/CookieConsent";
import ErrorBoundary from "../components/ErrorBoundary";
import StyledComponentsRegistry from "../lib/registry";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

const DAPP_URL =
	process.env.NEXT_PUBLIC_DAPP_URL || "https://arbitrage-inc.exchange";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: "#8B5CF6",
	colorScheme: "dark",
};

export const metadata: Metadata = {
	metadataBase: new URL(DAPP_URL),
	title: "Arbitrage Inception | DEX Aggregator",
	description: "Swap and earn BNB rewards on BNB Chain.",
	other: { coinzilla: "40513d259822a129e42a968860c68483" },
	icons: { icon: "/logo.jpg", apple: "/logo.jpg", shortcut: "/favicon.ico" },
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://rsms.me" />
				<link rel="preconnect" href="https://www.googletagmanager.com" />
				<Script
					id="gtm-script"
					strategy="lazyOnload"
					src="https://www.googletagmanager.com/gtag/js?id=G-H6XYJKW0CX"
				/>
				<Script
					id="gtm-config"
					strategy="lazyOnload"
				>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-H6XYJKW0CX");`}</Script>
			</head>
			<body
				className={inter.className}
				style={{ margin: 0, padding: 0, backgroundColor: "#050508" }}
				suppressHydrationWarning
			>
				<a
					href="#main-content"
					style={{
						position: "absolute",
						left: "-10000px",
						top: "auto",
						width: "1px",
						height: "1px",
						overflow: "hidden",
					}}
				>
					Skip to content
				</a>
				<GoogleAnalytics gaId="G-H6XYJKW0CX" />

				<StyledComponentsRegistry>
					<ClientWeb3Provider>
						<ErrorBoundary>{children}</ErrorBoundary>
					</ClientWeb3Provider>
				</StyledComponentsRegistry>
				<CookieConsent />
				<Analytics />
				<SpeedInsights />
				<script
					dangerouslySetInnerHTML={{
						__html: ` 
          const obs = new MutationObserver((ms) => {
          ms.forEach((m) => { 
            m.addedNodes.forEach((n) => { 
              if (n.nodeType === 1 && (n.classList?.contains("ks-modal") || n.tagName === "DIALOG" || n.innerHTML.includes("0x"))) { 
                n.setAttribute("translate", "no"); 
              } 
            }); 
          }); 
        }); 
        obs.observe(document.body, { childList: true, subtree: true }); 
      `,
					}}
				/>
			</body>
		</html>
	);
}
