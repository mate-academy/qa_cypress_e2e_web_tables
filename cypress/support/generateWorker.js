import { faker } from '@faker-js/faker';

export function generateUser() {
  const worker = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: Math.floor(18 + Math.random() * 32),
    salary: Math.floor(4000 + Math.random() * 5000),
    department: faker.lorem.word()
  };

  return worker;
};