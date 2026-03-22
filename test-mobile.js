const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://white-page-brown.vercel.app/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/swap-mobile.png' });
  await page.goto('https://white-page-brown.vercel.app/zap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/zap-mobile.png' });
  await browser.close();
  console.log('Done');
})();
