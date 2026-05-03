const { test, expect } = require('@playwright/test');

const HomePage = require('../../page_objects/HomePage');
const RegisterPage = require('../../page_objects/RegisterPage');

test('Should register a new realtor account', async ({ page }) => {

   // Setup
  const home = new HomePage(page);
  const register = new RegisterPage(page);

  const firstName = 'Test';
  const lastName = 'User';
  const email = `test${Date.now()}@gmail.com`;
    
  // Steps
  await page.goto('/');
  await home.openRegister();
  await register.register(firstName, lastName, email, 'Password123');

   // Assertions
  await expect(register.modal).toBeVisible();
  await expect(register.modal).toContainText('Realtor Welcome');

  await register.closeModal.click();
});


test('Should show error when registering with existing email', async ({ page }) => {

   // Setup
  const home = new HomePage(page);
  const register = new RegisterPage(page);
   
  // Steps
  await page.goto('/');
  await home.openRegister();

  await register.emailInput.fill('admin@gmail.com');
  await register.passwordInput.fill('Password123');
  await register.registerButton.click();

   // Assertions
  await expect(page.getByText(/already/i)).toBeVisible();

});


test('Should show validation errors when fields are empty', async ({ page }) => {

   // Setup
  const home = new HomePage(page);
  const register = new RegisterPage(page);

   // Steps
  await page.goto('/');
  await home.openRegister();
  await register.registerButton.click();

   // Assertions
  await expect(page.getByText('First name required')).toBeVisible();
  await expect(page.getByText('Last name required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();

});