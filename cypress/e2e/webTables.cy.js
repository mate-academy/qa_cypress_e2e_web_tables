/// <reference types='cypress' />

let user;

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.task('generateNewUser').then((generateNewUser) => {
      user = generateNewUser;
    });
  });

  it('should provide pagination', () => {
    cy.createNewUser(user, 5);

    cy.get('select').select('5 rows');
    cy.get('.rt-tr-group').should('have.length', '5');
    cy.get('.-totalPages').should('contain', '2');

    cy.contains('.-btn', 'Next').click();
    cy.get('[type="number"]').should('have.value', '2');

    cy.contains('.-btn', 'Previous').click();
    cy.get('[type="number"]').should('have.value', '1');
  });

  it('should provide row selection', () => {
    cy.get('select').select('10 rows');
    cy.get('select').select('20 rows');
    cy.get('select').select('25 rows');
    cy.get('select').select('50 rows');
    cy.get('select').select('100 rows');
  });

  it('should add a new worker', () => {
    cy.createNewUser(user, 1);

    cy.get('.rt-tr')
      .should('contain', user.firstName)
      .should('contain', user.lastName)
      .should('contain', user.age)
      .should('contain', user.email)
      .should('contain', user.salary)
      .should('contain', user.department);
  });

  it('should delete a worker', () => {
    cy.deleteWorkers(1);
    cy.get('.rt-table').should('not.contain', 'Cierra');
  });

  it('should delete all workers', () => {
    cy.deleteWorkers(3);
    cy.get('.rt-table').should('not.contain', 'Cierra', 'Alden', 'Kierra');
  });

  it('should find a worker in the search field, edit it and validate after editing', () => {
    const workerNameFirst = 'Alden';
    const workerNameNew = 'Max';
    const workerLastNameNew = 'Rokatanskyi';

    cy.get('#searchBox').type(workerNameFirst);
    cy.get('.ReactTable').should('contain', workerNameFirst);

    cy.get('#edit-record-2').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(workerNameNew);

    cy.get('#lastName').clear();
    cy.get('#lastName').type(workerLastNameNew);

    cy.get('#submit').click();

    cy.get('.rt-tr-group')
      .should('contain', workerNameNew)
      .and('contain', workerLastNameNew);
  });

  it('should search by all column values', () => {
    cy.createNewUser(user, 1);
    cy.searchValueAndAssertResult(user);
  });
});
