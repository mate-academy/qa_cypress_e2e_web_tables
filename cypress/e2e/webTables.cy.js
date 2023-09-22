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
    cy.get('.-pagination').should('exist');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have the rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows').select('5 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '10 rows').select('10 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '20 rows').select('20 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.findByPlaceholder('First Name')
      .type(worker.firstName);
    cy.findByPlaceholder('Last Name')
      .type(worker.lastName);
    cy.findByPlaceholder('name@example.com')
      .type(worker.email);
    cy.findByPlaceholder('Age')
      .type(worker.age);
    cy.findByPlaceholder('Salary')
      .type(worker.salary);
    cy.findByPlaceholder('Department')
      .type(worker.department);
    cy.get('#submit')
      .click();
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
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

  it('should find the worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.findByPlaceholder('First Name')
      .clear();
    cy.findByPlaceholder('First Name')
      .type(worker.firstName);
    cy.findByPlaceholder('Last Name')
      .clear();
    cy.findByPlaceholder('Last Name')
      .type(worker.lastName);
    cy.findByPlaceholder('name@example.com')
      .clear();
    cy.findByPlaceholder('name@example.com')
      .type(worker.email);
    cy.findByPlaceholder('Age')
      .clear();
    cy.findByPlaceholder('Age')
      .type(worker.age);
    cy.findByPlaceholder('Salary')
      .clear();
    cy.findByPlaceholder('Salary')
      .type(worker.salary);
    cy.findByPlaceholder('Department')
      .clear();
    cy.findByPlaceholder('Department')
      .type(worker.department);
    cy.get('#submit')
      .click();
  });

  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.findByPlaceholder('First Name')
      .type(worker.firstName);
    cy.findByPlaceholder('Last Name')
      .type(worker.lastName);
    cy.findByPlaceholder('name@example.com')
      .type(worker.email);
    cy.findByPlaceholder('Age')
      .type(worker.age);
    cy.findByPlaceholder('Salary')
      .type(worker.salary);
    cy.findByPlaceholder('Department')
      .type(worker.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-td')
      .should('contain', worker.firstName);
    cy.get('.rt-td')
      .should('contain', worker.lastName);
    cy.get('.rt-td')
      .should('contain', worker.email);
    cy.get('.rt-td')
      .should('contain', worker.salary);
    cy.get('.rt-td')
      .should('contain', worker.department);
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
