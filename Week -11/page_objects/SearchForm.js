class SearchForm {
  constructor(page) {
    this.page = page;

    this.titleInput = page.getByRole('textbox', { name: 'Search' });
    this.bedroomsDropdown = page.getByRole('button', { name: 'Bedrooms' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.searchButton = page.getByRole('button', { name: 'Start Search' });
    this.minPriceSlider = page.locator('input[type="range"]').nth(0);
    this.maxPriceSlider = page.locator('input[type="range"]').nth(1);
    this.priceRange = this.page.locator('p:has-text("Price")');
  }

  async searchByTitle(title) {
    await this.titleInput.fill(title);
    await this.searchButton.click();
  }

  async searchByBedrooms(bedrooms) {
    await this.bedroomsDropdown.click();
    await this.page.getByRole('option', { name: `${bedrooms}+`, exact: true }).click();
    await this.searchButton.click();
  }

   async getMinSliderPrice() {
  const text = await this.priceRange.textContent();
  const numbers = text.match(/\d[\d,]*/g);

  return parseInt(numbers[0].replace(/,/g, ''), 10);
}

async getMaxSliderPrice() {
  const text = await this.priceRange.textContent();
  const numbers = text.match(/\d[\d,]*/g);

  return parseInt(numbers[1].replace(/,/g, ''), 10);
}

  async setPriceRange(minPrice, maxPrice) {
  await this.minPriceSlider.fill(minPrice.toString());
  await this.maxPriceSlider.fill(maxPrice.toString());
}
  
  async searchByCity(city) {
    await this.cityInput.fill(city);
    await this.searchButton.click();
  }
}

module.exports = SearchForm;