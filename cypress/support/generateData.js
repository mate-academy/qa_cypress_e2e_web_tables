import { faker } from '@faker-js/faker';

function generateWorker() {
  const gender = faker.helpers.arrayElement(['male', 'female']);
  const firstName = faker.person.firstName(gender);
  const lastName = faker.person.lastName(gender);
  const email = faker.internet.email();
  const age = faker.finance.amount({ min: 16, max: 60, dec: 0 });
  const salary = faker.finance.amount({ min: 600, max: 100000, dec: 0 });
  const department = faker.commerce.department();

  return {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  };
}

export default generateWorker;
