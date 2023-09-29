/// <reference types='cypress' />
import * as functions from './commonFunctions';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  functions.addNewWorker();

  it('Rows count selection', () => {
    cy.get('.rt-tr-group').should('have.length', 10);
    cy.get('select').select('5');
    cy.get('.rt-tr-group').should('have.length', 5);
  });

  it('pagination', () => {
    cy.get('select').select('5');
    cy.get('.-btn:contains("Next")').should('have.attr', 'disabled');
    cy.get('.-totalPages').should('have.text', '1');
    functions.addNewWorker(3);
    cy.get('.-totalPages').should('have.text', '2');
  });

  it('should provide ability to Add new worker', () => {
    functions.addNewWorker(1);
  });

  it('Validate data in worker row after creating worker', () => {
    functions.addNewWorker(1);
    functions.validateNewWorker();
  });

  it('should provide ability to Delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should provide ability to Delete ALL workers', () => {
    functions.deleteAllElements();
  });

  it('should provide ability to Find worker in search field and Edit', () => {
    functions.addNewWorker(1);
    functions.findAndEdit();
  });

  it('Check search by all column values', () => {
    functions.addNewWorker(1);
    functions.checkColumnValues();
  });
});
