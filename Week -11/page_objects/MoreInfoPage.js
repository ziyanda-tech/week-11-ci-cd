class MoreInfoPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator("h3");

    this.addressRow = this.title.locator('xpath=following-sibling::p');
    this.priceRow = page.getByText("Price:");
    this.squareFeetRow = page.getByText("Square Feet:");
    this.garageRow = page.getByText("Garage:");
    this.bedroomsRow = page.getByText("Bedrooms:");
    this.bathroomsRow = page.getByText("Bathrooms:");

    this.propertyRealtor = page.getByText("Realtor:");
  }
}

module.exports = MoreInfoPage;