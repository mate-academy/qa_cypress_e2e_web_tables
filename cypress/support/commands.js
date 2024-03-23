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
Cypress.Commands.add('findById', (id) => {
  cy.get(`[id="${id}"]`);
});

/*Cypress.Commands.add('addWorker', (count) => {
  for (let i = 1; i <= count; i++) {
    const person = {
      firstName: faker.internet.userName(),
      lastName: faker.internet.userName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 65 }),
      salary: faker.number.int({ min: 999, max: 15000 }),
      department: faker.word.noun(9),
    };
    cy.findById('addNewRecordButton').click();
    cy.findById('firstName').type(person.firstName);
    cy.findById('lastName').type(person.lastName);
    cy.findById('userEmail').type(person.email);
    cy.findById('age').type(person.age);
    cy.findById('salary').type(person.salary);
    cy.findById('department').type(person.department);
    cy.findById('submit').click();
  }
});*/

Cypress.Commands.add('addWorker', (count) => {
  for (let i = 1; i <= count; i++) {
    cy.generateWorker().then((person) => {
      cy.findById('addNewRecordButton').click();
      cy.findById('firstName').type(person.firstName);
      cy.findById('lastName').type(person.lastName);
      cy.findById('userEmail').type(person.email);
      cy.findById('age').type(person.age);
      cy.findById('salary').type(person.salary);
      cy.findById('department').type(person.department);
      cy.findById('submit').click();
    });
  }
});

Cypress.Commands.add('generateWorker', () => {
  return {
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }),
    salary: faker.number.int({ min: 999, max: 15000 }),
    department: faker.word.noun(9),
  };
});


