import { useState, useEffect } from 'react';
import { fetchLivePoolMetrics, LivePoolInfo } from '../app/pools';

export function useZapPools() {
  const [livePools, setLivePools] = useState<LivePoolInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLivePoolMetrics().then((data) => {
      // Ordina per APR decrescente
      const sorted = [...data].sort((a, b) => b.apr - a.apr);
      setLivePools(sorted);
      setLoading(false);
    });
  }, []);

  return { livePools, loading };
}
