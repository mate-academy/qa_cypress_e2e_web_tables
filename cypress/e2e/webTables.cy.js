/// <reference types='cypress' />

import { generateWorker } from '../support/generateWorker'

describe('Web Tables page', () => {
  const { firstName, lastName, email, age, salary, department } = generateWorker();
  
  beforeEach (() => {
    cy.visit('/');
  });

  it('should contain pagination', () => {
    cy.get('.-pageJump')
      .should('exist');

    cy.get('.-previous > .-btn')
      .should('exist')
      .should('contain.text', 'Previous');

    cy.get('.-next > .-btn')
      .should('exist')
      .should('contain.text', 'Next');
  });

  it('should contain rows count selection', () => {
    const randomRowIndex = Math.floor(Math.random() * 6);
    const rows = ['5 rows', '10 rows', '20 rows', '25 rows', '50 rows', '100 rows']
    const row = rows[randomRowIndex];

    cy.get('select')
      .select(row);
    
    const numberOfRows = Number(row.substring(0, row.length - 5)) + 1;
    cy.get('.rt-tr').should('have.length', numberOfRows);
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .should('contain.text', 'Add')
      .click()

    cy.findByPlaceholder('First Name')
      .type(firstName);
    cy.findByPlaceholder('Last Name')
      .type(lastName);
    cy.findByPlaceholder('name@example.com')
      .type(email);
    cy.findByPlaceholder('Age')
      .type(age);
    cy.findByPlaceholder('Salary')
      .type(salary);
    cy.findByPlaceholder('Department')
      .type(department);
    cy.get('#submit')
      .click();
     
    cy.get('.rt-tr')
    .should('contain.text', firstName)
    .and('contain.text', lastName)
    .and('contain.text', email)
    .and('contain.text', age)
    .and('contain.text', salary)
    .and('contain.text', department); 
  });

  it('should delete the worker', () => {
    cy.createWorker (firstName, lastName, email, age, salary, department);
    cy.get('#delete-record-4')
      .click();
  });

  it('should delete all workers', () => {
    for (let i = 1; i < 4; i++) {
      cy.get(`#delete-record-${i}`)
        .click()};
    cy.get('.ReactTable')
      .should('contain', 'No rows found');
  });

  it('should find the worker in the search field and edit it', () => {
    cy.createWorker (firstName, lastName, email, age, salary, department);
    cy.get('#searchBox')
      .type(lastName);
      cy.get('[title="Edit"]')
      .click();
    cy.get('#lastName')
      .type('Edited');
    cy.get('#submit')
      .click();
    cy.get('.rt-tbody')
      .should('contain.text', 'Edited');

  });

  it('should validate data in the worker row after creating a worker', () => {
    cy.createWorker (firstName, lastName, email, age, salary, department);
    cy.get('.rt-tr')
      .should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email)
      .and('contain', age)
      .and('contain', salary)
      .and('contain', department);
  });

  it('should search by all column values', () => {
    cy.createWorker (firstName, lastName, email, age, salary, department);
    const randomSearchIndex = Math.floor(Math.random() * 6);
    const columnValues = [firstName, lastName, email, age, salary, department];
    const searchQuery = columnValues[randomSearchIndex];
    cy.get('#searchBox')
      .type(searchQuery);
    cy.get(".rt-td")
      .should('contain', searchQuery);
  });
});
