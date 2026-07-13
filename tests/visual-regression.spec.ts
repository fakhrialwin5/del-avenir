import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'features', path: '/features' },
  { name: 'pricing', path: '/pricing' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'login', path: '/login' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

test.describe('Visual Regression', () => {
  for (const page of PAGES) {
    for (const viewport of VIEWPORTS) {
      test(`${page.name} - ${viewport.name} viewport`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const pageObj = await context.newPage();

        await pageObj.goto(page.path);
        await pageObj.waitForLoadState('networkidle');

        // Full page screenshot
        await expect(pageObj).toHaveScreenshot(
          `${page.name}-${viewport.name}.png`,
          { fullPage: true, maxDiffPixelRatio: 0.02 }
        );

        await context.close();
      });
    }
  }

  test('dark mode toggle', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Look for theme toggle
    const themeToggle = page.locator('[aria-label*="theme" i], button:has-text("Dark"), button:has-text("Light")').first();
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await expect(page).toHaveScreenshot('home-dark-mode.png', { fullPage: true });
    }
  });
});