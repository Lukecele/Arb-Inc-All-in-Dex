import { test, expect } from '@playwright/test';

test('swap page loads without wallet', async ({ page }) => {
  await page.goto('/swap');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Swap on BSC')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=Connect Wallet')).toBeVisible();
});