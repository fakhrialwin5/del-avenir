import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('homepage loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/Del'?Avenir/i);

    expect(consoleErrors).toHaveLength(0);
  });

  test('all nav links work', async ({ page }) => {
    await page.goto('/');

    // Collect all internal links
    const links = await page.$$eval('a[href^="/"]', (anchors) =>
      anchors.map((a) => (a as HTMLAnchorElement).getAttribute('href'))
    );

    const uniqueLinks = [...new Set(links.filter(Boolean))];

    for (const href of uniqueLinks) {
      const response = await page.goto(href!);
      expect(response?.status()).toBeLessThan(400);
      await page.goBack();
    }
  });

  test('mobile nav works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hamburger button (aria-label toggles between Open/Close menu)
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    // Overlay links appear (e.g. Home)
    await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeVisible();
  });
});