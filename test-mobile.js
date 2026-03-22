const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();
  
  console.log('Testing home page...');
  await page.goto('https://arbitrage-inc.exchange/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/screenshot-home-mobile.png', fullPage: false });
  console.log('Home done');
  
  console.log('Testing swap page...');
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/screenshot-swap-mobile.png', fullPage: false });
  console.log('Swap done');
  
  console.log('Testing zap page...');
  await page.goto('https://arbitrage-inc.exchange/zap', { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: '/home/luca/screenshot-zap-mobile.png', fullPage: false });
  console.log('Zap done');
  
  await browser.close();
  console.log('All screenshots saved!');
})();
