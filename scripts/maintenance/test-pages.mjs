import { chromium } from 'playwright';

const pages = [
  'https://arbitrage-inc.exchange/',
  'https://arbitrage-inc.exchange/swap',
  'https://arbitrage-inc.exchange/zap',
  'https://arbitrage-inc.exchange/bridge',
  'https://arbitrage-inc.exchange/limit-orders',
  'https://arbitrage-inc.exchange/about',
  'https://arbitrage-inc.exchange/contact',
];

const errors = [];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

page.on('console', msg => {
  if (msg.type() === 'error') {
    errors.push(`Console Error: ${msg.text()}`);
  }
});

page.on('pageerror', error => {
  errors.push(`Page Error: ${error.message}`);
});

for (const url of pages) {
  console.log(`Testing: ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`  ✓ Loaded`);
  } catch (e) {
    console.log(`  ✗ Error: ${e.message}`);
  }
}

await browser.close();

console.log('\n=== Errors ===');
errors.length ? errors.forEach(e => console.log(e)) : console.log('No errors!');
