/// <reference types='cypress' />
const { faker } = require('@faker-js/faker');
let user = {};
const userEdit = {
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  department: faker.commerce.department()
};

beforeEach(() => {
  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  });
  cy.visit('/webtables');
});

describe('Web Tables page', () => {
  it('should have pagination', () => {
    cy.get('select').select('5 rows');

    cy.createWorker(user, 3);

    cy.get('.-totalPages').should('contain', '2');
    cy.get('.-next').click();
    cy.get('[type="number"]').should('have.value', '2');
    cy.get('.-previous').click();
    cy.get('[type="number"]').should('have.value', '1');
  });

  it('should change amount of rows in the table', () => {
    cy.get('select').select('5 rows');
    cy.get('.rt-tr-group').its('length').should('eq', 5);

    cy.get('select').select('10 rows');
    cy.get('.rt-tr-group').its('length').should('eq', 10);

    cy.get('select').select('20 rows');
    cy.get('.rt-tr-group').its('length').should('eq', 20);

    cy.get('select').select('25 rows');
    cy.get('.rt-tr-group').its('length').should('eq', 25);

    cy.get('select').select('50 rows');
    cy.get('.rt-tr-group').its('length').should('eq', 50);

    cy.get('select').select('100 rows');
    cy.get('.rt-tr-group').its('length').should('eq', 100);
  });

  it('should have an ability to add new user', () => {
    cy.createWorker(user, 1);

    cy.get('#searchBox').type(user.email);
    cy.checkUserFields(user);
  });

  it('should have an ability to delete the user', () => {
    cy.get('.action-buttons').its('length').then((rowsLength) => {
      cy.get('#delete-record-' + rowsLength).click();

      cy.get('.action-buttons').its('length').should('eq', rowsLength - 1);
    });
  });

  it('should have an ability to delete all users', () => {
    cy.get('.action-buttons').its('length').then((rowsLength) => {
      while (rowsLength > 0) {
        cy.get('#delete-record-' + rowsLength).click();
        rowsLength--;
      }
    });

    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should find a worker in a search field and edit it', () => {
    cy.createWorker(user, 1);

    cy.get('#searchBox').type(user.email);
    cy.get('#edit-record-4').click();
    cy.get('#lastName').type(`{selectAll}${userEdit.lastName}`);
    cy.get('#userEmail').type(`{selectAll}${userEdit.email}`);
    cy.get('#department').type(`{selectAll}${userEdit.department}`);
    cy.get('#submit').click();

    cy.get('#searchBox').type(`{selectAll}${userEdit.email}`);

    cy.get('.rt-td').should('contain', user.firstName);
    cy.get('.rt-td').should('contain', userEdit.lastName);
    cy.get('.rt-td').should('contain', userEdit.email);
    cy.get('.rt-td').should('contain', user.age);
    cy.get('.rt-td').should('contain', user.salary);
    cy.get('.rt-td').should('contain', userEdit.department);
  });

  it('should check the search by all column values', () => {
    cy.createWorker(user, 1);

    cy.get('#searchBox').type(`{selectall}${user.firstName}`);
    cy.checkUserFields(user);

    cy.get('#searchBox').type(`{selectall}${user.lastName}`);
    cy.checkUserFields(user);

    cy.get('#searchBox').type(`{selectall}${user.email}`);
    cy.checkUserFields(user);

    cy.get('#searchBox').type(`{selectall}${user.age}`);
    cy.checkUserFields(user);

    cy.get('#searchBox').type(`{selectall}${user.salary}`);
    cy.checkUserFields(user);

    cy.get('#searchBox').type(`{selectall}${user.department}`);
    cy.checkUserFields(user);
  });
});
