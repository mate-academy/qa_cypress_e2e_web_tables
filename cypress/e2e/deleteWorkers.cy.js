describe('Delete workers', () => {
  beforeEach(() => {
    cy.visit('/webtables')
  });

  it('should be possible to delete worker', function() {
    cy.get('#delete-record-2').click();
  });

  it('should be possible to delete all workers', function() {
    cy.deleteAllWorkers(3);

    cy.get('#delete-record-1').should('not.exist');
  });
});
