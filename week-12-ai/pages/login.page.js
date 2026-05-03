import { expect } from '@playwright/test';
import BasePage from './base.page';

class LoginPage extends BasePage {
  get emailInput() {
    return this.page.getByLabel(/email/i);
  }

  get passwordInput() {
    return this.page.getByLabel(/password/i);
  }

  get loginButton() {
    return this.page.getByRole('button', { name: /^login$/i });
  }

  get userMenuButton() {
    return this.page.locator('button.MuiIconButton-root:has(.MuiAvatar-root)');
  }

  get logoutMenuItem() {
    return this.page.getByRole('menuitem', { name: /logout/i });
  }

  get authenticatedNav() {
    return this.page.getByRole('link', { name: /dashboard|my account|profile/i });
  }

  async goto() {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async logout() {
    await this.userMenuButton.click();
    await this.logoutMenuItem.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).not.toHaveURL(/\/auth\/login/i);
    await expect(this.authenticatedNav.first()).toBeVisible();
  }

  async verifyAuthenticated() {
    await expect(this.authenticatedNav.first()).toBeVisible();
  }

  async verifyStillOnLoginPage() {
    await expect(this.page).toHaveURL(/\/auth\/login/i);
  }
}

export default LoginPage;
