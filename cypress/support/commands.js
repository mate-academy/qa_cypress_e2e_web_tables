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

Cypress.Commands.add('findById', (id) => {
  cy.get(`[id="${id}"]`);
});

Cypress.Commands.add('addNewEmployee', (employee) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(employee.firstName);
  cy.get('#lastName').type(employee.lastName);
  cy.get('#userEmail').type(employee.email);
  cy.get('#age').type(employee.age);
  cy.get('#salary').type(employee.salary);
  cy.get('#department').type(employee.department);
  cy.get('#submit').click();
});