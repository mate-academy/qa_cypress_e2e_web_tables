const { faker } = require('@faker-js/faker');

const generateUser = () => {
  const departments = ['Insurance', 'Compliance', 'Legal'];
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    salary: Math.round(faker.commerce.price(30000, 150000)),
    department: faker.helpers.arrayElement(departments)
  };
};

module.exports = generateUser;
