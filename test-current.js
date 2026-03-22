const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: '/home/luca/current-swap.png', fullPage: true });
  
  await browser.close();
  console.log('Done');
})();
