Cypress.Commands.add('newworker', (user) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(user.userfirstname);
  cy.get('#lastName').type(user.userlastname);
  cy.get('#userEmail').type(user.useremail);
  cy.get('#age').type(user.userage);
  cy.get('#salary').type(user.usersalary);
  cy.get('#department').type(user.userdepartment);
  cy.get('#submit').click();
});
