describe('Find worker and edit them', () => {
  beforeEach(() => {
    cy.visit('/webtables')
  });

  it('should be possible to find worker', function() {
    cy.get('#searchBox').type('Cierra');

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain.text', 'Cierra');
  });

  it('should be possible to find worker by search field and edit them', function() {
    cy.get('#edit-record-1').click();

    cy.get('#firstName').type('{selectall}John');

    cy.get('#lastName').type('{selectall}Black');

    cy.get('#submit').click();

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain.text', 'John');

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain.text', 'Black');
  });
});
