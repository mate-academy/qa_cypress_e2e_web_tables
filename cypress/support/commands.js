
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('createWorker', (user, amount) => {
  while (amount > 0) {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    amount--;
  }
});

Cypress.Commands.add('checkUserFields', (user) => {
  cy.get('.rt-tr-group').should('contain', user.firstName);
  cy.get('.rt-tr-group').should('contain', user.lastName);
  cy.get('.rt-tr-group').should('contain', user.email);
  cy.get('.rt-tr-group').should('contain', user.age);
  cy.get('.rt-tr-group').should('contain', user.salary);
  cy.get('.rt-tr-group').should('contain', user.department);
});
