const { faker } = require('@faker-js/faker');
const { getRandomSalary } = require('./getRandomSalary');

const generateWorker = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.datatype.number({ min: 20, max: 50, precision: 1 });
  const salary = getRandomSalary();
  const department = faker.commerce.department();

  return { firstName, lastName, email, age, salary, department }
}

module.exports = { generateWorker };
