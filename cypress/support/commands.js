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

const faker = require('faker');

Cypress.Commands.add('generateUser', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number({ min: 20, max: 60 });
  const salary = faker.random.number({ min: 30000, max: 90000 });
  const department = 'IT Department';

  return {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  };
});

Cypress.Commands.add('clearInputFields', () => {
  cy.get('input[type="text"]').each(($input) => {
    cy.wrap($input).clear({ force: true });
  });
});
