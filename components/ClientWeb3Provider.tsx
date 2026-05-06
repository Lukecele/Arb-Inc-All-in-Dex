"use client";

import injectedModule from "@web3-onboard/injected-wallets";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import type React from "react";

// 1. Initialize supported wallets
const injected = injectedModule();

const walletConnect = walletConnectModule({
	// Using the projectId recovered from your previous setup
	projectId: "b03ed6d8451c1e05022897815db0ad0b",
	dappUrl: "https://arbitrage-inc.exchange",
});

const wallets = [injected, walletConnect];

// 2. Configure blockchain (BSC)
const chains = [
	{
		id: "0x38", // 56 in hex
		token: "BNB",
		label: "BNB Smart Chain",
		rpcUrl: "https://bsc.publicnode.com",
	},
];

// 3. App metadata for the connection modal
const appMetadata = {
	name: "Arbitrage Inception",
	icon: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#a855f7"/></svg>',
	description: "The Ultimate DEX Aggregator on BSC",
	recommendedInjectedWallets: [
		{ name: "MetaMask", url: "https://metamask.io" },
		{ name: "Trust Wallet", url: "https://trustwallet.com" },
	],
};

// 4. Global initialization
const web3Onboard = init({
	wallets,
	chains,
	appMetadata,
	connect: {
		autoConnectLastWallet: true,
	},
	theme: "dark",
});

export default function ClientWeb3Provider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Web3OnboardProvider web3Onboard={web3Onboard}>
			{children}
		</Web3OnboardProvider>
	);
}
