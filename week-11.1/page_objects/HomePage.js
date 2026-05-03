class HomePage {

  constructor(page) {
    this.page = page;

    // search
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Start Search' });

    // navigation
    this.featuredListingsLink = page.getByRole('link', { name: 'Featured Listings' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.darkModeToggle = page.locator('input[type="checkbox"]').first();
    this.startSearchButton = page.getByRole('button', { name: 'Start Search' });
  }

  async startSearch() {
    await this.startSearchButton.click();
  }

  async enableDarkMode() {
    if (!(await this.darkModeToggle.isChecked())) {
      await this.darkModeToggle.check();
    }

  }

   async navToFeaturedListings() {
    await this.featuredListingsLink.click();
  }

  async searchListing(title) {
    await this.searchInput.fill(title);
    await this.searchButton.click();
  }

  async selectBedrooms(option) {
    await this.page.getByRole('button', { name: 'Bedrooms' }).click();
    await this.page.getByRole('option', { name: `${option}+` }).click();
  }

  async setPriceRange(min, max) {
    const sliders = this.page.locator('input[type="range"]');
    await sliders.nth(0).fill(min.toString());
    await sliders.nth(1).fill(max.toString());
  }

  async searchByCity(city) {
    await this.page.getByRole('textbox', { name: 'City' }).fill(city);
  }

  async openFeaturedListings() {
    await this.featuredListingsLink.click();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openRegister() {
    await this.registerLink.click();
  }

}

module.exports = HomePage;