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
const faker = require('faker');

Cypress.Commands.add('addUser', () => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(faker.name.firstname());
  cy.get('#lastName').type(faker.name.lastname());
  cy.get('#userEmail').type(faker.internet.email());
  cy.get('#age').type(faker.datatype.number({ min: 18, max: 60 }));
  cy.get('#salary').type(faker.datatype.number({ min: 10000, max: 100000 }));
  cy.get('#department').type(faker.lorem.word());
});
