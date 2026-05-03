import { test } from '@playwright/test';
import LoginPage from '../../pages/login.page';

test.describe('Session - Persistence', () => {
  test('Should maintain authentication state across page navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to a protected page using stored auth state', async () => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify user is recognized as logged in', async () => {
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Hard-refresh the page', async () => {
      await page.reload({ waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify session survives the refresh', async () => {
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Navigate to homepage', async () => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify session persists on homepage', async () => {
      await loginPage.verifyAuthenticated();
    });

    await test.step('Navigate back to dashboard', async () => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify user is still authenticated', async () => {
      await loginPage.verifyLoginSuccess();
    });
  });
});
