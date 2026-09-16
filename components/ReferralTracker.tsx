"use client";

import { useEffect, useRef } from "react";
import { useWallets } from "@web3-onboard/react";

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const REFERRER_STORAGE_KEY = "arb_inc_referrer";

export default function ReferralTracker() {
	const connectedWallets = useWallets();
	const userAddress = connectedWallets?.[0]?.accounts?.[0]?.address?.toLowerCase();
	const syncAttemptedRef = useRef<string | null>(null);

	// 1. Capture referral from URL query string across ANY page (Home, Swap, Rewards, etc.)
	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			const params = new URLSearchParams(window.location.search);
			const refCandidate = params.get("ref") || params.get("referrer");

			if (refCandidate && ETH_ADDRESS_REGEX.test(refCandidate)) {
				const lowerRef = refCandidate.toLowerCase();
				const existingRef = localStorage.getItem(REFERRER_STORAGE_KEY);
				// First-touch attribution: store if none exists or invalid
				if (!existingRef || !ETH_ADDRESS_REGEX.test(existingRef)) {
					localStorage.setItem(REFERRER_STORAGE_KEY, lowerRef);
				}
			}
		} catch {
			// Gracefully ignore storage exceptions (e.g. strict browser security)
		}
	}, []);

	// 2. Auto-bind sticky referrer on the backend when user connects wallet
	useEffect(() => {
		if (!userAddress || typeof window === "undefined") return;

		try {
			const storedReferrer = localStorage.getItem(REFERRER_STORAGE_KEY)?.toLowerCase();
			if (!storedReferrer || !ETH_ADDRESS_REGEX.test(storedReferrer)) return;
			if (storedReferrer === userAddress) return; // Prevent self-referral

			const sessionSyncKey = `arb_ref_synced_${userAddress}_${storedReferrer}`;
			if (sessionStorage.getItem(sessionSyncKey) || syncAttemptedRef.current === `${userAddress}_${storedReferrer}`) {
				return;
			}

			syncAttemptedRef.current = `${userAddress}_${storedReferrer}`;

			// Register/bind the wallet with parent in the background
			fetch(`/api/rewards/stats?wallet=${userAddress}&ref=${storedReferrer}`)
				.then((res) => {
					if (res.ok) {
						sessionStorage.setItem(sessionSyncKey, "1");
					}
				})
				.catch(() => {});
		} catch {
			// Gracefully ignore network/storage exceptions
		}
	}, [userAddress]);

	return null;
}
