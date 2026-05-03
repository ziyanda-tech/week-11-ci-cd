const base = require('@playwright/test');
const UserApi = require('../api/user.api');
const ListingApi = require('../api/listing.api');
const userCredentials = require('../testData/userCredentials.json');

exports.test = base.test.extend({

  createdListing: async ({ request }, use) => {

    const userApi = new UserApi(request);

    const accessToken = await userApi.login(
      userCredentials.realtor.email,
      userCredentials.realtor.password
    );

    const listingApi = new ListingApi(request, accessToken);

    const listing = await listingApi.createListing();

    await use(listing);

    await listingApi.deleteListing(listing.id);
  }

});

exports.expect = base.expect;