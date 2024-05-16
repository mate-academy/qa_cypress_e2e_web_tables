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
Cypress.Commands.add('byPlaceholder', (placeholder) => {
  cy.get(`[placeholder = "${placeholder}"`);
});

Cypress.Commands.add('getTestEl', (dataCy) => {
  cy.get(`[dataCy = "${dataCy}"`);
});

Cypress.Commands.add('createNewUser', (user, n) => {
  for (let i = 0; i < n; i++) {
    cy.get('#addNewRecordButton').should('contain', 'Add').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
  }
});

Cypress.Commands.add('deleteWorkers', (n) => {
  for (let i = 1; i <= n; i++) {
    cy.get(`#delete-record-${i}`).click();
  };
});

Cypress.Commands.add('searchValueAndAssertResult', (user) => {
  cy.get('#searchBox').type(user.firstName);
  cy.get('.rt-tbody').should('contain', user.firstName);
  cy.get('#searchBox').clear();

  cy.get('#searchBox').type(user.lastName);
  cy.get('.rt-tbody').should('contain', user.lastName);
  cy.get('#searchBox').clear();

  cy.get('#searchBox').type(user.email);
  cy.get('.rt-tbody').should('contain', user.email);
  cy.get('#searchBox').clear();

  cy.get('#searchBox').type(user.age);
  cy.get('.rt-tbody').should('contain', user.age);
  cy.get('#searchBox').clear();

  cy.get('#searchBox').type(user.salary);
  cy.get('.rt-tbody').should('contain', user.salary);
  cy.get('#searchBox').clear();

  cy.get('#searchBox').type(user.department);
  cy.get('.rt-tbody').should('contain', user.department);
  cy.get('#searchBox').clear();
});
