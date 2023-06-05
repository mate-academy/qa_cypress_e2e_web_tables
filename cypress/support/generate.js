const faker = require('faker');

function generateUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${lastName}@mail.com`;
  const age = 25;
  const salary = 2000;
  const department = 'HR';
  return { firstName, lastName, email, age, salary, department };
}

module.exports = { generateUser };
