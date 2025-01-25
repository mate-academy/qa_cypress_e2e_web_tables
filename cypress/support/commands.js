/// <reference types='cypress' />

Cypress.Commands.add('inputType', (id, value) => {
  cy.get(`#${id}`).then((input) => {
    cy.wrap(input).clear();
    cy.wrap(input).type(value);
  });
});

Cypress.Commands.add('submitBtn', (id) => {
  cy.get(`#${id}`).click();
});

Cypress.Commands.add('verifyRowData', (row, user) => {
  cy.wrap(row).find('.rt-td').eq(0).should('contain', user.name);
  cy.wrap(row).find('.rt-td').eq(1).should('contain', user.lastName);
  cy.wrap(row).find('.rt-td').eq(2).should('contain', user.age);
  cy.wrap(row).find('.rt-td').eq(3).should('contain', user.email);
  cy.wrap(row).find('.rt-td').eq(4).should('contain', user.salary);
  cy.wrap(row).find('.rt-td').eq(5).should('contain', user.department);
});

Cypress.Commands.add('addNewWorker', (user) => {
  cy.get('#addNewRecordButton').click();
  cy.inputType('firstName', user.name);
  cy.inputType('lastName', user.lastName);
  cy.inputType('userEmail', user.email);
  cy.inputType('age', user.age);
  cy.inputType('salary', user.salary);
  cy.inputType('department', user.department);
  cy.submitBtn('submit');
});

Cypress.Commands.add('changeWorkerData', (user) => {
  cy.inputType('firstName', user.name);
  cy.inputType('lastName', user.lastName);
  cy.inputType('userEmail', user.email);
  cy.inputType('age', user.age);
  cy.inputType('salary', user.salary);
  cy.inputType('department', user.department);
  cy.submitBtn('submit');
});

Cypress.Commands.add('deleteAllWorkers', () => {
  cy.get('.rt-tbody')
    .find('[title="Delete"]')
    .each(() => {
      cy.get('[title="Delete"]').first().click();
    });
});

Cypress.Commands.add('getGroupUser', (user) => {
  cy.get('.rt-tbody').contains('.rt-tr-group', user.name);
});

Cypress.Commands.add('getByTitle', (row, title) => {
  cy.wrap(row).find('.rt-td').eq(6).find(`[title="${title}"]`).click();
});

Cypress.Commands.add('getSelectByAria', (label, value) => {
  cy.get(`select[aria-label="${label}"]`).select(`${value} rows`);
});

Cypress.Commands.add('getInputByAria', (label, value) => {
  cy.get(`input[aria-label="${label}"]`).should('have.value', value);
});

Cypress.Commands.add('findEnabledButton', (text) => {
  cy.contains('button', text).should('be.enabled').click();
});
