import { fetchLivePoolMetrics } from "../app/pools.js";
import { useEffect, useState } from "react";

export function useZapPools() {
  const [livePools, setLivePools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLivePoolMetrics().then((data) => {
      // Ordina per APR massimo per spingere in alto i rendimenti migliori dello Zap
      const sorted = data.sort((a, b) => parseFloat(b.apr) - parseFloat(a.apr));
      setLivePools(sorted);
      setLoading(false);
    });
  }, []);

  return { livePools, loading };
}
