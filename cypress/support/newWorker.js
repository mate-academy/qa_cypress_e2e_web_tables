import { faker } from '@faker-js/faker';

function newWorker() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const age = faker.number.int({ min: 18, max: 80 });
  const salary = faker.number.int({ min: 2000, max: 5000 });
  const department = faker.word.sample();

  return {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  };
}

module.exports = { newWorker };
