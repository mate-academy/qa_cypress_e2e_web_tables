/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should check pagination', () => {
    cy.get('.-previous button').should('exist');
    cy.get('.-pageInfo').should('exist');
    cy.get('.-pageSizeOptions select').should('exist');
    cy.get('.-next button').should('exist');
  });

  it('should select rows count', () => {
    const selectedRowCount = 20;

    cy.get('.-pageSizeOptions select')
      .select(selectedRowCount + ' rows');
    cy.get('.rt-tr-group')
      .should('have.length', selectedRowCount);
  });

  it('should add a new worker', () => {
    cy.AddNewWorker();
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`).click();
    };
    cy.get(`.rt-noData`).should('contain', 'No rows found');
  });

  it('should find and edit a worker', () => {
    cy.get('#searchBox').type('Kierra');

    cy.get('.rt-tr').should('exist');
    cy.get('.action-buttons [title="Edit"]').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('NewFirstName');
    cy.get('#lastName').clear();
    cy.get('#lastName').type('NewLastName');
    cy.get('#submit').click();
  });

  it('should validate data after editing', () => {
    cy.get('#searchBox').type('cierra@example.com');

    cy.get('.rt-tr').should('exist');
    cy.get('.action-buttons [title="Edit"]').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('NewFirstName');
    cy.get('#lastName').clear();
    cy.get('#lastName').type('NewLastName');
    cy.get('#submit').click();

    cy.get('.rt-tr').should('contain', 'NewFirstName');
    cy.get('.rt-tr').should('contain', 'NewLastName');
  });

  it('should search by all column values', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('.rt-tbody').should('contain', 'Alden');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Cantrell');
    cy.get('.rt-tbody').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(45);
    cy.get('.rt-tbody').should('contain', 45);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(12000);
    cy.get('.rt-tbody').should('contain', 12000);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Compliance');
    cy.get('.rt-tbody').should('contain', 'Compliance');
  });
});
