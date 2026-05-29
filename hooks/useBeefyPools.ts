import { useState, useEffect } from 'react';
import type { PoolInfo } from '@/app/zap/pools';

export function useBeefyPools() {
    const [beefyPools, setBeefyPools] = useState<PoolInfo[]>([]);
    const [loadingBeefy, setLoadingBeefy] = useState(true);
    useEffect(() => {
        async function fetchPools() {
            try {
                const [vaultsRes, apyRes, tvlRes] = await Promise.all([
                    fetch('https://api.beefy.finance/vaults'),
                    fetch('https://api.beefy.finance/apy'),
                    fetch('https://api.beefy.finance/tvl')
                ]);
                const vaults = await vaultsRes.json();
                const apys = await apyRes.json();
                const tvls = await tvlRes.json();
                const bscPools = vaults
                    .filter((v: any) => v.chain === 'bsc' && v.status === 'active')
                    .map((v: any) => {
                        const vaultApy = apys[v.id] || {};
                        const vaultTvl = tvls[v.chain]?.[v.id] || 0;
                        return {
                            id: v.id, name: v.name, address: v.earnContractAddress, dex: v.platformId,
                            poolType: 'VAULT_BEEFY', isBeefy: true,
                            token0: { symbol: v.assets[0] || '', address: '' },
                            token1: { symbol: v.assets[1] || '', address: '' },
                            apr: vaultApy.totalApy ? (vaultApy.totalApy * 100).toFixed(2) + '%' : 'N/A',
                            liquidityUSD: vaultTvl, rawApy: vaultApy.totalApy || 0, isArbitrageInception: false
                        };
                    })
                    .filter((p: any) => p.liquidityUSD > 50000)
                    .sort((a: any, b: any) => b.rawApy - a.rawApy)
                    .slice(0, 12);
                setBeefyPools(bscPools);
            } catch (error) { console.error("Err Beefy:", error); } finally { setLoadingBeefy(false); }
        }
        fetchPools();
    }, []);
    return { beefyPools, loadingBeefy };
}
