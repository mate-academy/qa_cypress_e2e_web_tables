import { faker } from '@faker-js/faker';

function generateUser() {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.datatype.number({ max: 60 });
  const salary = faker.datatype.number({ min: 1000, max: 3000 });
  const department = faker.lorem.word();

  return { firstname, lastname, email, age, salary, department };
} 

module.exports = { generateUser };