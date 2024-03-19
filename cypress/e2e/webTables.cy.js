/// <reference types='cypress' />
describe('Web Tables page', () => {
  
  beforeEach(() => {
    cy.visit('/webtables');
  });
   

  it('should check pagination', () => {
    cy.generate_N_Users(10);
    cy.contains('.-btn', 'Next').click();
    cy.get('[aria-label="jump to page"]').should('have.value',
     '2', {timeout: 10000});
  });

  it('should check rows count selection', () => {
    cy.get('[aria-label="rows per page"]').select('5');
    cy.get('[aria-label="rows per page"]').should('contain', '5');
  });

  it('should check adding a new worker', () => {
    cy.generate_N_Users(1);
    cy.get(':nth-child(4)').should('not.have.value', null);
  });

  it('should check deletion of a worker', () => {
    cy.generate_N_Users(1);
    cy.get('#delete-record-4').click();
    cy.get(':nth-child(4)').should('have.value', '');
  });

  it('should check deletion of all workers', () => {
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-1').click();
    cy.get(':nth-child(1)').should('have.value', '');
  });

  it('should check searching the worker and edition of his data', () => {
    cy.get('#searchBox').type('Alden{enter}');
    cy.get(':nth-child(1)').should('contain', 'Alden');
    cy.get('#edit-record-2').click();
    cy.get('#firstName').clear().type('Tester');
    cy.get('#submit').click();
    cy.get(':nth-child(1)').should('contain', 'Tester');
  });

  it('should check Email validation after editing the worker', () => {
    cy.get('#edit-record-1').click();
    cy.get('input:invalid').should('have.length', 0)
    cy.get('#userEmail').clear().type('!@#$%^{enter}');
    cy.get('input:invalid').should('have.length', 1)
  });

  it.only('should check the search by all column values', () => {
    cy.searchByColVal('Age', '29');
  });
});
