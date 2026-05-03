import { test } from '@playwright/test';
import SearchPage from '../../pages/search.page';

test.describe('Search - Validation', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('Should return no results when searching with an unrecognized keyword', async () => {
    const keyword = 'zzzxqnoexist9999';

    await test.step('Navigate to Featured Listings page', async () => {
      await searchPage.navigateToFeaturedListings();
    });

    await test.step(`Enter unrecognized keyword "${keyword}" and submit search`, async () => {
      await searchPage.searchByKeyword(keyword);
    });

    await test.step('Verify no property listings are returned', async () => {
      await searchPage.verifyNoResultsDisplayed();
    });
  });

  test('Should return no results when searching for a non-existent city', async () => {
    const fakeCity = 'Zzxyqville99';

    await test.step('Enter a non-existent city name and submit search', async () => {
      await searchPage.fillCityInput(fakeCity);
      await searchPage.clickStartSearch();
    });

    await test.step('Verify no property listings are returned', async () => {
      await searchPage.verifyNoResultsDisplayed();
    });
  });

  test('Should safely handle special characters and script injection in search', async () => {
    const xssPayload = '<script>alert("xss")</script>';

    await test.step('Navigate to Featured Listings page', async () => {
      await searchPage.navigateToFeaturedListings();
    });

    await test.step('Enter XSS payload as keyword and submit search', async () => {
      await searchPage.searchByKeyword(xssPayload);
    });

    await test.step('Verify no script tags are rendered in the page body', async () => {
      await searchPage.verifyNoInjectedScripts();
    });

    await test.step('Verify no property listings are returned', async () => {
      await searchPage.verifyNoResultsDisplayed();
    });
  });

  test('Should return no results when keyword contains only whitespace', async () => {
    await test.step('Navigate to Featured Listings page', async () => {
      await searchPage.navigateToFeaturedListings();
    });

    await test.step('Enter only whitespace in the search field and submit', async () => {
      await searchPage.fillKeyword('     ');
      await searchPage.clickStartSearch();
    });

    await test.step('Verify no property listings are returned', async () => {
      await searchPage.verifyNoResultsDisplayed();
    });
  });
});
