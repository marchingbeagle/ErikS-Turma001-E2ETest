import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test('ZeroStep Example', async ({ page }) => {
  await page.goto('https://5elementslearning.dev/demosite/index.php');

  const aiArgs = { page, test };
  await ai(`click in the courage under fire title`, aiArgs);
});
