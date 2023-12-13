const { faker } = require('@faker-js/faker');

function generateUser() {
  const name = faker.person.firstName();
  const email = faker.internet.email();
  const surname = faker.person.lastName();
  const age = faker.number.int({ min: 18, max: 80 });
  const salary = faker.number.int({ min: 10000, max: 80000 });
  const department = faker.commerce.department();
  return { email, name, surname, age, salary, department };
}

module.exports = { generateUser };
