import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';

test.describe('Loja Demoblaze - Testes Principais', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('deve navegar para a página de detalhes do produto', async ({
    page
  }) => {
    await page.waitForSelector('.card-block');

    const firstProductLink = page.locator('.card-title a').first();
    const productName = await firstProductLink.textContent();
    await firstProductLink.click();

    await expect(page.locator('#tbodyid')).toBeVisible();
    await expect(page.getByText('Add to cart')).toBeVisible();

    await expect(page.locator('.name')).toContainText(productName || '');
    await expect(page.locator('.price-container')).toBeVisible();
  });

  test('deve adicionar produto ao carrinho', async ({ page }) => {
    await page.waitForSelector('.card-block');
    await page.locator('.card-title a').first().click();

    await page.getByText('Add to cart').click();

    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Product added');
      await dialog.accept();
    });

    await page.locator('#cartur').click();

    await expect(page.locator('#tbodyid')).toBeVisible();
  });

  test('deve verificar funcionalidade de finalizar pedido do carrinho', async ({
    page
  }) => {
    await page.waitForSelector('.card-block');
    await page.locator('.card-title a').first().click();
    await page.getByText('Add to cart').click();

    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await page.locator('#cartur').click();

    await page.getByRole('button', { name: 'Place Order' }).click();

    await expect(page.locator('#orderModal')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Place order' })
    ).toBeVisible();

    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#country')).toBeVisible();
    await expect(page.locator('#city')).toBeVisible();
    await expect(page.locator('#card')).toBeVisible();
    await expect(page.locator('#month')).toBeVisible();
    await expect(page.locator('#year')).toBeVisible();

    await page.locator('#name').fill('Test User');
    await page.locator('#country').fill('Test Country');
    await page.locator('#city').fill('Test City');
    await page.locator('#card').fill('1234567890123456');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2025');

    await page.getByRole('button', { name: 'Purchase' }).click();

    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Thank you for your purchase');
      await dialog.accept();
    });
  });
});
