"use client";

import { type ChainId, PoolType } from "@kyberswap/liquidity-widgets";
import { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "@kyberswap/liquidity-widgets/dist/style.css";
import { LiquidityWidget } from "@kyberswap/liquidity-widgets";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import { FaExclamationTriangle } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import type { PoolInfo } from "../pools";
import { pcsV3Pools, pools } from "../pools";
import DemoModeOverlay from "./DemoModeOverlay";
import PoolSelector from "./PoolSelector";
import ZapOutClient from "./ZapOutClient";

const BSC_CHAIN_ID = 56;
const FEE_RECEIVER = "0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7";
const FEE_PCM = 10;

const mapStringToPoolType = (poolTypeString: string): PoolType => {
	switch (poolTypeString) {
		case "DEX_PANCAKESWAPV2":
			return PoolType.DEX_PANCAKESWAPV2;
		case "DEX_PANCAKESWAPV3":
			return PoolType.DEX_PANCAKESWAPV3;
		case "DEX_SUSHISWAPV2":
			return PoolType.DEX_SUSHISWAPV2;
		case "DEX_SUSHISWAPV3":
			return PoolType.DEX_SUSHISWAPV3;
		default:
			return PoolType.DEX_PANCAKESWAPV2;
	}
};

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #030014; color: #FFFFFF; }
`;
const Container = styled.div`
  min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; background: #030014;
  @media (max-width: 1024px) { padding: 80px 15px 20px; }
`;
const ConnectButton = styled.button`
  padding: 10px 20px; font-size: 14px; cursor: pointer; background: #a855f7; color: #fff; border: none; border-radius: 12px; font-weight: 600; transition: all 0.2s;
  &:hover { transform: translateY(-2px); }
`;
const DisconnectButton = styled.button`
  padding: 6px 12px; font-size: 12px; cursor: pointer; background: #ef4444; color: white; border: none; border-radius: 8px;
`;
const MainContent = styled.main`
  flex: 1; width: 100%; max-width: 1200px; display: flex; flex-direction: column; gap: 20px;
`;
const WidgetWrapper = styled.div`
  width: 100%; background: rgba(255, 255, 255, 0.02); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.05); padding: 20px; overflow: hidden;
`;
const WidgetScroller = styled.div<{ $scale?: number }>`
  transform: scale(${(props) => props.$scale || 1}); transform-origin: top center; width: 100%;
`;
const SectionTitle = styled.h2`
  font-size: 32px; font-weight: 800; text-align: center; margin-bottom: 30px; background: linear-gradient(to bottom, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const TabButton = styled.button<{ $active?: boolean }>`
  padding: 12px 32px; font-size: 16px; font-weight: 600; color: #fff; background: ${(props) => (props.$active ? "#a855f7" : "rgba(255,255,255,0.05)")}; border: none; border-radius: 12px; cursor: pointer; transition: 0.2s;
`;
const PointsBadge = styled.div`
  background: rgba(168, 85, 247, 0.1); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3); padding: 12px; border-radius: 12px; font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 15px;
`;
// IDENTICO A QUELLO DELLA PAGINA SWAP
const WarningBadge = styled.div`
  background: rgba(255, 153, 0, 0.1); color: #FF9900; border: 1px solid rgba(255, 153, 0, 0.3); padding: 12px; border-radius: 12px; font-size: 12px; line-height: 1.5; margin-bottom: 15px; display: flex; align-items: flex-start; gap: 10px;
`;

export default function ZapPageClient() {
	const [{ wallet }, connect, disconnect] = useConnectWallet();
	const [, setChain] = useSetChain();

	const [address, setAddress] = useState<string | undefined>();
	const [chainId, setChainId] = useState<number>(BSC_CHAIN_ID);
	const [activeTab, setActiveTab] = useState<"zap-in" | "zap-out">("zap-in");
	const allPools = [...pools, ...pcsV3Pools];
	const [selectedPool, setSelectedPool] = useState<PoolInfo>(allPools[0]);

	useEffect(() => {
		if (wallet?.accounts?.[0]?.address) {
			setAddress(wallet.accounts[0].address);
			setChainId(parseInt(wallet?.chains?.[0]?.id || "0x38", 16));
		} else {
			setAddress(undefined);
		}
	}, [wallet]);

	const handleSubmitTx = useCallback(
		async (txData: any) => {
			if (!wallet) throw new Error("No wallet connected");
			const provider = new ethers.providers.Web3Provider(
				wallet.provider,
				"any",
			);
			const signer = provider.getSigner();

			const tx = await signer.sendTransaction({
				from: txData.from,
				to: txData.to,
				value: txData.value,
				data: txData.data,
				gasLimit: txData.gasLimit,
			});

			if (address) {
				const referrer =
					typeof window !== "undefined"
						? window.localStorage.getItem("arb_inc_referrer") || ""
						: "";
				fetch("/api/dex-reward", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userWallet: address,
						type: "zap",
						txHash: tx.hash,
						referrerWallet: referrer,
					}),
				}).then(() => {
					alert("🎉 Liquidity Zap Successful! +150 Points added!");
				});
			}
			return tx.hash;
		},
		[wallet, address],
	);

	return (
		<>
			<GlobalStyle />
			<Header
				activePage="/zap"
				walletSection={
					address ? (
						<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
							<span style={{ fontFamily: "monospace", fontSize: "12px" }}>
								{address.slice(0, 6)}...{address.slice(-4)}
							</span>
							<DisconnectButton onClick={() => wallet && disconnect(wallet)}>
								Disconnect
							</DisconnectButton>
						</div>
					) : (
						<ConnectButton onClick={() => connect()}>
							Connect Wallet
						</ConnectButton>
					)
				}
			/>
			<Container>
				<MainContent>
					<SectionTitle>Liquidity Zap</SectionTitle>

					<PoolSelector
						selectedPoolId={selectedPool.id}
						onPoolChange={setSelectedPool}
					/>

					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: "15px",
							marginBottom: "25px",
						}}
					>
						<TabButton
							$active={activeTab === "zap-in"}
							onClick={() => setActiveTab("zap-in")}
						>
							Zap In
						</TabButton>
						<TabButton
							$active={activeTab === "zap-out"}
							onClick={() => setActiveTab("zap-out")}
						>
							Zap Out
						</TabButton>
					</div>

					{activeTab === "zap-in" ? (
						<WidgetWrapper>
							<PointsBadge>
								🏆 Earn 150 Points & 10% Referral Bonus per Zap!
							</PointsBadge>

							{/* BANNER UNIFICATO IDENTICO ALLO SWAP */}
							<WarningBadge>
								<FaExclamationTriangle
									style={{ fontSize: "18px", flexShrink: 0, marginTop: "2px" }}
								/>
								<div>
									<strong>Tax Token Notice:</strong> When zapping Arbitrage
									Inception (ARB INC), please set your slippage to{" "}
									<strong>8%</strong> to ensure the transaction processes
									successfully due to tokenomics.
								</div>
							</WarningBadge>

							<WidgetScroller $scale={0.9}>
								<LiquidityWidget
									chainId={chainId as ChainId.Bsc}
									poolType={mapStringToPoolType(selectedPool.poolType)}
									poolAddress={selectedPool.address}
									connectedAccount={{
										address: address || undefined,
										chainId: chainId,
									}}
									source="arbitrage-inception"
									feeConfig={{ feePcm: FEE_PCM, feeAddress: FEE_RECEIVER }}
									onConnectWallet={() => connect()}
									onSwitchChain={() => setChain({ chainId: "0x38" })}
									onSubmitTx={handleSubmitTx}
								/>
								{!address && <DemoModeOverlay pool={selectedPool} />}
							</WidgetScroller>
						</WidgetWrapper>
					) : (
						<WidgetWrapper>
							<ZapOutClient
								poolAddress={selectedPool.address}
								poolType={selectedPool.poolType}
								token0Address={selectedPool.token0.address}
								token0Symbol={selectedPool.token0.symbol}
								token1Address={selectedPool.token1.address}
								token1Symbol={selectedPool.token1.symbol}
							/>
						</WidgetWrapper>
					)}
				</MainContent>
				<Footer />
			</Container>
		</>
	);
}
