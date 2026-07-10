const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'domcontentloaded' });
  await page.locator('input[name="username"]').fill('john');
  await page.locator('input[name="password"]').fill('demo');
  await page.locator('input[value="Log In"]').click();
  await page.waitForLoadState('networkidle');

  console.log('URL after login:', page.url());

  await page.getByRole('link', { name: 'Open New Account' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('#type').selectOption({ label: 'SAVINGS' });

  const options = await page.locator('#fromAccountId').locator('option').evaluateAll((opts) =>
    opts.map((o) => ({ text: o.textContent?.trim(), value: o.value }))
  );
  console.log('options', JSON.stringify(options));

  await page.locator('#fromAccountId').selectOption({ index: 0 });
  await page.locator('input[value="Open New Account"]').click();
  await page.waitForLoadState('networkidle');

  console.log('After open account url', page.url());

  await page.getByRole('link', { name: 'Accounts Overview' }).click();
  await page.waitForLoadState('networkidle');

  console.log('After overview url', page.url());
  console.log('---TEXT---');
  console.log(await page.locator('body').innerText());
  console.log('---HTML---');
  console.log(await page.locator('body').innerHTML());

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
