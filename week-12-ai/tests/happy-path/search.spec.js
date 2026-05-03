import { test } from '@playwright/test';
import SearchPage from '../../pages/search.page';

test.describe('Search - Homepage', () => {
  test('Should filter properties by city from homepage search', async ({ page }) => {
    const city = 'Miami';
    const searchPage = new SearchPage(page);

    await test.step('Navigate to homepage', async () => {
      await searchPage.goto();
    });

    await test.step(`Select city "${city}" from dropdown`, async () => {
      await searchPage.selectCity(city);
    });

    await test.step('Click Start Search', async () => {
      await searchPage.clickStartSearch();
    });

    await test.step('Verify results are displayed and URL reflects the searched city', async () => {
      await searchPage.waitForSearchResults(city);
      await searchPage.verifySearchResultsURL(city);
    });

    await test.step('Verify at least one result is relevant to the city', async () => {
      await searchPage.verifyResultsContainText(city);
    });
  });

  test('Should display all listings when searching without criteria', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await test.step('Navigate to homepage', async () => {
      await searchPage.goto();
    });

    await test.step('Submit search without entering any criteria', async () => {
      await searchPage.clickStartSearch();
    });

    await test.step('Verify page navigates to listings and displays results', async () => {
      await searchPage.verifyNavigatedToListingsWithResults();
    });
  });
});

test.describe('Search - Featured Listings', () => {
  test('Should filter properties by keyword on Featured Listings page', async ({ page }) => {
    const keyword = 'house';
    const searchPage = new SearchPage(page);

    await test.step('Navigate to homepage', async () => {
      await searchPage.goto();
    });

    await test.step('Navigate to Featured Listings page', async () => {
      await searchPage.navigateToFeaturedListings();
    });

    await test.step(`Search by keyword "${keyword}"`, async () => {
      await searchPage.searchByKeyword(keyword);
    });

    await test.step('Verify property listings are visible', async () => {
      await searchPage.waitForPropertyListings();
    });

    await test.step('Verify at least one result is relevant to the keyword', async () => {
      await searchPage.verifyResultsContainText(keyword);
    });
  });
});
