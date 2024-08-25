/// <reference types='cypress' />
const { generateWorker } = require('../support/generate');

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    // Generate fresh worker data before each test
    worker = generateWorker();

    // Visit the page
    cy.visit('https://demoqa.com/webtables');
  });

  // Check pagination
  it('Check pagination', () => {
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 10);
    cy.get('.-next').should('be.visible').and('not.be.disabled');
    cy.get('img[src="/images/Toolsqa.jpg"]').should('exist');
    cy.url().should('eq', 'https://demoqa.com/webtables');
  });

  // Check row count
  it('Check row count selection', () => {
    cy.get('select[aria-label="rows per page"]').should('exist');
    cy.get('select[aria-label="rows per page"]').select('20');
  });

  // Add worker
  it('Add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.username);
    cy.get('#lastName').type(worker.lastname);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type('99');
    cy.get('#salary').type('1000');
    cy.get('#department').type('IT');
    cy.get('#submit').click();
    cy.get('.rt-tbody').contains(worker.username).should('exist');
  });

  // Delete worker
  it('Delete a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.username);
    cy.get('#lastName').type(worker.lastname);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type('99');
    cy.get('#salary').type('1000');
    cy.get('#department').type('IT');
    cy.get('#submit').click();
    cy.get('.rt-tbody').contains(worker.username).should('exist');

    cy.get('.rt-tbody')
      .contains(worker.username)
      .parents('div.rt-tr')
      .find('span[title="Delete"]')
      .click();

    cy.get('.rt-tbody').contains(worker.username).should('not.exist');
  });

  // Delete all workers
  it('Delete all workers', () => {
    cy.get('.rt-tbody .rt-tr').eq(0).find('[id^="delete-record-"]').click();
    cy.get('.rt-tbody .rt-tr').eq(1).find('[id^="delete-record-"]').click();
    cy.get('.rt-tbody .rt-tr').eq(0).find('[id^="delete-record-"]').click();
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  // Find and edit worker
  it('Find a worker in the search field and edit it.', () => {
    cy.get('input#searchBox').type('Cierra');
    cy.get('input#searchBox').clear();

    cy.get('.rt-tr').should('exist');
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(worker.username);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(worker.lastname);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type('40');
    cy.get('#salary').type('10000');
    cy.get('#department').type('IT');
    cy.get('#submit').click();
  });

  // Validate worker data after edit
  it('Validate data in the worker row after editing the worker', () => {
    cy.get('#searchBox').type('cierra@example.com');

    cy.get('.rt-tr').should('exist');
    cy.get('.action-buttons [title="Edit"]').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(worker.username);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(worker.lastname);
    cy.get('#submit').click();

    cy.get('.rt-tr').should('contain', worker.username);
    cy.get('.rt-tr').should('contain', worker.lastname);
  });

  // Check search by all column values
  it('Check the search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tbody').should('contain', 'Cierra');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Vega');
    cy.get('.rt-tbody').should('contain', 'Vega');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(39);
    cy.get('.rt-tbody').should('contain', 39);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-tbody').should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(10000);
    cy.get('.rt-tbody').should('contain', 10000);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-tbody').should('contain', 'Insurance');
  });
});
