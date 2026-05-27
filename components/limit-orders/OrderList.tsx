"use client";

import type React from "react";
import { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../app/styles/theme";

// ============================================
// Animations
// ============================================

const spin = keyframes`to { transform: rotate(360deg); }`;

// ============================================
// Styled Components
// ============================================

const Container = styled.div`
  background: ${theme.colors.background.tertiary};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${theme.colors.background.secondary};
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 4px;
`;

const FilterTab = styled.button<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${({ $active }) => ($active ? "#20B8CD" : theme.colors.border.DEFAULT)};
  background: ${({ $active }) => ($active ? "rgba(32,184,205,0.12)" : "transparent")};
  color: ${({ $active }) => ($active ? "#20B8CD" : theme.colors.text.secondary)};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: #20B8CD;
    color: #20B8CD;
  }
`;

const RefreshBtn = styled.button<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: transparent;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.xs};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  svg {
    animation: ${({ $loading }) => ($loading ? `${spin} 0.7s linear infinite` : "none")};
  }

  &:hover {
    border-color: #20B8CD;
    color: #20B8CD;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 0.8fr 1fr 110px;
  gap: 12px;
  padding: 10px 16px;
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};

  @media (max-width: 768px) {
    display: none;
  }
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 0.8fr 1fr 110px;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid ${theme.colors.border.DEFAULT};
  align-items: center;
  transition: background ${theme.transitions.fast};

  &:hover { background: ${theme.colors.background.secondary}; }
  &:last-child { border-bottom: none; }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TokenPair = styled.span`
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.primary};
`;

const TokenAddr = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
  font-family: monospace;
`;

const AmountCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AmountPrimary = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.weights.medium};
`;

const AmountSub = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.text.muted};
`;

const Rate = styled.div`
  font-size: ${theme.typography.sizes.sm};
  color: #F472B6;
  font-weight: ${theme.typography.weights.medium};
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.04em;

  ${({ $status }) => {
    switch ($status) {
      case "active":
      case "open":
        return "background: rgba(32,184,205,0.15); color: #20B8CD;";
      case "filled":
      case "closed":
        return "background: rgba(59,130,246,0.15); color: #3B82F6;";
      case "partiallyFilled":
        return "background: rgba(244,180,82,0.15); color: #F4B452;";
      case "cancelled":
      case "expired":
        return "background: rgba(239,68,68,0.15); color: #EF4444;";
      default:
        return `background: ${theme.colors.background.secondary}; color: ${theme.colors.text.secondary};`;
    }
  }}
`;

const FillBar = styled.div<{ $pct: number }>`
  height: 3px;
  border-radius: 2px;
  background: ${theme.colors.border.DEFAULT};
  margin-top: 4px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: #20B8CD;
    border-radius: 2px;
    transition: width 0.4s ease;
  }
`;

const ExpiryText = styled.div<{ $urgent?: boolean }>`
  font-size: ${theme.typography.sizes.xs};
  color: ${({ $urgent }) => ($urgent ? "#F4B452" : theme.colors.text.muted)};
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $variant?: "primary" | "danger" }>`
  padding: 5px 10px;
  background: ${({ $variant }) =>
    $variant === "primary" ? "#20B8CD" :
    $variant === "danger"  ? "rgba(239,68,68,0.12)" :
    theme.colors.background.secondary};
  border: 1px solid ${({ $variant }) =>
    $variant === "primary" ? "#20B8CD" :
    $variant === "danger"  ? "#EF4444" :
    theme.colors.border.DEFAULT};
  border-radius: ${theme.borderRadius.sm};
  color: ${({ $variant }) =>
    $variant === "primary" ? "white" :
    $variant === "danger"  ? "#EF4444" :
    theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover { opacity: 0.8; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.sizes.sm};
`;

const SpinnerIcon = styled.svg`
  width: 14px;
  height: 14px;
`;

// ============================================
// Types
// ============================================

export interface Order {
  id: string;
  makerAsset: string;
  takerAsset: string;
  /** raw on-chain amounts (base units / wei) */
  makingAmount: string;
  takingAmount: string;
  /** how much of makingAmount has already been filled (base units) */
  filledMakingAmount?: string;
  status: "active" | "open" | "filled" | "closed" | "partiallyFilled" | "cancelled" | "expired";
  createdAt: number;
  expiredAt: number;
  maker: string;
  /** optional: decimals for the maker asset */
  makerDecimals?: number;
  /** optional: decimals for the taker asset */
  takerDecimals?: number;
  /** optional: symbol already resolved */
  makerSymbol?: string;
  takerSymbol?: string;
}

interface TokenMeta {
  symbol: string;
  decimals: number;
}

interface OrderListProps {
  orders: Order[];
  /** Map of address → {symbol, decimals} for display. Falls back to on-chain defaults. */
  tokenMetaMap?: Record<string, TokenMeta>;
  onRefresh: () => void;
  onCancel?: (orderId: string) => void;
  onFill?: (orderId: string) => void;
  isLoading?: boolean;
}

// ============================================
// Helpers
// ============================================

/** Convert raw base-unit amount to human-readable string */
function fromBaseUnits(raw: string, decimals: number): string {
  if (!raw || raw === "0") return "0";
  try {
    const bn = BigInt(raw);
    const divisor = BigInt(10 ** decimals);
    const intPart = bn / divisor;
    const fracPart = bn % divisor;
    if (fracPart === 0n) return intPart.toString();
    const fracStr = fracPart.toString().padStart(decimals, "0").replace(/0+$/, "");
    const short = fracStr.slice(0, 6); // max 6 decimal places for display
    return `${intPart}.${short}`;
  } catch {
    return raw;
  }
}

/** Format a unix timestamp to relative time string */
function formatExpiry(expiredAt: number): { label: string; urgent: boolean } {
  const now = Math.floor(Date.now() / 1000);
  const diff = expiredAt - now;

  if (diff <= 0) return { label: "Expired", urgent: false };
  if (diff < 3600)  return { label: `${Math.floor(diff / 60)}m left`, urgent: true };
  if (diff < 86400) return { label: `${Math.floor(diff / 3600)}h left`, urgent: diff < 7200 };

  const days = Math.floor(diff / 86400);
  return { label: `${days}d left`, urgent: false };
}

/** Default fallback token map (BSC mainnet common tokens) */
const DEFAULT_TOKEN_MAP: Record<string, TokenMeta> = {
  "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": { symbol: "WBNB",  decimals: 18 },
  "0x55d398326f99059ff775485246999027b3197955": { symbol: "USDT",  decimals: 18 },
  "0xe9e7cea3dedca5984780bafc599bd69add087d56": { symbol: "BUSD",  decimals: 18 },
  "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d": { symbol: "USDC",  decimals: 18 },
  "0x5ee54869ecd5e752c31af095187326d4a4d50e1c": { symbol: "ARB",   decimals: 18 },
  "0x2170ed0880ac9a755fd29b2688956bd959f933f8": { symbol: "ETH",   decimals: 18 },
  "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c": { symbol: "BTCB",  decimals: 18 },
  "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3": { symbol: "DAI",   decimals: 18 },
  "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82": { symbol: "CAKE",  decimals: 18 },
};

function resolveToken(
  address: string,
  metaMap: Record<string, TokenMeta>,
  decimalsOverride?: number,
  symbolOverride?: string
): TokenMeta {
  const key = address.toLowerCase();
  if (symbolOverride) {
    return { symbol: symbolOverride, decimals: decimalsOverride ?? 18 };
  }
  return (
    metaMap[key] ??
    DEFAULT_TOKEN_MAP[key] ?? {
      symbol: address.slice(0, 6).toUpperCase() + "…",
      decimals: decimalsOverride ?? 18,
    }
  );
}

type Filter = "all" | "active" | "filled" | "cancelled";

// ============================================
// Component
// ============================================

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  tokenMetaMap = {},
  onRefresh,
  onCancel,
  onFill,
  isLoading = false,
}) => {
  const [filter, setFilter] = useState<Filter>("all");

  const mergedMeta = useMemo(
    () => ({ ...DEFAULT_TOKEN_MAP, ...tokenMetaMap }),
    [tokenMetaMap]
  );

  const filtered = useMemo(() => {
    if (filter === "all") return orders;
    if (filter === "active") return orders.filter((o) => o.status === "active" || o.status === "open" || o.status === "partiallyFilled");
    if (filter === "filled") return orders.filter((o) => o.status === "filled" || o.status === "closed");
    if (filter === "cancelled") return orders.filter((o) => o.status === "cancelled" || o.status === "expired");
    return orders;
  }, [orders, filter]);

  return (
    <Container>
      {/* Toolbar */}
      <Toolbar>
        <FilterTabs>
          {(["all", "active", "filled", "cancelled"] as Filter[]).map((f) => (
            <FilterTab key={f} $active={filter === f} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </FilterTab>
          ))}
        </FilterTabs>

        <RefreshBtn onClick={onRefresh} disabled={isLoading} $loading={isLoading}>
          <SpinnerIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
          </SpinnerIcon>
          {isLoading ? "Loading…" : "Refresh"}
        </RefreshBtn>
      </Toolbar>

      {/* Table header */}
      <TableHeader>
        <span>Pair</span>
        <span>You Pay</span>
        <span>You Receive</span>
        <span>Rate</span>
        <span>Expires</span>
        <span>Actions</span>
      </TableHeader>

      {/* Rows */}
      {filtered.length === 0 ? (
        <EmptyState>
          {filter === "all" ? "No orders found." : `No ${filter} orders.`}
        </EmptyState>
      ) : (
        filtered.map((order) => {
          const makerMeta = resolveToken(order.makerAsset, mergedMeta, order.makerDecimals, order.makerSymbol);
          const takerMeta = resolveToken(order.takerAsset, mergedMeta, order.takerDecimals, order.takerSymbol);

          const makingHuman = fromBaseUnits(order.makingAmount, makerMeta.decimals);
          const takingHuman = fromBaseUnits(order.takingAmount, takerMeta.decimals);

          const makingNum = parseFloat(makingHuman);
          const takingNum = parseFloat(takingHuman);
          const rate = makingNum > 0 ? (takingNum / makingNum).toFixed(6) : "—";

          // Partial fill %
          const fillPct = order.filledMakingAmount
            ? Math.min(
                100,
                Math.round(
                  (Number(BigInt(order.filledMakingAmount) * 100n) /
                    Number(BigInt(order.makingAmount)))
                )
              )
            : order.status === "filled" || order.status === "closed"
            ? 100
            : 0;

          const filledHuman = order.filledMakingAmount
            ? fromBaseUnits(order.filledMakingAmount, makerMeta.decimals)
            : null;

          const expiry = formatExpiry(order.expiredAt);
          const isActive = order.status === "active" || order.status === "open" || order.status === "partiallyFilled";

          return (
            <OrderRow key={order.id}>
              {/* Pair */}
              <TokenInfo>
                <TokenPair>
                  {makerMeta.symbol} → {takerMeta.symbol}
                </TokenPair>
                <TokenAddr>{order.makerAsset.slice(0, 8)}…</TokenAddr>
              </TokenInfo>

              {/* Making amount */}
              <AmountCol>
                <AmountPrimary>{makingHuman} {makerMeta.symbol}</AmountPrimary>
                {filledHuman && (
                  <>
                    <AmountSub>Filled: {filledHuman}</AmountSub>
                    <FillBar $pct={fillPct} />
                  </>
                )}
              </AmountCol>

              {/* Taking amount */}
              <AmountCol>
                <AmountPrimary>{takingHuman} {takerMeta.symbol}</AmountPrimary>
                <AmountSub>
                  <StatusBadge $status={order.status}>{order.status}</StatusBadge>
                </AmountSub>
              </AmountCol>

              {/* Rate */}
              <Rate>
                {rate} {takerMeta.symbol}/{makerMeta.symbol}
              </Rate>

              {/* Expiry */}
              <ExpiryText $urgent={expiry.urgent}>{expiry.label}</ExpiryText>

              {/* Actions */}
              <Actions>
                {isActive && onCancel && (
                  <ActionButton
                    $variant="danger"
                    onClick={() => onCancel(order.id)}
                    disabled={isLoading}
                  >
                    Cancel
                  </ActionButton>
                )}
                {isActive && onFill && (
                  <ActionButton
                    $variant="primary"
                    onClick={() => onFill(order.id)}
                    disabled={isLoading}
                  >
                    Fill
                  </ActionButton>
                )}
              </Actions>
            </OrderRow>
          );
        })
      )}
    </Container>
  );
};

export default OrderList;
