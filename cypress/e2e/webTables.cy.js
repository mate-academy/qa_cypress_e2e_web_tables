/// <reference types='cypress' />

describe('Cypress: Web tables', () => {
  let users;
  let edit;
  let rows;
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.task('generateUser').then((generateUser) => {
      users = generateUser;
    });
    cy.task('editUser').then((editUser) => {
      edit = editUser;
    });
    cy.task('generateRow').then((generateRow) => {
      rows = generateRow;
    });
  });

  it('Pagination and rows count selection', () => {
    cy.pagination(rows);
  });

  it('Add and delete worker.', () => {
    cy.newWorker(users);
  });

  it('Delete all workers', () => {
    cy.DeleteAllWorkers(users, 6);
  });

  it('Check the search by all column values.', () => {
    cy.findData(users);
  });

  it('Find a worker in the search field and edit it', () => {
    cy.editWorkers(users, edit);
  });
});
