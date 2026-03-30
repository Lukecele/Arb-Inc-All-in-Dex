import { test, expect } from '@playwright/test';

test.describe('Limit Orders', () => {
  test('Limit order creation page loads with form', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders/create');
    
    await expect(page.locator('h1')).toContainText('Create Limit Order');
    
    // Check form elements
    await expect(page.locator('select#makerAsset')).toBeVisible();
    await expect(page.locator('input#makingAmount')).toBeVisible();
    await expect(page.locator('select#takerAsset')).toBeVisible();
    await expect(page.locator('input#takingAmount')).toBeVisible();
    await expect(page.locator('select#expiry')).toBeVisible();
    
    // Check preview button exists
    await expect(page.locator('button:has-text("Preview Order")')).toBeVisible();
  });

  test('Limit order listing page loads with connect wallet', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders');
    
    await expect(page.locator('h1')).toContainText('Limit Orders');
    await expect(page.locator('text=Connect your wallet')).toBeVisible();
    await expect(page.locator('button:has-text("Connect Wallet")')).toBeVisible();
  });

  test('User can fill limit order form and preview', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders/create');
    
    // Select maker asset
    await page.locator('select#makerAsset').selectOption({ index: 1 });
    
    // Enter making amount
    await page.locator('input#makingAmount').fill('1.0');
    
    // Select taker asset
    await page.locator('select#takerAsset').selectOption({ index: 2 });
    
    // Enter taking amount
    await page.locator('input#takingAmount').fill('300.0');
    
    // Click preview
    await page.locator('button:has-text("Preview Order")').click();
    
    // Check preview appears
    await expect(page.locator('text=Order Preview')).toBeVisible();
    await expect(page.locator('text=1.0')).toBeVisible();
    await expect(page.locator('text=300.0')).toBeVisible();
  });

  test('User can connect wallet and view orders', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders');
    
    // Click connect wallet
    await page.locator('button:has-text("Connect Wallet")').click();
    
    // Check wallet connected state
    await expect(page.locator('text=My Limit Orders')).toBeVisible();
    await expect(page.locator('button:has-text("Create Order")')).toBeVisible();
    
    // Check order list appears
    await expect(page.locator('text=All')).toBeVisible();
    await expect(page.locator('text=Active')).toBeVisible();
    await expect(page.locator('text=Refresh Orders')).toBeVisible();
  });

  test('Order list shows filter buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders');
    
    // Connect wallet
    await page.locator('button:has-text("Connect Wallet")').click();
    
    // Check filter buttons
    await expect(page.locator('button:has-text("All")')).toBeVisible();
    await expect(page.locator('button:has-text("Active")')).toBeVisible();
    await expect(page.locator('button:has-text("Filled")')).toBeVisible();
    await expect(page.locator('button:has-text("Cancelled")')).toBeVisible();
    
    // Click filter buttons
    await page.locator('button:has-text("Active")').click();
    await expect(page.locator('button:has-text("Active")')).toHaveCSS('background-color', /rgb/);
  });

  test('Navigation between create and list pages works', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders/create');
    
    // Check create page
    await expect(page.locator('h1')).toContainText('Create Limit Order');
    
    // Navigate back (assuming there's a back link or we go to list)
    await page.goto('http://localhost:3000/limit-orders');
    
    // Check list page
    await expect(page.locator('h1')).toContainText('Limit Orders');
    
    // Navigate to create from list
    await page.locator('button:has-text("Create Order")').click();
    await expect(page.locator('h1')).toContainText('Create Limit Order');
  });

  test('Form validation works for invalid inputs', async ({ page }) => {
    await page.goto('http://localhost:3000/limit-orders/create');
    
    // Try to preview without filling form
    const previewButton = page.locator('button:has-text("Preview Order")');
    await expect(previewButton).toBeDisabled();
    
    // Fill only one field
    await page.locator('input#makingAmount').fill('1.0');
    await expect(previewButton).toBeDisabled();
    
    // Fill matching token pair (should disable)
    await page.locator('select#makerAsset').selectOption({ index: 1 });
    await page.locator('select#takerAsset').selectOption({ index: 1 }); // Same token
    await expect(previewButton).toBeDisabled();
  });
});