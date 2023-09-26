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

Cypress.Commands.add('selectRowsOnPage', (count) => {
    cy.get('select[aria-label="rows per page"]').select(count);
    cy.get('.rt-tr-group').should('have.length', count);
  });

  Cypress.Commands.add('deleteAllWorkers', (numOfWorkers) => {
    for (let i = 1; i <= numOfWorkers; i += 1) {
      cy.get(`#delete-record-${i}`).click();
    }
  });