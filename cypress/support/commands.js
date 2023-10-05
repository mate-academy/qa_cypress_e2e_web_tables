Cypress.Commands.add('getElementById', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('getElementByAttribute', (name, value) => {
  cy.get(`[${name}="${value}"]`);
});

Cypress.Commands.add('selectRowsNumber', (rowsNumber) => {
  cy.getElementByAttribute('aria-label', 'rows per page').select(
    rowsNumber.toString()
  );
});

Cypress.Commands.add('findAndFillInput', (id, value) => {
  cy.getElementById(id).clear();
  cy.getElementById(id).type(value);
});

Cypress.Commands.add('addRandomUser', (user) => {
  cy.getElementById('addNewRecordButton').click();
  cy.getElementById('userForm').should('exist');
  cy.findAndFillInput('firstName', user.firstName);
  cy.findAndFillInput('lastName', user.lastName);
  cy.findAndFillInput('userEmail', user.email);
  cy.findAndFillInput('age', user.age);
  cy.findAndFillInput('salary', user.salary);
  cy.findAndFillInput('department', user.department);
  cy.getElementById('submit').click();
});

Cypress.Commands.add('findOneUser', (query) => {
  cy.getElementById('searchBox').type(query);
  cy.getElementById('delete-record-1').should('exist');
  cy.getElementById('delete-record-2').should('not.exist');
});

Cypress.Commands.add('editUser', (user) => {
  cy.findAndFillInput('firstName', user.firstName);
  cy.findAndFillInput('lastName', user.lastName);
  cy.findAndFillInput('userEmail', user.email);
  cy.findAndFillInput('age', user.age);
  cy.findAndFillInput('salary', user.salary);
  cy.findAndFillInput('department', user.department);
  cy.getElementById('submit').click();
});
