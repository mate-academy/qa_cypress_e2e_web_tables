const { faker } = require('@faker-js/faker');

const generateWorker = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: randomNumber,
    salary: randomNumber,
    department: 'Insurance'
  };
};
module.exports = { generateWorker };
