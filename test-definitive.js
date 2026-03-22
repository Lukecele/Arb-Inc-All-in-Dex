const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  
  await page.goto('https://arbitrage-inc.exchange/swap', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Take initial screenshot
  await page.screenshot({ path: '/home/luca/definitive-initial.png', fullPage: false });
  
  // Click on "Select a token" for output
  const selectButtons = await page.$$eval('button', buttons => 
    buttons.map(b => b.textContent.trim()).filter(t => t.includes('Select a token'))
  );
  if (selectButtons.length > 0) {
    await page.click('button:has-text("Select a token")', { timeout: 10000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/home/luca/definitive-token-select.png', fullPage: false });
    
    // Search for WBNB
    await page.fill('input[placeholder*="earch"]', 'WBNB');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: '/home/luca/definitive-wbnb-search.png', fullPage: false });
    
    // Click on WBNB result
    await page.click('text=Wrapped BNB', { timeout: 10000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/home/luca/definitive-after-select.png', fullPage: false });
    
    // Check if button says Wrap or Swap
    const buttonText = await page.$$eval('button', buttons => 
      buttons.map(b => b.textContent.trim()).filter(t => t.includes('Confirm') || t.includes('Swap'))
    );
    console.log('Button texts:', buttonText);
  }
  
  await browser.close();
  console.log('Done');
})();
