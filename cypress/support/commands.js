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
Cypress.Commands.add('findId', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('haveEqData', (cssClass, data) => {
  cy.get(cssClass).should('contain', data);
});

Cypress.Commands.add('searchByColumn', (data) => {
  cy.findId('searchBox').type(data);
  cy.get('.rt-td').should('contain', data);
  cy.findId('searchBox').clear();
});
