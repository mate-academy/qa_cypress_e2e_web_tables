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
