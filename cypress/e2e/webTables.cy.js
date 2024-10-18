/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should can change rows count', () => {
    cy.selectCountRows('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
  });

  it('should add a new worker', () => {
    cy.addNewWorker();
  });

  it('should navigate to the next page by pagination', () => {
    cy.selectCountRows('5 rows');
    cy.addNewWorker();
    cy.addNewWorker();
    cy.addNewWorker();
    cy.contains('.-btn', 'Next').should('not.contain', 'disabled');
    cy.contains('.-btn', 'Next').click();
    cy.contains('.-btn', 'Previous').should('not.contain', 'disabled');
    cy.contains('.-btn', 'Previous').click();
  });

  it('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Lorrem');
    cy.get('#submit').click();

    cy.contains('[role=gridcell]', 'Lorrem').should('be.visible');
  });

  it('should find a worker in the search field by last name', () => {
    cy.get('#searchBox').type('Cantrell');
  });

  it('should find a worker in the search field by age', () => {
    cy.get('#searchBox').type('45');
  });

  it('should find a worker in the search field by email', () => {
    cy.get('#searchBox').type('cierra@example.com');
  });

  it('should find a worker in the search field by salary', () => {
    cy.get('#searchBox').type('10000');
  });

  it('should find a worker in the search field by department', () => {
    cy.get('#searchBox').type('Insurance');
  });

  it('should delete a worker', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('span[title="Delete"]').first().click();

    cy.contains('[role=gridcell]', 'Cierra').should('not.exist');
  });

  it('should delete all workers', () => {
    cy.get('span[title="Delete"]').first().click();
    cy.get('span[title="Delete"]').first().click();
    cy.get('span[title="Delete"]').first().click();

    cy.contains('No rows found').should('be.visible');
  });
});
