/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });
  it('should display the total number of pages when new rows are added', () => {
    cy.createWorkers(4, 11);
    cy.get('.-totalPages').should('contain.text', '2');
  });
  it('should allow rows count selection', () => {
    cy.createWorkers(4, 11);
    cy.get('select').select('20 rows');
    cy.get('.rt-td').should('contain.text', 'worker№' + 11);
  });
  it('should allow to add a new worker record', () => {
    cy.createWorkers(4, 4);
    cy.get('.rt-td').should('contain.text', 'worker№' + 4);
  });
  it('should allow to delete a worker record', () => {
    cy.createWorkers(4, 4);
    cy.get('#delete-record-4').click();
    cy.contains('worker№' + 4).should('not.exist');
  });
  it('should allow to delete all worker records', () => {
    cy.createWorkers(4, 10);
    cy.get('select').select('100 rows');
    cy.deleteAllWorkers(10);
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });
  it('should allow to search for a worker record and modify it', () => {
    cy.createWorkers(4, 11);
    cy.get('#searchBox').type('worker№' + 11);
    cy.get('#edit-record-' + 11).click();
    cy.get('#firstName').type('{selectAll}EditedWorker');
    cy.get('#submit').click();
    cy.get('#searchBox').type('{selectAll}{backspace}');
    cy.get('select').select('20 rows');
    cy.get('.rt-td').should('contain.text', 'EditedWorker');
  });
  it('should allow to search for worker records by column values', () => {
    cy.createWorkers(4, 4);
    cy.get('#searchBox').type('worker№' + 4);
    cy.get('.rt-td').should('contain.text', 'worker№' + 4);
    cy.get('#searchBox').type('{selectAll}lastname№' + 4);
    cy.get('.rt-td').should('contain.text', 'lastname№' + 4);
    cy.get('#searchBox').type('{selectAll}' + '24');
    cy.get('.rt-td').should('contain.text', '24');
    cy.get('#searchBox').type('{selectAll}email' + 4 + '@mail.com');
    cy.get('.rt-td').should('contain.text', 'email' + 4 + '@mail.com');
    cy.get('#searchBox').type('{selectAll}' + 4 + '100');
    cy.get('.rt-td').should('contain.text', 4 + '100');
  });
});
