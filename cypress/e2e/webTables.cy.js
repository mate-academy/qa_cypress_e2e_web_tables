/// <reference types='cypress' />
const faker = require('faker');

describe('Web Tables page', () => {
  const worker = {
    fname: faker.name.firstName(),
    lname: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.number({ min: 46, max: 99 }),
    salary: faker.random.number({ min: 2001, max: 9999 }),
    department: faker.lorem.word()
  };
  const row = 20; // can be 5, 10, 20, 25, 50, 100.
  let indexOfWorker = 3; // index of the worker in the table
  let orderOfWorker = 4; // order of the worker in the table
  const numberOfWorkers = 3; // number of workers in the table
  let actionOnWorker = 'delete'; // can be 'delete' or 'edit'
  let not = ''; // can be '' or 'not.'

  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain pagination', () => {
    for (let i = 0; i < numberOfWorkers; i++) {
      cy.addNewWorker(worker);
    }

    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('.-next').should('not.have.attr', 'disabled');
    cy.get('.-next').click();
    cy.get('[aria-label="jump to page"]').should('have.attr', 'value', '2');
    cy.get('.-previous').should('not.have.attr', 'disabled');
    cy.get('.-previous').click();
    cy.get('[aria-label="jump to page"]').should('have.attr', 'value', '1');
  });

  it('should contain rows', () => {
    cy.countRows(row);
  });

  it('should have a posibility to add worker', () => {
    cy.addNewWorker(worker);
    cy.checkWorker(indexOfWorker, worker.fname, not);
  });

  it('should have a posibility to delete worker', () => {
    indexOfWorker = 0;
    orderOfWorker = 1;
    not = 'not.';

    cy.actionWorker(indexOfWorker, orderOfWorker, actionOnWorker);
    cy.checkWorker(indexOfWorker, 'Cierra', not);
  });

  it('should have a posibility to delete all workers', () => {
    indexOfWorker = 0;

    for (orderOfWorker = numberOfWorkers; orderOfWorker >= 1; orderOfWorker--) {
      cy.actionWorker(indexOfWorker, orderOfWorker, actionOnWorker);
    }

    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should have a posibility to find and edit worker', () => {
    indexOfWorker = 0;
    orderOfWorker = 1;
    actionOnWorker = 'edit';
    not = '';

    cy.get('#searchBox').type('Cierra');
    cy.actionWorker(indexOfWorker, orderOfWorker, actionOnWorker);
    cy.editWorker(worker);
    cy.get('#searchBox').clear();
    cy.checkWorker(indexOfWorker, worker.fname, not);
  });

  it('should have a posibility to edit worker', () => {
    indexOfWorker = 0;
    orderOfWorker = 1;
    actionOnWorker = 'edit';

    cy.actionWorker(indexOfWorker, orderOfWorker, actionOnWorker);
    cy.editWorker(worker);

    for (const i in worker) {
      cy.checkWorker(indexOfWorker, worker[i], not);
    }
  });

  it('should have a posibility to search by all column values', () => {
    indexOfWorker = 0;

    cy.addNewWorker(worker);

    for (const i in worker) {
      cy.get('#searchBox').type(worker[i]);
      cy.checkWorker(indexOfWorker, worker[i], not);
      cy.get('#searchBox').clear();
    }
  });
});
