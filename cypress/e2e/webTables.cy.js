/// <reference types='cypress' />

import { generateWorker } from '../support/workerGenerator';

describe('Web Tables page', () => {
  const worker = generateWorker();
  beforeEach(() => {
    cy.visit('/');
  });
  it('should contains pagination', () => {
    cy.get('.pagination-bottom').should('exist');
  // cy.get('.pagination-bottom').should;
  });

  it('should provide the ability to select count of rows', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').select('10 rows');
  });

  it('should provide the ability to add worker and delete worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();
  });
  it('User allows to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-noData').should('exist');
  });
  it('should provide the ability to find a worker and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.rt-td').should('contain', 'Alden');
    cy.findByPlaceholder('Type to search').clear();
    cy.get('#edit-record-1').click();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', worker.lastName);
  });
  it('should provide to search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.rt-td').should('contain', 'Alden');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('Cantrell');
    cy.get('.rt-td').should('contain', 'Cantrell');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('45');
    cy.get('.rt-td').should('contain', '45');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('alden@example.com');
    cy.get('.rt-td').should('contain', 'alden@example.com');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('12000');
    cy.get('.rt-td').should('contain', '12000');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('Compliance');
    cy.get('.rt-td').should('contain', 'Compliance');
    cy.findByPlaceholder('Type to search').clear();
  });
});
