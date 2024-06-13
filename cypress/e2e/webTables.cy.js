/// <reference types='cypress' />

const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.random.number({ min: 16, max: 65 });
const salary = faker.random.number({ min: 50000, max: 100000 });
const department = faker.commerce.department();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('check Pagination', () => {
    cy.get('.-pagination')
      .should('exist');
    cy.get('.-pagination')
      .should('contain', 'Previous');
    cy.get('.-pagination')
      .should('contain', 'Next');
    cy.get('.-pageJump')
      .should('exist');
  });
  it('should be able to change rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist');
    cy.get('[aria-label="rows per page"]')
      .select('10');
    cy.get('[aria-label="rows per page"]')
      .should('have.value', '10');
  });
  it('should provide an ability to add a new worker', () => {
    cy.contains('Add')
      .click();
    cy.get('#firstName')
      .type(firstName);
    cy.get('#lastName')
      .type(lastName);
    cy.get('#userEmail')
      .type(email);
    cy.get('#age')
      .type(age);
    cy.get('#salary')
      .type(salary);
    cy.get('#department')
      .type(department);
    cy.contains('Submit')
      .click();
    cy.get('.rt-table')
      .should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email)
      .and('contain', age)
      .and('contain', salary)
      .and('contain', department);
  });
  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .should('exist');
    cy.get('#delete-record-3')
      .should('exist');
  });
  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .should('not.exist');
    cy.get('#delete-record-3')
      .should('not.exist');
  });
  it('provide an ability to find a worker in the search field, edit it', () => {
    cy.get('#searchBox')
      .type('Kierra');
    cy.get('#edit-record-3')
      .click();
    cy.get('#firstName')
      .clear();
    cy.get('#firstName')
      .type(firstName);
    cy.contains('Submit')
      .click();
    cy.get('.rt-td')
      .should('contain', firstName);
  });
  it('should provide an ability to search by all column values', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-td')
      .should('contain', 'Cierra');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox').type('Vega');
    cy.get('.rt-td')
      .should('contain', 'Vega');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox').type('39');
    cy.get('.rt-td')
      .should('contain', '39');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-td')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox').type('10000');
    cy.get('.rt-td')
      .should('contain', '10000');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-td')
      .should('contain', 'Insurance');
  });
});
