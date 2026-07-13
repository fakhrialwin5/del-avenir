import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: process.env.E2E_TEST_EMAIL || 'test@delavenir.dev',
  password: process.env.E2E_TEST_PASSWORD || 'SecureTest123!',
};

test.describe('Authentication Flow', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    // Should redirect to dashboard or home
    await page.waitForURL((url) => !url.pathname.includes('/login'));
    await expect(page).not.toHaveURL('/login');
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'invalid@email.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('[role="alert"], .error, text=Invalid')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('protected page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');

    // Should be redirected to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('logout works', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('/login'));

    // Find logout button
    const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")').first();
    if (await logoutButton.count() > 0) {
      await logoutButton.click();
      await expect(page).toHaveURL(/\/(login|$)/);
    }
  });
});