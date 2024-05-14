/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  let changedUser;

  beforeEach(() => {
    cy.visit('');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateChanges').then((generateChanges) => {
      changedUser = generateChanges;
    });
  });

  it('web-tables should have pagination and selection', () => {
    cy.get('select')
      .select('5 rows');

    cy.get('.rt-tr-group')
      .should('have.length', '5');

    cy.addWorker(user, 3);

    cy.get('.-totalPages')
      .should('contain', '2');

    cy.get('.-next')
      .click();

    cy.get('[type="number"]')
      .should('have.value', '2');

    cy.get('.-previous')
      .click();

    cy.get('[type="number"]')
      .should('have.value', '1');

    cy.get('.-totalPages')
      .should('be.visible')
      .should('exist');

    cy.get('.-pageInfo')
      .should('contain', 'Page');

    cy.get('.-next')
      .should('contain', 'Next');

    cy.get('.-previous')
      .should('contain', 'Previous');

    cy.get('select')
      .should('be.visible')
      .should('contain', '5 rows')
      .should('contain', '10 rows')
      .should('contain', '20 rows')
      .should('contain', '25 rows')
      .should('contain', '50 rows')
      .should('contain', '100 rows')
      .select('20 rows');

    cy.get('.-previous')
      .should('not.have.class', 'disabled');

    cy.get('.-previous')
      .should('not.have.class', 'disabled');

    cy.get('.rt-tr-group')
      .should('have.length', '20');
  });

  it('it should provide user to add workers in table', () => {
    cy.addWorker(user, 1);

    cy.checkWorker(user);
  });

  it('it should provide user to delete worker in table', () => {
    cy.get('.action-buttons').its('length').then((lengthOfTable) => {
      cy.get('#delete-record-' + lengthOfTable)
        .click();
      cy.get('.action-buttons')
        .its('length')
        .should('equal', lengthOfTable - 1);
    });
  });

  it('it should provide user to delete all workers from table', () => {
    cy.get('.action-buttons').its('length').then((lengthOfTable) => {
      while (lengthOfTable >= 1) {
        cy.get('#delete-record-' + lengthOfTable)
          .click();
        lengthOfTable--;
      }
    });
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });

  it('it should provide user to edit already added worker in table find and asserts that the user is exist in table',
    () => {
      cy.addWorker(user, 1);
      cy.checkWorker(user);

      cy.get('.action-buttons').its('length').then((tableLenght) => {
        cy.findByOptions(user);
        cy.get('#edit-record-' + tableLenght).click();
        cy.changeWorker(changedUser);
      });

      cy.changeWorkerCheck(changedUser);
    });

  it('it should provide user to find the user by all options using "Search"',
    () => {
      cy.addWorker(user, 1);

      cy.checkWorker(user);

      cy.findByOptions(user);

      cy.checkWorker(user);
    });
});
