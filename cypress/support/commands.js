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

Cypress.Commands.add('addUser', (user, n) => {
  for (let i = 0; i < n; i++) {
    cy.contains('.btn', 'Add').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.contains('.btn', 'Submit').click();
  };
});

Cypress.Commands.add('assertUser', (user) => {
  cy.get('.rt-tbody')
    .should('contain', user.firstName);
  cy.get('.rt-tbody')
    .should('contain', user.lastName);
  cy.get('.rt-tbody')
    .should('contain', user.email);
  cy.get('.rt-tbody')
    .should('contain', user.age);
  cy.get('.rt-tbody')
    .should('contain', user.salary);
  cy.get('.rt-tbody')
    .should('contain', user.department);
});

Cypress.Commands.add('rowSelection', (n) => {
  cy.get('[aria-label="rows per page"]').select(`${n} rows`);
  cy.get('.rt-tbody .rt-tr-group').should('have.length', `${n}`);
});
