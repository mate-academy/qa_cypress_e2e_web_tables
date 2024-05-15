/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should assert pagination', () => {
    cy.addWorker(6);

    cy.get('[aria-label="rows per page"]').select('5');

    cy.contains('.-btn', 'Next').click();

    cy.get('[type="number"]')
      .should('have.value', '2');
  });

  it('should assert rows count selection', () => {
    cy.checkRowsSelector(5);
    cy.checkRowsSelector(10);
    cy.checkRowsSelector(20);
    cy.checkRowsSelector(25);
    cy.checkRowsSelector(50);
    cy.checkRowsSelector(100);
  });

  it('should assert adding a new worker', () => {
    cy.addWorker(1, user);

    cy.get('#searchBox').type(`{selectall}${user.email}`);

    cy.checkUserData(user);
  });

  it('should assert deleting a worker', () => {
    cy.addWorker(1, user);

    cy.get('#delete-record-4').click();

    cy.checkDataDeleted(user);
  });

  it('should assert deleting all workers', () => {
    cy.deleteAllWorkers();

    cy.get('[class="col-12 mt-4 col-md-6"]')
      .should('contain.text', 'No rows found');
  });

  it('should assert finding and editing a worker', () => {
    cy.addWorker(1, user);

    const oldFirstName = user.firstName;

    cy.get('#searchBox').type(oldFirstName);

    cy.updateUserData();

    cy.get('#searchBox').type(`{selectall}${oldFirstName}`);

    cy.checkDataDeleted(user);
  });

  it('should assert searching by all column values', () => {
    cy.addWorker(1, user);

    cy.searchByAllValues(user);
  });
});
