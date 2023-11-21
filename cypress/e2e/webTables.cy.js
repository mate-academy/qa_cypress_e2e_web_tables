/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('checks pagination', () => {
    
    cy.get('.next').click();
    cy.get('.active').should('contain', '2');
  });

  it('checks rows count selection', () => {
    
    cy.get('.select').select('10');
    cy.get('table').find('tr').should('have.length', 10);
  });

  it('adds a new worker', () => {
    
    cy.get('.add').click();
    cy.get('input[name="name"]').type('New Worker');
    cy.get('input[name="position"]').type('Developer');
    cy.get('.submit').click();
    cy.get('table').should('contain', 'New Worker');
  });

  it('deletes a worker', () => {
    
    cy.get('table').contains('td', 'Worker to delete').parent().find('.delete').click();
    cy.get('table').should('not.contain', 'Worker to delete');
  });

  it('deletes all workers', () => {
    
    cy.get('.delete').each(($el) => {
      cy.wrap($el).click();
    });
    cy.get('table').find('tr').should('have.length', 0);
  });

  it('finds a worker in the search field and edits it', () => {
    
    cy.get('input[name="search"]').type('Worker to edit');
    cy.get('table').contains('td', 'Worker to edit').parent().find('.edit').click();
    cy.get('input[name="name"]').clear().type('Edited Worker');
    cy.get('.submit').click();
    cy.get('table').should('contain', 'Edited Worker');
  });

  it('validates data in the worker row after editing the worker', () => {
    
    cy.get('input[name="search"]').type('Edited Worker');
    cy.get('table').contains('td', 'Edited Worker').parent().should('contain', 'Developer');
  });

  it('checks the search by all column values', () => {
    
    cy.get('input[name="search"]').type('Developer');
    cy.get('table').should('contain', 'Developer');
  });
});

