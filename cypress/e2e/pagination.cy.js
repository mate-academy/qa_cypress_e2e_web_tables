describe('Pagination', () => {
  beforeEach(() => {
    cy.visit('/webtables')
  });

  it('should have `10` as default value', function() {
    cy.get('select')
      .should('have.value', '10');
  });

  it('should provide ability to select `5 rows` value in `select`', function() {
    cy.get('select').select('5 rows')
      .should('have.value', '5');
  });

  it('should provide ability to select `10 rows` value in `select`', function() {
    cy.get('select').select('10 rows')
      .should('have.value', '10');
  });

  it('should provide ability to select `20 rows` value in `select`', function() {
    cy.get('select').select('20 rows')
      .should('have.value', '20');
  });

  it('should provide ability to select `25 rows` value in `select`', function() {
    cy.get('select').select('25 rows')
      .should('have.value', '25');
  });

  it('should provide ability to select `50 rows` value in `select`', function() {
    cy.get('select').select('50 rows')
      .should('have.value', '50');
  });

  it('should provide ability to select `100 rows` value in `select`', function() {
    cy.get('select').select('100 rows')
      .should('have.value', '100');
  });

  it('buttons `Previous` and `Next` should be disabled '
      +'if workers count less then page can contain', function() {
    cy.get('.-previous > .-btn').should('be.disabled');
    cy.get('.-next > .-btn').should('be.disabled');
  });

  it('should provide ability to enter page number manually', function() {
    cy.get('select').select('5 rows');

    cy.addSeveralWorkers(5);

    cy.get('.-pageJump > input').type(`${2}{enter}`).should('have.value', '2');
  });

  it('buttons `Previous` and `Next` should work correctly', function() {
    cy.get('select').select('5 rows');
    cy.addSeveralWorkers(5);

    cy.get('.-previous > .-btn').should('be.disabled');
    cy.get('.-next > .-btn').should('not.be.disabled');

    cy.get('.-next > .-btn').click();
    cy.get('.-pageJump > input').should('have.value', '2');

    cy.get('.-previous > .-btn').should('not.be.disabled');
    cy.get('.-next > .-btn').should('be.disabled');

    cy.get('.-previous > .-btn').click();
    cy.get('.-pageJump > input').should('have.value', '1');

    cy.get('.-previous > .-btn').should('be.disabled');
    cy.get('.-next > .-btn').should('not.be.disabled');
  });
});
