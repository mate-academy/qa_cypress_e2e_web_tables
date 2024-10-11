import { generateUser } from '../support/commands';

/// <reference types='cypress' />

function addUser() {
  const user = generateUser();

  cy.get('#addNewRecordButton').click();

  cy.get('#firstName').type(user.firstName);
  cy.get('#lastName').type(user.lastName);
  cy.get('#userEmail').type(user.userEmail);
  cy.get('#age').type(user.age);
  cy.get('#salary').type(user.salary);
  cy.get('#department').type(user.department);

  cy.get('#submit').click();

  return user;
}

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add new user', () => {
    addUser();
  });

  it('should delete one of user', () => {
    cy.get('#delete-record-1').click();
    cy.contains('div', 'cierra@example.com').should('not.exist');
  });

  it('should delete all users', () => {
    cy.get('#delete-record-1').click();
    cy.contains('div', 'cierra@example.com').should('not.exist');

    cy.get('#delete-record-2').click();
    cy.contains('div', 'alden@example.com').should('not.exist');

    cy.get('#delete-record-3').click();
    cy.contains('div', 'kierra@example.com').should('not.exist');
  });

  it('should adjust the number of rows and implement pagination', () => {
    addUser();
    addUser();
    const lastUser = addUser();

    cy.get('select[aria-label="rows per page"]').select('5');
    cy.get('.-next > .-btn').click();

    cy.contains('div', lastUser.userEmail).should('be.visible');
  });

  it('should enable searching by every column', () => {
    cy.get('#searchBox').type('Veg');

    cy.contains('div', 'alden@example.com').should('not.exist');
    cy.contains('div', 'kierra@example.com').should('not.exist');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('en');

    cy.contains('div', 'cierra@example.com').should('not.exist');
  });

  it('should be able to edit user', () => {
    cy.get('#edit-record-1').click();

    const email = 'abc@example.com';

    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(email);
    cy.get('#submit').click();

    cy.contains('div', email).should('be.visible');
  });
});
