/// <reference types='cypress' />

const newWorker = {
  firstName: 'Steven',
  lastName: 'Johnson',
  email: 'Sjohnson@gmail.com',
  age: '30',
  salary: '30000',
  department: 'Bookkeeper'
};

const existingWorker = {
  firstName: 'Cierra',
  lastName: 'Vega',
  email: 'cierra@example.com',
  age: '39',
  salary: '10000',
  department: 'Insurance'
};

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should contain pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Page')
      .and('contain', 'of');
  });

  it('should provide an ability to show rows count selection', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
  });

  it('should provide an ability to create a new worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(newWorker.firstName);
    cy.findByPlaceholder('Last Name').type(newWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(newWorker.email);
    cy.findByPlaceholder('Age').type(newWorker.age);
    cy.findByPlaceholder('Salary').type(newWorker.salary);
    cy.findByPlaceholder('Department').type(newWorker.department);
    cy.findById('submit').click();

    cy.get('.rt-table')
      .should('contain', newWorker.firstName)
      .and('contain', newWorker.lastName)
      .and('contain', newWorker.email);
  });

  it('should provide an ability to delete worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(newWorker.firstName);
    cy.findByPlaceholder('Last Name').type(newWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(newWorker.email);
    cy.findByPlaceholder('Age').type(newWorker.age);
    cy.findByPlaceholder('Salary').type(newWorker.salary);
    cy.findByPlaceholder('Department').type(newWorker.department);
    cy.findById('submit').click();
    cy.findById('delete-record-4').click();

    cy.get('.rt-table')
      .should('not.contain', newWorker.firstName)
      .and('not.contain', newWorker.lastName)
      .and('not.contain', newWorker.email);
  });

  it('should provide an ability to delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-3').click();

    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should provide an ability to search worker and edit it', () => {
    cy.findByPlaceholder('Type to search').type(existingWorker.email);

    cy.get('.rt-table').should('contain', existingWorker.email);

    cy.findById('edit-record-1').click();
    cy.findByPlaceholder('First Name').type(`{selectAll}${newWorker.firstName}`);
    cy.findById('submit').click();

    cy.get('.rt-table').should('contain', newWorker.firstName);
  });

  it('should provide an ability to search by all table values', () => {
    cy.findByPlaceholder('Type to search').type(existingWorker.email);
    cy.get('.rt-table').should('contain', existingWorker.email);

    cy.findByPlaceholder('Type to search').type(`{selectAll}${existingWorker.firstName}`);
    cy.get('.rt-table').should('contain', existingWorker.firstName);

    cy.findByPlaceholder('Type to search').type(`{selectAll}${existingWorker.lastName}`);
    cy.get('.rt-table').should('contain', existingWorker.lastName);

    cy.findByPlaceholder('Type to search').type(`{selectAll}${existingWorker.age}`);
    cy.get('.rt-table').should('contain', existingWorker.age);

    cy.findByPlaceholder('Type to search').type(`{selectAll}${existingWorker.salary}`);
    cy.get('.rt-table').should('contain', existingWorker.salary);

    cy.findByPlaceholder('Type to search').type(`{selectAll}${existingWorker.department}`);
    cy.get('.rt-table').should('contain', existingWorker.department);
  });
});
