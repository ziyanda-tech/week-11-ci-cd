import { expect } from '@playwright/test';

class BasePage {
  constructor(page) {
    this.page = page;
  }

  get alertMessage() {
    return this.page.getByRole('alert');
  }

  get fieldValidationErrors() {
    return this.page.locator('[role="alert"], [id*="helper-text"], [class*="Mui-error"]');
  }

  get invalidFields() {
    return this.page.locator('[aria-invalid="true"]');
  }

  async verifyErrorMessage(expectedText) {
    await expect(this.alertMessage.first()).toBeVisible();
    if (expectedText) {
      await expect(this.alertMessage.first()).toContainText(expectedText, { ignoreCase: true });
    }
  }

  async verifyFieldValidationError(expectedText) {
    if (expectedText) {
      const specificError = this.fieldValidationErrors
        .filter({ hasText: new RegExp(expectedText, 'i') });
      await expect(specificError.first()).toBeVisible();
    } else {
      await expect(this.invalidFields.first()).toBeVisible();
    }
  }
}

export default BasePage;
