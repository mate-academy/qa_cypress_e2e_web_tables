/// <reference types='cypress' />
const faker = require('faker');

beforeEach(() => {
  cy.visit('/webtables');
});

const defineFakeWorker = {
  firstName: 'Yura',
  lastName:  'Kisilchuk',
  email: 'yura@gmail.com',
  age: '21',
  salary: '1000',
  department: 'Testing'
};

describe('Web Tables page', () => {
  it('should contain a pagination', () => {
    cy.get('.-pagination').should('contain', 'Page').and('contain', 'of');

  });

  it('should provide an ability to select rows count', () => {
    cy.get('[aria-label="rows per page"]').select('10 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '10 rows')
  });

  it('should provide the ability to add a new worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findById('firstName').type(defineFakeWorker.firstName);
    cy.findById('lastName').type(defineFakeWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(defineFakeWorker.email);
    cy.findByPlaceholder('Age').type(defineFakeWorker.age);
    cy.findByPlaceholder('Salary').type(defineFakeWorker.salary);
    cy.findByPlaceholder('Department').type(defineFakeWorker.department);
    cy.findById('submit').click();
    cy.get('.rt-table').should('contain', defineFakeWorker.firstName);
    cy.get('.rt-table').should('contain', defineFakeWorker.lastName);
    cy.get('.rt-table').should('contain', defineFakeWorker.email);
  });

  it('should provide the ability to delete a worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findById('firstName').type(defineFakeWorker.firstName);
    cy.findById('lastName').type(defineFakeWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(defineFakeWorker.email);
    cy.findByPlaceholder('Age').type(defineFakeWorker.age);
    cy.findByPlaceholder('Salary').type(defineFakeWorker.salary);
    cy.findByPlaceholder('Department').type(defineFakeWorker.department);
    cy.findById('submit').click();
    cy.findById('delete-record-4').click();
    cy.get('.rt-table').should('not.contain', defineFakeWorker.firstName);
    cy.get('.rt-table').should('not.contain', defineFakeWorker.lastName);
    cy.get('.rt-table').should('not.contain', defineFakeWorker.email);
  });

  it('should provide the ability to delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-3').click();
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should provide the ability to find a worker in the search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.rt-table').should('contain', 'Alden');
    cy.findById('edit-record-2').click();
    cy.findByPlaceholder('First Name').type(`{selectAll}Aldeno`)
    cy.findById('submit').click();
    cy.get('.rt-table').should('contain', 'Aldeno');
  });

  it('should contain the search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.rt-table').should('contain', 'Alden');
    cy.findByPlaceholder('Type to search').type(`{selectAll}Cantrell`);
    cy.get('.rt-table').should('contain', 'Cantrell');
    cy.findByPlaceholder('Type to search').type(`{selectAll}45`);
    cy.get('.rt-table').should('contain', '45');
    cy.findByPlaceholder('Type to search').type(`{selectAll}alden@example.com`);
    cy.get('.rt-table').should('contain', 'alden@example.com');
    cy.findByPlaceholder('Type to search').type(`{selectAll}12000`);
    cy.get('.rt-table').should('contain', '12000');
    cy.findByPlaceholder('Type to search').type(`{selectAll}Compliance`);
    cy.get('.rt-table').should('contain', 'Compliance');
  });
});
