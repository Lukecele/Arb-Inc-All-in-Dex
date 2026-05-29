"use client";
import styled from "styled-components";
import { PoolInfo } from "../pools";
import { clmPools, pcsV3Pools, pools } from "../pools";
import { useEffect, useMemo, useState } from "react";

const SelectorContainer = styled.div`
	width: 100%;
	max-width: 620px;
	background: rgba(255, 255, 255, 0.02);
	border: 1px solid rgba(168, 85, 247, 0.12);
	border-radius: 20px;
	padding: 20px;
	margin-bottom: 24px;
`;
const SummaryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 14px;
	margin-bottom: 18px;
	@media (max-width: 720px) { grid-template-columns: 1fr; }
`;
const SummaryCard = styled.div`
	background: rgba(255,255,255,0.04);
	border: 1px solid rgba(255,255,255,0.06);
	border-radius: 16px;
	padding: 16px;
	min-height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const SummaryLabel = styled.span`
	font-size: 0.8rem;
	color: #94a3b8;
	letter-spacing: 0.03em;
	text-transform: uppercase;
`;
const SummaryValue = styled.span`
	font-size: 1.4rem;
	font-weight: 700;
	color: #fff;
`;
const SearchToolbar = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin-bottom: 18px;
`;
const SearchInput = styled.input`
	flex: 1;
	min-width: 180px;
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid rgba(255,255,255,0.08);
	background: rgba(255,255,255,0.04);
	color: #fff;
	outline: none;
	font-size: 0.95rem;
	&::placeholder { color: #6b7280; }
`;
const SortButton = styled.button<{ $active?: boolean }>`
	padding: 12px 16px;
	border-radius: 14px;
	border: none;
	background: ${(props) => (props.$active ? "linear-gradient(90deg, #8b5cf6, #ec4899)" : "rgba(255,255,255,0.05)")};
	color: ${(props) => (props.$active ? "#fff" : "#cbd5e1")};
	font-weight: 600;
	cursor: pointer;
	transition: transform 0.2s, background 0.2s;
	&:hover { transform: translateY(-1px); }
`;
const GroupSection = styled.div`
	margin-bottom: 22px;
`;
const GroupTitle = styled.h3`
	font-size: 1rem;
	font-weight: 700;
	color: #f8fafc;
	margin-bottom: 12px;
`;
const GroupMeta = styled.span`
	font-size: 0.8rem;
	color: #94a3b8;
`;
const PoolRow = styled.div<{ $isActive: boolean }>`
	display: grid;
	grid-template-columns: 1.4fr 1.1fr 1.1fr 0.95fr 0.85fr;
	gap: 12px;
	align-items: center;
	padding: 14px 16px;
	margin-bottom: 10px;
	background: ${(props) => (props.$isActive ? "rgba(168, 85, 247, 0.16)" : "rgba(255, 255, 255, 0.02)")};
	border: 1px solid ${(props) => (props.$isActive ? "#a855f7" : "rgba(255, 255, 255, 0.07)")};
	border-radius: 14px;
	cursor: pointer;
	transition: all 0.2s ease;
	&:hover {
		background: rgba(168, 85, 247, 0.1);
		border-color: rgba(168, 85, 247, 0.35);
	}
	@media (max-width: 720px) {
		grid-template-columns: 1fr;
		gap: 8px;
	}
`;
const PoolHeader = styled.div`
	display: grid;
	grid-template-columns: 1.4fr 1.1fr 1.1fr 0.95fr 0.85fr;
	gap: 12px;
	margin-bottom: 12px;
	padding: 0 10px;
	font-size: 0.8rem;
	color: #94a3b8;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	@media (max-width: 720px) { display: none; }
`;
const Badge = styled.span<{ $variant?: string }>`
	padding: 4px 8px;
	border-radius: 999px;
	font-size: 0.72rem;
	font-weight: 700;
	color: #fff;
	background: ${(props) =>
		props.$variant === "mainstream"
			? "rgba(16, 185, 129, 0.15)"
			: props.$variant === "top"
			? "rgba(59, 130, 246, 0.18)"
			: "rgba(168, 85, 247, 0.15)"};
`;
const PoolInfoColumn = styled.div` display: flex; flex-direction: column; gap: 4px; `;
const PoolName = styled.span` color: #fff; font-weight: 700; font-size: 0.96rem; `;
const DexBadge = styled.span`
	font-size: 0.75rem;
	color: #c4b5fd;
	background: rgba(168, 85, 247, 0.1);
	padding: 4px 8px;
	border-radius: 10px;
	width: fit-content;
`;
const AprText = styled.span` color: #34d399; font-weight: 700; font-size: 0.95rem; `;
const MetaText = styled.span` color: #94a3b8; font-size: 0.82rem; `;
const EmptyState = styled.div`
	padding: 28px 16px;
	text-align: center;
	color: #94a3b8;
	border: 1px dashed rgba(255,255,255,0.1);
	border-radius: 16px;
	margin-top: 10px;
`;

const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);

export default function PoolSelector({ selectedPoolId, onPoolChange }: any) {
	const [allPools, setAllPools] = useState<any[]>([...pools, ...pcsV3Pools, ...clmPools]);
	const [query, setQuery] = useState("");
	const [sortKey, setSortKey] = useState<"apr" | "liquidity">("apr");

	const filteredPools = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		return allPools.filter((pool) => {
			const matchText = `${pool.name} ${pool.dex} ${pool.token0.symbol} ${pool.token1.symbol}`.toLowerCase();
			return normalized === "" || matchText.includes(normalized);
		});
	}, [allPools, query]);

	const sortedPools = useMemo(() => {
		return [...filteredPools].sort((a, b) => {
			if (sortKey === "liquidity") {
				return (b.liquidityUSD || 0) - (a.liquidityUSD || 0);
			}
			return (b.aprValue || 0) - (a.aprValue || 0);
		});
	}, [filteredPools, sortKey]);

	const groupedPools = useMemo(() => {
		const mainstream = sortedPools.filter((pool) => pool.isMainstream);
		const pancake = sortedPools.filter(
			(pool) => !pool.isMainstream && pool.dex.toLowerCase().includes("pancake"),
		);
		const uniswap = sortedPools.filter(
			(pool) => !pool.isMainstream && !pool.dex.toLowerCase().includes("pancake"),
		);
		return [
			{ title: "Mainstream Blue Chips", pools: mainstream },
			{ title: "PancakeSwap High APY", pools: pancake },
			{ title: "Uniswap & CLM Opportunities", pools: uniswap },
		].filter((section) => section.pools.length > 0);
	}, [sortedPools]);

	const totalLiquidity = sortedPools.reduce((sum, item) => sum + (item.liquidityUSD || 0), 0);
	const topApr = sortedPools.reduce((max, item) => Math.max(max, item.aprValue || 0), 0);

	return (
		<SelectorContainer>
			<SummaryGrid>
				<SummaryCard>
					<SummaryLabel>Total Pools</SummaryLabel>
					<SummaryValue>{sortedPools.length}</SummaryValue>
				</SummaryCard>
				<SummaryCard>
					<SummaryLabel>Top Available APR</SummaryLabel>
					<SummaryValue>{topApr.toFixed(0)}% APR</SummaryValue>
				</SummaryCard>
				<SummaryCard>
					<SummaryLabel>Total Liquidity</SummaryLabel>
					<SummaryValue>{formatCurrency(totalLiquidity)}</SummaryValue>
				</SummaryCard>
			</SummaryGrid>

			<SearchToolbar>
				<SearchInput
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search pairs, DEX, token..."
				/>
				<SortButton $active={sortKey === "apr"} onClick={() => setSortKey("apr")}>Sort by APR</SortButton>
				<SortButton $active={sortKey === "liquidity"} onClick={() => setSortKey("liquidity")}>Sort by Liquidity</SortButton>
			</SearchToolbar>

			<PoolHeader>
				<span>Pool</span>
				<span>DEX</span>
				<span>Liquidity</span>
				<span>APR</span>
				<span>Tag</span>
			</PoolHeader>

			{groupedPools.map((group) => (
				<GroupSection key={group.title}>
					<GroupTitle>
						{group.title} <GroupMeta>({group.pools.length})</GroupMeta>
					</GroupTitle>
					{group.pools.map((p) => {
						const displayApr = p.apr || `${p.aprValue}% APR`;
						const displayDex = p.dex || p.poolType.replace("DEX_", "");
						const badgeVariant = p.isMainstream ? "mainstream" : p.aprValue >= 50 ? "top" : undefined;
						return (
							<PoolRow key={p.id} $isActive={selectedPoolId === p.id} onClick={() => onPoolChange(p)}>
								<PoolInfoColumn>
									<PoolName>{p.name}</PoolName>
									<DexBadge>{displayDex}</DexBadge>
								</PoolInfoColumn>
								<MetaText>{displayDex}</MetaText>
								<MetaText>{formatCurrency(p.liquidityUSD || 0)}</MetaText>
								<AprText>{displayApr}</AprText>
								<Badge $variant={badgeVariant}>{p.isMainstream ? "Mainstream" : p.aprValue >= 50 ? "Top APY" : "Opportunity"}</Badge>
							</PoolRow>
						);
					})}
				</GroupSection>
			))}

			{groupedPools.length === 0 && (
				<EmptyState>No pools match your search or selected filters.</EmptyState>
			)}
		</SelectorContainer>
	);
}
