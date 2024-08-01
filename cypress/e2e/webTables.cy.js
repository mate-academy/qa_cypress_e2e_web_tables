/// <reference types='cypress' />
import { addTenWorkers, addWorker, generateWorkers } from '../support/commands';

describe('Web Tables page', () => {
  const worker = generateWorkers();
  beforeEach(() => {
    cy.visit('/');
  });

  it('pagination pages', () => {
    addTenWorkers(worker);
    cy.get('.action-buttons').should('have.length', 10);
    cy.contains('.-btn', 'Next').click();
    cy.get('.action-buttons').should('have.length', 3);
    cy.contains('.-btn', 'Previous').click();
    cy.get('.action-buttons').should('have.length', 10);
  });

  it('pagination rows', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows').should('exist');
    cy.get('.rt-tr-group').should('have.length', 5);
    cy.get('[aria-label="rows per page"]').select('50 rows');
    cy.get('.rt-tr-group').should('have.length', 50);
  });

  it('Add a new worker and delete', () => {
    addWorker(worker);
    cy.wait(1000);
    cy.get('#delete-record-4').click();
    cy.get('.rt-tbody')
      .should('not.contain', worker.firstName)
      .and('not.contain', worker.lastName);
  });

  it('Delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('[class="rt-tr -odd"]').should('not.exist');
  });

  it('Find a worker in the search field and edit it and validate data', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('#edit-record-2').click();
    cy.get('#lastName').clear().type('Cruise');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'Cruise');
  });

  it('Check the search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.contains('.rt-td', 'Alden').should('not.exist');
    cy.contains('.rt-td', 'Cierra').should('exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Vega');
    cy.contains('.rt-td', 'Cantrell').should('not.exist');
    cy.contains('.rt-td', 'Vega').should('exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('39');
    cy.contains('.rt-td', '45').should('not.exist');
    cy.contains('.rt-td', '39').should('exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.contains('.rt-td', 'alden@example.com').should('not.exist');
    cy.contains('.rt-td', 'cierra@example.com').should('exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.contains('.rt-td', '12000').should('not.exist');
    cy.contains('.rt-td', '10000').should('exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.contains('.rt-td', 'Compliance').should('not.exist');
    cy.contains('.rt-td', 'Insurance').should('exist');
    cy.get('#searchBox').clear();
  });
});
