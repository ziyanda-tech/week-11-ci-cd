const base = require('@playwright/test');
const UserApi = require('../api/user.api');
const userCredentials = require('../testData/userCredentials.json');

exports.test = base.test.extend({

  loggedInPage: async ({ page, request }, use) => {

    const userApi = new UserApi(request);

    const accessToken = await userApi.login(
      userCredentials.admin.email,
      userCredentials.admin.password
    );

    await page.goto("/");

    await page.evaluate((token) => {
      localStorage.setItem("accessToken", token);
    }, accessToken);

    await page.goto("/dashboard/user/profile");

    await use(page);
  }

});

exports.expect = base.expect;