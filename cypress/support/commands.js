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

Cypress.Commands.add('addWorker', (amount, user) => {
  if (user) {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);

    cy.get('#submit').click();
  } else {
    for (let i = 0; i < amount; i++) {
      cy.task('generateUser').then((user) => {
        cy.get('#addNewRecordButton').click();

        cy.get('#firstName').type(user.firstName);
        cy.get('#lastName').type(user.lastName);
        cy.get('#userEmail').type(user.email);
        cy.get('#age').type(user.age);
        cy.get('#salary').type(user.salary);
        cy.get('#department').type(user.department);

        cy.get('#submit').click();
      });
    }
  }
});

Cypress.Commands.add('checkRowsSelector', (value) => {
  cy.get('[aria-label="rows per page"]').select(`${value}`);

  cy.get('[role="rowgroup"]').its('length').should('eq', value);
});

Cypress.Commands.add('checkUserData', (user) => {
  cy.get('.rt-tr-group')
    .should('contain.text', user.firstName);
  cy.get('.rt-tr-group')
    .should('contain.text', user.lastName);
  cy.get('.rt-tr-group')
    .should('contain.text', user.email);
  cy.get('.rt-tr-group')
    .should('contain.text', user.age);
  cy.get('.rt-tr-group')
    .should('contain.text', user.salary);
  cy.get('.rt-tr-group')
    .should('contain.text', user.department);
});

Cypress.Commands.add('checkDataDeleted', (user) => {
  cy.get('.rt-tr-group')
    .should('not.contain.text', user.firstName);
  cy.get('.rt-tr-group')
    .should('not.contain.text', user.lastName);
  cy.get('.rt-tr-group')
    .should('not.contain.text', user.email);
  cy.get('.rt-tr-group')
    .should('not.contain.text', user.age);
  cy.get('.rt-tr-group')
    .should('not.contain.text', user.salary);
  cy.get('.rt-tr-group')
    .should('not.contain.text', user.department);
});

Cypress.Commands.add('deleteAllWorkers', () => {
  cy.get('.rt-tbody').find('[title="Delete"]').then((arrayOfButtons) => {
    const amountOfButtons = arrayOfButtons.length - 1;
    for (let i = amountOfButtons; i >= 0; i--) {
      cy.get('[title="Delete"]').eq(i).click();
    }
  });
});

Cypress.Commands.add('updateUserData', () => {
  cy.task('generateUser').then((user) => {
    cy.get('[title="Edit"]').click();

    cy.get('#firstName').type(`{selectall}${user.firstName}`);
    cy.get('#lastName').type(`{selectall}${user.lastName}`);
    cy.get('#userEmail').type(`{selectall}${user.email}`);
    cy.get('#age').type(`{selectall}${user.age}`);
    cy.get('#salary').type(`{selectall}${user.salary}`);
    cy.get('#department').type(`{selectall}${user.department}`);

    cy.get('#submit').click();

    cy.get('#searchBox').type(`{selectall}${user.firstName}`);
    cy.checkUserData(user);
  });
});

Cypress.Commands.add('searchByAllValues', (user) => {
  cy.get('#searchBox').type(`{selectall}${user.firstName}`);
  cy.checkUserData(user);

  cy.get('#searchBox').type(`{selectall}${user.lastName}`);
  cy.checkUserData(user);

  cy.get('#searchBox').type(`{selectall}${user.email}`);
  cy.checkUserData(user);

  cy.get('#searchBox').type(`{selectall}${user.age}`);
  cy.checkUserData(user);

  cy.get('#searchBox').type(`{selectall}${user.salary}`);
  cy.checkUserData(user);

  cy.get('#searchBox').type(`{selectall}${user.department}`);
  cy.checkUserData(user);
});
