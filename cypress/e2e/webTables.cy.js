/// <reference types='cypress' />

const { generateWorker } = require('../support/workerGenerate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  const { firstName, lastName, email, age, salary, department } = generateWorker();

  it('should contain pagination on the page', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('.pagination-bottom').should('contain', 'Previous');
    cy.get('.pagination-bottom').should('contain', 'Page');
    cy.get('.pagination-bottom').should('contain', 'of');
    cy.get('.pagination-bottom').should('contain', 'rows');
    cy.get('.pagination-bottom').should('contain', 'Next');
  });

  it('should be able to select the count of rows', () => {
    cy.get('[aria-label="rows per page"]').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('20');
    cy.get('[aria-label="rows per page"]').should('have.value', '20');
    cy.get('[aria-label="rows per page"]').select('25');
    cy.get('[aria-label="rows per page"]').should('have.value', '25');
    cy.get('[aria-label="rows per page"]').select('50');
    cy.get('[aria-label="rows per page"]').should('have.value', '50');
    cy.get('[aria-label="rows per page"]').select('100');
    cy.get('[aria-label="rows per page"]').should('have.value', '100');
  });

  it('should be able to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type(department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', firstName);
    cy.get('.ReactTable').should('contain', lastName);
    cy.get('.ReactTable').should('contain', email);
    cy.get('.ReactTable').should('contain', age);
    cy.get('.ReactTable').should('contain', salary);
    cy.get('.ReactTable').should('contain', department);
      
  });

  it('should be able to delete a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type(department);
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();
    cy.get('.ReactTable').should('not.contain', firstName)
      .and('not.contain', lastName);
  });

  it('should be able to delete all worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.ReactTable').should('contain', 'No rows found');
    cy.get('.ReactTable').should('not.contain', '#delete-record^');
  });

  it('should be able to to find a worker and edit it', () => {
    cy.get('#searchBox').type('Gentry');
    cy.get('#edit-record-3').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(department);
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.get('.ReactTable').should('contain', firstName)
    cy.get('.ReactTable').should('contain', lastName)
    cy.get('.ReactTable').should('contain', email)
    cy.get('.ReactTable').should('contain', age)
    cy.get('.ReactTable').should('contain', salary)
    cy.get('.ReactTable').should('contain', department)
    cy.get('.ReactTable').should('not.contain', 'Gentry');
  });

  it('should provide to search by all column values', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('.ReactTable').should('contain', 'Alden');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Cantrell');
    cy.get('.ReactTable').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('45');
    cy.get('.ReactTable').should('contain', '45');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.ReactTable').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('12000');
    cy.get('.ReactTable').should('contain', '12000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Compliance');
    cy.get('.ReactTable').should('contain', 'Compliance');
    cy.get('#searchBox').clear();
  });
});