import { faker } from '@faker-js/faker';

export function createUniqueRegistrationUser(overrides = {}) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({ provider: 'example.com' }),
    password: process.env.DELEK_REG_PASSWORD ?? faker.internet.password({ length: 16, memorable: false }),
    ...overrides,
  };
}
