/// <reference types='cypress' />
/* eslint-disable */
import '../support/commands.js';

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('newWorker').then((newWorker) => {
        worker = newWorker;
      });
  });

  it('should have the pagination', () => {
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have row count selection', () => {
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '10 rows').select('10 rows');
  });

  it('should be able to add worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findById('registration-form-modal').should('contain.text', 'Registration Form');
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findById('userEmail').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.findById('submit').click();
  });

  it('should be able to delete worker', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
  });

  it('should be able to delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-2').should('not.exist');
    cy.findById('delete-record-3').click();
    cy.findById('delete-record-3').should('not.exist');
  });

  it('should be able find and edit worker', () => {
    cy.findById('searchBox').type('Alden');
    cy.findById('edit-record-2').click();
    cy.findById('registration-form-modal').should('contain.text', 'Registration Form');
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findById('userEmail').clear();
    cy.findById('userEmail').type(worker.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(worker.department);
    cy.findById('submit').click();
  });

  it('should be able to validate data after creating worker', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.findById('edit-record-2').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findById('userEmail').clear();
    cy.findById('userEmail').type(worker.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(worker.department);
    cy.findById('submit').click({force:true});
    cy.findByPlaceholder('Type to search').clear();
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age);
    cy.get('.rt-td').should('contain', worker.salary);
    cy.get('.rt-td').should('contain', worker.department);
  });

  it('should be able check search by all column values.', () => {
    cy.findById('searchBox').type('Alden' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'Alden');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Cantrell' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'Cantrell');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('45' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', '45');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('alden@example.com' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'alden@example.com');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('12000' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', '12000');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Compliance' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'Compliance');
  });
});