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

Cypress.Commands.add('createWorker', (worker) => {
  cy.get('#addNewRecordButton')
    .click();
  cy.get('#firstName')
    .type(worker.firstName);
  cy.get('#lastName')
    .type(worker.lastName);
  cy.get('#userEmail')
    .type(worker.email);
  cy.get('#age')
    .type(worker.age);
  cy.get('#salary')
    .type(worker.salary);
  cy.get('#department')
    .type(worker.department);
  cy.get('#submit')
    .click();
});

Cypress.Commands.add('searchAndValidateWorker', (data) => {
  cy.get('#searchBox')
    .clear()
    .type(`${data}`);

  cy.get('.rt-td')
    .should('contain.text', data);
});

Cypress.Commands.add('createWorkers', (worker, count) => {
  for (let i = 0; i < count; i++) {
    cy.createWorker(worker);
  }
});
