const faker = require('faker');

function generateWorker () {
  const randomDepartment = ['Legal', 'Insurance', 'Compliance'];
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number({ min: 18, max: 65 });
  const salary = faker.random.number({ min: 1000, max: 10000 });
  const department = faker.random.arrayElement(randomDepartment);

  return { firstName, lastName, email, age, salary, department };
};

module.exports = { generateWorker };
