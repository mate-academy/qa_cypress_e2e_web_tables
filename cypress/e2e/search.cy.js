describe('Search by all column values', () => {
  beforeEach(() => {
    cy.visit('/webtables')
  });

  it('should provide ability to search a worker by all columns', function() {
    cy.get('#searchBox').type('{selectall}Cierra');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain.text', 'Cierra');

    cy.get('#searchBox').type('{selectall}Vega');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain.text', 'Vega');

    cy.get('#searchBox').type('{selectall}39');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
      .should('contain.text', '39');

    cy.get('#searchBox').type('{selectall}cierra@exa');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain.text', 'cierra@example.com');

    cy.get('#searchBox').type('{selectall}10000');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)')
      .should('contain.text', '10000');

    cy.get('#searchBox').type('{selectall}Insurance');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(6)')
      .should('contain.text', 'Insurance');
  });
});
