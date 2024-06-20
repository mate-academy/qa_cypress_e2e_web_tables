/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('addWorker').then((addWorker) => {
      worker = addWorker;
    });
  });

  it('should have pagination', () => {
    cy.get('.-pageInfo').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-pagination').should('contain', 'Next');
  });

  it('should allow to select the number of rows', () => {
    cy.get('select').select('5 rows');

    cy.get('select').should('contain', '5 rows');

    cy.get('select').select('10 rows');

    cy.get('select').should('contain', '10 rows');

    cy.get('select').select('20 rows');

    cy.get('select').should('contain', '20 rows');
  });

  it('should allow to add a new worker', () => {
    cy.contains('button', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type('Accounting');
    cy.contains('button', 'Submit').click();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
  });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();

    cy.get('#delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();

    cy.get('#delete-record-1').should('not.exist');

    cy.get('#delete-record-2').click();

    cy.get('#delete-record-2').should('not.exist');

    cy.get('#delete-record-3').click();

    cy.get('#delete-record-3').should('not.exist');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Cierra');
    cy.get('#basic-addon2').click();
    cy.get('#edit-record-1').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(worker.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type('Security');
    cy.contains('button', 'Submit').click();
    cy.findByPlaceholder('Type to search').clear();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
  });

  it('should validate data after creating worker', () => {
    cy.contains('button', 'Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type('Marketing');
    cy.contains('button', 'Submit').click();

    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age);
    cy.get('.rt-td').should('contain', worker.salary);
    cy.get('.rt-td').should('contain', 'Marketing');
  });

  it('should allow to search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('cie');

    cy.get('.rt-td').should('contain', 'Cierra');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('Ve');

    cy.get('.rt-td').should('contain', 'Vega');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('3');

    cy.get('.rt-td').should('contain', '39');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('cierra@');

    cy.get('.rt-td').should('contain', 'cierra@example.com');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('10');

    cy.get('.rt-td').should('contain', '10000');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('ins');

    cy.get('.rt-td').should('contain', 'Insurance');
  });
});
