const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  // Click on "Select a token" button
  const selectToken = await page.getByText('Select a token');
  if (selectToken) {
    await selectToken.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/luca/token-select.png', fullPage: false });
    
    // Type WBNB in search
    const searchInput = await page.locator('input[placeholder*="Search"]').first();
    if (searchInput) {
      await searchInput.fill('WBNB');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: '/home/luca/wbnb-search.png', fullPage: false });
    }
  }
  
  await browser.close();
  console.log('Done');
})();
