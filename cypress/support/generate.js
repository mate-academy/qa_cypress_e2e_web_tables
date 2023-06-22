import { faker } from '@faker-js/faker';

export function generateWorker() {
  const worker = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: Math.floor(18 + Math.random() * 40),
    salary: Math.floor(2000 + Math.random() * 7000),
    department: faker.lorem.word()
  };

  return worker;
};
