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

const { faker } = require("@faker-js/faker");

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const generateWorkers = () => {
  const randomNumber = Math.floor(Math.random() * 30);
  return {
    firstName: faker.lorem.word(),
    lastName: faker.lorem.word(),
    email: faker.lorem.word() + "@gmail.com",
    age: randomNumber,
    salary: randomNumber + 300,
    department: faker.lorem.word(),
  };
};

module.exports = { generateWorkers };