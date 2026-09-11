import { test, describe } from "node:test";
import assert from "node:assert/strict";

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
} from "../lib/financial-math.ts";

describe("Arbitrage Inc - Financial & Solvency Mathematical Engine", () => {
  describe("Distributable Yield & Protocol Safety Margin", () => {
    test("calculates net distributable yield using SAFE_FACTOR (0.73)", () => {
      const inboundDelta = 10.0;
      const result = calculateDistributableYield(inboundDelta);
      assert.ok(Math.abs(result - 7.3) < 1e-5);
    });

    test("returns 0 when inbound delta is zero or negative", () => {
      assert.equal(calculateDistributableYield(0), 0);
      assert.equal(calculateDistributableYield(-5), 0);
    });
  });

  describe("Pro-Rata Yield Distribution", () => {
    test("distributes rewards proportionally among holders", () => {
      const totalDistributable = 7.3;
      const totalPoints = 1000.0;
      
      const userAPoints = 600.0;
      const userBPoints = 400.0;

      const userAShare = calculateProRataShare(userAPoints, totalPoints, totalDistributable);
      const userBShare = calculateProRataShare(userBPoints, totalPoints, totalDistributable);

      assert.ok(Math.abs(userAShare - 4.38) < 1e-4);
      assert.ok(Math.abs(userBShare - 2.92) < 1e-4);
      assert.ok(Math.abs((userAShare + userBShare) - totalDistributable) < 1e-4);
    });

    test("returns 0 for zero user points or total points", () => {
      assert.equal(calculateProRataShare(0, 1000, 5), 0);
      assert.equal(calculateProRataShare(100, 0, 5), 0);
    });
  });

  describe("Diamond vs Paper Hand Status & Penalties", () => {
    test("applies exact 5% malus penalty upon selling tokens", () => {
      const initialPoints = 1000.0;
      const penalized = applyPaperHandPenalty(initialPoints);
      assert.equal(penalized, 950.0);
    });

    test("handles zero or negative points gracefully", () => {
      assert.equal(applyPaperHandPenalty(0), 0);
      assert.equal(applyPaperHandPenalty(-10), 0);
    });
  });

  describe("Holding Points Calculation (9 Decimals)", () => {
    test("calculates correct point gain for 10M token balance", () => {
      const rawHolding = 10_000_000n * (10n ** 9n);
      const points = computeHoldingPointsGain(rawHolding);
      assert.equal(points, 100);
    });

    test("returns 0 for zero or negative balance", () => {
      assert.equal(computeHoldingPointsGain(0n), 0);
    });
  });

  describe("Referral Commission Bonus", () => {
    test("calculates exact 10% referral reward for referrer", () => {
      const pointsGained = 150.0;
      const referralBonus = computeReferralBonus(pointsGained);
      assert.equal(referralBonus, 15.0);
    });
  });

  describe("Treasury Solvency Diagnostics (Health Check)", () => {
    test("reports SECURE when utilization is below or equal to 80%", () => {
      const obligations = 8.0;
      const reserve = 10.0;
      const { ratioPercent, status } = evaluateSolvencyRatio(obligations, reserve);
      assert.equal(ratioPercent, 80.0);
      assert.equal(status, "SECURE");
    });

    test("reports WARNING when utilization is between 80% and 95%", () => {
      const obligations = 8.5;
      const reserve = 10.0;
      const { ratioPercent, status } = evaluateSolvencyRatio(obligations, reserve);
      assert.equal(ratioPercent, 85.0);
      assert.equal(status, "WARNING");
    });

    test("reports CRITICAL when utilization exceeds 95%", () => {
      const obligations = 9.8;
      const reserve = 10.0;
      const { ratioPercent, status } = evaluateSolvencyRatio(obligations, reserve);
      assert.equal(ratioPercent, 98.0);
      assert.equal(status, "CRITICAL");
    });

    test("reports CRITICAL when reserve is empty but obligations exist", () => {
      const { status } = evaluateSolvencyRatio(5.0, 0);
      assert.equal(status, "CRITICAL");
    });
  });
});
