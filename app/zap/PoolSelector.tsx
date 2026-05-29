"use client";
import styled from "styled-components";
import { PoolInfo } from "../pools";
import { clmPools, pcsV3Pools, pools } from "../pools";
import { useBeefyPools } from "../../hooks/useBeefyPools";
import { useEffect, useState } from "react";

const SelectorContainer = styled.div`
	width: 100%;
	max-width: 450px;
	max-height: 320px;
	overflow-y: auto;
	background: rgba(255, 255, 255, 0.01);
	border: 1px solid rgba(168, 85, 247, 0.15);
	border-radius: 16px;
	padding: 10px;
	margin-bottom: 20px;
	&::-webkit-scrollbar { width: 6px; }
	&::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 4px; }
`;

const PoolRow = styled.div<{ $isActive: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 14px;
	margin-bottom: 6px;
	background: ${(props) => (props.$isActive ? "rgba(168, 85, 247, 0.15)" : "rgba(255, 255, 255, 0.02)")};
	border: 1px solid ${(props) => (props.$isActive ? "#a855f7" : "rgba(255, 255, 255, 0.05)")};
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.2s ease;
	&:hover {
		background: rgba(168, 85, 247, 0.08);
		border-color: rgba(168, 85, 247, 0.4);
	}
`;

const InfoGroup = styled.div` display: flex; flex-direction: column; gap: 2px; `;
const PoolName = styled.span` color: #fff; font-weight: 600; font-size: 0.9rem; `;
const DexBadge = styled.span`
	font-size: 0.7rem;
	color: #a855f7;
	background: rgba(168, 85, 247, 0.1);
	padding: 1px 6px;
	border-radius: 4px;
	width: fit-content;
`;
const AprText = styled.span` color: #10b981; font-weight: 700; font-size: 0.9rem; `;

export default function PoolSelector({ selectedPoolId, onPoolChange }: any) {
	const { beefyPools, loadingBeefy } = useBeefyPools();
	const [allPools, setAllPools] = useState<PoolInfo[]>([...pools, ...pcsV3Pools, ...clmPools]);

	useEffect(() => {
		if (!loadingBeefy) setAllPools([...beefyPools, ...pools, ...pcsV3Pools, ...clmPools]);
	}, [beefyPools, loadingBeefy]);

	return (
		<SelectorContainer>
			{allPools.map((p) => {
				const displayApr = p.apr || (p.aprValue ? `${p.aprValue}% APR` : "0.00% APR");
				const displayDex = p.dex || (p.poolType === "DEX_CLM" ? "Uniswap CLM" : p.poolType?.replace("DEX_", ""));
				return (
					<PoolRow key={p.id} $isActive={selectedPoolId === p.id} onClick={() => onPoolChange(p)}>
						<InfoGroup>
							<PoolName>{p.name}</PoolName>
							<DexBadge>{displayDex}</DexBadge>
						</InfoGroup>
						<AprText>{displayApr}</AprText>
					</PoolRow>
				);
			})}
		</SelectorContainer>
	);
}
