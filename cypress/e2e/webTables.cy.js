/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle pagination', () => {
    cy.get('.-pageInfo').should('contain', 'Page')
      .and('contain', 'of');
    cy.get('.-previous > .-btn').should('be.disabled');
  });
  it('should select rows count', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
  });
  it('should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Michael');
    cy.get('#lastName').type('Scott');
    cy.get('#userEmail').type('michael@example.com');
    cy.get('#age').type('26');
    cy.get('#salary').type('11000');
    cy.get('#department').type('Marketing');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', 'Michael')
      .and('contain', 'Scott');
  });
  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tr-group').should('not.contain', 'Cierra')
      .and('not.contain', 'Vega');
  });
  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.web-tables-wrapper').should('not.have.value');
  });
  it('should find and edit records', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('.rt-tr-group').should('contain', 'Alden');
    cy.get('#edit-record-2').click();
    cy.get('#salary').type('0');
    cy.get('#submit').click();
  });
  it('should validate data after editing', () => {
    cy.get('#edit-record-2').click();
    cy.get('#salary').type('0');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', '120000');
  });
  it('should search by First Name', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('.rt-tr-group').should('contain', 'Kierra');
  });
  it('should search by Last Name', () => {
    cy.get('#searchBox').type('Gentry');
    cy.get('.rt-tr-group').should('contain', 'Gentry');
  });
  it('should search by Age', () => {
    cy.get('#searchBox').type('45');
    cy.get('.rt-tr-group').should('contain', '45');
  });
  it('should search by Email', () => {
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-tr-group').should('contain', 'cierra@example.com');
  });
  it('should search by Salary', () => {
    cy.get('#searchBox').type('2000');
    cy.get('.rt-tr-group').should('contain', '2000');
  });
  it('should search by Department', () => {
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-tr-group').should('contain', 'Insurance');
  });
});
