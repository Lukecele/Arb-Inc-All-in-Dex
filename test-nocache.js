const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    bypassCSP: true,
  });
  const page = await context.newPage();
  
  // Disable cache
  await page.route('**/*', route => route.continue());
  await page.setExtraHTTPHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Screenshot initial
  await page.screenshot({ path: '/home/luca/test-initial.png', fullPage: false });
  
  // Click Select a token
  await page.click('button:has-text("Select a token")', { timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/luca/test-select.png', fullPage: false });
  
  // Search for WBNB
  await page.fill('input[placeholder*="earch"]', 'WBNB');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/luca/test-wbnb.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
