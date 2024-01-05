const faker = require('faker');

function generateWorker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number(70);
  const salary = faker.random.number(1000000);
  const department = faker.random.word();

  return {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  };
};

module.exports = { generateWorker };
