/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });
  it('should have pagination', () => {
    cy.get('.-pageInfo').should('contain', 'Page').and('contain', 'of');
    cy.get('.-previous > .-btn').should('be.disabled');
  });
  it('should provide an ability to select rows count', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
  });
  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Test');
    cy.get('#lastName').type('Testname');
    cy.get('#userEmail').type('exemple@test.com');
    cy.get('#age').type('30');
    cy.get('#salary').type('1000');
    cy.get('#department').type('quality');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', 'Test')
      .and('contain', 'Testname');
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
  it('should provide an ability to find and edit records', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tr-group').should('contain', 'Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#salary').type('1');
    cy.get('#submit').click();
  });
  it('should provide an ability to validate data after editing', () => {
    cy.get('#edit-record-1').click();
    cy.get('#salary').type('1');
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', '100001');
  });
  it('should provide an ability to search by First Name', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('.rt-tr-group').should('contain', 'Alden');
  });
  it('should provide an ability to search by Last Name', () => {
    cy.get('#searchBox').type('Gentry');
    cy.get('.rt-tr-group').should('contain', 'Gentry');
  });
  it('should provide an ability to search by Age', () => {
    cy.get('#searchBox').type('45');
    cy.get('.rt-tr-group').should('contain', '45');
  });
  it('should provide an ability to search by Email', () => {
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-tr-group').should('contain', 'alden@example.com');
  });
  it('should provide an ability to search by Salary', () => {
    cy.get('#searchBox').type('12000');
    cy.get('.rt-tr-group').should('contain', '12000');
  });
  it('should provide an ability to search by Department', () => {
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-tr-group').should('contain', 'Insurance');
  });
});
