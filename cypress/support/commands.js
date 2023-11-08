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

Cypress.Commands.add('addWorker1', (firstName, lastName, email, age, salary, department) => { 
  cy.get('#addNewRecordButton')
    .click();
  cy.get('#firstName')
    .type(firstName)
  cy.get('#lastName')
    .type(lastName);
   cy.get('#userEmail')
    .type(email);
  cy.get('#age')
    .type(age);
  cy.get('#salary')
    .type(salary);
  cy.get('#department')
    .type(department);
  cy.get('#submit')
    .click();
})

Cypress.Commands.add('addWorker2', (firstName, lastName, email, age, salary, department) => { 
  cy.get('#addNewRecordButton')
    .click();
  cy.get('#firstName')
    .type(`${firstName}lan`)
  cy.get('#lastName')
    .type(`${lastName}bus`);
    cy.get('#userEmail')
    .type(`fgh${email}`);
  cy.get('#age')
    .type(age);
  cy.get('#salary')
    .type(salary);
  cy.get('#department')
    .type(department);
  cy.get('#submit')
    .click();
})

Cypress.Commands.add('addWorker3', (firstName, lastName, email, age, salary, department) => { 
  cy.get('#addNewRecordButton')
    .click();
  cy.get('#firstName')
    .type(`${firstName}bor`)
  cy.get('#lastName')
    .type(`${lastName}col`);
    cy.get('#userEmail')
    .type(`dusgf${email}`);
  cy.get('#age')
    .type(age);
  cy.get('#salary')
    .type(salary);
  cy.get('#department')
    .type(department);
  cy.get('#submit')
    .click();
})