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
import faker from 'faker';

export const generateUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.number({ min: 18, max: 50 }),
    salary: faker.random.number({ min: 3500, max: 25000 }),
    department: faker.random.arrayElement(['Finance', 'QA', 'Sales']),
  };
};

Cypress.Commands.add('createTestWorker', (test) => {
  cy.get('#addNewRecordButton').click();

  cy.get('#registration-form-modal').should('contain', 'Registration Form');
  cy.get('#firstName').type(test.firstName);
  cy.get('#lastName').type(test.lastName);
  cy.get('#userEmail').type(test.email);
  cy.get('#age').type(test.age);
  cy.get('#salary').type(test.salary);
  cy.get('#department').type(test.department);

  cy.get('#submit').click();
});

Cypress.Commands.add('searchTestWorker', (data) => {
  cy.get('#searchBox').clear().type(`${data}`);

  cy.get('.rt-td').should('contain.text', data);
});