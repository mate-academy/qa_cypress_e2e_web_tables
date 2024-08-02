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

Cypress.Commands.add('addNewWorker', (worker) => {
  addNewWorker(worker);
});

Cypress.Commands.add('addNewWorkers', (workers) => {
  workers.forEach((worker) => {
    addNewWorker(worker);
  });
});

const addNewWorker = (worker) => {
  cy.get('#addNewRecordButton').click();

  cy.get('#firstName').type(worker.firstName);
  cy.get('#lastName').type(worker.lastName);
  cy.get('#userEmail').type(worker.workerEmail);
  cy.get('#age').type(worker.age);
  cy.get('#salary').type(worker.salary);
  cy.get('#department').type(worker.department);

  cy.get('#submit').click();
};

Cypress.Commands.add('selectRows', (value) => {
  cy.get('[aria-label="rows per page"]').select(value);
});

Cypress.Commands.add('checkRows', (value) => {
  cy.get('.rt-tbody').find('.rt-tr-group').should('have.length', value);
});

Cypress.Commands.add('checkNumberOfPage', (value) => {
  cy.get('[aria-label="jump to page"]').should('contain.value', value);
});

Cypress.Commands.add('deleteAllWorkers', (amount) => {
  for (let i = 1; i <= amount; i++) {
    cy.get(`#delete-record-${i}`).click();
  };
  cy.get('.rt-noData').should('exist');
});
