const { faker } = require("@faker-js/faker");

function generateUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    randomSalary: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
    randomAge: Math.floor(Math.random() * (60 - 21 + 1)) + 21,
    department: faker.commerce.department(),
  };
}

module.exports = { generateUser };
