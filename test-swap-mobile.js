const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('https://white-page-brown.vercel.app/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/luca/swap-mobile-full.png', fullPage: true });
  await page.screenshot({ path: '/home/luca/swap-mobile-viewport.png', fullPage: false });
  
  await browser.close();
  console.log('Done');
})();
