/// <reference types='cypress' />

const { generateWorker } = require('../support/generateWorker');

const worker = generateWorker();

const workerTest = ['Cierra', 'Vega', 39, 'cierra@example.com', '10000', 'Insurance']

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be displayed the pagination', () => {
    cy.get('.-previous > .-btn')
      .should('contain', 'Previous');
    cy.get('.-next > .-btn')
      .should('contain', 'Next');
    cy.get('.-center')
      .should('contain', 'Page')
      .should('contain', 'of');
    cy.get('.-pageJump > input')
      .should('exist');
  });

  it('should be displayed the rows count selection', () => {
    cy.get('.-pagination')
      .should('contain', '10 rows');
    cy.get('select')
      .should('exist')
      .select('5 rows')
      .select('20 rows');
  });

  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(worker.firstName);
    cy.get('#lastName')
      .type(worker.lastNmae);
    cy.get('#userEmail')
      .type(worker.email);
    cy.get('#age')
      .type(worker.age);
    cy.get('#salary')
      .type(worker.salary);
    cy.get('#department')
      .type(worker.department);
    cy.get('#submit')
      .click();
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1 > svg')
      .click();
  });

  it('should provide an ability to delete all workers', () => {
    for(let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i} > svg`)
        .click();
    }

    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });

  it('should provide an ability to find a worker in the search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#age')
      .type(worker.age);
    cy.get('#salary')
      .type(worker.salary);
    cy.get('#submit')
      .click();
  });

  it('should be displayed data in the worker row after editing the worker', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#age')
      .clear()
      .type(worker.age);
    cy.get('#salary')
      .clear()
      .type(worker.salary);
    cy.get('#submit')
      .click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]')
      .should('contain', worker.age);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)')
      .should('contain', worker.salary);
  });

  it('hould provide an ability to search by all column values', () => {
    for (let i = 0; i <= 5; i++) {
      cy.get('#searchBox')
        .type(workerTest[i]);
      cy.get(`.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(${i + 1})`)
        .should('contain', workerTest[i]);
      cy.get('#searchBox')
        .clear();
    }
  });
});
