const { generateWorker } = require("./generate");

Cypress.Commands.add('addNewWorker', () => {
  const {
    firstName,
    lastName,
    email,
    age,
    salary,
    department,
  } = generateWorker();

  cy.get('#addNewRecordButton').click();

  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(email);
  cy.get('#age').type(age);
  cy.get('#salary').type(salary);
  cy.get('#department').type(department);

  cy.get('#submit').click();
});
