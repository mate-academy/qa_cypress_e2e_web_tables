const faker = require('faker');

function generateWorker() {
  const firstname = faker.name.firstName(); 
  const lastname = faker.name.lastName();
  const email = `${lastname}@mail.com`.toLowerCase();
  const age = faker.random.number({ min: 18, max: 70 });
  const salary = Math.round(faker.random.number({ min: 2000, max: 10000 }) / 100) * 100;
  const department = faker.random.arrayElement(["Insurance", "Compliance", "Legal"]);

  return {firstname, lastname, email, age, salary, department};
};

function searchData() {
  const firstname = 'Cierra';
  const lastname = 'Vega';
  const age = '39';
  const email = 'cierra@example.com';
  const salary = '10000';
  const department = 'Insurance';

  return {firstname, lastname, age, email, salary, department};
}

module.exports = { generateWorker, searchData };