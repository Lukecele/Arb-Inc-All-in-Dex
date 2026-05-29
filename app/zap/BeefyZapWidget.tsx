"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { PoolInfo } from "../../types";
import { ethers } from "ethers";

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #0c0c1e;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 24px;
  color: white;
`;

const InputWrapper = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  outline: none;
  &::placeholder { color: #4b5563; }
`;

const ActionButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: ${(props) => props.$disabled ? "rgba(168, 85, 247, 0.3)" : "linear-gradient(90deg, #8B5CF6, #EC4899)"};
  color: ${(props) => props.$disabled ? "#a9a9a9" : "white"};
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => props.$disabled ? "not-allowed" : "pointer"};
  transition: opacity 0.2s;
  &:hover { opacity: ${(props) => props.$disabled ? "1" : "0.9"}; }
`;

interface BeefyZapProps {
    pool: PoolInfo;
    userAddress?: string;
    feeReceiver?: string;
}

// Costanti di rete BSC
const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c".toLowerCase();
const NATIVE_TOKEN = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee".toLowerCase();
const KYBER_API = "https://aggregator-api.kyberswap.com/bsc/api/v1/routes";

export default function BeefyZapWidget({ pool, userAddress, feeReceiver = "0xafF5340ECFaf7ce049261cff193f5FED6BDF04E7" }: BeefyZapProps) {
    const [amount, setAmount] = useState("");
    const [isZapping, setIsZapping] = useState(false);
    const [status, setStatus] = useState("");

    // Helper per ottenere la route da KyberSwap
    const getSwapRoute = async (tokenIn: string, tokenOut: string, amountInWei: string) => {
        const url = `${KYBER_API}?tokenIn=${tokenIn}&tokenOut=${tokenOut}&amountIn=${amountInWei}&to=${userAddress}&feeReceiver=${feeReceiver}&feeAmount=20`; 
        // feeAmount=20 significa 20 BPS (0.2%). Verrà detratto automaticamente durante lo swap.
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Errore API KyberSwap per token: ${tokenOut}`);
        return await res.json();
    };

    const handleZap = async () => {
        if (!userAddress) return alert("Connetti il wallet prima!");
        if (!amount || parseFloat(amount) <= 0) return;

        setIsZapping(true);
        setStatus("Calcolo rotte ottimali...");

        try {
            const amountInWei = ethers.utils.parseEther(amount);
            const halfAmountWei = amountInWei.div(2).toString(); // Dividiamo i BNB a metà

            const token0 = pool.token0?.address?.toLowerCase() || "";
            const token1 = pool.token1?.address?.toLowerCase() || "";
            
            let route0 = null;
            let route1 = null;

            // 1. Logica Token 0: Se non è WBNB o BNB, cerca la rotta per swappare metà importo
            if (token0 !== WBNB_ADDRESS && token0 !== NATIVE_TOKEN && token0 !== "") {
                route0 = await getSwapRoute(NATIVE_TOKEN, token0, halfAmountWei);
            }

            // 2. Logica Token 1: Se non è WBNB o BNB, cerca la rotta per swappare l'altra metà
            if (token1 !== WBNB_ADDRESS && token1 !== NATIVE_TOKEN && token1 !== "") {
                route1 = await getSwapRoute(NATIVE_TOKEN, token1, halfAmountWei);
            }

            console.log("Rotta Token 0:", route0);
            console.log("Rotta Token 1:", route1);
            
            setStatus("Pronto per la firma!");
            alert("Rotte calcolate con successo (guarda la console). Ora dobbiamo inviarle a ethers.js!");

        } catch (error) {
            console.error("Errore durante lo Zap:", error);
            alert("Errore nel calcolo delle rotte. Riprova.");
        } finally {
            setIsZapping(false);
            setStatus("");
        }
    };

    return (
        <Wrapper>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px" }}>Zap In (Beefy Vault)</h3>
                <span style={{ color: "#28E0B9", fontWeight: "bold" }}>{pool?.apr}</span>
            </div>
            
            <InputWrapper>
                <div style={{ fontSize: "12px", color: "#a9a9a9", marginBottom: "8px" }}>You Pay</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Input 
                        type="number" 
                        placeholder="0.0" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        disabled={isZapping}
                    />
                    <strong style={{ marginLeft: "10px" }}>BNB</strong>
                </div>
            </InputWrapper>

            <ActionButton onClick={handleZap} $disabled={!amount || parseFloat(amount) <= 0 || isZapping}>
                {isZapping ? status : (!userAddress ? "Connect Wallet" : "Zap to Vault")}
            </ActionButton>
            
            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "#6b7280" }}>
                Route: BNB → KyberSwap Split → PancakeSwap LP → Beefy
            </div>
        </Wrapper>
    );
}
