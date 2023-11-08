const faker = require('faker');

function generateUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number({ min: 18, max: 60 });
  const salary = faker.random.number({ min: 100, max: 10000 });
  const department = faker.commerce.department();

  return { firstName, lastName, email, age, salary, department };
}

module.exports = { generateUser };
