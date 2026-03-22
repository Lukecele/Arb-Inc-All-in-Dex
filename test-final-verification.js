const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: '/home/luca/final-verification.png', fullPage: false });
  
  await browser.close();
  console.log('Final verification screenshot taken');
})();
