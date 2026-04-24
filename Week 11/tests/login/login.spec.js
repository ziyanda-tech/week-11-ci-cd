const { test, expect } = require('../../fixtures/auth.fixture');

const HomePage = require('../../page_objects/HomePage');
const LoginPage = require('../../page_objects/LoginPage');
const DashBoardPage = require('../../page_objects/DashBoardPage');
const userCredentials = require('../../testData/userCredentials.json');
const UserApi = require('../../api/user.api');

test.describe("Login", () => {

  test("Verify login with valid credentials", async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashBoardPage(page);

    await page.goto("/");

    await homePage.openLogin();

    await loginPage.login("admin@gmail.com", "DontTestMe");

    await expect(dashboardPage.userFullName).toHaveText("Admin Adminuk");
    await expect(dashboardPage.userRole).toHaveText("role: admin");

  });

  test("Api Login!", async ({ page, request }) => {

    const dashboardPage = new DashBoardPage(page);
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

    await expect(dashboardPage.userFullName).toHaveText("Admin Adminuk");

  });

test("Login out", async ({ loggedInPage }) => {

  const dashboardPage = new DashBoardPage(loggedInPage);
  const loginPage = new LoginPage(loggedInPage);

  await dashboardPage.clickProfileIcon();
  await dashboardPage.clickLogoutButton();

  await expect(loginPage.loginButton).toBeVisible();
});

});
