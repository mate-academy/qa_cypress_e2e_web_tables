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

Cypress.Commands.add('createMultipleWorker', (user, n) => {
  for (let i = 0; i < n; i++) {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);

    cy.get('#submit').click();
  };
});

Cypress.Commands.add('deleteWorkers', (n) => {
  for (let i = 1; i <= n; i++) {
    cy.get(`#delete-record-${i}`).click();
  };
});

Cypress.Commands.add('assertWorkersAreNotExist', (...workerNames) => {
  for (let i = 0; i < workerNames.length; i++) {
    cy.get('.ReactTable').should('not.contain.text', workerNames[i]);
  };
});

Cypress.Commands.add('seachValuesAndAssertSearchResults', (searchedItem) => {
  for (let i = 1; i <= searchedItem.length; i++) {
    cy.get('#searchBox').type(`{selectAll}${searchedItem[i - 1]}`);

    cy.get('.ReactTable').should('contain.text', searchedItem[i - 1]);
  };
});
