const faker = require('faker');

function newWorker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number({ min: 18, max: 65 });
  const salary = faker.random.number({ min: 1000, max: 100000 });
  const department = faker.commerce.department();

  return { firstName, lastName, email, age, salary, department };
}

module.exports = { newWorker };