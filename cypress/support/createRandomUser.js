const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const { getRandomIntegerNumber } = require('./getRandomIntegerNumber');

function createRandomUser() {
  const newUser = {
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: getRandomIntegerNumber(18, 65),
    email: faker.internet.email(),
    department: faker.person.jobArea(),
    salary: getRandomIntegerNumber(2000, 20000)
  };

  return newUser;
}

module.exports = { createRandomUser };
