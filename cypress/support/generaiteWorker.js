import { faker } from '@faker-js/faker';

export function generateWorker() {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const email = faker.internet.email();
  const age = Math.round(Math.random() * 100);
  const department = 'Intern';
  const salary = Math.round(Math.random() * 10) * 1000;

  return { firstname, lastname, email, age, department, salary };
};