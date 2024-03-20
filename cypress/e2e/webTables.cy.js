/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/webtables');
    cy.task('generateWorker').then((generateWorker) => {
      user = generateWorker;
    });
  });

  it('should provide an ability to switch between pages', () => {
    cy.createMultipleWorker(user, 3);

    cy.get('select').select('5 rows');

    cy.get('.-next').click();

    cy.get('[aria-label="jump to page"]').should('contain.value', 2);

    cy.get('.-previous').click();

    cy.get('[aria-label="jump to page"]').should('contain.value', 1);
  });

  it('should provide an ability to switch between Rows count', () => {
    cy.get('[aria-label="rows per page"]').select('20 rows');

    cy.get('[aria-label="rows per page"]').should('contain.text', '20 rows');

    cy.get('.ReactTable').find('[role="rowgroup"]').should('have.length', 20);
  });

  it('should provide an ability to add a new worker', () => {
    cy.createMultipleWorker(user, 1);

    cy.get('.ReactTable').should('contain.text', user.firstName);
  });

  it('should provide an ability to delete a worker', () => {
    cy.deleteWorkers(1);

    cy.assertWorkersAreNotExist('Cierra');
  });

  it('should provide an ability to delete all workers', () => {
    cy.deleteWorkers(3);

    cy.assertWorkersAreNotExist('Cierra', 'Alden', 'Kierra');
  });

  it('shoud provide an ability to edit worker', () => {
    const workerName = 'Cierra';
    const workerNewName = 'Franel';

    cy.get('#searchBox').type(workerName);

    cy.get('#edit-record-1').click();

    cy.get('#firstName').type(`{selectAll}${workerNewName}`);

    cy.get('#submit').click();

    cy.get('.ReactTable').should('contain.text', workerNewName);
  });

  it('shoud provide an ability to search by all column values', () => {
    const searcfedColumns = ['Cierra', 'Vega', '39',
      'cierra@exampl', '10000', 'Insurance'];

    cy.seachValuesAndAssertSearchResults(searcfedColumns);
  });
});
