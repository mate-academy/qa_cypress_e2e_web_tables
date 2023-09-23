Cypress.Commands.add('addNewWorker', (newWorker) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(newWorker.fname);
  cy.get('#lastName').type(newWorker.lname);
  cy.get('#userEmail').type(newWorker.email);
  cy.get('#age').type(newWorker.age);
  cy.get('#salary').type(newWorker.salary);
  cy.get('#department').type(newWorker.department);
  cy.get('#submit').click();
});

Cypress.Commands.add('checkWorker', (index, contain, not) => {
  cy.get('.rt-tbody').then((table) => {
    const rows = table.find('.rt-tr-group');
    cy.get(rows.eq(index)).should(`${not}contain`, contain);
  });
});

Cypress.Commands.add('countRows', (rowAmount) => {
  cy.get('[aria-label="rows per page"]').select(`${rowAmount} rows`);
  cy.get('.rt-tbody').then((table) => {
    const rows = table.find('.rt-tr-group');
    cy.wrap(rows).its('length').should('eq', rowAmount);
  });
});

Cypress.Commands.add('actionWorker', (index, order, action) => {
  cy.get('.rt-tbody').then((table) => {
    const rows = table.find('.rt-tr-group');
    cy.get(rows.eq(index)).get(`#${action}-record-${order}`).click();
  });
});

Cypress.Commands.add('editWorker', (newWorker) => {
  cy.get('#firstName').clear().type(newWorker.fname);
  cy.get('#lastName').clear().type(newWorker.lname);
  cy.get('#userEmail').clear().type(newWorker.email);
  cy.get('#age').clear().type(newWorker.age);
  cy.get('#salary').clear().type(newWorker.salary);
  cy.get('#department').clear().type(newWorker.department);
  cy.get('#submit').click();
});
