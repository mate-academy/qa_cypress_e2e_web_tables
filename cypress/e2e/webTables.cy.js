/* eslint-disable cypress/no-force */
/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;
  beforeEach(() => {
    cy.visit('/webtables');
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
  });
  // eslint-disable-next-line max-len
  it('should have pagination with 10 and 100 values in selector and equal number of rows', () => {
    cy.get('[aria-label="rows per page"]')
      .select('10 rows')
      .should('have.value', '10');

    cy.get('.rt-tr-group').should('have.length', 10);

    cy.get('[aria-label="rows per page"]')
      .select('100 rows', { force: true })
      .invoke('show')
      .should('have.value', '100');

    cy.get('.rt-tr-group').should('have.length', 100);

    cy.task('generateWorker').then((worker) => {
      cy.addWorker(worker);
      cy.addWorker(worker);
      cy.addWorker(worker);

      cy.get('[aria-label="rows per page"]')
        .select('5 rows', { force: true })
        .should('have.value', '5');

      cy.get('.-next').should('not.have.class', 'disabled');
      cy.get('.action-buttons').should('have.length', 5);
      cy.get('.-next').click();

      cy.get('.action-buttons').should('have.length', 1);

      cy.get('.-previous').should('not.have.class', 'disabled');
      cy.get('.-previous').click();
    });
  });

  it('should have ability to add new worker', () => {
    cy.task('generateWorker').then((worker) => {
      cy.addWorker(worker);

      cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
        .should('contain', worker.firstName);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
        .should('contain', worker.lastName);
      // eslint-disable-next-line max-len
      cy.get(':nth-child(4) > .rt-tr > :nth-child(3)', { force: true })
        .should('contain', worker.age);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
        .should('contain', worker.email);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
        .should('contain', worker.salary);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
        .should('contain', worker.department);
    });
  });

  it('should delete all workers in a table', () => {
    cy.addWorker(worker);
    cy.get('[title="Delete"]').then(($value) => {
      const count = $value.length;

      for (let i = 1; i <= count; i++) {
        cy.get('#delete-record-' + i).click();
      }
    });

    // action-buttons is missed when worker doesn't exist
    cy.get('.action-buttons').should('not.exist');
  });

  it('should find worker in the search field and edit it', () => {
    cy.task('generateWorker').then((worker) => {
      cy.addWorker(worker);

      cy.findByPlaceholder('Type to search')
        .type(worker.firstName);
      cy.get('.input-group-append').click();

      cy.get('[title="Edit"]').click();
      cy.findByPlaceholder('First Name')
        .clear()
        .type('Edited');
      cy.get('#submit').click();

      cy.findByPlaceholder('Type to search').clear();

      cy.get('.rt-table')
        .should('contain', 'Edited');
      cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
        .should('contain', worker.lastName);
      // eslint-disable-next-line max-len
      cy.get(':nth-child(4) > .rt-tr > :nth-child(3)', { force: true })
        .should('contain', worker.age);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
        .should('contain', worker.email);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
        .should('contain', worker.salary);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
        .should('contain', worker.department);
    });
  });

  it('should check the values in all column', () => {
    cy.task('generateWorker').then((worker) => {
      cy.addWorker(worker);

      cy.findByPlaceholder('Type to search')
        .type(worker.firstName);
      cy.get('.rt-table')
        .should('contain', worker.firstName);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.lastName);
      cy.get('.rt-table')
        .should('contain', worker.lastName);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.age);
      cy.get('.rt-table')
        .should('contain', worker.age);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.salary);
      cy.get('.rt-table')
        .should('contain', worker.salary);

      cy.findByPlaceholder('Type to search')
        .clear()
        .type(worker.department);
      cy.get('.rt-table')
        .should('contain', worker.department);
    });
  });
});
