/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.task('newWorker').then((newWorker) => {
      worker = newWorker;
    });
    cy.visit('/');
  });

  it('should contain the Pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-btn').should('contain', 'Previous');
    cy.get('.-btn').should('contain', 'Next');
    cy.get('.-center').should('contain', 'Page');
  });

  it('should contain rows count selection', () => {
    cy.get('select').should('contain', '5 rows');
    cy.get('select').should('contain', '10 rows');
    cy.get('select').should('contain', '20 rows');
    cy.get('select').should('contain', '25 rows');
    cy.get('select').should('contain', '50 rows');
    cy.get('select').should('contain', '100 rows');
  });

  it('should allow to add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
  });

  it('should allow to delete a worker', () => {
    cy.get('#delete-record-2').click();
    cy.get('.rt-td').should('not.contain', 'alden@example.com');
    cy.get('.rt-td').should('not.contain', '#delete-record-2');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-td').should('not.contain', '#delete-record-1');
    cy.get('.rt-td').should('not.contain', '#delete-record-2');
    cy.get('.rt-td').should('not.contain', '#delete-record-3');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Cierra');
    cy.get('.rt-td').should('contain', 'Cierra');
    cy.get('#edit-record-1').click();

    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('button', 'Submit').click();
    cy.findByPlaceholder('Type to search').clear();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
  });

  it('should allow to checking data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age);
    cy.get('.rt-td').should('contain', worker.salary);
    cy.get('.rt-td').should('contain', worker.department);
  });

  it('should allow to checking search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Cierra');
    cy.get('.rt-td').should('contain', 'Cierra');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('Vega');
    cy.get('.rt-td').should('contain', 'Vega');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('39');
    cy.get('.rt-td').should('contain', '39');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('cierra@');
    cy.get('.rt-td').should('contain', 'cierra@example.com');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('10000');
    cy.get('.rt-td').should('contain', '10000');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('Insurance');
    cy.get('.rt-td').should('contain', 'Insurance');
    cy.findByPlaceholder('Type to search').clear();
  });
});
