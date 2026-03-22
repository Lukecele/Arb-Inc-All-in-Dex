const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('https://white-page-brown.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/test-home.png' });
  console.log('Home done');
  
  await page.goto('https://white-page-brown.vercel.app/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/test-swap.png' });
  console.log('Swap done');
  
  await page.goto('https://white-page-brown.vercel.app/zap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/test-zap.png' });
  console.log('Zap done');
  
  await browser.close();
  console.log('All done');
})();
