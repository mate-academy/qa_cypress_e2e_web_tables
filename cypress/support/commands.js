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
Cypress.Commands.add('fillInForm', ({ ...args }) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(args.firstName);
  cy.get('#lastName').type(args.lastName);
  cy.get('#userEmail').type(args.email);
  cy.get('#age').type(args.age);
  cy.get('#salary').type(args.salary);
  cy.get('#department').type(args.department);
  cy.get('#submit').click();
});

Cypress.Commands.add('searchByValue', (value) => {
  cy.get('#searchBox').type(value);
  cy.get('.rt-td').should('contain.text', value);
});

Cypress.Commands.add('selectRows', (value) => {
  cy.get('[aria-label="rows per page"]').select(value);
});

Cypress.Commands.add('checkTextByClass', (className, text) => {
  cy.get(`.${className}`).should('contain.text', text);
});

Cypress.Commands.add('getBySelector', (selector) => {
  cy.get(selector).click();
});
