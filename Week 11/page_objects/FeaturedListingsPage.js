class FeaturedListingsPage {

  constructor(page) {
    this.page = page;

    this.featuredListingsURL = "/featured-listings";
    this.toggleSwitch = page.getByRole('checkbox');
    this.firstListingTitle = page.locator('.MuiCardContent-root h5').nth(0);
    this.firstListingBedrooms = page.locator('text=/Bedrooms:/').first();

    this.firstListingPrice = page.locator('.MuiCard-root').first().getByText('$');
    this.firstListingCity = page.getByText('City:').first();
    this.moreInfoLink = page.getByRole('link', { name: 'More Info' });
    this.titles = page.getByRole('heading', { level: 5 });
    this.allListingPrices = page.locator('text=$');

  this.bedroomsRow = page.locator('text=/Bedrooms:/');
  this.bathroomsRow = page.locator('text=/Bathrooms:/');
  this.garageRow = page.locator('text=/Garage:/');
  this.sqftRow = page.locator('text=/Sqft:/');
  this.cityRow = page.getByText('City:');
  this.addressRow = page.locator('.MuiCardContent-root p');
  this.price = page.locator('.MuiCard-root').locator('text=/\\$\\s?[0-9,]+/');
  this.realtor = page.locator('.MuiCard-root img[alt]');
  
  }

   async waitForListingsToLoad() {
    await this.firstListingTitle.waitFor({ state: 'visible' });
  }

  async getFirstListingPrice() {
  const priceText = await this.firstListingPrice.textContent();
  return parseInt(priceText.replace(/\D/g, ''));
}

  async getFirstListingCity() {
    return this.firstListingCity.textContent();
  }

  async openFirstListing() {
  return this.moreInfoLink.click();
  }

  async getFirstListingTitle() {
  return this.firstListingTitle.textContent();
}

async getTitle(title) {
  const listing = this.page.locator(`text=${title}`).first();
  return listing.textContent();
}

async isListingCardVisible(title) {
  await this.page.getByText(title).first().waitFor({ state: "visible" });
  return true;
}

async getPrice() {
  const price = await this.page.locator('[data-testid="listing-price"]').first().textContent();

  return Number(price.replace(/[^0-9]/g, ''));
}

async getFirstListingBedrooms() {
  const card = this.page.locator('.MuiCardContent-root').first();
  const text = await card.getByText('Bedrooms:').textContent();
  return parseInt(text.replace(/\D/g, ''));
}

async getFirstListingBathrooms() {
  const card = this.page.locator('.MuiCardContent-root').first();
  const text = await card.getByText('Bathrooms:').textContent();
  return parseInt(text.replace(/\D/g, ''));
}

async getFirstListingSqft() {
  const card = this.page.locator('.MuiCardContent-root').first();
  const text = await card.getByText('Sqft:').textContent();
  return parseInt(text.replace(/\D/g, ''));
}

async getFirstListingGarage() {
  const card = this.page.locator('.MuiCardContent-root').first();
  const text = await card.getByText('Garage:').textContent();
  return parseInt(text.replace(/\D/g, ''));
}

  async getRandomListingPrice() {
  const prices = await this.allListingPrices.allTextContents();
  const randomIndex = Math.floor(Math.random() * prices.length);
  const randomPriceText = prices[randomIndex];
  const numericPrice = Number(randomPriceText.replace(/[^0-9]/g, '').trim());
  return numericPrice;
}

async randomCardIndex() {
  const count = await this.allListingPrices.count();
  return Math.floor(Math.random() * count);
}

async getBedroomCount() {
  const card = this.page.locator('.MuiCardContent-root').first();
  const text = await card.getByText('Bedrooms:').textContent();
  return parseInt(text.replace(/\D/g, ''));
}

async getSqft() {
  const text = await this.sqftRow.first().textContent();
  return parseInt(text.replace(/\D/g, ""));
}

async getPriceFromCard(index) {
  const priceText = await this.price.nth(index).textContent();
  return parseInt(priceText.replace(/[^\d]/g, ""));
}

async openDetailsOfListingByTitle(title) {
    await this.page.locator(`text=${title}`).first().click();
}

}
module.exports = FeaturedListingsPage;