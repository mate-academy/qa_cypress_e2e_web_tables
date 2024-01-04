Cypress.Commands.add('newworker', (user) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(user.userFirstName);
  cy.get('#lastName').type(user.userLastName);
  cy.get('#userEmail').type(user.userEmail);
  cy.get('#age').type(user.userAge);
  cy.get('#salary').type(user.userSalary);
  cy.get('#department').type(user.userDepartment);
  cy.get('#submit').click();
});
