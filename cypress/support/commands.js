/// <reference types='cypress' />

import { faker } from '@faker-js/faker';

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

const workerDate = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  age: Math.floor(Math.random() * (65 - 18 + 1)) + 18,
  salary: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
  department: faker.commerce.department()
};

Cypress.Commands.add('createWorker', () => {
  cy.get('button[id="addNewRecordButton"]')
    .click();
  cy.get('input[id="firstName"]')
    .type(workerDate.firstName);
  cy.get('input[id="lastName"]')
    .type(workerDate.lastName);
  cy.get('input[id="userEmail"]')
    .type(workerDate.email);
  cy.get('input[id="age"]')
    .type(workerDate.age);
  cy.get('input[id="salary"]')
    .type(workerDate.salary);
  cy.get('input[id="department"]')
    .type(workerDate.department);
  cy.get('button[id="submit"]')
    .click();

  cy.get('.rt-tbody')
    .contains(workerDate.firstName);
  cy.get('.rt-tbody')
    .contains(workerDate.lastName);
  cy.get('.rt-tbody')
    .contains(workerDate.email);
  cy.get('.rt-tbody')
    .contains(workerDate.age);
  cy.get('.rt-tbody')
    .contains(workerDate.salary);
  cy.get('.rt-tbody')
    .contains(workerDate.department);
});
