import { test } from '@playwright/test';
import RegistrationPage from '../../pages/registration.page';
import { createUniqueRegistrationUser } from '../../data/registrationUsers';

test.describe('Registration - Happy path', () => {
  let createdUserEmail;

  test.afterEach(async ({ request }) => {
    if (!createdUserEmail) return;
    try {
      await request.delete('/api/users', { data: { email: createdUserEmail } });
    } catch {
      // Cleanup is best-effort — don't fail the test if the API is unavailable
    }
    createdUserEmail = undefined;
  });

  test('Should successfully register a new user account', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const userData = createUniqueRegistrationUser();
    createdUserEmail = userData.email;

    await test.step('Navigate to registration page', async () => {
      await registrationPage.goto();
    });

    await test.step('Fill in registration form and submit', async () => {
      await registrationPage.registerUser(userData);
    });

    await test.step('Verify registration success', async () => {
      await registrationPage.verifyRegistrationSuccess();
    });
  });
});
