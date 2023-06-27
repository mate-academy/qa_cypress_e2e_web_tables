import { faker } from '@faker-js/faker';

export function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const age = new Date().getFullYear() - faker.date.birthdate({ max: 100, min: 18, mode: 'age' }).getFullYear();
  const email = faker.internet.email();
  const salary = Math.round(faker.finance.amount());
  const department = faker.commerce.department();

  return {
    firstName,
    lastName,
    age,
    email,
    salary,
    department
  };
};
