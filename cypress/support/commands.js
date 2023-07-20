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
  cy.get(`#${id}`);
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('addWorker', (worker) => {
  cy.findById('addNewRecordButton', 'Add').click();
  // eslint-disable-next-line max-len
  cy.findById('registration-form-modal', 'Registration Form').should('be.visible');

  cy.findByPlaceholder('First Name').type(worker.firstName);

  cy.findByPlaceholder('Last Name').type(worker.lastName);

  cy.findById('userEmail').type(worker.email);

  cy.findByPlaceholder('Age').type(worker.age);

  cy.findByPlaceholder('Salary').type(worker.salary);

  cy.findByPlaceholder('Department').type(worker.department);

  cy.findById('submit').click();
});
