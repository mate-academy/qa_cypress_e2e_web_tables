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

Cypress.Commands.add('pagination', (rows) => {
  cy.get('.-previous button').should('exist');
  cy.get('.-pageInfo').should('exist');
  cy.get('.-pageSizeOptions select').should('exist');
  cy.get('.-next button').should('exist');

  cy.get('.-pageSizeOptions select')
    .select(rows.randomrow + ' rows');
  cy.get('.rt-tr-group')
    .should('have.length', rows.randomrow);
});

Cypress.Commands.add('newWorker', (users) => {
  cy.get('#addNewRecordButton').should('exist').click();
  cy.get('#firstName').should('exist').type(users.firstName);
  cy.get('#lastName').should('exist').type(users.lastName);
  cy.get('#userEmail').should('exist').type(users.email);
  cy.get('#age').should('exist').type(users.age);
  cy.get('#salary').should('exist').type(users.salary);
  cy.get('#department').should('exist').type(users.department);
  cy.get('#submit').should('exist').click();

  cy.get('.rt-td').should('exist').should('contain', users.firstName);
  cy.get('.rt-td').should('exist').should('contain', users.lastName);
  cy.get('.rt-td').should('exist').should('contain', users.email);
  cy.get('.rt-td').should('exist').should('contain', users.age);
  cy.get('.rt-td').should('exist').should('contain', users.salary);
  cy.get('.rt-td').should('exist').should('contain', users.department);

  cy.get('#delete-record-4').scrollIntoView();
  cy.get('#delete-record-4').should('exist').click();

  cy.get('.rt-td').should('exist').should('not.contain', users.firstName);
  cy.get('.rt-td').should('exist').should('not.contain', users.lastName);
  cy.get('.rt-td').should('exist').should('not.contain', users.email);
  cy.get('.rt-td').should('exist').should('not.contain', users.age);
  cy.get('.rt-td').should('exist').should('not.contain', users.salary);
  cy.get('.rt-td').should('exist').should('not.contain', users.department);
});

Cypress.Commands.add('findData', (users) => {
  cy.get('#addNewRecordButton').should('exist').click();
  cy.get('#firstName').should('exist').type(users.firstName);
  cy.get('#lastName').should('exist').type(users.lastName);
  cy.get('#userEmail').should('exist').type(users.email);
  cy.get('#age').should('exist').type(users.age);
  cy.get('#salary').should('exist').type(users.salary);
  cy.get('#department').should('exist').type(users.department);
  cy.get('#submit').should('exist').click();

  cy.get('#searchBox').should('exist').type(`${users.firstName}{enter}`);
  cy.get('.rt-td').should('exist').should('contain', users.firstName);
  cy.get('#searchBox').should('exist').clear();
  cy.get('#searchBox').type(`${users.lastName}{enter}`);
  cy.get('.rt-td').should('exist').should('contain', users.lastName);
  cy.get('#searchBox').should('exist').clear();
  cy.get('#searchBox').type(`${users.email}{enter}`);
  cy.get('.rt-td').should('exist').should('contain', users.email);
  cy.get('#searchBox').should('exist').clear();
  cy.get('#searchBox').type(`${users.age}{enter}`);
  cy.get('.rt-td').should('exist').should('contain', users.age);
  cy.get('#searchBox').should('exist').clear();
  cy.get('#searchBox').type(`${users.salary}{enter}`);
  cy.get('.rt-td').should('exist').should('contain', users.salary);
  cy.get('#searchBox').should('exist').clear();
  cy.get('#searchBox').type(`${users.department}{enter}`);
  cy.get('.rt-td').should('exist').should('contain', users.department);
});

Cypress.Commands.add('DeleteAllWorkers', (users, count) => {
  const sum = 3 + count;
  while (count > 0) {
    cy.get('#addNewRecordButton').should('exist').click();
    cy.get('#firstName').should('exist').type(users.firstName);
    cy.get('#lastName').should('exist').type(users.lastName);
    cy.get('#userEmail').should('exist').type(users.email);
    cy.get('#age').should('exist').type(users.age);
    cy.get('#salary').should('exist').type(users.salary);
    cy.get('#department').should('exist').type(users.department);
    cy.get('#submit').should('exist').click();

    count--;
  }
  for (let i = 1; i <= sum; i++) {
    cy.get(`#delete-record-${i}`).scrollIntoView();
    cy.get(`#delete-record-${i}`).should('exist').click();
  }
});

Cypress.Commands.add('editWorkers', (users, edit) => {
  cy.get('#addNewRecordButton').should('exist').click();
  cy.get('#firstName').should('exist').type(users.firstName);
  cy.get('#lastName').should('exist').type(users.lastName);
  cy.get('#userEmail').should('exist').type(users.email);
  cy.get('#age').should('exist').type(users.age);
  cy.get('#salary').should('exist').type(users.salary);
  cy.get('#department').should('exist').type(users.department);
  cy.get('#submit').should('exist').click();

  cy.get('#searchBox').should('exist').type(`${users.firstName}{enter}`);
  cy.get('#edit-record-4').scrollIntoView();
  cy.get('#edit-record-4').should('exist').click();

  cy.get('#firstName').clear();
  cy.get('#firstName').should('exist').type(edit.editfirstName);
  cy.get('#lastName').clear();
  cy.get('#lastName').should('exist').type(edit.editlastName);
  cy.get('#userEmail').clear();
  cy.get('#userEmail').should('exist').type(edit.editemail);
  cy.get('#age').clear();
  cy.get('#age').should('exist').type(edit.editage);
  cy.get('#salary').clear();
  cy.get('#salary').should('exist').type(edit.editsalary);
  cy.get('#department').clear();
  cy.get('#department').should('exist').type(edit.editdepartment);
  cy.get('#submit').should('exist').click();

  cy.get('#searchBox').clear();

  cy.get('.rt-td').should('exist').should('contain', edit.editfirstName);
  cy.get('.rt-td').should('exist').should('contain', edit.editlastName);
  cy.get('.rt-td').should('exist').should('contain', edit.editemail);
  cy.get('.rt-td').should('exist').should('contain', edit.editage);
  cy.get('.rt-td').should('exist').should('contain', edit.editsalary);
  cy.get('.rt-td').should('exist').should('contain', edit.editdepartment);
});
