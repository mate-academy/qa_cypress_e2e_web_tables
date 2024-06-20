/// <reference types='cypress' />

describe('Web Tables page', () => {
  let newWorker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateWorker').then((generateWorker) => {
      newWorker = generateWorker;
    });
  });

  it('should have pagination', () => {
    cy.get('.-previous').should('contain', 'Previous');
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('.-next').should('contain', 'Next');
  });

  it('should select rows per page', () => {
    cy.get('select[aria-label="rows per page"]').select('25');
    cy.get('.rt-tr-group').should('have.length', 25);
  });

  it('should allow to add new worker', () => {
    cy.findById('addNewRecordButton').click();

    cy.findById('firstName').type(newWorker.firstName);
    cy.findById('lastName').type(newWorker.lastName);
    cy.findById('userEmail').type(newWorker.email);
    cy.findById('age').type(newWorker.age);
    cy.findById('salary').type(newWorker.salary);
    cy.findById('department').type(newWorker.department);

    cy.get('#submit').click();

    cy.get('.rt-table').should('contain', newWorker.firstName);
    cy.get('.rt-table').should('contain', newWorker.lastName);
    cy.get('.rt-table').should('contain', newWorker.email);
    cy.get('.rt-table').should('contain', newWorker.age);
    cy.get('.rt-table').should('contain', newWorker.salary);
    cy.get('.rt-table').should('contain', newWorker.department);
  });

  it('should allow to delete worker', () => {
    cy.findById('delete-record-1').click();

    cy.findById('delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-3').click();

    cy.contains('.rt-noData', 'No rows found').should('be.visible');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findById('searchBox').type('Cierra');
    cy.findById('edit-record-1').click();

    cy.findById('salary').clear();
    cy.findById('department').clear();

    cy.findById('salary').type(newWorker.salary);
    cy.findById('department').type(newWorker.department);

    cy.findById('submit').click();
    cy.findById('searchBox').clear();

    cy.get('.rt-table').should('contain', newWorker.salary);
    cy.get('.rt-table').should('contain', newWorker.department);
  });

  it('should allow to search worker by all column values', () => {
    cy.findById('searchBox').type('Cierra');
    cy.get('.rt-table').should('contain', 'Cierra');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('Vega');
    cy.get('.rt-table').should('contain', 'Vega');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('39');
    cy.get('.rt-table').should('contain', '39');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('cierra@example.com');
    cy.get('.rt-table').should('contain', 'cierra@example.com');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('10000');
    cy.get('.rt-table').should('contain', '10000');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('Insurance');
    cy.get('.rt-table').should('contain', 'Insurance');
    cy.findById('searchBox').clear();
  });
});
