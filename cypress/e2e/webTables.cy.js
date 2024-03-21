/// <reference types='cypress' />

const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.exampleEmail(firstName, lastName);
const age = faker.random.number({ min: 21, max: 60 });
const salary = faker.random.number({ min: 2000, max: 7000 });
const department = faker.commerce.department();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should be the Pagination', () => {
    cy.get('.-pagination')
      .should('exist');
    cy.get('.-pagination')
      .should('contain', 'Previous');
    cy.get('.-pagination')
      .should('contain', 'Next');
    cy.get('.-pageJump')
      .should('exist');
  });

  it('should be able to chenge rows count section', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist');
      cy.get('[aria-label="rows per page"]')
      .select('10');
    cy.get('[aria-label="rows per page"]')
      .should('have.value', '10');  
  });

  it('should provide an ability to add a new worker', () => {
   
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.rt-tr')
      .should('contain', firstName)
      .and('contain', lastName);
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-table').should('not.contain', 'Cierra');
  });

  it('should provide an ability to delite all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .should('not.exist');
    cy.get('#delete-record-3')
      .should('not.exist');
    cy.get('.rt-table')
      .should('exist', 'No rows found');  
  });

  it('should provide an ability to find a worker in the search field, edit, and validate it', () => {
    const firstWorkerName = 'Cierra';

    cy.get('#searchBox')
      .type(firstWorkerName);
    cy.get('.ReactTable')
      .should('contain', firstWorkerName);
    cy.get('#edit-record-1')
      .click();
    cy.get('#userEmail')
      .clear();
    cy.get('#userEmail')
      .type(email);
    cy.get('#salary')
      .clear();
    cy.get('#salary')
      .type(salary);
    cy.get('#department')
      .clear();
    cy.get('#department')
      .type(department);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear();
    cy.get('.rt-tbody > :nth-child(1)')
      .should('contain', firstWorkerName)
      .and('contain', email)
      .and('contain', salary)
      .and('contain', department);
  });

  it('should search by all column values', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-table')
      .should('contain', 'Cierra');
    cy.get('#searchBox')
      .type(`{selectAll}Vega`);
    cy.get('.rt-table')
      .should('contain', 'Vega');
    cy.get('#searchBox')
      .type(`{selectAll}39`);
    cy.get('.rt-table')
      .should('contain', '39');
    cy.get('#searchBox')
      .type(`{selectAll}cierra@example.com`);
    cy.get('.rt-table')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .type(`{selectAll}10000`);
    cy.get('.rt-table')
      .should('contain', '10000');
    cy.get('#searchBox')
      .type(`{selectAll}Insurance`);
    cy.get('.rt-table')
      .should('contain', 'Insurance');
  });
});
