import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/login.page';
import { credentials } from '../../data/testCredentials';

test.describe('Login - Happy path', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Should successfully log in with valid credentials', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Submit valid email and password', async () => {
      await loginPage.login(credentials.validEmail, credentials.validPassword);
    });

    await test.step('Verify login succeeds and user is redirected', async () => {
      await loginPage.verifyLoginSuccess();
    });
  });

  test('Should successfully log out and invalidate the session', async ({ page }) => {
    await test.step('Log in via UI', async () => {
      await loginPage.goto();
      await loginPage.login(credentials.validEmail, credentials.validPassword);
    });

    await test.step('Verify user is logged in', async () => {
      await loginPage.verifyLoginSuccess();
    });

    await test.step('Click logout button', async () => {
      await loginPage.logout();
    });

    await test.step('Verify user is redirected away from protected area', async () => {
      await expect(page).not.toHaveURL(/\/dashboard/i);
    });

    await test.step('Attempt to access protected page after logout', async () => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify session is invalidated — redirected to login', async () => {
      await loginPage.verifyStillOnLoginPage();
    });
  });
});
