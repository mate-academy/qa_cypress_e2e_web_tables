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

Cypress.Commands.add('findByID', (ID) => {
  cy.get(`#${ID}`);
});

Cypress.Commands.add('validateWorkerData', (value) => {
  cy.get('.rt-table').should('contain', `${value}`);
});

Cypress.Commands.add('editByPlaceholder', (placeholder, value) => {
  cy.get(`[placeholder="${placeholder}"]`).clear();
  cy.get(`[placeholder="${placeholder}"]`).type(value);
});

Cypress.Commands.add('searchByValue', (value) => {
  cy.findByID('searchBox').type(value);
  cy.get('.rt-table').should('contain', value);
  cy.findByID('searchBox').clear();
});

Cypress.Commands.add('selectRowsCountOnPage', (count) => {
  cy.get('select[aria-label="rows per page"]').select(count);
  cy.get('.rt-tr-group').should('have.length', count);
});

Cypress.Commands.add('deleteByID', (ID) => {
  cy.get(`#delete-record-${ID}`).click();
});

Cypress.Commands.add('deleteAllWorkers', (numOfWorkers) => {
  for (let i = 1; i <= numOfWorkers; i += 1) {
    cy.get(`#delete-record-${i}`).click();
  }
});

// Cypress.Commands.add('addManyWorkers', (count) => {
//   for (let i = 1; i <= count; i += 1) {
//     cy.get('#addNewRecordButton').click();
//     cy.get('.modal-content').should('exist');
//     cy.findByPlaceholder('First Name').type(newWorker.firstName);
//     cy.findByPlaceholder('Last Name').type(newWorker.lastName);
//     cy.findByPlaceholder('name@example.com').type(newWorker.email);
//     cy.findByPlaceholder('Age').type(newWorker.age);
//     cy.findByPlaceholder('Salary').type(newWorker.salary);
//     cy.findByPlaceholder('Department').type(newWorker.department);
//     cy.contains('Submit').click();
//   }
// })
