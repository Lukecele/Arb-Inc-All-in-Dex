import { test, expect } from '@playwright/test';

test.describe('Zap Page', () => {
  test('should load and display content', async ({ page }) => {
    await page.goto('/zap');
    await page.waitForLoadState('networkidle');
    
    const content = await page.content();
    expect(content.length).toBeGreaterThan(1000);
    
    const title = page.locator('text=Liquidity Zap').first();
    await expect(title).toBeVisible({ timeout: 10000 });
    
    const zapInTab = page.locator('text=Zap In').first();
    await expect(zapInTab).toBeVisible();
    
    const zapOutTab = page.locator('text=Zap Out').first();
    await expect(zapOutTab).toBeVisible();
    
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('Liquidity Zap');
  });
  
  test('should switch between tabs', async ({ page }) => {
    await page.goto('/zap');
    await page.waitForLoadState('networkidle');
    
    await page.locator('text=Zap Out (Remove Liquidity)').click();
    
    const zapOutContent = page.locator('text=Zap Out allows you to remove liquidity').first();
    await expect(zapOutContent).toBeVisible();
    
    await page.locator('text=Zap In (Add Liquidity)').click();
    
    const zapInTab = page.locator('text=Zap In (Add Liquidity)').first();
    await expect(zapInTab).toBeVisible();
  });
});