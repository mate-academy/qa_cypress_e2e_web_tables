/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  const newWorker = {
    firstName: 'John',
    lastName: 'Smith',
    age: 25,
    email: 'fomenko1ivan@gmail.com',
    salary: 1000,
    department: 'Insurance'
  };
  beforeEach(() => {
    cy.visit('/');
  });
  it('should contain pagination', () => {
    cy.contains('.pagination-bottom', 'Page')
      .should('exist');
    cy.contains('.pagination-bottom', 'Page')
      .should('contain', 'Previous');
    cy.contains('.pagination-bottom', 'Page')
      .should('contain', 'Next');
    cy.get('.-pageSizeOptions')
      .should('exist');
  });
  it('should provide ad ability to add new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(newWorker.firstName);
    cy.get('#lastName')
      .type(newWorker.lastName);
    cy.get('#userEmail')
      .type(newWorker.email);
    cy.get('#age')
      .type(newWorker.age);
    cy.get('#salary')
      .type(newWorker.salary);
    cy.get('#department')
      .type(newWorker.department);
    cy.get('#submit')
      .click();
    cy.contains('[role="row"]', newWorker.firstName)
      .should('contain', newWorker.firstName)
      .and('contain', newWorker.lastName)
      .and('contain', newWorker.email)
      .and('contain', newWorker.age)
      .and('contain', newWorker.salary)
      .and('contain', newWorker.department);
  });
  it('should provide ad ability to delete worker', () => {
    cy.contains('[role="row"]', 'Cierra')
      .find('#delete-record-1')
      .click();
    cy.contains('[role="row"]', 'Cierra')
      .should('not.exist');
  });
  it('should provide ad ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-noData')
      .should('be.visible');
  });
  it('should provide ad ability to find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.contains('[role="row"]', 'Cierra')
      .should('contain', 'Cierra');
    cy.get('#searchBox')
      .clear()
      .type('Vega');
    cy.contains('[role="row"]', 'Cierra')
      .should('contain', 'Vega');
    cy.get('#searchBox')
      .clear()
      .type('cierra@example.com');
    cy.contains('[role="row"]', 'Cierra')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .clear()
      .type(39);
    cy.contains('[role="row"]', 'Cierra')
      .should('contain', 39);
    cy.get('#searchBox')
      .clear()
      .type(10000);
    cy.contains('[role="row"]', 'Cierra')
      .should('contain', 10000);
    cy.get('#searchBox')
      .clear()
      .type('Insurance');
    cy.contains('[role="row"]', 'Cierra')
      .should('contain', 'Insurance');
  });
});