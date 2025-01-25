/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });
  });

  it('should navigate between pages using pagination', () => {
    Array.from({ length: 5 }).forEach(() => cy.addNewWorker(user));

    cy.getInputByAria('jump to page', 1);
    cy.getSelectByAria('rows per page', 5);

    cy.findEnabledButton('Next');
    cy.getInputByAria('jump to page', 2);
    cy.findEnabledButton('Previous');
    cy.getInputByAria('jump to page', 1);
  });

  it('should display correct number of rows when selecting 25 rows', () => {
    cy.getSelectByAria('rows per page', 25);

    cy.get('div[class="rt-tr-group"]').should('have.length', 25);
  });

  it('should add a new worker', () => {
    cy.addNewWorker(user);

    cy.getGroupUser(user).then((row) => {
      cy.verifyRowData(row, user);
    });
  });

  it('should delete a worker', () => {
    cy.addNewWorker(user);

    cy.getGroupUser(user).then((row) => {
      cy.getByTitle(row, 'Delete');
    });

    cy.get('.rt-td').should('not.contain', user.name);
  });

  it('should delete all workers', () => {
    cy.deleteAllWorkers();

    cy.get('.rt-noData')
      .should('contain', 'No rows found')
      .should('be.visible');
  });

  it('should find a worker and edit their data', () => {
    cy.addNewWorker(user);

    cy.getGroupUser(user).then((row) => {
      cy.getByTitle(row, 'Edit');
    });

    cy.task('generateUser').then((changeWorker) => {
      cy.changeWorkerData(changeWorker);

      cy.getGroupUser(changeWorker).then((row) => {
        cy.verifyRowData(row, changeWorker);
      });
    });
  });
});
