const faker = require('faker');

function generateWorker() {
  const firstName = faker.name.firstName();

  const worker = {
    firstName,
    lastName: faker.name.lastName(),
    email: `${firstName.toLowerCase()}@mail.com`,
    age: faker.datatype.number({ min: 18, max: 60 }),
    salary: 25000,
    department: 'Insurance',
  };

  return worker;
}

module.exports = { generateWorker };
