import { useState, useEffect } from 'react';
import { getDefaultZapClient } from '../lib/zap-api-client';
import { ethers } from 'ethers';
import { DEV_FEE_ADDRESS, DEV_FEE_PCM } from '../lib/constants';

export function useZapInRoute(
  tokenInAddress: string,
  tokenInDecimals: number,
  amountIn: string,
  targetPoolDex: string,
  targetPoolId: string,
  slippageBps: number,
  tickLower?: number,
  tickUpper?: number
) {
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!amountIn || isNaN(Number(amountIn)) || Number(amountIn) <= 0 || !tokenInAddress || !targetPoolId) {
      setRoute(null);
      setError(null);
      return;
    }

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);
      try {
        const client = getDefaultZapClient();
        const parsedAmount = ethers.utils.parseUnits(amountIn, tokenInDecimals).toString();
        
        const response = await client.getZapInRoute({
          dex: targetPoolDex,
          'pool.id': targetPoolId,
          tokensIn: tokenInAddress,
          amountsIn: parsedAmount,
          slippage: slippageBps,
          'position.tickLower': tickLower,
          'position.tickUpper': tickUpper,
          feeAddress: DEV_FEE_ADDRESS,
          feePcm: DEV_FEE_PCM
        });
        
        setRoute(response.data);
      } catch (err: any) {
        console.error("Kyber ZaaS API failed", err);
        setError(err.message || "Route not found");
        setRoute(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchRoute, 600); // Debounce to prevent API spam
    return () => clearTimeout(timer);
  }, [tokenInAddress, tokenInDecimals, amountIn, targetPoolDex, targetPoolId, slippageBps, tickLower, tickUpper]);

  return { route, loading, error };
}

export function useZapOutRoute(
  tokenOutAddress: string,
  targetPoolDex: string,
  targetPoolId: string,
  nftPositionId: string,
  slippageBps: number
) {
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nftPositionId || !tokenOutAddress || !targetPoolId) {
      setRoute(null);
      setError(null);
      return;
    }

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);
      try {
        const client = getDefaultZapClient();
        
        const response = await client.getZapOutRoute({
          dexFrom: targetPoolDex,
          'pool_from.id': targetPoolId,
          'position_from.id': nftPositionId,
          tokens_to: tokenOutAddress,
          slippage: slippageBps,
          feeAddress: DEV_FEE_ADDRESS,
          feePcm: DEV_FEE_PCM
        });
        
        setRoute(response.data);
      } catch (err: any) {
        console.error("Kyber ZaaS API failed", err);
        setError(err.message || "Route not found");
        setRoute(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchRoute, 600);
    return () => clearTimeout(timer);
  }, [tokenOutAddress, nftPositionId, targetPoolDex, targetPoolId, slippageBps]);

  return { route, loading, error };
}
