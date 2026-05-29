"use client";

import React, { useState, useEffect } from "react";
import { pools, PoolConfig } from "../pools";

// Struttura dati estesa per includere metriche real-time
interface EnhancedPool extends PoolConfig {
  liveApr: number;
  liveApy?: number;
}

export default function ZapPageClient() {
  const [extendedPools, setExtendedPools] = useState<EnhancedPool[]>(
    pools.map((p) => ({ ...p, liveApr: p.fallbackApr }))
  );
  const [selectedPool, setSelectedPool] = useState<EnhancedPool>(extendedPools[0]);
  const [loadingApr, setLoadingApr] = useState<boolean>(true);

  // 1. Fetching degli APR/APY Real-time dall'API KyberSwap Earn
  useEffect(() => {
    async function fetchLiveAprs() {
      try {
        setLoadingApr(true);
        const res = await fetch("https://pool-farm.kyberswap.com/bsc/api/v1/pools");
        if (!res.ok) throw new Error("Network response was not ok");
        
        const json = await res.json();
        
        // L'API di KyberSwap restituisce tipicamente { code: 0, data: { pools: [...] } } o un array diretto
        const kyberPools = json?.data?.pools || json?.pools || [];

        if (kyberPools.length > 0) {
          const updated = pools.map((p) => {
            // Confronto case-insensitive degli indirizzi delle pool
            const matchedLivePool = kyberPools.find(
              (kp: any) => kp.address?.toLowerCase() === p.address.toLowerCase()
            );

            return {
              ...p,
              liveApr: matchedLivePool?.apr || matchedLivePool?.totalApr || p.fallbackApr,
              liveApy: matchedLivePool?.apy || undefined,
            };
          });

          setExtendedPools(updated);
          
          // Mantiene sincronizzata la pool selezionata al volo
          const currentSelected = updated.find((up) => up.id === selectedPool.id);
          if (currentSelected) setSelectedPool(currentSelected);
        }
      } catch (error) {
        console.error("Errore nel recupero degli APR Live da KyberSwap:", error);
      } finally {
        setLoadingApr(false);
      }
    }

    fetchLiveAprs();
  }, []);

  // 2. Handler per la generazione dei parametri del Widget ZaaS di KyberSwap
  const getWidgetConfig = (pool: EnhancedPool) => {
    const baseConfig = {
      targetChainId: 56, // BNB Chain
      poolAddress: pool.address,
      poolType: pool.poolType,
      theme: "dark",
    };

    // Controllo critico: Se la pool è V2 (classico AMM), non inserire parametri legati ai range di prezzo o fee V3
    if (pool.poolType.endsWith("V2")) {
      return {
        ...baseConfig,
        // Parametri specifici o limitazioni per V2 richiesti dal widget
        degenMode: false, 
      };
    }

    // Configurazione specifica per pool a liquidità concentrata (V3-style)
    return {
      ...baseConfig,
      feeTier: pool.fee || 3000,
    };
  };

  const widgetConfig = getWidgetConfig(selectedPool);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Dashboard Header & Pool Selector */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Arb Inception - Zap Dynamic Dashboard</h2>
          
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Seleziona la Pool di Destinazione:
          </label>
          
          <select
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={selectedPool.id}
            onChange={(e) => {
              const found = extendedPools.find((p) => p.id === e.target.value);
              if (found) setSelectedPool(found);
            }}
          >
            {extendedPools.map((pool) => (
              <option key={pool.id} value={pool.id}>
                {pool.name} | APR: {pool.liveApr.toFixed(2)}% {pool.liveApy ? `(APY: ${pool.liveApy.toFixed(2)}%)` : ""}
              </option>
            ))}
          </select>

          {/* Dettagli della Pool Selezionata */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-gray-750 p-4 rounded-lg">
            <div>
              <span className="text-gray-400 block">Tipo Pool:</span>
              <span className="font-mono text-amber-400 text-xs">{selectedPool.poolType}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Status APR:</span>
              <span>
                {loadingApr ? (
                  <span className="text-yellow-400 animate-pulse">Caricamento...</span>
                ) : (
                  <span className="text-emerald-400 font-bold">Live 🟢</span>
                )}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="text-gray-400 block">Pool Contract Address:</span>
              <span className="font-mono text-xs break-all text-gray-300">{selectedPool.address}</span>
            </div>
          </div>
        </div>

        {/* Simulazione e placeholder del Widget ZaaS di KyberSwap */}
        <div className="bg-gray-850 p-6 rounded-xl border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-md font-semibold text-gray-300 mb-4">KyberSwap ZaaS Widget Core</h3>
          
          {/* Qui viene istanziato l'Iframe o l'SDK di KyberSwap usando il widgetConfig dinamico */}
          <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg text-center border border-dashed border-gray-600">
            <p className="text-sm text-gray-400 mb-2">Iniezione parametri ZaaS riuscita per:</p>
            <p className="font-bold text-white mb-4">{selectedPool.name}</p>
            
            <div className="text-left text-xs font-mono bg-black/40 p-3 rounded text-emerald-300 space-y-1">
              <div>poolAddress: "{widgetConfig.poolAddress}"</div>
              <div>poolType: "{widgetConfig.poolType}"</div>
              <div>targetChainId: {widgetConfig.targetChainId}</div>
              {"feeTier" in widgetConfig && <div>feeTier: {widgetConfig.feeTier}</div>}
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              Il widget adatterà i flussi d'interfaccia in base al protocollo nativo rilevato.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
