
Cypress.Commands.add('addNewWorker', (user) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(user.userName);
  cy.get('#lastName').type(user.userSurname);
  cy.get('#userEmail').type(user.email);
  cy.get('#age').type('50');
  cy.get('#salary').type(user.number);
  cy.get('#department').type(user.department);
  cy.get('#submit').click();
});
