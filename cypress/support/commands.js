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
Cypress.Commands.add("deleteAllWorkers", (numOfWorkers) => {
  for (let i = 1; i <= numOfWorkers; i += 1) {
    cy.get(`#delete-record-${i}`).click();
  }
});

import Webtable from "../Webtable";
const { generateUser } = require("../support/generate");

Cypress.Commands.add("addNewWorker", () => {
  const { firstName, lastName, email, randomAge, randomSalary, department } =
    generateUser();
  Webtable.addNewRecord();

  Webtable.typeFirstName(firstName);

  Webtable.typeLastName(lastName);

  Webtable.typeEmail(email);

  Webtable.typeAge(randomAge);

  Webtable.typeSalary(randomSalary);

  Webtable.typeDepartment(department);

  Webtable.clickSubmit();
});
