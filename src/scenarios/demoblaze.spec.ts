import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';

test.describe('Demoblaze store page', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('test', async ({ page }) => {});
});
