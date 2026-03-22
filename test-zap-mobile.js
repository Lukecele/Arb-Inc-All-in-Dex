const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('https://white-page-brown.vercel.app/zap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/luca/zap-mobile-full.png', fullPage: true });
  console.log('Full page screenshot saved');
  
  await page.screenshot({ path: '/home/luca/zap-mobile-viewport.png', fullPage: false });
  console.log('Viewport screenshot saved');
  
  await browser.close();
})();
