import { faker } from '@faker-js/faker';
import age from '@fakerjs/age';

export function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const userAge = age();
  const email = faker.internet.email();
  const salary = Math.round(faker.finance.amount());
  const department = faker.commerce.department();

  return {
    firstName,
    lastName,
    userAge,
    email,
    salary,
    department
  };
};
