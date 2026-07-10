const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'domcontentloaded' });
  await page.locator('input[name="username"]').fill('john');
  await page.locator('input[name="password"]').fill('demo');
  await page.locator('input[value="Log In"]').click();
  await page.waitForLoadState('networkidle');

  await page.getByRole('link', { name: 'Find Transactions' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('#amount').fill('500');
  await page.locator('#findByAmount').click();
  await page.waitForLoadState('networkidle');

  console.log('URL:', page.url());
  console.log('Error visible:', await page.locator('#errorContainer').isVisible());
  console.log('Result container visible:', await page.locator('#resultContainer').isVisible());
  console.log('Result HTML:', await page.locator('#resultContainer').innerHTML());
  console.log('Table text:', await page.locator('#transactionTable').innerText());

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
