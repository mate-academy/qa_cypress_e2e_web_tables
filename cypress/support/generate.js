const { faker } = require('@faker-js/faker');

export function generateUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const age = faker.datatype.number({min: 18, max: 65});
  const email = `${firstName}_${lastName}@mail.com`;
  const salary = faker.datatype.number({min: 2, max: 10}) * 1000;
  const department = 'Finance';

  return { firstName, lastName, email, age, salary, department };
}

module.exports = { generateUser };