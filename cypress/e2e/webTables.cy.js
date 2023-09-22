/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('newWorker')
    .then((newWorker) => {
      worker = newWorker;
    });
  });

  it('should have the pagination', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('.-pageInfo').should('exist');
    cy.get('.select-wrap').should('exist');
    cy.get('.-previous').should('contain', 'Previous');
    cy.get('.-next').should('contain', 'Next');
  });

  it('should have the rows count selection', () => {
    cy.get('[aria-label="rows per page"]').select('5').should('have.value', '5');
    cy.get('[aria-label="rows per page"]').select('10').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('5').should('have.value', '20');
    cy.get('[aria-label="rows per page"]').select('5').should('have.value', '25');
    cy.get('[aria-label="rows per page"]').select('5').should('have.value', '50');
    cy.get('[aria-label="rows per page"]').select('100').should('have.value', '100');
  });

  it('should add new worker', () => {
    cy.get('#addNewRecordButton').contains('Add').should('exist');
    cy.addNewWorder(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.containWorkerData(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
  });

  it('should delete new worker', () => {
    cy.addNewWorder(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('#delete-record-1').click();
    cy.notContainWorkerData(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('.rt-td').not('contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-td').not('contain', '#delete-record-1');
    cy.get('#delete-record-2').click();
    cy.get('.rt-td').not('contain', '#delete-record-2');
    cy.get('#delete-record-3').click();
    cy.get('.rt-td').not('contain', '#delete-record-3');
  });

  it('should search and edit new worker', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('#edit-record-2').click();
    cy.get('.modal-content').should('exist');
    cy.editWorker(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.containWorkerData(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
  });

  it('should validate data in worker row after creating worker', () => {
    cy.addNewWorder(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
    cy.containWorkerData(worker.firstName, worker.lastName, worker.email, worker.age, worker.salary, worker.department);
  });

  it.only('should check search by all column values', () => {
    cy.searchByAllValues();
  });
});
