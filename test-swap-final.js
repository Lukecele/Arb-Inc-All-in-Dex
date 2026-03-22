const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/luca/swap-final-viewport.png', fullPage: false });
  await page.screenshot({ path: '/home/luca/swap-final-full.png', fullPage: true });
  
  await browser.close();
  console.log('Done');
})();
