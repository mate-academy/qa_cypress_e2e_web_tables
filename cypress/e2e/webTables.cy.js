/// <reference types='cypress' />

import { newWorker } from '../support/newWorker.js';
const user = newWorker();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should verify pagination & page count', () => {
    cy.contains('.-btn', 'Next')
      .should('exist');

    cy.contains('.-btn', 'Previous')
      .should('exist');

    cy.get('.-pageInfo')
      .should('exist');
  });

  it('should be able to switch rows amount', () => {
    cy.get('select')
      .select('5 rows');

    cy.get('select')
      .should('contain', '5 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(user.firstName);

    cy.get('#lastName')
      .type(user.lastName);

    cy.get('#userEmail')
      .type(user.email);

    cy.get('#age')
      .type(user.age);

    cy.get('#salary')
      .type(user.salary);

    cy.get('#department')
      .type(user.department);

    cy.get('#submit')
      .click();

    cy.get('.rt-tbody')
      .should('contain', user.firstName)
      .and('contain', user.lastName);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.have.value', 'Cierra');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.have.value', 'Cierra');

    cy.get('#delete-record-2')
      .click();

    cy.get('.rt-tbody')
      .should('not.have.value', 'Alden');

    cy.get('#delete-record-3')
      .click();

    cy.get('.rt-tbody')
      .should('not.have.value', 'Kierra');

    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });

  it('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');

    cy.get('#edit-record-1')
      .click();

    cy.get('#salary')
      .clear();

    cy.get('#salary')
      .type('11000');

    cy.get('#submit')
      .click();

    cy.get('.rt-tbody')
      .should('contain', '11000');
  });

  it('should verify the search by all column values', () => {
    cy.get('#searchBox')
      .type('Cierra');

    cy.get('.rt-tbody')
      .should('contain', 'Cierra');

    cy.get('#searchBox')
      .type(`{selectAll}Vega`);

    cy.get('.rt-tbody')
      .should('contain', 'Vega');

    cy.get('#searchBox')
      .type(`{selectAll}39`);

    cy.get('.rt-tbody')
      .should('contain', '39');

    cy.get('#searchBox')
      .type(`{selectAll}cierra@example.com`);

    cy.get('.rt-tbody')
      .should('contain', 'cierra@example.com');

    cy.get('#searchBox')
      .type(`{selectAll}10000`);

    cy.get('.rt-tbody')
      .should('contain', '10000');

    cy.get('#searchBox')
      .type(`{selectAll}Insurance`);

    cy.get('.rt-tbody')
      .should('contain', 'Insurance');
  });
});
