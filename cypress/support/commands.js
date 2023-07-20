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

Cypress.Commands.add('findById', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('addWorker', () => {
  cy.findById('addNewRecordButton', 'Add').click();
  // eslint-disable-next-line max-len
  cy.findById('registration-form-modal', 'Registration Form').should('be.visible');

  cy.findByPlaceholder('First Name').type(faker.name.firstName());

  cy.findByPlaceholder('Last Name').type(faker.name.lastName());

  cy.findById('userEmail').type(faker.internet.email());

  cy.findByPlaceholder('Age').type(faker.datatype.number({ min: 18, max: 65 }));

  // eslint-disable-next-line max-len
  cy.findByPlaceholder('Salary').type(faker.random.number({ min: 1, max: 10000 }));

  // eslint-disable-next-line max-len
  cy.findByPlaceholder('Department').type(faker.random.arrayElement(['Insurance', 'Compliance', 'Legal']));

  cy.findById('submit').click();
});
