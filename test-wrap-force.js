const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  
  // Click on "Select a token" button for output
  await page.click('button:has-text("Select a token")', { timeout: 10000 });
  await page.waitForTimeout(1500);
  
  // Search for WBNB
  await page.fill('input[placeholder*="earch"]', 'WBNB');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/luca/wrap-search.png', fullPage: false });
  
  // Force click on WBNB
  await page.click('text=WBNB', { force: true });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/luca/wrap-result.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
