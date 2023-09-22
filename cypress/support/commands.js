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

Cypress.Commands.add('addNewWorder', (firstName, lastName, email, age, salary, department) => {
  cy.get('#addNewRecordButton').click();
  cy.get('.modal-content').should('exist');
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(email);
  cy.get('#age').type(age);
  cy.get('#salary').type(salary);
  cy.get('#department').type(department);
  cy.get('#submit').click();
});

Cypress.Commands.add('containWorkerData', (firstName, lastName, email, age, salary, department) => {
  cy.get('.rt-tbody').should('contain', firstName);
  cy.get('.rt-tbody').should('contain', lastName);
  cy.get('.rt-tbody').should('contain', email);
  cy.get('.rt-tbody').should('contain', age);
  cy.get('.rt-tbody').should('contain', salary);
  cy.get('.rt-tbody').should('contain', department);
});

Cypress.Commands.add('notContainWorkerData', (firstName, lastName, email, age, salary, department) => {
  cy.get('.rt-tbody').not('contain', firstName);
  cy.get('.rt-tbody').not('contain', lastName);
  cy.get('.rt-tbody').not('contain', email);
  cy.get('.rt-tbody').not('contain', age);
  cy.get('.rt-tbody').not('contain', salary);
  cy.get('.rt-tbody').not('contain', department);
});

Cypress.Commands.add('editWorker', (firstName, lastName, email, age, salary, department) => {
  cy.get('#firstName').clear();
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').clear();
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').clear();
  cy.get('#userEmail').type(email);
  cy.get('#age').clear();
  cy.get('#age').type(age);
  cy.get('#salary').clear();
  cy.get('#salary').type(salary);
  cy.get('#department').clear();
  cy.get('#department').type(department);
});

Cypress.Commands.add('searchByAllValues', () => {
  cy.get('#searchBox').type('Alden');
  cy.get('.rt-td').should('contain', 'Alden');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('Cantrell');
  cy.get('.rt-td').should('contain', 'Cantrell');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('45');
  cy.get('.rt-td').should('contain', '45');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('alden@example.com');
  cy.get('.rt-td').should('contain', 'alden@example.com');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('12000');
  cy.get('.rt-td').should('contain', '12000');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('Compliance');
  cy.get('.rt-td').should('contain', 'Compliance');
  cy.get('#searchBox').clear();
});