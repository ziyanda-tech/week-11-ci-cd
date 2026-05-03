const { test, expect } = require("../../fixtures/listing.fixture");
const HomePage = require("../../page_objects/HomePage");
const FeaturedListingsPage = require("../../page_objects/FeaturedListingsPage");
const MoreInfoPage = require("../../page_objects/MoreInfoPage");
const SearchForm = require("../../page_objects/SearchForm");

test.describe("Search From Featured Listings Page", () => {
 let home;
 let featuredListings;
 let moreInfo;
 let searchForm;

 test.beforeEach(async ({ page, request }) => {
   home = new HomePage(page);
   featuredListings = new FeaturedListingsPage(page);
   moreInfo = new MoreInfoPage(page);
   searchForm = new SearchForm(page);

   await page.goto("/");
   await home.openFeaturedListings();
   await expect(page).toHaveURL(featuredListings.featuredListingsURL);
   await featuredListings.toggleSwitch.check();
   await expect(featuredListings.toggleSwitch).toBeChecked();
 });

test("Search by title", async ({ page, createdListing }) => {

   await searchForm.searchByTitle(createdListing.title);
await expect(featuredListings.titles.first()).toHaveText(createdListing.title);
 });

 test("Search by bedrooms", async ({ page }) => {
   const randomNumberOfBedrooms = Math.floor(Math.random() * 10) + 1;
   await searchForm.searchByBedrooms(randomNumberOfBedrooms.toString());
   await expect(featuredListings.bedroomsRow.first()).toBeVisible();

   const count = await featuredListings.bedroomsRow.count();
   expect(count).toBeGreaterThan(0);

   for (let i = 0; i < count; i++) {
     const bedroomsText = await featuredListings.bedroomsRow
       .nth(i)
       .textContent();
     const actualBedrooms = parseInt(bedroomsText.match(/\d+/)[0]);
     expect(actualBedrooms).toBeGreaterThanOrEqual(randomNumberOfBedrooms);
   }
 });

 test("Search by city", async ({ page }) => {
   const city = "Seattle";
   await searchForm.searchByCity(city);
   await expect(featuredListings.cityRow.first()).toBeVisible();
   await expect(featuredListings.cityRow.first()).toContainText(city);

   const titleFromCard = await featuredListings.titles.first().textContent();
   const addressFromCard = await featuredListings.addressRow
     .first()
     .textContent();
   const priceFromCard = await featuredListings.price.first().textContent();

   const sqftFromCard = await featuredListings.getFirstListingSqft();

   const garageRowText = await featuredListings.garageRow
     .first()
     .textContent();
   const garageFromCard = garageRowText.match(/\d+/)[0];

   const bedroomsRowText = await featuredListings.bedroomsRow
     .first()
     .textContent();
   const bedroomsFromCard = bedroomsRowText.match(/\d+/)[0];

   const bathroomsRowText = await featuredListings.bathroomsRow
     .first()
     .textContent();
   const bathroomsFromCard = bathroomsRowText.match(/\d+/)[0];

   const realtorRow = await featuredListings.realtor.first().textContent();
   const realtorFromCard = realtorRow
     .replace(/([a-z])([A-Z])/g, "$1 $2")
     .trim();

   await featuredListings.moreInfoLink.first().click();
   await expect(moreInfo.title).toBeVisible();
   await expect(moreInfo.title).toContainText(titleFromCard);
   await expect(moreInfo.addressRow).toContainText(addressFromCard);
   await expect(moreInfo.priceRow).toContainText(priceFromCard);
   await expect(moreInfo.squareFeetRow).toContainText(sqftFromCard.toString());
   await expect(moreInfo.garageRow).toContainText(garageFromCard.toString());
   await expect(moreInfo.bedroomsRow).toContainText(bedroomsFromCard.toString());
   await expect(moreInfo.bathroomsRow).toContainText(bathroomsFromCard.toString());
   await expect(moreInfo.propertyRealtor).toContainText(realtorFromCard);
 });

 test("Search by price", async ({ page }) => {
   const minPrice = 700000; // manually defined and must be multiples of 100000 to match slider steps!
   const maxPrice = 9000000; // manually defined and must be multiples of 100000 to match slider steps!

   await searchForm.setPriceRange(minPrice, maxPrice);
   await searchForm.searchButton.click();

   const randomIndex = await featuredListings.randomCardIndex();
   const numericPrice = await featuredListings.getPriceFromCard(randomIndex);
   const minSliderPrice = await searchForm.getMinSliderPrice();
   const maxSliderPrice = await searchForm.getMaxSliderPrice();

   await expect(numericPrice).toBeGreaterThanOrEqual(minSliderPrice);
   await expect(numericPrice).toBeLessThanOrEqual(maxSliderPrice);
 });
});
