import { faker } from '@faker-js/faker';

function generateWorker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.number.bigInt({ max: 60 });
  const salary = faker.number.bigInt({ min: 300, max: 6000 });
  const department = faker.lorem.word();

  return { email, firstName, lastName, age, salary, department };
}

export { generateWorker };
