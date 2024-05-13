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

  it.skip('web-tables should have pagination and selection', () => {
    cy.get('.-pageInfo')
      .should('contain', 'Page');

    cy.get('.-next')
      .should('contain', 'Next');

    cy.get('.-previous')
      .should('contain', 'Previous');

    cy.get('.-totalPages')
      .should('be.visible')
      .should('exist');

    cy.get('select')
      .should('be.visible')
      .should('contain', '5 rows')
      .should('contain', '10 rows')
      .should('contain', '20 rows')
      .should('contain', '25 rows')
      .should('contain', '50 rows')
      .should('contain', '100 rows')
      .select('10 rows');

    cy.get('.-previous')
      .should('not.have.class', 'disabled');

    cy.get('.-previous')
      .should('not.have.class', 'disabled');

    cy.get('.rt-tr')
      .should('have.length', '11');
  });

  it.skip('it should provide user to add workers in table', () => {
    cy.addWorker(user, 1);

    cy.checkWorker(user);
  });

  it('it should provide user to delete worker in table', () => {
    cy.addWorker(user, 2);
    cy.checkWorker(user);

    cy.get('.action-buttons').its('length').then((lengthOfTable) => {
      cy.get('#delete-record-' + lengthOfTable)
        .click();
      cy.get('.action-buttons')
        .its('length')
        .should('equal', lengthOfTable);
    });
  });

  it.skip('it should provide user to delete all workers from table', () => {
    cy.addWorker(user, 3);
    cy.checkWorker(user);

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

  it.skip('it should provide user to edit already added worker in table find and asserts that the user is exist in table',
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
});
