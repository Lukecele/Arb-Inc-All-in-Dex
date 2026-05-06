import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
	title: "Terms of Service | Arbitrage Inception",
	description: "Terms of Service for Arbitrage Inception",
};

export default function TermsPage() {
	return (
		<>
			<Header />
			<main
				style={{
					paddingLeft: "260px",
					padding: "40px 20px",
					maxWidth: "900px",
					margin: "0 auto",
					color: "#fff",
					fontFamily: "Inter, sans-serif",
					lineHeight: "1.8",
				}}
			>
				<h1 style={{ color: "#a855f7", marginBottom: "1rem" }}>
					Terms of Service
				</h1>
				<p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
					Last updated: {new Date().getFullYear()}
				</p>

				<h2>1. Nature of the Service</h2>
				<p>
					Arbitrage Inception provides a non-custodial, open-source frontend
					interface to interact with third-party decentralized protocols
					(KyberSwap, PancakeSwap, Mayan Finance). This interface does not hold,
					manage, or custody user funds at any time.
				</p>

				<h2>2. Eligibility</h2>
				<p>
					By using this interface you confirm that: (a) you are not a resident
					or citizen of the European Economic Area (EEA) unless you acknowledge
					this service has not been authorized by any EU financial regulator;
					(b) you are not subject to sanctions by OFAC, EU, UN or any other
					body; (c) you are of legal age in your jurisdiction.
				</p>

				<h2>3. Risk Warning — PLEASE READ CAREFULLY</h2>
				<p
					style={{
						background: "rgba(239,68,68,0.1)",
						border: "1px solid rgba(239,68,68,0.3)",
						padding: "1rem",
						borderRadius: "8px",
					}}
				>
					<strong>
						Crypto-assets are highly speculative and volatile. You may lose ALL
						of your invested capital. Past yield rates (including the displayed
						APR) are historical calculations based on current protocol fees and
						do NOT guarantee future returns. APR figures can reach 0% and may
						change significantly at any time. This is NOT financial advice.
					</strong>
				</p>

				<h2>4. No Regulatory Authorization</h2>
				<p>
					Arbitrage Inception has not been authorized or regulated by any
					financial regulatory authority including but not limited to: Italy's
					Banca d'Italia, CONSOB, OAM, or any EU competent authority under MiCA
					(Regulation EU 2023/1114).
				</p>

				<h2>5. Smart Contract Risk</h2>
				<p>
					Smart contracts may contain bugs or vulnerabilities. You interact with
					third-party contracts entirely at your own risk. No liability is
					assumed for losses due to hacks, exploits, slippage, or network
					failures.
				</p>

				<h2>6. Open Source Software</h2>
				<p>
					This frontend is open-source software released under the MIT License.
					Anyone may deploy their own instance. The software is provided "as-is"
					with no warranty of any kind.
				</p>

				<h2>7. Governing Law</h2>
				<p>
					These terms shall be governed by the laws of the jurisdiction in which
					the software is deployed. Disputes shall be resolved through binding
					arbitration.
				</p>
			</main>
			<Footer />
		</>
	);
}
