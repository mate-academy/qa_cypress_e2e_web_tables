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
Cypress.Commands.add('generate_N_Users', (n) => {
  let user;
  for (let i = 0; i < n; i++) {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#userEmail').type(user.email);
      cy.get('#age').type(user.age);
      cy.get('#salary').type(user.salary);
      cy.get('#department').type(user.department);
      cy.get('#submit').click();
    });
  }
});

Cypress.Commands.add('searchByColVal', (columnName, value) => {
  cy.get('#searchBox').clear().type(value, '{enter}');
  cy.get('.rt-tbody').should('contain', value);
});
