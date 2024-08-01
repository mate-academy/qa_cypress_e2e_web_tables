// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { faker } = require('@faker-js/faker');

const generateWorkers = () => {
  const randomNumber = Math.floor(Math.random() * 30);
  return {
    firstName: faker.lorem.word(),
    lastName: faker.lorem.word(),
    email: faker.lorem.word() + '@gmail.com',
    age: randomNumber,
    salary: randomNumber + 300,
    department: faker.lorem.word()
  };
};

function addWorker(worker) {
  cy.get('#addNewRecordButton').click();
  cy.get('[placeholder="First Name"]').type(worker.firstName);
  cy.get('[placeholder="Last Name"]').type(worker.lastName);
  cy.get('[placeholder="name@example.com"]').type(worker.email);
  cy.get('[placeholder="Age"]').type(worker.age);
  cy.get('[placeholder="Salary"]').type(worker.salary);
  cy.get('[placeholder="Department"]').type(worker.department);
  cy.get('#submit').click();
}

function addTenWorkers() {
  for (let i = 0; i < 10; i++) {
    const worker = generateWorkers();
    addWorker(worker);
  }
}

module.exports = { generateWorkers, addWorker, addTenWorkers };
