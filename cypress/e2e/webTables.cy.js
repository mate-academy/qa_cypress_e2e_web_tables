/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should handle pagination', () => {
    cy.get('.-next').should('exist');

    cy.get('.-previous').should('exist');
  });

  it('should handle rows count selection', () => {
    cy.get('select[aria-label="rows per page"]')
      .should('exist')
      .select('5 rows');

    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '5');

    cy.get('select[aria-label="rows per page"]')
      .should('exist')
      .select('20 rows');

    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '20');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('john.doe@mail.com');
    cy.get('#age').type('30');
    cy.get('#salary').type('50000');
    cy.get('#department').type('Engineering');
    cy.get('#submit').click();

    cy.contains('John');
  });

  it('should delete a worker', () => {
    cy.contains('Kierra').parent()
      .find('[title="Delete"]').click();

    cy.contains('Kierra').should('not.exist');
  });

  it('should delete all workers', () => {
    cy.get('[title="Delete"]').eq(0)
      .click();

    cy.get('[title="Delete"]').eq(0)
      .click();

    cy.get('[title="Delete"]').eq(0)
      .click();

    cy.get('.rt-tbody').should('not.contain', 'Cierra');
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    cy.get('.rt-tbody').should('not.contain', 'Gentry');
  });

  it('should find a worker and edit it', () => {
    cy.get('#searchBox').type('Alden');
    cy.contains('Alden').parent().as('parentElement');
    cy.get('@parentElement').find('[title="Edit"]').click();

    cy.get('#age').clear();
    cy.get('#age').type('55');
    cy.get('#submit').click();

    cy.contains('Alden').parent().should('contain', '55');
  });

  it('should check the search by all column values', () => {
    const searchValues = ['Cierra', '45', 'Insurance'];
    searchValues.forEach((value) => {
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(value);
      cy.get('.rt-tbody').should('contain', value);
    });
  });
});
