// support/generate.js
const { faker } = require('@faker-js/faker');

function generateWorker() {
  return {
    username: faker.internet.userName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email()
  };
}

module.exports = {
  generateWorker
};
