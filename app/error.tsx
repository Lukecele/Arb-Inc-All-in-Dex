"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #030014;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Button = styled.button`
  background: #a855f7;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
`;

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const [isHydrationError, setIsHydrationError] = useState(false);

	useEffect(() => {
		const msg = (error.message || "").toLowerCase();

		// Se l'errore è causato dall'idratazione (Web3, Metamask, LocalStorage),
		// lo filtriamo per non far apparire la schermata all'utente.
		if (
			msg.includes("hydration") ||
			msg.includes("mismatch") ||
			msg.includes("text content did not match")
		) {
			setIsHydrationError(true);
			reset(); // Forza l'allineamento automatico silente
		} else {
			console.error(error);
		}
	}, [error, reset]);

	// Se è un fantasma transitorio, mostra un micro-sfondo nero senza far lampeggiare il testo
	if (isHydrationError) {
		return (
			<div style={{ background: "#030014", height: "100vh", width: "100vw" }} />
		);
	}

	// Altrimenti (se è un errore vero del codice), mostra la UI cyberpunk
	return (
		<ErrorWrapper>
			<h2 style={{ fontSize: "2rem" }}>Stabilizing Protocol...</h2>
			<p style={{ color: "#94a3b8" }}>
				A minor ghost in the shell was detected.
			</p>
			<Button onClick={() => reset()}>Refresh Navigation</Button>
		</ErrorWrapper>
	);
}
