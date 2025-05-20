import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';

test.describe('Wikipedia brazil page', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('test', async ({ page }) => {
    await page.goto('https://www.wikipedia.org/');
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
    await page
      .getByRole('searchbox', { name: 'Search Wikipedia' })
      .fill('brazil');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('#mw-content-text')).toContainText(
      'República Federativa do Brasil'
    );
  });
});
