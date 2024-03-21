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

Cypress.Commands.add('findById', (id) => {
    cy.get(`[id="${id}"]`);
  });
  
Cypress.Commands.add('createWorkers', (user, n) => {
  for (let i = 0; i < n; i++) {
    cy.contains('.btn-primary', 'Add').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#userEmail').type(user.email);
      cy.get('#age').type(user.age);
      cy.get('#salary').type(user.salary);
      cy.get('#department').type(user.department);
      cy.get('#submit').click();
  };
});

Cypress.Commands.add('assertValueAndResult', (user) =>{
  cy.get('.rt-tbody').should('contain', user.firstName);
  cy.get('.rt-tbody').should('contain', user.lastName);
  cy.get('.rt-tbody').should('contain', user.email);
  cy.get('.rt-tbody').should('contain', user.age);
  cy.get('.rt-tbody').should('contain', user.salary);
  cy.get('.rt-tbody').should('contain', user.department);
});
