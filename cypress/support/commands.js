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
Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('validateWorkerData', (value) => {
  cy.get('.rt-table').should('contain', `${value}`);
});

Cypress.Commands.add('findByID', (ID) => {
  cy.get(`#${ID}`);
});

Cypress.Commands.add('editByPlaceholder', (placeholder, value) => {
  cy.get(`[placeholder="${placeholder}"]`).clear();
  cy.get(`[placeholder="${placeholder}"]`).type(value);
});

Cypress.Commands.add('searchByValue', (value) => {
  cy.findByID('searchBox').type(value);
  cy.get('.rt-table').should('contain', value);
  cy.findByID('searchBox').clear();
});

Cypress.Commands.add('selectRowsCountOnPage', (count) => {
  cy.get('select[aria-label="rows per page"]').select(count);
  cy.get('.rt-tr-group').should('have.length', count);
});
