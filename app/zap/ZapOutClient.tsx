"use client";

import { useState } from "react";
import styled from "styled-components";
import { createZapApiClient, type ZapApiConfig } from "@/lib/zap-api-client";
import { ethers } from "ethers";
import { WBNB_ADDRESS } from "@/app/pools";

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  padding: 60px 40px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h3`
  font-size: 24px;
  color: #FFFFFF;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #A9A9A9;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const LinkButton = styled.a`
  display: inline-block;
  padding: 16px 40px;
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

const Features = styled.ul`
  text-align: left;
  color: #A9A9A9;
  margin: 30px 0;
  padding-left: 20px;
  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #FFFFFF;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
`;

const Button = styled.button<{ $loading?: boolean; $disabled?: boolean }>`
  width: 100%;
  padding: 14px;
  background: ${({ $disabled }) => ($disabled ? "#6B7280" : "linear-gradient(90deg, #8B5CF6, #EC4899)")};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  &:disabled {
    opacity: 0.7;
    transform: none;
    box-shadow: none;
  }
`;

const StatusText = styled.p<{ $success?: boolean; $error?: boolean }>`
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  background: ${({ $success, $error }) =>
    $success ? "rgba(34, 197, 94, 0.1)" :
    $error ? "rgba(239, 68, 68, 0.1)" :
    "rgba(255, 255, 255, 0.03)"};
  border: 1px solid ${({ $success, $error }) =>
    $success ? "rgba(34, 197, 94, 0.3)" :
    $error ? "rgba(239, 68, 68, 0.3)" :
    "rgba(255, 255, 255, 0.1)"};
  color: ${({ $success, $error }) =>
    $success ? "#22C55E" :
    $error ? "#EF4444" :
    "#A9A9A9"};
  font-size: 14px;
`;

export default function ZapOutClient({
  poolAddress,
  poolType,
  poolDex,
  token0Address,
  token0Symbol,
  token1Address,
  token1Symbol,
}: {
  poolAddress: string;
  poolType: string;
  poolDex: string;
  token0Address: string;
  token0Symbol: string;
  token1Address: string;
  token1Symbol: string;
}) {
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(800); // 8% default for tax tokens
  const [deadline, setDeadline] = useState(Math.floor(Date.now() / 1000) + 1800); // 30 minutes from now
  const [route, setRoute] = useState<string | null>(null);
  const [calldata, setCalldata] = useState<string | null>(null);
  const [routerAddress, setRouterAddress] = useState<string | null>(null);
  const [txValue, setTxValue] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isTxSubmitting, setIsTxSubmitting] = useState(false);
  const [status, setStatus] = useState<{ text: string; success?: boolean; error?: boolean }>({
    text: "",
  });
  const [walletAddress, setWalletAddress] = useState<string>("");

  // Initialize Zap API client
  const zapApiConfig: ZapApiConfig = {
    apiDomain: "https://zap-api.kyberswap.com",
    chainId: 56, // BSC
    // clientId: "your-client-id", // Optional - get from Kyberswap for higher rate limits
  };
  const zapApiClient = createZapApiClient(zapApiConfig);

  // Connect to wallet and get address
  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      // @ts-ignore - ethereum property may not exist on Window type but we check for it
      if ((window as any).ethereum) {
        try {
          // @ts-ignore - ethereum property may not exist on Window type but we check for it
          await (window as any).ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider((window as any).ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          return { provider, signer, address };
        } catch (error) {
          console.error("Wallet connection error:", error);
          setStatus({
            text: "Failed to connect wallet",
            error: true,
          });
          return null;
        }
      } else {
        setStatus({
          text: "Please install MetaMask or a Web3 wallet",
          error: true,
        });
        return null;
      }
    } else {
      setStatus({
        text: "Please install MetaMask or a Web3 wallet",
        error: true,
      });
      return null;
    }
  };

  // Get Zap Out route
  const getZapOutRoute = async () => {
    if (!walletAddress) {
      setStatus({
        text: "Please connect your wallet first",
        error: true,
      });
      return;
    }

    setIsLoading(true);
    setStatus({ text: "Getting Zap Out route..." });

    try {
      // Determine DEX based on pool type
      let dex = "DEX_PANCAKESWAPV2"; // Default
      if (poolType === "DEX_PANCAKESWAPV3") {
        dex = "DEX_PANCAKESWAPV3";
      } else if (poolType === "DEX_UNISWAPV3") {
        dex = "DEX_UNISWAPV3";
      } else if (poolType === "DEX_CLM") {
        const poolDexLower = poolDex.toLowerCase();
        if (poolDexLower.includes("uniswap")) dex = "DEX_UNISWAPV3";
        else if (poolDexLower.includes("pancake")) dex = "DEX_PANCAKESWAPV3";
      }

      // For Zap Out, we need to specify the token we want to receive
      // We'll use token0 as the output token (can be made configurable)
      const response = await zapApiClient.getZapOutRoute({
        dex,
        "pool.id": poolAddress,
        tokensOut: token0Address, // Output token (we'll zap out to token0)
        amountsOut: ethers.utils.parseUnits(amount, 18).toString(), // Assuming 18 decimals for simplicity
        slippage: slippage, // Already in basis points
        deadline,
      });

      if (response.code === 0 && response.data) {
        setRoute(response.data.route);
        setStatus({
          text: "Route obtained successfully! Ready to build transaction.",
          success: true,
        });
      } else {
        throw new Error(response.message || "Failed to get route");
      }
    } catch (error: any) {
      console.error("Zap Out route error:", error);
      setStatus({
        text: `Failed to get route: ${error.message}`,
        error: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Build Zap Out transaction
  const buildZapOutTx = async () => {
    if (!route || !walletAddress) {
      setStatus({
        text: "Please get the route first and connect wallet",
        error: true,
      });
      return;
    }

    setIsLoading(true);
    setStatus({ text: "Building Zap Out transaction..." });

    try {
      const response = await zapApiClient.buildZapOutTx({
        sender: walletAddress,
        recipient: walletAddress,
        route,
        deadline,
      });

      if (response.code === 0 && response.data) {
        setCalldata(response.data.calldata);
        setRouterAddress(response.data.routerAddress || null);
        setTxValue(response.data.value || "0");
        setStatus({
          text: "Transaction built successfully! Ready to submit.",
          success: true,
        });
      } else {
        throw new Error(response.message || "Failed to build transaction");
      }
    } catch (error: any) {
      console.error("Zap Out build tx error:", error);
      setStatus({
        text: `Failed to build transaction: ${error.message}`,
        error: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Zap Out transaction
  const submitZapOutTx = async () => {
    if (!calldata || !walletAddress) {
      setStatus({
        text: "Please build the transaction first",
        error: true,
      });
      return;
    }

    setIsTxSubmitting(true);
    setStatus({ text: "Submitting transaction..." });

    try {
      if (typeof window !== "undefined") {
        // @ts-ignore - ethereum property may not exist on Window type but we check for it
        if ((window as any).ethereum) {
          const provider = new ethers.providers.Web3Provider((window as any).ethereum);
          const signer = provider.getSigner();

          const tx = await signer.sendTransaction({
            from: walletAddress,
            to: routerAddress || poolAddress,
            value: txValue && txValue !== "0" ? txValue : undefined,
            data: calldata,
            gasLimit: 300000, // Should ideally get from API response
          });

          await tx.wait();
          setStatus({
            text: `Transaction successful! Hash: ${tx.hash}`,
            success: true,
          });

          // Reset form after successful transaction
          setAmount("");
          setRoute(null);
          setCalldata(null);
        } else {
          throw new Error("Wallet not connected");
        }
      } else {
        throw new Error("Wallet not connected");
      }
    } catch (error: any) {
      console.error("Zap Out submit tx error:", error);
      setStatus({
        text: `Transaction failed: ${error.message}`,
        error: true,
      });
    } finally {
      setIsTxSubmitting(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Zap Out (Remove Liquidity)</Title>
        <Description>
          Remove liquidity and receive {token0Symbol} in one click using Kyberswap Zap API.
        </Description>

        {!walletAddress ? (
          <Button onClick={connectWallet}>
            Connect Wallet
          </Button>
        ) : (
          <>
            <p style={{ marginBottom: "20px", color: "#A9A9A9" }}>
              Connected as: <span style={{ fontFamily: "monospace" }}>{walletAddress.slice(
                0,
                6
              )}...{walletAddress.slice(-4)}</span>
            </p>

            <InputGroup>
              <Label>Amount to receive ({token0Symbol})</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                disabled={isLoading || isTxSubmitting}
              />
            </InputGroup>

            <InputGroup>
              <Label>Slippage (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={slippage / 100} // Convert basis points to percentage for display
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    setSlippage(value * 100); // Convert percentage to basis points
                  }
                }}
                placeholder="8.0"
                disabled={isLoading || isTxSubmitting}
              />
              <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                8% recommended for tax tokens like ARB INC
              </p>
            </InputGroup>

            {route && !calldata ? (
              <Button
                onClick={buildZapOutTx}
                disabled={isLoading || isTxSubmitting}
                $loading={isLoading}
              >
                Build Transaction
              </Button>
            ) : !route && !calldata ? (
              <Button
                onClick={getZapOutRoute}
                disabled={isLoading || isTxSubmitting || !amount || parseFloat(amount) <= 0}
                $loading={isLoading}
              >
                Get Zap Out Route
              </Button>
            ) : (
              <Button
                onClick={submitZapOutTx}
                disabled={isTxSubmitting || !calldata}
                $loading={isTxSubmitting}
              >
                Submit Transaction
              </Button>
            )}

            <StatusText
              $success={status.success}
              $error={status.error}
            >
              {status.text}
            </StatusText>

            {!isLoading && !isTxSubmitting && route && !calldata && (
              <Button
                onClick={buildZapOutTx}
                style={{ marginTop: "16px" }}
              >
                Build Transaction
              </Button>
            )}
          </>
        )}

        <Features>
          <li>Remove liquidity and receive single token in one transaction</li>
          <li>Powered by Kyberswap Zap API for optimal routes</li>
          <li>Supports both PancakeSwap V2 and V3 pools</li>
          <li>Customizable slippage tolerance</li>
        </Features>

        <p style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
          Zap Out uses Kyberswap's advanced routing to find the best path for
          removing your liquidity position.
        </p>
      </Card>
    </Container>
  );
}