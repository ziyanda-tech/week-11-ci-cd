const { test, expect } = require("@playwright/test");
const HomePage = require("../page_objects/HomePage");
const ListingPage = require("../page_objects/FeaturedListingsPage");
const DashBoardPage = require("../page_objects/DashBoardPage");
const UserApi = require("../api/user.api");
const ListingApi = require("../api/listing.api");
const userCredentials = require("../testData/userCredentials.json");

test.describe("Listing", () => {

    var listingApi;
    var userApi;
    var homePage;
    var listingPage;
    var accessToken;

    test.beforeEach("Login and create new listing", async ({ page, request }) => {

        userApi = new UserApi(request);
        homePage = new HomePage(page);
        listingPage = new ListingPage(page);

        accessToken = await userApi.login(
            userCredentials.admin.email,
            userCredentials.admin.password
        );

        listingApi = new ListingApi(request, accessToken);

    });

    test("Search for listing1.", async ({ page }) => {

        const response = await listingApi.createListing();

        await page.goto("/");

        await page.evaluate((token) => {
            localStorage.setItem("accessToken", token)
        }, accessToken);

        await page.reload();

        await homePage.navToFeaturedListings();
        await homePage.searchListing(response.title);
        await homePage.startSearch();
        await expect(page.getByText(response.title)).toBeVisible();

    });

    test("Search for listing2.", async ({ page }) => {

        const response = await listingApi.createListing();

        await page.goto("/");

        await page.evaluate((token) => {
            localStorage.setItem("accessToken", token)
        }, accessToken);

        await page.reload();

        await homePage.searchListing(response.title);
        const isVisible = await listingPage.isListingCardVisible(response.title);
        expect(isVisible).toBeTruthy();

    });

});