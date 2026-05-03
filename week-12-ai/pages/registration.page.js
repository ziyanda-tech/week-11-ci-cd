import { expect } from '@playwright/test';
import BasePage from './base.page';

class RegistrationPage extends BasePage {
  get firstNameInput() {
    return this.page.getByLabel(/first\s*name/i);
  }

  get lastNameInput() {
    return this.page.getByLabel(/last\s*name/i);
  }

  get emailInput() {
    return this.page.getByLabel(/email address/i);
  }

  get passwordInput() {
    return this.page.getByLabel(/^password$/i);
  }

  get registerButton() {
    return this.page.getByRole('button', { name: /^register$/i });
  }

  get profileHeading() {
    return this.page.getByRole('heading', { name: /profile|welcome|account/i });
  }

  get profileAvatar() {
    return this.page.locator('[class*="avatar"], [data-testid="user-profile"]');
  }

  get dashboardLink() {
    return this.page.getByRole('link', { name: /dashboard|my account/i });
  }

  async goto() {
    await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/\/auth\/register/);
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async registerUser(userData) {
    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillEmail(userData.email);
    await this.fillPassword(userData.password);
    await this.clickRegister();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page).toHaveURL(/\/dashboard\/user\/profile/);

    const profileIndicator = this.profileHeading
      .or(this.profileAvatar)
      .or(this.dashboardLink);
    await expect(profileIndicator.first()).toBeVisible();
  }

  async verifyStillOnRegistrationPage() {
    await expect(this.page).toHaveURL(/\/auth\/register/i);
  }
}

export default RegistrationPage;
