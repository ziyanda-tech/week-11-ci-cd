import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import RegistrationPage from '../../pages/registration.page';
import { credentials } from '../../data/testCredentials';

test.describe('Registration - Validation', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('Should reject registration when email is already registered', async () => {
    await test.step('Fill form with an email that already exists', async () => {
      await registrationPage.fillFirstName('Duplicate');
      await registrationPage.fillLastName('User');
      await registrationPage.fillEmail(credentials.validEmail);
      await registrationPage.fillPassword(credentials.registrationPassword);
    });

    await test.step('Submit registration', async () => {
      await registrationPage.clickRegister();
    });

    await test.step('Verify "Input data validation failed" error is shown', async () => {
      await registrationPage.verifyErrorMessage('Input data validation failed');
    });

    await test.step('Verify user remains on registration page', async () => {
      await registrationPage.verifyStillOnRegistrationPage();
    });
  });

  test('Should display validation error when first name is missing', async () => {
    await test.step('Fill form without first name', async () => {
      await registrationPage.fillLastName('TestUser');
      await registrationPage.fillEmail(faker.internet.email());
      await registrationPage.fillPassword(credentials.registrationPassword);
    });

    await test.step('Submit registration', async () => {
      await registrationPage.clickRegister();
    });

    await test.step('Verify "First name required" validation error appears', async () => {
      await registrationPage.verifyFieldValidationError('First name required');
    });
  });

  test('Should display validation error when last name is missing', async () => {
    await test.step('Fill form without last name', async () => {
      await registrationPage.fillFirstName('NoLast');
      await registrationPage.fillEmail(faker.internet.email());
      await registrationPage.fillPassword(credentials.registrationPassword);
    });

    await test.step('Submit registration', async () => {
      await registrationPage.clickRegister();
    });

    await test.step('Verify "Last name required" validation error appears', async () => {
      await registrationPage.verifyFieldValidationError('Last name required');
    });
  });

  test('Should display validation error when email is missing', async () => {
    await test.step('Fill form without email', async () => {
      await registrationPage.fillFirstName('NoEmail');
      await registrationPage.fillLastName('User');
      await registrationPage.fillPassword(credentials.registrationPassword);
    });

    await test.step('Submit registration', async () => {
      await registrationPage.clickRegister();
    });

    await test.step('Verify "Email" required validation error appears', async () => {
      await registrationPage.verifyFieldValidationError('Email');
    });
  });

  test('Should display validation error when password is missing', async () => {
    await test.step('Fill form without password', async () => {
      await registrationPage.fillFirstName('NoPass');
      await registrationPage.fillLastName('User');
      await registrationPage.fillEmail(faker.internet.email());
    });

    await test.step('Submit registration', async () => {
      await registrationPage.clickRegister();
    });

    await test.step('Verify "Password" required validation error appears', async () => {
      await registrationPage.verifyFieldValidationError('Password');
    });
  });

  test('Should display validation error when email format is invalid', async () => {
    await test.step('Fill form with malformed email', async () => {
      await registrationPage.fillFirstName('BadEmail');
      await registrationPage.fillLastName('Format');
      await registrationPage.fillEmail(credentials.malformedEmail);
      await registrationPage.fillPassword(credentials.registrationPassword);
    });

    await test.step('Submit registration', async () => {
      await registrationPage.clickRegister();
    });

    await test.step('Verify "Email" validation error appears', async () => {
      await registrationPage.verifyFieldValidationError('Email');
    });
  });
});
