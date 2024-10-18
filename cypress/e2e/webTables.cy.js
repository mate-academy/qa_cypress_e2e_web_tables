import { workerData } from '../support/userData';
/// <reference types = "cypress" />

function addWorker() {
  const workerCount = 3;
  Cypress._.times(workerCount, () => {
    const newWorker = workerData();
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(newWorker.firstName);
    cy.get('#lastName').type(newWorker.lastName);
    cy.get('#userEmail').type(newWorker.email);
    cy.get('#age').type('25');
    cy.get('#salary').type(newWorker.salary);
    cy.get('#department').type(newWorker.department);
    cy.get('#submit').click();

    cy.get('.rt-tbody').contains(`${newWorker.firstName}`).should('exist');

    return newWorker;
  });
}

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add a new worker', () => {
    addWorker();
  });

  it('should switch to pages by pagination', () => {
    addWorker();

    cy.contains('.-btn', 'Next').should('exist');
    cy.contains('.-btn', 'Previous').should('exist');

    cy.get('select[aria-label="rows per page"]').select('5');

    cy.contains('.-btn', 'Next').click();
    cy.get('input[type="number"]').should('have.value', 2);

    cy.contains('.-btn', 'Previous').click();
    cy.get('input[type="number"]').should('have.value', 1);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.contains('div', 'cierra@example.com').should('not.exist');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.contains('div', 'cierra@example.com').should('not.exist');

    cy.get('#delete-record-2').click();
    cy.contains('div', 'alden@example.com').should('not.exist');

    cy.get('#delete-record-3').click();
    cy.contains('div', 'kierra@example.com').should('not.exist');
  });

  it('should find a worker in the search field by all column', () => {
    cy.get('#searchBox').type('Cierra');
    cy.contains('div', 'Alden').should('not.exist');

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Cantrell');
    cy.contains('div', 'Cierra').should('not.exist');

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('29');
    cy.contains('div', 'Cantrell').should('not.exist');

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('cierra@example.com');
    cy.contains('div', 'Kierra').should('not.exist');

    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('10000');
    cy.contains('div', 'Kierra').should('not.exist');
  });

  it('should edit a worker', () => {
    cy.get('#edit-record-1').click();
    cy.get('#age').clear();
    const age = 23;
    cy.get('#age').type(age);

    cy.get('#submit').click();

    cy.contains('div', age).should('be.visible');
  });
});
