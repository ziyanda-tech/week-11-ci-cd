class RegisterPage {

  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.realtorCheckbox = page.getByLabel('Register as Realtor');
    this.registerButton = page.getByRole('button', { name: 'Register' });

    this.modal = page.getByRole('dialog');
    this.closeModal = page.getByRole('button', { name: /close/i });
  }

  async register(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.realtorCheckbox.check();
    await this.registerButton.click();
  }

}

module.exports = RegisterPage;