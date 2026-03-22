const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Trying DexScreener search...');
    await page.goto('https://dexscreener.com', { timeout: 45000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    
    const searchInput = await page.$('input');
    if (searchInput) {
      await searchInput.fill('0x5EE54869Ecd5E752C31aF095187326D4A4D50e1c');
      await page.waitForTimeout(5000);
      
      const url = page.url();
      console.log('URL after search:', url);
      
      const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 8000));
      console.log('Results:', bodyText);
    } else {
      console.log('No search input found');
    }
    
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
})();
