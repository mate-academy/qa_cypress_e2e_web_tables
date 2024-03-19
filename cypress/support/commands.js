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
Cypress.Commands.add('createWorkers', (min, max) => {
  for (let step = min; step <= max; step++) {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(`worker№${step}`);
    cy.get('#lastName').type(`lastname№${step}`);
    cy.get('#userEmail').type(`email${step}@mail.com`);
    cy.get('#age').type(20 + step);
    cy.get('#salary').type(`${step}100`);
    cy.get('#department').type(`Department#${step}`);
    cy.get('#submit').click();
  };
});

Cypress.Commands.add('deleteAllWorkers', (max) => {
  for (let step = max; step >= 1; step--) {
    cy.get(`#delete-record-${step}`).click();
  };
});
