import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { ZapService } from "../app/zapService";
import { PoolConfig } from "../app/pools";

interface UseZapProps {
  provider: ethers.providers.Web3Provider | undefined;
  account: string | undefined;
}

export const useZap = ({ provider, account }: UseZapProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Mock o Stub per recuperare il calldata dall'API dell'aggregatore (es. Kyber/Enso/Router interno)
   * Indispensabile perché lo Zap richiede il cammino di routing ottimale calcolato off-chain.
   */
  const fetchZapRouteData = async (
    poolAddress: string,
    amount: string,
    isZapIn: boolean
  ): Promise<string> => {
    // TODO: Sostituire con la chiamata fetch reale al tuo aggregatore/API
    // es: return (await axios.get(`api/v1/zap?pool=${poolAddress}...`)).data.bytecode;
    console.log(`Frizzando rotta off-chain per ${poolAddress} - Quantità: ${amount}`);
    return "0x"; // Ritorna un byte vuoto di test se l'API locale non è ancora cablata
  };

  const executeZapInFlow = useCallback(
    async (pool: PoolConfig, tokenAddress: string, amountStr: string) => {
      if (!provider || !account) {
        setError("Wallet non connesso");
        return;
      }

      setLoading(true);
      setError(null);
      setTxHash(null);

      try {
        const zapService = new ZapService(provider);
        const amount = ethers.utils.parseUnits(amountStr, 18); // Adattare se usi token non a 18 decimali
        const deadline = Math.floor(Date.now() / 1000) + 1200; // 20 minuti di validità

        // 1. TENTATIVO DI PERMIT (EIP-712) - Zero Gas per l'utente
        let permitSigned = false;
        try {
          console.log("Tentativo di firma Permit...");
          const sig = await zapService.getPermitSignature(tokenAddress, account, amount, deadline);
          console.log("Permit firmato con successo:", sig);
          permitSigned = true;
          // NOTA: Se il tuo contratto di Zap supporta l'EIP-712 direttamente, 
          // qui dovrai concatenare la firma (v, r, s) dentro il zapData finale.
        } catch (permitErr: any) {
          console.warn("Permit non supportato o rifiutato. Fallback su Approve standard...", permitErr.message);
        }

        // 2. FALLBACK SU APPROVE CLASSICO (Se il Permit fallisce o non è implementato dal token)
        if (!permitSigned) {
          console.log("Esecuzione approvazione classica on-chain...");
          await zapService.checkAndApproveToken(tokenAddress, account, amount);
        }

        // 3. RECUPERO DEI DATI DI ROUTING (CALLDATA)
        const zapData = await fetchZapRouteData(pool.address, amountStr, true);

        // 4. ESECUZIONE DELLO ZAP IN
        // Mappiamo provvisoriamente amount0Max e amount1Max basandoci sul totale per il router
        const tx = await zapService.executeZapIn(
          pool.address,
          amountStr,
          amountStr,
          zapData,
          tokenAddress === "native" ? amountStr : undefined // Gestione BNB Nativo
        );

        console.log("Transazione inviata:", tx.hash);
        setTxHash(tx.hash);
        await tx.wait();
        console.log("Transazione confermata!");

      } catch (err: any) {
        console.error("Errore durante lo Zap In:", err);
        setError(err.reason || err.message || "Errore sconosciuto durante lo Zap");
      } finally {
        setLoading(false);
      }
    },
    [provider, account]
  );

  const executeZapOutFlow = useCallback(
    async (pool: PoolConfig, liquidityAmountStr: string, recipient: string) => {
      if (!provider || !account) {
        setError("Wallet non connesso");
        return;
      }

      setLoading(true);
      setError(null);
      setTxHash(null);

      try {
        const zapService = new ZapService(provider);

        // Nello Zap Out preleviamo la pool LP, serve l'approvazione del token LP al router
        const lpAmount = ethers.utils.parseUnits(liquidityAmountStr, 18);
        await zapService.checkAndApproveToken(pool.address, account, lpAmount);

        // Esecuzione dello Zap Out (Impostiamo uno slippage minimo di fallback a 0 per sicurezza iniziale)
        const tx = await zapService.executeZapOut(
          pool.address,
          liquidityAmountStr,
          "0", // amount0Min
          "0", // amount1Min
          recipient
        );

        setTxHash(tx.hash);
        await tx.wait();
      } catch (err: any) {
        console.error("Errore durante lo Zap Out:", err);
        setError(err.reason || err.message || "Errore sconosciuto durante lo Zap Out");
      } finally {
        setLoading(false);
      }
    },
    [provider, account]
  );

  return {
    executeZapInFlow,
    executeZapOutFlow,
    loading,
    txHash,
    error,
  };
};
