/* eslint-disable cypress/no-force */
/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });
  // eslint-disable-next-line max-len
  it('should have pagination with 5,10,20,25,50,100 values in selector and equal number of rows', () => {
    // cy.get('.-pagination').should('have.select');

    cy.get('[aria-label="rows per page"]')
      .select('5 rows')
      .should('have.value', '5');

    cy.get('.rt-tr-group').should('have.length', 5);

    cy.get('[aria-label="rows per page"]')
      .select('10 rows')
      .should('have.value', '10');

    cy.get('.rt-tr-group').should('have.length', 10);

    cy.get('[aria-label="rows per page"]')
      .select('20 rows', { force: true })
      .invoke('show')
      .should('have.value', '20');

    cy.get('.rt-tr-group').should('have.length', 20);

    cy.get('[aria-label="rows per page"]')
      .select('25 rows', { force: true })
      .invoke('show')
      .should('have.value', '25');

    cy.get('.rt-tr-group').should('have.length', 25);

    cy.get('[aria-label="rows per page"]')
      .select('50 rows', { force: true })
      .invoke('show')
      .should('have.value', '50');

    cy.get('.rt-tr-group').should('have.length', 50);

    cy.get('[aria-label="rows per page"]')
      .select('100 rows', { force: true })
      .invoke('show')
      .should('have.value', '100');

    cy.get('.rt-tr-group').should('have.length', 100);
  });

  it.only('should have ability to add new worker', () => {
    cy.task('generateWorker').then((worker) => {
      cy.get('#addNewRecordButton').click();

      cy.findByPlaceholder('First Name').type(worker.firstName);
      cy.findByPlaceholder('Last Name').type(worker.lastName);
      cy.findByPlaceholder('name@example.com').type(worker.email);
      cy.findByPlaceholder('Age').type(worker.age);
      cy.findByPlaceholder('Salary').type(worker.salary);
      cy.findByPlaceholder('Department').type(worker.department);

      cy.get('#submit').click();

      cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
        .should('contain', worker.firstName);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
        .should('contain', worker.lastName);
      // eslint-disable-next-line max-len
      cy.get(':nth-child(4) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]')
        .should('contain', worker.age);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
        .should('contain', worker.email);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
        .should('contain', worker.salary);
      cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
        .should('contain', worker.department);
    });
  });
});
