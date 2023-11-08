const faker = require('faker');

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

Cypress.Commands.add('generateRandomWorker', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number({ min: 18, max: 70 });
  const department = faker.commerce.department();
  const salary = faker.random.number({ min: 10000, max: 100000 });

  return {
    firstName,
    lastName,
    email,
    age,
    department,
    salary
  };
});

Cypress.Commands.add('AddNewWorker', () => {
  cy.generateRandomWorker().then((data) => {
    const {
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    } = data;

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', firstName);
    cy.get('.rt-td').should('contain', lastName);
    cy.get('.rt-td').should('contain', email);
    cy.get('.rt-td').should('contain', age);
    cy.get('.rt-td').should('contain', salary);
    cy.get('.rt-td').should('contain', department);
  });
});
