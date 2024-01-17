const faker = require('faker');

function generateWorker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number(70);
  const salary = faker.random.number(1000000);
  const department = faker.random.word();

  return {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  };
};

function addNewWorker(numberOfWorkers) {
  const workers = getWorkers(numberOfWorkers);

  for (let i = 0; i < workers.length; i++) {
    cy.get('#addNewRecordButton').click();
    cy.get('#registration-form-modal').should('contain', 'Registration Form');
    cy.findByPlaceholder('First Name').type(workers[i].firstName);
    cy.findByPlaceholder('Last Name').type(workers[i].lastName);
    cy.findByPlaceholder('name@example.com').type(workers[i].email);
    cy.findByPlaceholder('Age').type(workers[i].age);
    cy.findByPlaceholder('Salary').type(workers[i].salary);
    cy.findByPlaceholder('Department').type(workers[i].department);
    cy.get('#submit').click();
  }
}

function getWorkers(workersAmount) {
  const workers = [];

  for (let i = 0; i < workersAmount; i++) {
    const generatedWorker = getWorker();
    workers.push(generatedWorker);
  }

  return workers;
}

function getWorker() {
  const worker = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.number(70),
    salary: faker.random.number(1000000),
    department: faker.random.word()
  };

  return worker;
}

module.exports = { addNewWorker, getWorkers, generateWorker };
