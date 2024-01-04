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
Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});
Cypress.Commands.add('addNewWorker', (user) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(user.userName);
  cy.get('#lastName').type(user.userSurname);
  cy.get('#userEmail').type(user.email);
  cy.get('#age').type(user.age);
  cy.get('#salary').type(user.number);
  cy.get('#department').type(user.department);
  cy.get('#submit').click();
});

Cypress.Commands.add('getMaxRecordValue', () => {
  return cy.get('[id^="delete-record-"]').then(($elements) => {
    const numericValues = $elements.toArray().map((element) => {
      const id = Cypress.$(element).attr('id');
      return parseInt(id.replace('delete-record-', ''), 10);
    });

    const maxValue = Math.max(...numericValues);

    return maxValue;
  });
});
