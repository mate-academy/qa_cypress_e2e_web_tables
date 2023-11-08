/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);
  });

  it('should add a new worker', () => {
    cy.createWorker();
  });

  it('should check the pagination for 5 rows with 6 users', () => {
    for (let i = 0; i < 3; i++) {
      cy.createWorker();
    };
    cy.get('select[aria-label="rows per page"]')
      .select('5 rows');
    cy.get('div[class="-next"]')
      .click();
    cy.get('div[class="-previous"]')
      .click();
  });

  it('should check the rows count selection', () => {
    cy.get('select[aria-label="rows per page"]')
      .select('5 rows');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '5');
    cy.get('select[aria-label="rows per page"]')
      .select('10 rows');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '10');
    cy.get('select[aria-label="rows per page"]')
      .select('25 rows');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '25');
    cy.get('select[aria-label="rows per page"]')
      .select('50 rows');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '50');
    cy.get('select[aria-label="rows per page"]')
      .select('100 rows');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '100');
  });

  it('should delete a worker', () => {
    cy.get('span[id="delete-record-1"]')
      .click();
    cy.get('span[id="delete-record-1"]')
      .should('not.exist');
  });

  it('should delete all workers', () => {
    for (let i = 1; i <= 3; i++) {
      const deletedWorker = `span[id="delete-record-${i}"]`;
      cy.get(deletedWorker)
        .click();
      cy.get(deletedWorker)
        .should('not.exist');
    };
  });

  it('should find a worker in the search field', () => {
    cy.get('input[id="searchBox"]')
      .type('Cierra');
    cy.get('.rt-tbody')
      .contains('Cierra')
      .should('be.visible');
  });

  it('should edit and validate data in the worker row after editing', () => {
    cy.get('span[id="edit-record-1"]')
      .click();
    cy.get('input[id="firstName"]')
      .clear();
    cy.get('input[id="firstName"]')
      .type('EditedName');
    cy.get('button[id="submit"]')
      .click();
    cy.get('.rt-tbody')
      .contains('EditedName')
      .should('be.visible');
  });

  it('should check the search by all column values', () => {
    const searchTerms = [
      'Alden',
      'Cantrell',
      '45',
      'alden@example.com',
      '12000',
      'Compliance'
    ];

    searchTerms.forEach((term) => {
      cy.get('input[id="searchBox"]').type(term);
      cy.get('.rt-tbody').contains(term);
      cy.get('input[id="searchBox"]').clear();
    });
  });
});
