/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() =>{
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('Assert the pagination and number of lines', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('5 rows');
  });

  it('Should add a new employee and delete him', () => {
    cy.get('#addNewRecordButton.btn.btn-primary').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();
  });

    it('Should delete all workers', () => {
      cy.get('#delete-record-1').click();
      cy.get('#delete-record-2').click();
      cy.get('#delete-record-3').click();
      cy.get('.rt-noData').should('exist');
    });
  
    it('Should find a worker in the search field and edit it', () => {
      cy.findByPlaceholder('Type to search').type('Cierra');
      cy.get('#edit-record-1').click();
      cy.findByPlaceholder('Last Name').type(user.lastName);
      cy.get('#submit').click();
      cy.get('.rt-td').should('contain', user.lastName);
    });
  
    it('Assert the search by all column values', () => {
      cy.findByPlaceholder('Type to search').type('Cierra');
      cy.get('.rt-td').should('contain', 'Cierra');
      cy.findByPlaceholder('Type to search').clear();
  
      cy.findByPlaceholder('Type to search').type('Vega');
      cy.get('.rt-td').should('contain', 'Vega');
      cy.findByPlaceholder('Type to search').clear();
  
      cy.findByPlaceholder('Type to search').type('39');
      cy.get('.rt-td').should('contain', '39');
      cy.findByPlaceholder('Type to search').clear();
  
      cy.findByPlaceholder('Type to search').type('cierra@example.com');
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