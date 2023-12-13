/// <reference types='cypress' />

const { generateUser } = require('./generate');

// creates a number of new users
Cypress.Commands.add('addNewUser', (times = 1) => {
  for (let i = 0; i <= times; i++) {
    const user = generateUser();

    cy.contains('#addNewRecordButton', 'Add')
      .click();
    cy.get('#firstName')
      .type(user.name);
    cy.get('#lastName')
      .type(user.surname);
    cy.get('#userEmail')
      .type(user.email);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
  }
});
// creates new user and gives acces to their data
Cypress.Commands.add('addNewUserFrom', (input = {}) => {
  cy.contains('#addNewRecordButton', 'Add')
    .click();
  cy.get('#firstName')
    .type(input.name);
  cy.get('#lastName')
    .type(input.surname);
  cy.get('#userEmail')
    .type(input.email);
  cy.get('#age')
    .type(input.age);
  cy.get('#salary')
    .type(input.salary);
  cy.get('#department')
    .type(input.department);
  cy.get('#submit')
    .click();
});
// search worker by data from any column
Cypress.Commands.add('searchWorker', (column) => {
  cy.get('#searchBox')
    .type(`{selectAll}{del}${column}`);
  cy.get('.rt-td')
    .should('contain.text', column);
});
