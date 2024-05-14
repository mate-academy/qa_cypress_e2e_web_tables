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

Cypress.Commands.add('byPlaceholder', (placeholder) => {
  cy.get(`[placeholder = "${placeholder}"`);
});

Cypress.Commands.add('addWorker', (user, count) => {
  while (count > 0) {
    cy.get('#addNewRecordButton')
      .should('contain', 'Add')
      .click();
    cy.byPlaceholder('First Name').type(user.firstName);
    cy.byPlaceholder('Last Name').type(user.lastName);
    cy.byPlaceholder('name@example.com').type(user.email);
    cy.byPlaceholder('Age').type(user.age);
    cy.byPlaceholder('Salary').type(user.salary);
    cy.byPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    count--;
  }
});

Cypress.Commands.add('checkWorker', (user) => {
  cy.get('.rt-tr')
    .should('contain', user.firstName)
    .should('contain', user.lastName)
    .should('contain', user.email)
    .should('contain', user.age)
    .should('contain', user.salary)
    .should('contain', user.department);
});

Cypress.Commands.add('changeWorker', (changedUser) => {
  cy.get('#firstName').type('{selectAll}' + changedUser.changedName);
  cy.get('#lastName').type('{selectAll}' + changedUser.changedLastName);
  cy.get('#userEmail').type('{selectAll}' + changedUser.changedEmail);
  cy.get('#age').type('{selectAll}' + changedUser.changedAge);
  cy.get('#salary').type('{selectAll}' + changedUser.changedSalary);
  cy.get('#department').type('{selectAll}' + changedUser.changed_department);
  cy.get('#submit').click();
});

Cypress.Commands.add('changeWorkerCheck', (changedUser) => {
  cy.byPlaceholder('Type to search')
    .type(changedUser.changedName);
  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + changedUser.changedLastName);
  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + changedUser.changedEmail);
  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + changedUser.changedAge);
  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + changedUser.changedSalary);
  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + changedUser.changed_department);

  cy.get('.rt-tr')
    .should('contain', changedUser.changedName)
    .should('contain', changedUser.changedLastName)
    .should('contain', changedUser.changedEmail)
    .should('contain', changedUser.changedAge)
    .should('contain', changedUser.changedSalary)
    .should('contain', changedUser.changed_department);
});

Cypress.Commands.add('findByOptions', (user) => {
  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + user.firstName);
  cy.get('.rt-tr')
    .should('contain', user.firstName);

  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + user.lastName);
  cy.get('.rt-tr')
    .should('contain', user.lastName);

  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + user.email);
  cy.get('.rt-tr')
    .should('contain', user.email);

  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + user.age);
  cy.get('.rt-tr')
    .should('contain', user.age);

  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + user.salary);
  cy.get('.rt-tr')
    .should('contain', user.salary);

  cy.byPlaceholder('Type to search')
    .type('{selectAll}' + user.department);
  cy.get('.rt-tr')
    .should('contain', user.department);
});
