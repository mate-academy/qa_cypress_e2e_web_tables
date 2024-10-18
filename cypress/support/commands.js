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

const { generateWorker } = require('../support/generate.user.js');

Cypress.Commands.add('selectCountRows', (value) => {
  cy.get('[aria-label="rows per page"]').select(`${value}`);
});

Cypress.Commands.add('addNewWorker', () => {
  const {
    firstName,
    lastName,
    userEmail,
    age,
    salary,
    department
  } = generateWorker();

  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(userEmail);
  cy.get('#age').type(age);
  cy.get('#salary').type(salary);
  cy.get('#department').type(department);
  cy.get('#submit').click();
});
