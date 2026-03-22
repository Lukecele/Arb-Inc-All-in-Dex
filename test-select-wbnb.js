const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Click Select a token
  await page.click('button:has-text("Select a token")', { timeout: 10000 });
  await page.waitForTimeout(1500);
  
  // Search WBNB
  await page.fill('input[placeholder*="earch"]', 'WBNB');
  await page.waitForTimeout(1500);
  
  // Click WBNB
  await page.click('text=Wrapped BNB', { timeout: 10000 });
  await page.waitForTimeout(3000);
  
  // Screenshot result
  await page.screenshot({ path: '/home/luca/wrap-final.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
