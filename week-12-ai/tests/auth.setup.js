import { test as setup } from '@playwright/test';
import LoginPage from '../pages/login.page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const email = process.env.DELEK_EMAIL;
  const password = process.env.DELEK_PASSWORD;
  if (!email || !password) {
    throw new Error('DELEK_EMAIL and DELEK_PASSWORD must be set in .env');
  }

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);
  await loginPage.verifyLoginSuccess();

  await page.context().storageState({ path: authFile });
});
