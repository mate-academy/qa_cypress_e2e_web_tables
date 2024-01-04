/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should contains pagination', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('.pagination-bottom').should('contain', 'Previous');
    cy.get('.pagination-bottom').should('contain', 'Page');
    cy.get('.pagination-bottom').should('contain', 'of');
    cy.get('.pagination-bottom').should('contain', 'rows');
    cy.get('.pagination-bottom').should('contain', 'Next');
  });

  it('should be able to change the rows count selection', () => {
    cy.get('select[aria-label="rows per page"]').select('5 rows');
    cy.get('select').should('contain.text', '5 rows');
    cy.get('select[aria-label="rows per page"]').select('10 rows');
    cy.get('select').should('contain.text', '10 rows');
  });

  it('should provide the ability to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');
    cy.get('#firstName').type('Nata');
    cy.get('#lastName').type('Natanata');
    cy.get('#userEmail').type('nata123@gmail.com');
    cy.get('#age').type('20');
    cy.get('#salary').type('2000');
    cy.get('#department').type('qa');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', 'Nata')
      .and('contain', 'Natanata');
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-3').click();
    cy.get('.rt-tr-group').should('not.contain', 'Kierra')
      .and('not.contain', 'Gentry');
  });

  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.web-tables-wrapper').should('not.have.value');
  });

  it('should provide an ability to search worker and edit it', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tr-group').should('contain', 'Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#lastName').clear();
    cy.get('#lastName').type('Nata');
    cy.get('#submit').click();
  });

  it('should provide an ability to validate data after editing', () => {
    cy.get('#edit-record-1').click();
    cy.get('#lastName').clear();
    cy.get('#lastName').type('Nata');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', 'Nata');
  });
  it('should provide an ability to search by First Name', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tr-group').should('contain', 'Cierra');
  });
  it('should provide an ability to search by Last Name', () => {
    cy.get('#searchBox').type('Cantrell');
    cy.get('.rt-tr-group').should('contain', 'Cantrell');
  });
  it('should provide an ability to search by Age', () => {
    cy.get('#searchBox').type('29');
    cy.get('.rt-tr-group').should('contain', '29');
  });
  it('should provide an ability to search by Email', () => {
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-tr-group').should('contain', 'cierra@example.com');
  });
  it('should provide an ability to search by Salary', () => {
    cy.get('#searchBox').type('12000');
    cy.get('.rt-tr-group').should('contain', '12000');
  });
  it('should provide an ability to search by Department', () => {
    cy.get('#searchBox').type('Legal');
    cy.get('.rt-tr-group').should('contain', 'Legal');
  });
});
