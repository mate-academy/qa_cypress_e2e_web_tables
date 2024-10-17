const addEmployee = (user) => {
  cy.get('#addNewRecordButton')
    .contains('Add')
    .should('exist')
    .and('be.visible')
    .click();

  cy.get('#firstName-label').should('exist').and('be.visible');
  cy.get('#firstName').should('exist').and('be.visible')
    .type(user.firstName)
    .should('have.value', user.firstName);

  cy.get('#lastName-label').should('exist').and('be.visible');
  cy.get('#lastName').should('exist').and('be.visible')
    .type(user.lastName)
    .should('have.value', user.lastName);

  cy.get('#userEmail').should('exist').and('be.visible');
  cy.get('#userEmail').should('exist').and('be.visible')
    .type(user.email)
    .should('have.value', user.email);

  cy.get('#age').should('exist').and('be.visible');
  cy.get('#age').should('exist').and('be.visible')
    .type(user.age)
    .should('have.value', user.age);

  cy.get('#salary').should('exist').and('be.visible');
  cy.get('#salary').should('exist').and('be.visible')
    .type(user.salary)
    .should('have.value', user.salary);

  cy.get('#department').should('exist').and('be.visible');
  cy.get('#department').should('exist').and('be.visible')
    .type(user.department)
    .should('have.value', user.department);

  cy.get('#submit')
    .contains('Submit')
    .should('exist')
    .and('be.visible')
    .click();

  cy.get('.rt-tbody')
    .contains('.rt-tr-group', user.firstName)
    .should('be.visible');
};

module.exports = addEmployee;
