"use client";
import styled from "styled-components";
import { PoolInfo } from "../../types";
import { pcsV3Pools, pools } from "../pools";
import { useBeefyPools } from "../../hooks/useBeefyPools";
import { useEffect, useState } from "react";

const PoolsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; `;
const PoolCard = styled.div<{ $isActive: boolean }>` 
  background: rgba(255, 255, 255, 0.03); border: 2px solid ${(props) => (props.$isActive ? "#a855f7" : "transparent")};
  padding: 15px; border-radius: 12px; cursor: pointer;
`;

export default function PoolSelector({ selectedPoolId, onPoolChange }: any) {
    const { beefyPools, loadingBeefy } = useBeefyPools();
    const [allPools, setAllPools] = useState<PoolInfo[]>([...pools, ...pcsV3Pools]);
    useEffect(() => { if (!loadingBeefy) setAllPools([...beefyPools, ...pools, ...pcsV3Pools]); }, [beefyPools]);
    return (
        <PoolsGrid>
            {allPools.slice(0, 6).map((p) => (
                <PoolCard key={p.id} $isActive={selectedPoolId === p.id} onClick={() => onPoolChange(p)}>
                    <h4>{p.name}</h4><p>{p?.apr || 'N/A'}</p>
                </PoolCard>
            ))}
        </PoolsGrid>
    );
}
