import { expect } from '@playwright/test';
import BasePage from './base.page';
import { escapeRegex } from '../utils/helpers';

class SearchPage extends BasePage {

  get featuredListingsLink() {
    return this.page.getByRole('link', { name: /featured listings/i });
  }

  get cityInput() {
    return this.page.getByLabel(/city/i);
  }

  get keywordInput() {
    return this.page.getByLabel(/^search$/i);
  }

  get startSearchButton() {
    return this.page.getByRole('button', { name: /start search/i });
  }

  get propertyCards() {
    return this.page.locator('.MuiCard-root:has(a[href*="/featured-listings/"])');
  }

  get loadingSpinner() {
    return this.page.locator('[role="progressbar"]');
  }

  get injectedScripts() {
    return this.page.locator('script:text("alert")');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async navigateToFeaturedListings() {
    await expect(this.featuredListingsLink).toBeVisible();
    await this.featuredListingsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/featured-listings/i);
  }

  async fillKeyword(keyword) {
    await expect(this.keywordInput).toBeVisible();
    await this.keywordInput.clear();
    await this.keywordInput.fill(keyword);
  }

  async searchByKeyword(keyword) {
    await this.fillKeyword(keyword);
    await this.clickStartSearch();
  }

  async clickStartSearch() {
    await expect(this.startSearchButton).toBeVisible();
    await this.startSearchButton.click();
  }

  async fillCityInput(city) {
    await expect(this.cityInput).toBeVisible();
    await this.cityInput.fill(city);
  }

  async selectCity(city) {
    await expect(this.cityInput).toBeVisible();
    await this.cityInput.scrollIntoViewIfNeeded();
    await this.cityInput.click();
    await this.cityInput.fill(city);
    await expect(this.cityInput).toHaveValue(new RegExp(escapeRegex(city), 'i'));
  }

  async waitForSearchResults(city) {
    await this.page.waitForURL(/featured-listings/i, { timeout: 15000 });
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForPropertyListings();
    await expect(this.cityInput).toHaveValue(new RegExp(escapeRegex(city), 'i'));
  }

  async getPropertyListingCount() {
    return this.propertyCards.count();
  }

  async waitForPropertyListings() {
    await expect.poll(async () => this.getPropertyListingCount(), { timeout: 20000 }).toBeGreaterThan(0);
  }

  async verifySearchResultsURL(city) {
    const cityPattern = escapeRegex(city.toLowerCase()).replace(/\s+/g, '[\\s%20+-]+');
    await expect(this.page).toHaveURL(new RegExp(cityPattern, 'i'));
  }

  async verifyResultsContainText(text) {
    await expect(
      this.propertyCards.filter({ hasText: new RegExp(text, 'i') }).first()
    ).toBeVisible({ timeout: 15000 });
  }

  async verifyNoResultsDisplayed() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.loadingSpinner).toHaveCount(0);
    await expect(this.propertyCards).toHaveCount(0);
  }

  async verifyNoInjectedScripts() {
    await expect(this.injectedScripts).toHaveCount(0);
  }

  async verifyNavigatedToListingsWithResults() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(/featured-listings/i);
    await this.waitForPropertyListings();
  }
}

export default SearchPage;
