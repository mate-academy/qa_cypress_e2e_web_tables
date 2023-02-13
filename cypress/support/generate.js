const faker = require('faker');

function generateUser() {
  const random = Math.random().toString().slice(2, 6);
  const username = faker.internet.userName() + '_' + random;

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: `${username}@mail.com`,
    age: faker.datatype.number({
      'min': 10,
      'max': 90,
    }),
    salary: faker.datatype.number({
      'min': 1800,
      'max': 18000,
    }),
    department: faker.random.word(),
  };
}

module.exports = { generateUser };