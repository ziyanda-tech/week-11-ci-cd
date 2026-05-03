class FeaturedListingsDetailsPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole('heading').filter({ hasText: /land/i });
    this.price = page.getByText('Asking Price: $');
    this.address = page.locator('p').nth(1);
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getPrice() {
  const text = await this.price.textContent();
  return parseInt(text.replace(/\D/g, ''));
}

  async getBedrooms() {
    const text = await this.page.getByText('Bedrooms:').textContent();
    return parseInt(text.replace(/\D/g, ''));
  }

  async getBathrooms() {
    const text = await this.page.getByText('Bathrooms:').textContent();
    return parseInt(text.replace(/\D/g, ''));
  }

  async getGarage() {
    const text = await this.page.getByText('Garage:').textContent();
    return parseInt(text.replace(/\D/g, ''));
  }

  async getSqft() {
  const text = await this.page.getByText('Square Feet:').textContent();
  return parseInt(text.replace(/\D/g, ''));
}

  async getAddress() {
    return this.address.textContent();
  }

}

module.exports = FeaturedListingsDetailsPage;