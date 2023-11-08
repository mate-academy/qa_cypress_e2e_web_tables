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

Cypress.Commands.add('createWorker', () => {
  cy.get('#addNewRecordButton')
    .click();
  cy.get('#firstName')
    .type('John');
  cy.get('#lastName')
    .type('Rambo');
  cy.get('#userEmail')
    .type('john@mail.com');
  cy.get('#age')
    .type('71');
  cy.get('#salary')
    .type('12000');
  cy.get('#department')
    .type('Insurance');
  cy.get('#submit')
    .click();
});
Cypress.Commands.add('modifyWorker', () => {
  cy.get('#searchBox')
    .type('Rambo');
  cy.get('#edit-record-4')
    .click();
  cy.get('#firstName')
    .type('{selectAll}' + 'Jason');
  cy.get('#lastName')
    .type('{selectAll}' + 'Konas');
  cy.get('#userEmail')
    .type('{selectAll}' + 'jason@mail.com');
  cy.get('#submit')
      .click();
});
