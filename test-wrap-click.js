const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  
  // Screenshot initial state
  await page.screenshot({ path: '/home/luca/wrap-step1.png', fullPage: false });
  
  // Click on "Select a token" button for output
  const selectBtn = page.locator('button:has-text("Select a token")').first();
  await selectBtn.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/luca/wrap-step2.png', fullPage: false });
  
  // Search for WBNB
  const searchInput = page.locator('input[placeholder*="earch"]').first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('WBNB');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/luca/wrap-step3.png', fullPage: false });
    
    // Click on WBNB token
    const wbnbOption = page.locator('text=WBNB').first();
    if (await wbnbOption.isVisible()) {
      await wbnbOption.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: '/home/luca/wrap-step4.png', fullPage: false });
    }
  }
  
  await browser.close();
  console.log('Done');
})();
