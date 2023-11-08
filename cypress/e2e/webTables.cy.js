/// <reference types='cypress' />

const { newWorkerCreation, workerData } = require('../support/helpers');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should provide an ability to change pages', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous');
    cy.get('[aria-label="jump to page"]')
      .should('exist');
    cy.get('.-pagination')
      .should('contain', 'Next');
    cy.get('.-pageInfo')
      .should('contain', 'of 1');
    newWorkerCreation(8);
    cy.get('.-pageInfo')
      .should('contain', 'of 2');
    cy.get('[aria-label="jump to page"]')
      .type('2{enter}');
    cy.get('.rt-tr-group')
      .should('contain', workerData[0]);
    cy.get('.rt-tr-group')
      .should('contain', workerData[1]);
  });

  it('should provide an ability to change rows quantity', () => {
    const rowCount = [5, 10, 20, 25, 50, 100];

    rowCount.forEach((num) => {
      cy.get(`[aria-label='rows per page']`)
        .select(`${num}`);
      cy.get('[aria-label="rows per page"]')
        .should('contain', num + ' rows');
    });
  });

  it('should provide an ability to add new worker', () => {
    newWorkerCreation(1);
    cy.get('.rt-tr-group')
      .should('contain', workerData[0]);
    cy.get('.rt-tr-group')
      .should('contain', workerData[1]);
  });

  it('should provide an ability to delete a worker', () => {
    newWorkerCreation(1);
    cy.get('.rt-tr-group')
      .should('contain', workerData[0]);
    cy.get('.rt-tr-group')
      .should('contain', workerData[1]);
    cy.get('#delete-record-4')
      .click();
    cy.get('.rt-tr-group')
      .should('not.contain', workerData[0]);
    cy.get('.rt-tr-group')
      .should('not.contain', workerData[1]);
  });

  it('should provide an ability to delete all workers', () => {
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`)
        .click();
    };
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });

  it('should provide an ability to find a worker and edit it', () => {
    newWorkerCreation(1);
    cy.get('#searchBox')
      .type(workerData[0]);
    cy.get('.input-group-append')
      .click();
    cy.get('[id^="edit-record"]')
      .click();
    cy.get('#lastName')
      .type('{selectAll}editedLastName');
    cy.get('#age')
      .type('{selectAll}55');
    cy.get('#submit')
      .click();
    cy.get('.rt-td')
      .should('contain', 'editedLastName');
    cy.get('.rt-td')
      .should('contain', 55);
  });

  it('should validate data in the worker row after creating a worker', () => {
    newWorkerCreation(1);
    cy.get('.rt-td').should('contain', workerData[0]);
    cy.get('.rt-td').should('contain', workerData[1]);
    cy.get('.rt-td').should('contain', workerData[2]);
    cy.get('.rt-td').should('contain', workerData[3]);
    cy.get('.rt-td').should('contain', workerData[4]);
    cy.get('.rt-td').should('contain', workerData[5]);
  });

  it('should provide an ability to search workers by all column values', () => {
    newWorkerCreation(1);
    cy.get('#searchBox')
      .type(workerData[0]);
    cy.get('.rt-td').should('contain', workerData[0]);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(workerData[1]);
    cy.get('.rt-td').should('contain', workerData[1]);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(workerData[2]);
    cy.get('.rt-td').should('contain', workerData[2]);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(workerData[3]);
    cy.get('.rt-td').should('contain', workerData[3]);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(workerData[4]);
    cy.get('.rt-td').should('contain', workerData[4]);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(workerData[5]);
    cy.get('.rt-td').should('contain', workerData[5]);
  });
});
