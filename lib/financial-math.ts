/**
 * Arbitrage Inc: Core Financial & Solvency Mathematical Engine
 * Pure deterministic calculation functions for on-chain yield distribution and solvency diagnostics.
 */

export const SAFE_FACTOR = 0.73;
export const SECURE_THRESHOLD = 80.0;
export const WARNING_THRESHOLD = 95.0;
export const PAPER_HAND_PENALTY = 0.05;
export const REFERRAL_BONUS_RATE = 0.10;
export const HOLDING_MULTIPLIER = 10;

/**
 * Calculates the net distributable yield after applying protocol safety margin buffer.
 */
export function calculateDistributableYield(inboundDelta: number, safeFactor = SAFE_FACTOR): number {
  if (inboundDelta <= 0) return 0;
  return inboundDelta * safeFactor;
}

/**
 * Calculates a holder pro-rata share of the distributed yield based on their leaderboard score.
 */
export function calculateProRataShare(userPoints: number, totalPoints: number, toDistribute: number): number {
  if (totalPoints <= 0 || userPoints <= 0 || toDistribute <= 0) return 0;
  return toDistribute * (userPoints / totalPoints);
}

/**
 * Applies a malus penalty when a wallet sells tokens (Paper-hand status).
 */
export function applyPaperHandPenalty(currentPoints: number, penaltyRate = PAPER_HAND_PENALTY): number {
  if (currentPoints <= 0) return 0;
  return currentPoints * (1 - penaltyRate);
}

/**
 * Computes holding reward points gained based on raw token balance (9 decimals).
 */
export function computeHoldingPointsGain(rawHoldingWei: bigint, multiplier = HOLDING_MULTIPLIER): number {
  if (rawHoldingWei <= BigInt(0)) return 0;
  const tokenCount = Number(rawHoldingWei / (BigInt(10) ** BigInt(9)));
  return (tokenCount / 1_000_000) * multiplier;
}

/**
 * Computes referral commission points awarded to the referrer.
 */
export function computeReferralBonus(pointsGained: number, rate = REFERRAL_BONUS_RATE): number {
  if (pointsGained <= 0) return 0;
  return pointsGained * rate;
}

export type SolvencyStatus = "SECURE" | "WARNING" | "CRITICAL";

/**
 * Diagnoses treasury solvency health based on user obligations vs on-chain reserve balance.
 */
export function evaluateSolvencyRatio(totalObligationsBnb: number, treasuryReserveBnb: number): {
  ratioPercent: number;
  status: SolvencyStatus;
} {
  if (treasuryReserveBnb <= 0) {
    return { ratioPercent: totalObligationsBnb > 0 ? Infinity : 0, status: "CRITICAL" };
  }
  const rawRatio = (totalObligationsBnb / treasuryReserveBnb) * 100;
  const ratioPercent = parseFloat(rawRatio.toFixed(4));
  let status: SolvencyStatus = "CRITICAL";
  if (ratioPercent <= SECURE_THRESHOLD) {
    status = "SECURE";
  } else if (ratioPercent <= WARNING_THRESHOLD) {
    status = "WARNING";
  }
  return { ratioPercent, status };
}
