const { faker } = require('@faker-js/faker');

const generateWorker = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    workerEmail: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 1000, max: 10000 }),
    department: 'Sales'
  };
};

const generateWorkers = (amount) => {
  const workers = [];

  for (let i = 0; i < amount; i++) {
    workers.push(generateWorker());
  }

  return workers;
};

module.exports = { generateWorker, generateWorkers };
