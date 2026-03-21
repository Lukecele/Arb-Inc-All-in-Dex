import { test, expect } from '@playwright/test';

test.describe('Zap Page Console Errors', () => {
  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });

    await page.goto('/zap');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }

    expect(consoleErrors).toHaveLength(0);
  });
});