const faker = require('faker');

function generateWorker() {
  const firstName = faker.name.firstName();
  const lastNmae = faker.name.lastName();
  const email = faker.internet.email();
  const age = Math.floor(Math.random() * (100 - 18 + 1)) + 18; 
  const salary = Math.floor(Math.random() * (100000 - 100 + 1)) + 100; 
  const department = faker.name.firstName();
  return {
    firstName,
    lastNmae,
    email,
    age,
    salary,
    department
  };
};

module.exports = { generateWorker };