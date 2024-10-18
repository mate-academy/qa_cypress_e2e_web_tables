import { faker } from '@faker-js/faker';

function generateWorker () {
  const randomNumber = Math.random().toString().slice(4);
  const firstName = faker.person.firstName() + randomNumber;
  const lastName = faker.person.lastName();
  const userEmail = `${firstName}@gmail.com`;
  const age = faker.number.int({ max: 65 });
  const salary = faker.number.int({ min: 100, max: 10000 });
  const department = faker.commerce.department();

  return {
    firstName,
    lastName,
    userEmail,
    age,
    salary,
    department
  };
}

module.exports = { generateWorker };
