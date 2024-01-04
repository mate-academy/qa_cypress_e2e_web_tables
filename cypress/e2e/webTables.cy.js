/// <reference types='cypress' />
const { generateWorker } = require('../support/generateWorker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('webtables');
  });
  const user = generateWorker();

  it('should have pagination', () => {
    cy.get('.-btn').contains('Previous').should('contain', 'Previous');
    cy.get('.-btn').contains('Next').should('contain', 'Next');
    cy.get('[aria-label="jump to page"]').should('have.value', '1');
    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('should have row count selection', () => {
    cy.get('option').should(($option) => {
      expect($option).to.have.length(6);
      expect($option.first()).to.contain('5 rows');
    });
    cy.get('select').select('20 rows');
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();

    cy.get('.rt-table').should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.email)
      .and('contain', user.age)
      .and('contain', user.salary)
      .and('contain', user.department);
  });

  it('should allow to delete a worker', () => {
    cy.get('#delete-record-1').click();

    cy.get('.rt-table').should('not.contain', user.firstName)
      .and('not.contain', user.lastName)
      .and('not.contain', user.email)
      .and('not.contain', user.age)
      .and('not.contain', user.salary)
      .and('not.contain', user.department);
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-2')
      .should('not.exist');
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-3')
      .should('not.exist');
  });

  // eslint-disable-next-line max-len
  it('should allow to find the worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.findByPlaceholder('First Name')
      .clear();
    cy.findByPlaceholder('First Name')
      .type(user.firstName);
    cy.findByPlaceholder('Last Name')
      .clear();
    cy.findByPlaceholder('Last Name')
      .type(user.lastName);
    cy.findByPlaceholder('name@example.com')
      .clear();
    cy.findByPlaceholder('name@example.com')
      .type(user.email);
    cy.findByPlaceholder('Age')
      .clear();
    cy.findByPlaceholder('Age')
      .type(user.age);
    cy.findByPlaceholder('Salary')
      .clear();
    cy.findByPlaceholder('Salary')
      .type(user.salary);
    cy.findByPlaceholder('Department')
      .clear();
    cy.findByPlaceholder('Department')
      .type(user.department);
    cy.get('#submit')
      .click();
  });

  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();

    cy.get('.rt-table').should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.email)
      .and('contain', user.age)
      .and('contain', user.salary)
      .and('contain', user.department);
  });

  it('should check search by all column values', () => {
    cy.findByPlaceholder('Type to search')
      .type('Cierra');
    cy.get('.rt-td')
      .should('contain', 'Cierra');
    cy.findByPlaceholder('Type to search')
      .clear();
    cy.findByPlaceholder('Type to search')
      .type('Vega');
    cy.get('.rt-td')
      .should('contain', 'Vega');
    cy.findByPlaceholder('Type to search')
      .clear();
    cy.findByPlaceholder('Type to search')
      .type('39');
    cy.get('.rt-td')
      .should('contain', '39');
    cy.findByPlaceholder('Type to search')
      .clear();
    cy.findByPlaceholder('Type to search')
      .type('cierra@example.com');
    cy.get('.rt-td')
      .should('contain', 'cierra@example.com');
    cy.findByPlaceholder('Type to search')
      .clear();
    cy.findByPlaceholder('Type to search')
      .type('10000');
    cy.get('.rt-td')
      .should('contain', '10000');
    cy.findByPlaceholder('Type to search')
      .clear();
    cy.findByPlaceholder('Type to search')
      .type('Insurance');
    cy.get('.rt-td')
      .should('contain', 'Insurance');
  });
});
