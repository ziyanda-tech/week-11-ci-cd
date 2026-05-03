class LoginPage {

  constructor(page) {
    this.page = page;

    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.locator('[type="submit"]');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}

module.exports = LoginPage;