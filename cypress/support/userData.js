const { faker } = require('@faker-js/faker');

export const workerData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    salary: faker.datatype.number({ min: 30000, max: 100000 }),
    department: faker.commerce.department()
  };
};
