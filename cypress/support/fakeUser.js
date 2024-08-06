const { faker } = require('@faker-js/faker');

function generateFakeUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 18, max: 65 }).toString(),
    salary: faker.datatype.number({ min: 30000, max: 100000 }).toString(),
    department: faker.commerce.department()
  };
}

module.exports = { generateFakeUser };
