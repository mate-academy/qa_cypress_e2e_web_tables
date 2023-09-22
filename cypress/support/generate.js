const faker = require('faker');

function generateWorker () {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random
    .number({ min: 18, max: 60 }).toString();
  const salary = faker.random
    .number({ min: 8000, max: 30000 }).toString();
  const department = faker.commerce.department();

  return { firstName, lastName, email, age, salary, department };
}

module.exports = { generateWorker };
