import { test, expect } from "@playwright/test";
import {
  SAFE_FACTOR,
  SECURE_THRESHOLD,
  WARNING_THRESHOLD,
  calculateDistributableYield,
  calculateProRataShare,
  applyPaperHandPenalty,
  computeHoldingPointsGain,
  computeReferralBonus,
  evaluateSolvencyRatio,
} from "../lib/financial-math";

test.describe("Arbitrage Inc - Financial & Solvency Mathematical Engine", () => {
  test.describe("Distributable Yield & Protocol Safety Margin", () => {
    test("calculates net distributable yield using SAFE_FACTOR (0.73)", () => {
      const inboundDelta = 10.0; // 10 BNB detected
      const result = calculateDistributableYield(inboundDelta);
      expect(result).toBeCloseTo(7.3, 5);
    });

    test("returns 0 when inbound delta is zero or negative", () => {
      expect(calculateDistributableYield(0)).toBe(0);
      expect(calculateDistributableYield(-5)).toBe(0);
    });
  });

  test.describe("Pro-Rata Yield Distribution", () => {
    test("distributes rewards proportionally among holders", () => {
      const totalDistributable = 7.3; // 7.3 BNB
      const totalPoints = 1000.0;
      
      const userAPoints = 600.0; // 60%
      const userBPoints = 400.0; // 40%

      const userAShare = calculateProRataShare(userAPoints, totalPoints, totalDistributable);
      const userBShare = calculateProRataShare(userBPoints, totalPoints, totalDistributable);

      expect(userAShare).toBeCloseTo(4.38, 4);
      expect(userBShare).toBeCloseTo(2.92, 4);
      expect(userAShare + userBShare).toBeCloseTo(totalDistributable, 4);
    });

    test("returns 0 for zero user points or total points", () => {
      expect(calculateProRataShare(0, 1000, 5)).toBe(0);
      expect(calculateProRataShare(100, 0, 5)).toBe(0);
    });
  });

  test.describe("Diamond vs Paper Hand Status & Penalties", () => {
    test("applies exact 5% malus penalty upon selling tokens", () => {
      const initialPoints = 1000.0;
      const penalized = applyPaperHandPenalty(initialPoints);
      expect(penalized).toBe(950.0);
    });

    test("handles zero or negative points gracefully", () => {
      expect(applyPaperHandPenalty(0)).toBe(0);
      expect(applyPaperHandPenalty(-10)).toBe(0);
    });
  });

  test.describe("Holding Points Calculation (9 Decimals)", () => {
    test("calculates correct point gain for 10M token balance", () => {
      // 10,000,000 tokens with 9 decimals = 10,000,000 * 10^9
      const rawHolding = 10_000_000n * (10n ** 9n);
      const points = computeHoldingPointsGain(rawHolding);
      // (10_000_000 / 1_000_000) * 10 = 100 points
      expect(points).toBe(100);
    });

    test("returns 0 for zero or negative balance", () => {
      expect(computeHoldingPointsGain(0n)).toBe(0);
    });
  });

  test.describe("Referral Commission Bonus", () => {
    test("calculates exact 10% referral reward for referrer", () => {
      const pointsGained = 150.0;
      const referralBonus = computeReferralBonus(pointsGained);
      expect(referralBonus).toBe(15.0);
    });
  });

  test.describe("Treasury Solvency Diagnostics (Health Check)", () => {
    test("reports SECURE when utilization is below or equal to 80%", () => {
      const obligations = 8.0;
      const reserve = 10.0; // 80%
      const { ratioPercent, status } = evaluateSolvencyRatio(obligations, reserve);
      expect(ratioPercent).toBe(80.0);
      expect(status).toBe("SECURE");
    });

    test("reports WARNING when utilization is between 80% and 95%", () => {
      const obligations = 8.5;
      const reserve = 10.0; // 85%
      const { ratioPercent, status } = evaluateSolvencyRatio(obligations, reserve);
      expect(ratioPercent).toBe(85.0);
      expect(status).toBe("WARNING");
    });

    test("reports CRITICAL when utilization exceeds 95%", () => {
      const obligations = 9.8;
      const reserve = 10.0; // 98%
      const { ratioPercent, status } = evaluateSolvencyRatio(obligations, reserve);
      expect(ratioPercent).toBe(98.0);
      expect(status).toBe("CRITICAL");
    });

    test("reports CRITICAL when reserve is empty but obligations exist", () => {
      const { status } = evaluateSolvencyRatio(5.0, 0);
      expect(status).toBe("CRITICAL");
    });
  });
});
