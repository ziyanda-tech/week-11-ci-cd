import { test } from '@playwright/test';
import LoginPage from '../../pages/login.page';
import { credentials } from '../../data/testCredentials';

test.describe('Login - Validation', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Should redirect unauthenticated user from protected route to login', async ({ page }) => {
    await test.step('Attempt to access dashboard without logging in', async () => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify user is redirected to login page', async () => {
      await loginPage.verifyStillOnLoginPage();
    });
  });

  test('Should reject login when password is incorrect', async () => {
    await test.step('Submit valid email with wrong password', async () => {
      await loginPage.login(credentials.validEmail, credentials.wrongPassword);
    });

    await test.step('Verify "Wrong email or password" error is displayed', async () => {
      await loginPage.verifyErrorMessage('Wrong email or password');
    });

    await test.step('Verify user remains on login page', async () => {
      await loginPage.verifyStillOnLoginPage();
    });
  });

  test('Should reject login when email is not registered', async () => {
    await test.step('Submit unregistered email', async () => {
      await loginPage.login(credentials.nonExistentEmail, credentials.wrongPassword);
    });

    await test.step('Verify "Wrong email or password" error is displayed', async () => {
      await loginPage.verifyErrorMessage('Wrong email or password');
    });
  });

  test('Should display validation error when email field is empty', async () => {
    await test.step('Submit empty email with a password', async () => {
      await loginPage.fillPassword(credentials.wrongPassword);
      await loginPage.clickLogin();
    });

    await test.step('Verify "Email is required" validation error appears', async () => {
      await loginPage.verifyFieldValidationError('Email is required');
    });
  });

  test('Should display validation error when password field is empty', async () => {
    await test.step('Submit email with empty password', async () => {
      await loginPage.fillEmail(credentials.validEmail);
      await loginPage.clickLogin();
    });

    await test.step('Verify "Password is required" validation error appears', async () => {
      await loginPage.verifyFieldValidationError('Password is required');
    });
  });

  test('Should display validation errors when both fields are empty', async () => {
    await test.step('Click login without entering any credentials', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Verify "Email is required" validation error appears', async () => {
      await loginPage.verifyFieldValidationError('Email is required');
    });

    await test.step('Verify "Password is required" validation error appears', async () => {
      await loginPage.verifyFieldValidationError('Password is required');
    });
  });

  test('Should display validation error when email format is invalid', async () => {
    await test.step('Submit an invalid email format', async () => {
      await loginPage.login(credentials.malformedEmail, credentials.wrongPassword);
    });

    await test.step('Verify "Email must be a valid email address" validation error appears', async () => {
      await loginPage.verifyFieldValidationError('Email must be a valid email address');
    });
  });
});
