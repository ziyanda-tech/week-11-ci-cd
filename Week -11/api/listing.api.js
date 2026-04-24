const { faker } = require('@faker-js/faker');
const fs = require("fs");

class ListingApi {

  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  async createListing() {
    const data = {
      images: fs.createReadStream('./testData/houseTest.jpg'),
      lotSize: 5200,
      sqft: 3500,
      garage: 3,
      bathrooms: 4,
      bedrooms: 5,
      price: 750000,
      zipCode: 98101,
      state: 'WA',
      city: 'Seattle',
      address: '1234 QA Automation Ave',
      description: 'Playwright automation test listing',
     title: `QA Playwright Test House ${faker.number.int({ min: 1000, max: 10000 })}`,
      isPublished: true
    }

   const response = await this.request.post("/api/estate-objects", {
  multipart: data,
  headers: {
    Authorization: `Bearer ${this.accessToken}`
  }
})

    return await response.json();
  }
  
 async deleteListing(listingId) {

    const response = await this.request.delete(
      `/api/estate-objects/${listingId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );

    return await response.json();
  }

}

module.exports = ListingApi;
