const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  // Home page
  await page.goto('https://arbitrage-inc.exchange/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/luca/verify-home.png', fullPage: false });
  
  // Swap page
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/luca/verify-swap.png', fullPage: false });
  
  // Zap page
  await page.goto('https://arbitrage-inc.exchange/zap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/luca/verify-zap.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
