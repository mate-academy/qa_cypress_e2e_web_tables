/// <reference types='cypress' />

const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.datatype.number();
const salary = faker.random.number();
const department = faker.random.word();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should check pagination', () => {
    cy.get('.-pagination')
      .should('exist');
    cy.get('.-pagination')
      .should('contain.text', 'Previous');
    cy.get('.-pagination')
      .should('contain.text', 'Next');
    cy.get('.-pageJump')
      .should('exist');
  });

  it('should test rows count selection', () => {
    const rowCounts = [5, 10, 20, 25, 50, 100];
    cy.get('[aria-label="rows per page"]')
      .should('exist');
    rowCounts.forEach((rowCount) => {
    cy.get('[aria-label="rows per page"]')
      .select(`${rowCount} rows`)
      .should('contain', `${rowCount} rows`);
  });
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('input[placeholder*="First Name"]')
      .type(firstName);
    cy.get('input[placeholder*="Last Name"]')
      .type(lastName);
    cy.get('input[placeholder*="name@example.com"]')
      .type(email);
    cy.get('input[placeholder*="Age"]')
      .type(age);
    cy.get('input[placeholder*="Salary"]')
      .type(salary);
    cy.get('input[placeholder*="Department"]')
      .type(department);
    cy.get('#submit')
      .click();
    cy.get('.rt-table')
      .should('contain', firstName);
    cy.get('.rt-table')
      .should('contain', lastName);
    cy.get('.rt-table')
      .should('contain', email);
    cy.get('.rt-table')
      .should('contain', age);
    cy.get('.rt-table')
      .should('contain', salary);
    cy.get('.rt-table')
      .should('contain', department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('.rt-tr-group')
      .should('have.length.gt', 0);
    cy.get('[id^="delete-record-"]')
      .click({ multiple: true });
    cy.get('.rt-tr-group').should('not.exist');
  });

  it('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox')
      .type('Alden');
    cy.get('#edit-record-2')
      .click();
    cy.get('input[placeholder*="First Name"]')
      .clear()
      .type('Fedora');
    cy.get('input[placeholder*="Last Name"]')
      .clear()
      .type('Wotson');
    cy.get('input[placeholder*="name@example.com"]')
      .clear()
      .type('fwo4444@gmail.com');
    cy.get('input[placeholder*="Age"]')
      .clear()
      .type(54);
    cy.get('input[placeholder*="Salary"]')
      .clear()
      .type(12000);
    cy.get('input[placeholder*="Department"]')
      .clear()
      .type('QA');
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear();
    cy.get('.rt-table')
      .should('contain', 'Fedora');
    cy.get('.rt-table')
      .should('contain', 'Wotson');
    cy.get('.rt-table')
      .should('contain', 'fwo4444@gmail.com');
    cy.get('.rt-table')
      .should('contain', '54');
    cy.get('.rt-table')
      .should('contain', '12000');
    cy.get('.rt-table')
      .should('contain', 'QA');
  });

  it.only('should check search by all column values', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-tbody')
      .should('contain', 'Cierra');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Cantrell');
    cy.get('.rt-tbody')
      .should('contain', 'Cantrell');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('29');
    cy.get('.rt-tbody')
      .should('contain', '29');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('cierra@example.com');
    cy.get('.rt-tbody')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('12000');
    cy.get('.rt-tbody')
      .should('contain', '12000');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Legal');
    cy.get('.rt-tbody')
      .should('contain', 'Legal');
  });
});
