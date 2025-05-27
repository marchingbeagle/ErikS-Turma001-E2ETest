import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import { ai } from '@zerostep/playwright';

test.describe('Loja Demoblaze - Teste com IA', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Buying an apple iphone 6s', async ({ page }) => {
    const aiArgs = { page, test };
    await page.waitForTimeout(5000);
    await ai(`click in the iphone 6 32gb card`, aiArgs);
    await page.waitForTimeout(5000);
    await ai(`Click in the 'Add to Cart' button`, aiArgs);
    await page.waitForTimeout(5000);
    await ai(`Click in ok button inside the browser popup`, aiArgs);
    await page.waitForTimeout(5000);
    await ai(`Click in the cart button in the navbar`, aiArgs);
    await page.waitForTimeout(5000);
    await ai(`Click in place order`, aiArgs);
    await page.waitForTimeout(5000);
    await ai(`Fill the form with randon information`, aiArgs);
  });
});
