"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../app/styles/theme";

// ============================================
// Animations
// ============================================

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ============================================
// Styled Components
// ============================================

const FormContainer = styled.div`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  max-width: 480px;
  margin: 0 auto;
  animation: ${fadeIn} 0.2s ease;
`;

const Title = styled.h2`
  font-family: ${theme.typography.displayFont};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[6]};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]};
`;

const BalanceHint = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  cursor: pointer;
  &:hover { color: #20B8CD; }
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${({ $error }) => ($error ? "#EF4444" : theme.colors.border.DEFAULT)};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  transition: border-color ${theme.transitions.fast};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#EF4444" : theme.colors.border.focus)};
    box-shadow: 0 0 0 2px ${({ $error }) =>
      $error ? "rgba(239,68,68,0.2)" : "rgba(139,92,246,0.2)"};
  }

  &::placeholder { color: ${theme.colors.text.muted}; }
`;

const ErrorText = styled.p`
  font-size: ${theme.typography.sizes.xs};
  color: #EF4444;
  margin-top: 4px;
`;

const TokenSelectRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Select = styled.select`
  flex: 1;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.sizes.md};
  transition: border-color ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.border.focus};
    box-shadow: 0 0 0 2px rgba(139,92,246,0.2);
  }
`;

const ImportButton = styled.button`
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  color: #20B8CD;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: #20B8CD;
    background: rgba(32,184,205,0.08);
  }
`;

const ImportPanel = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.md};
  animation: ${fadeIn} 0.15s ease;
`;

const ImportRow = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallInput = styled(Input)`
  font-size: ${theme.typography.sizes.sm};
`;

const SmallButton = styled.button`
  padding: 8px 14px;
  background: #20B8CD;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  color: white;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  white-space: nowrap;
  transition: opacity ${theme.transitions.fast};

  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const TokenBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 6px 10px;
  background: rgba(32,184,205,0.1);
  border: 1px solid rgba(32,184,205,0.3);
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.sizes.xs};
  color: #20B8CD;
`;

const SwapArrow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: -8px auto;
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: 50%;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-size: 18px;
  transition: all ${theme.transitions.fast};
  position: relative;
  z-index: 1;

  &:hover {
    border-color: #20B8CD;
    color: #20B8CD;
    transform: rotate(180deg);
  }
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.secondary};
  margin-top: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: ${theme.spacing[4]};
  background: ${theme.colors.primary.gradient};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: transform ${theme.transitions.fast}, opacity ${theme.transitions.fast};

  &:hover { transform: translateY(-1px); opacity: 0.9; }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const SecondaryButton = styled(Button)`
  background: ${theme.colors.background.tertiary};
  border: 1px solid ${theme.colors.border.DEFAULT};
  color: ${theme.colors.text.secondary};

  &:hover { border-color: ${theme.colors.border.hover}; color: ${theme.colors.text.primary}; }
`;

const PreviewSection = styled.div`
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
`;

const PreviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[2]};
  &:last-child { margin-bottom: 0; }
`;

const PreviewLabel = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.secondary};
`;

const PreviewValue = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.medium};
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
`;

const WarningBox = styled.div`
  padding: 10px 14px;
  background: rgba(244,180,82,0.1);
  border: 1px solid rgba(244,180,82,0.3);
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.sizes.xs};
  color: #F4B452;
  margin-top: 8px;
`;

// ============================================
// Types
// ============================================

export interface TokenOption {
  address: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  balance?: string; // raw on-chain balance (in wei/base units)
}

export interface OrderFormData {
  makerAsset: string;
  takerAsset: string;
  /** raw on-chain amount (base units, e.g. wei) */
  makingAmount: string;
  /** raw on-chain amount (base units) */
  takingAmount: string;
  expiredAt: number;
}

interface LimitOrderFormProps {
  availableTokens: TokenOption[];
  onSubmit: (order: OrderFormData) => void;
  /** Called when user wants to import a custom token by address */
  onImportToken?: (address: string) => Promise<TokenOption | null>;
  isLoading?: boolean;
  chainId?: number;
}

// ============================================
// Constants
// ============================================

const EXPIRY_OPTIONS = [
  { label: "10 minutes", value: 600 },
  { label: "1 hour",     value: 3600 },
  { label: "6 hours",    value: 21600 },
  { label: "12 hours",   value: 43200 },
  { label: "1 day",      value: 86400 },
  { label: "3 days",     value: 259200 },
  { label: "7 days",     value: 604800 },
  { label: "30 days",    value: 2592000 },
];

// ============================================
// Helpers
// ============================================

/** Convert a human-readable decimal string to base units (e.g. "1.5" with decimals=18 → "1500000000000000000") */
function toBaseUnits(value: string, decimals: number): string {
  if (!value || isNaN(Number(value))) return "0";
  const [int, frac = ""] = value.split(".");
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals);
  const raw = BigInt(int) * BigInt(10 ** decimals) + BigInt(fracPadded || "0");
  return raw.toString();
}

/** Convert base units to human-readable string */
function fromBaseUnits(value: string, decimals: number): string {
  if (!value || value === "0") return "0";
  const bn = BigInt(value);
  const divisor = BigInt(10 ** decimals);
  const intPart = bn / divisor;
  const fracPart = bn % divisor;
  if (fracPart === 0n) return intPart.toString();
  const fracStr = fracPart.toString().padStart(decimals, "0").replace(/0+$/, "");
  return `${intPart}.${fracStr}`;
}

/** Check if the input amount exceeds the user's balance */
function exceedsBalance(amount: string, balance: string | undefined, decimals: number): boolean {
  if (!balance || !amount || amount === "" || Number(amount) === 0) return false;
  try {
    return BigInt(toBaseUnits(amount, decimals)) > BigInt(balance);
  } catch {
    return false;
  }
}

// Minimal ERC-20 ABI for on-chain token lookup
const ERC20_ABI_FRAGMENT = [
  { inputs: [], name: "symbol",   outputs: [{ type: "string" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "decimals", outputs: [{ type: "uint8"  }], stateMutability: "view", type: "function" },
  { inputs: [], name: "name",     outputs: [{ type: "string" }], stateMutability: "view", type: "function" },
];

// ============================================
// Component
// ============================================

export const LimitOrderForm: React.FC<LimitOrderFormProps> = ({
  availableTokens,
  onSubmit,
  onImportToken,
  isLoading = false,
  chainId,
}) => {
  // Token state
  const [allTokens, setAllTokens] = useState<TokenOption[]>(availableTokens);
  const [makerAsset, setMakerAsset] = useState("");
  const [takerAsset, setTakerAsset] = useState("");

  // Amount state (human-readable)
  const [makingAmountHuman, setMakingAmountHuman] = useState("");
  const [takingAmountHuman, setTakingAmountHuman] = useState("");

  // Expiry & UI state
  const [expiry, setExpiry] = useState(3600);
  const [showPreview, setShowPreview] = useState(false);

  // Custom token import
  const [showMakerImport, setShowMakerImport] = useState(false);
  const [showTakerImport, setShowTakerImport] = useState(false);
  const [importAddress, setImportAddress] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");

  // Keep allTokens in sync if parent updates availableTokens
  useEffect(() => {
    setAllTokens((prev) => {
      const existing = new Map(prev.map((t) => [t.address.toLowerCase(), t]));
      availableTokens.forEach((t) => existing.set(t.address.toLowerCase(), t));
      return Array.from(existing.values());
    });
  }, [availableTokens]);

  const selectedMakerToken = allTokens.find(
    (t) => t.address.toLowerCase() === makerAsset.toLowerCase()
  );
  const selectedTakerToken = allTokens.find(
    (t) => t.address.toLowerCase() === takerAsset.toLowerCase()
  );

  // Derived validation
  const makerExceedsBalance = exceedsBalance(
    makingAmountHuman,
    selectedMakerToken?.balance,
    selectedMakerToken?.decimals ?? 18
  );

  const isValid =
    !!makerAsset &&
    !!takerAsset &&
    !!makingAmountHuman &&
    !!takingAmountHuman &&
    Number(makingAmountHuman) > 0 &&
    Number(takingAmountHuman) > 0 &&
    makerAsset.toLowerCase() !== takerAsset.toLowerCase() &&
    !makerExceedsBalance;

  // Price calculation
  const pricePerToken = React.useMemo(() => {
    const m = parseFloat(makingAmountHuman);
    const t = parseFloat(takingAmountHuman);
    if (!m || !t || m === 0) return null;
    return (t / m).toFixed(6);
  }, [makingAmountHuman, takingAmountHuman]);

  const inversePrice = React.useMemo(() => {
    const m = parseFloat(makingAmountHuman);
    const t = parseFloat(takingAmountHuman);
    if (!m || !t || t === 0) return null;
    return (m / t).toFixed(6);
  }, [makingAmountHuman, takingAmountHuman]);

  // Swap maker/taker
  const handleSwapTokens = () => {
    const prevMaker = makerAsset;
    const prevTaker = takerAsset;
    const prevMaking = makingAmountHuman;
    const prevTaking = takingAmountHuman;
    setMakerAsset(prevTaker);
    setTakerAsset(prevMaker);
    setMakingAmountHuman(prevTaking);
    setTakingAmountHuman(prevMaking);
  };

  // Set max balance
  const handleSetMax = () => {
    if (!selectedMakerToken?.balance) return;
    setMakingAmountHuman(
      fromBaseUnits(selectedMakerToken.balance, selectedMakerToken.decimals)
    );
  };

  // Custom token import
  const handleImport = useCallback(
    async (forMaker: boolean) => {
      if (!importAddress || !/^0x[0-9a-fA-F]{40}$/.test(importAddress)) {
        setImportError("Insert a valid EVM address (0x...)");
        return;
      }
      setImportLoading(true);
      setImportError("");

      try {
        let token: TokenOption | null = null;

        if (onImportToken) {
          token = await onImportToken(importAddress);
        } else {
          // Fallback: minimal on-chain fetch via public RPC if available
          token = {
            address: importAddress,
            symbol: importAddress.slice(0, 6).toUpperCase(),
            decimals: 18,
          };
        }

        if (!token) {
          setImportError("Token not found on this chain.");
          return;
        }

        setAllTokens((prev) => {
          const exists = prev.find(
            (t) => t.address.toLowerCase() === token!.address.toLowerCase()
          );
          return exists ? prev : [...prev, token!];
        });

        if (forMaker) {
          setMakerAsset(token.address);
          setShowMakerImport(false);
        } else {
          setTakerAsset(token.address);
          setShowTakerImport(false);
        }

        setImportAddress("");
      } catch (e) {
        setImportError("Error loading token. Check address and network.");
      } finally {
        setImportLoading(false);
      }
    },
    [importAddress, onImportToken]
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValid || !selectedMakerToken || !selectedTakerToken) return;

    const expiredAt = Math.floor(Date.now() / 1000) + expiry;

    onSubmit({
      makerAsset,
      takerAsset,
      makingAmount: toBaseUnits(makingAmountHuman, selectedMakerToken.decimals),
      takingAmount: toBaseUnits(takingAmountHuman, selectedTakerToken.decimals),
      expiredAt,
    });
  };

  // ── Preview screen ──────────────────────────────────────────────────────────
  if (showPreview) {
    const expiryLabel = EXPIRY_OPTIONS.find((o) => o.value === expiry)?.label ?? `${expiry}s`;
    const expiryDate = new Date(Date.now() + expiry * 1000).toLocaleString();

    return (
      <FormContainer>
        <Title>Order Preview</Title>

        <PreviewSection>
          <PreviewRow>
            <PreviewLabel>You pay:</PreviewLabel>
            <PreviewValue>
              {makingAmountHuman} {selectedMakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>

          <PreviewRow>
            <PreviewLabel>You receive:</PreviewLabel>
            <PreviewValue>
              {takingAmountHuman} {selectedTakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>

          <PreviewRow>
            <PreviewLabel>Rate:</PreviewLabel>
            <PreviewValue>
              1 {selectedMakerToken?.symbol} = {pricePerToken} {selectedTakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>

          <PreviewRow>
            <PreviewLabel>Inverse rate:</PreviewLabel>
            <PreviewValue>
              1 {selectedTakerToken?.symbol} = {inversePrice} {selectedMakerToken?.symbol}
            </PreviewValue>
          </PreviewRow>

          <PreviewRow>
            <PreviewLabel>Expires:</PreviewLabel>
            <PreviewValue>{expiryLabel} — {expiryDate}</PreviewValue>
          </PreviewRow>

          <PreviewRow>
            <PreviewLabel>Maker asset (raw):</PreviewLabel>
            <PreviewValue style={{ fontSize: "10px", wordBreak: "break-all" }}>
              {toBaseUnits(makingAmountHuman, selectedMakerToken?.decimals ?? 18)}
            </PreviewValue>
          </PreviewRow>

          <PreviewRow>
            <PreviewLabel>Taker asset (raw):</PreviewLabel>
            <PreviewValue style={{ fontSize: "10px", wordBreak: "break-all" }}>
              {toBaseUnits(takingAmountHuman, selectedTakerToken?.decimals ?? 18)}
            </PreviewValue>
          </PreviewRow>
        </PreviewSection>

        <WarningBox>
          ⚠️ Gasless order — no gas fee to create or cancel, but you must have approved the KyberSwap LO contract to spend your tokens.
        </WarningBox>

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <SecondaryButton type="button" onClick={() => setShowPreview(false)}>
            Back
          </SecondaryButton>
          <Button type="button" onClick={() => handleSubmit()} disabled={isLoading}>
            {isLoading ? <><Spinner />Creating…</> : "Confirm & Sign"}
          </Button>
        </div>
      </FormContainer>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <FormContainer>
      <Title>Create Limit Order</Title>

      <form onSubmit={handleSubmit}>
        {/* ── MAKER TOKEN ── */}
        <FormGroup>
          <Label htmlFor="makerAsset">
            You pay
            {selectedMakerToken?.balance && (
              <BalanceHint onClick={handleSetMax}>
                Balance:{" "}
                {parseFloat(
                  fromBaseUnits(selectedMakerToken.balance, selectedMakerToken.decimals)
                ).toFixed(4)}{" "}
                {selectedMakerToken.symbol} (Max)
              </BalanceHint>
            )}
          </Label>

          <TokenSelectRow>
            <Select
              id="makerAsset"
              value={makerAsset}
              onChange={(e) => {
                setMakerAsset(e.target.value);
                setShowMakerImport(false);
              }}
              required
            >
              <option value="">Select token</option>
              {allTokens.map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
            </Select>
            <ImportButton
              type="button"
              onClick={() => {
                setShowMakerImport((v) => !v);
                setShowTakerImport(false);
                setImportAddress("");
                setImportError("");
              }}
            >
              + Custom
            </ImportButton>
          </TokenSelectRow>

          {showMakerImport && (
            <ImportPanel>
              <ImportRow>
                <SmallInput
                  type="text"
                  placeholder="Token address (0x...)"
                  value={importAddress}
                  onChange={(e) => { setImportAddress(e.target.value); setImportError(""); }}
                />
                <SmallButton
                  type="button"
                  disabled={importLoading}
                  onClick={() => handleImport(true)}
                >
                  {importLoading ? <Spinner /> : "Import"}
                </SmallButton>
              </ImportRow>
              {importError && <ErrorText>{importError}</ErrorText>}
            </ImportPanel>
          )}

          {selectedMakerToken && (
            <TokenBadge>
              ✓ {selectedMakerToken.symbol} · {selectedMakerToken.decimals} decimals ·{" "}
              {selectedMakerToken.address.slice(0, 10)}…
            </TokenBadge>
          )}
        </FormGroup>

        {/* ── MAKER AMOUNT ── */}
        <FormGroup>
          <Label htmlFor="makingAmount">Amount</Label>
          <Input
            id="makingAmount"
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            value={makingAmountHuman}
            onChange={(e) => setMakingAmountHuman(e.target.value)}
            $error={makerExceedsBalance}
            required
          />
          {makerExceedsBalance && (
            <ErrorText>Amount exceeds your balance.</ErrorText>
          )}
        </FormGroup>

        {/* ── SWAP ARROW ── */}
        <SwapArrow type="button" onClick={handleSwapTokens} title="Swap tokens">
          ⇅
        </SwapArrow>

        {/* ── TAKER TOKEN ── */}
        <FormGroup>
          <Label htmlFor="takerAsset">You receive</Label>

          <TokenSelectRow>
            <Select
              id="takerAsset"
              value={takerAsset}
              onChange={(e) => {
                setTakerAsset(e.target.value);
                setShowTakerImport(false);
              }}
              required
            >
              <option value="">Select token</option>
              {allTokens.map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
            </Select>
            <ImportButton
              type="button"
              onClick={() => {
                setShowTakerImport((v) => !v);
                setShowMakerImport(false);
                setImportAddress("");
                setImportError("");
              }}
            >
              + Custom
            </ImportButton>
          </TokenSelectRow>

          {showTakerImport && (
            <ImportPanel>
              <ImportRow>
                <SmallInput
                  type="text"
                  placeholder="Token address (0x...)"
                  value={importAddress}
                  onChange={(e) => { setImportAddress(e.target.value); setImportError(""); }}
                />
                <SmallButton
                  type="button"
                  disabled={importLoading}
                  onClick={() => handleImport(false)}
                >
                  {importLoading ? <Spinner /> : "Import"}
                </SmallButton>
              </ImportRow>
              {importError && <ErrorText>{importError}</ErrorText>}
            </ImportPanel>
          )}

          {selectedTakerToken && (
            <TokenBadge>
              ✓ {selectedTakerToken.symbol} · {selectedTakerToken.decimals} decimals ·{" "}
              {selectedTakerToken.address.slice(0, 10)}…
            </TokenBadge>
          )}
        </FormGroup>

        {/* ── TAKER AMOUNT ── */}
        <FormGroup>
          <Label htmlFor="takingAmount">Amount</Label>
          <Input
            id="takingAmount"
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            value={takingAmountHuman}
            onChange={(e) => setTakingAmountHuman(e.target.value)}
            required
          />
        </FormGroup>

        {/* ── LIVE PRICE INFO ── */}
        {pricePerToken && selectedMakerToken && selectedTakerToken && (
          <PriceInfo>
            <span>
              1 {selectedMakerToken.symbol} = {pricePerToken} {selectedTakerToken.symbol}
            </span>
            <span>
              1 {selectedTakerToken.symbol} = {inversePrice} {selectedMakerToken.symbol}
            </span>
          </PriceInfo>
        )}

        {/* ── EXPIRY ── */}
        <FormGroup style={{ marginTop: theme.spacing[4] }}>
          <Label htmlFor="expiry">Expires in</Label>
          <Select
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(Number(e.target.value))}
          >
            {EXPIRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button
          type="button"
          onClick={() => setShowPreview(true)}
          disabled={!isValid}
          style={{ marginTop: "16px" }}
        >
          Preview Order
        </Button>
      </form>
    </FormContainer>
  );
};

export default LimitOrderForm;
