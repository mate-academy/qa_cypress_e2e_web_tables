/// <reference types='cypress' />
const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.random.number({ min: 20, max: 60 });
const salary = faker.random.number({ min: 1000, max: 10000 });
const department = faker.commerce.department();

describe('Web Tables page', () => {
 beforeEach(() => {
  cy.visit('https://demoqa.com/webtables');
 });

 it('should test pagination', () => {
  cy.get('.-pagination')
   .should('exist');
  cy.get('.-pagination')
   .should('contain.text', 'Previous');
  cy.get('.-pagination')
   .should('contain.text', 'Next');
  cy.get('.-pageJump')
   .should('exist');
  });

 it('should test rows count selection', () => {
  const rowsCountOptions = ['5', '10', '20', '25', '50', '100'];
 
  rowsCountOptions.forEach((count) => {
  cy.get('[aria-label="rows per page"]')
   .select(count);
  cy.get('[aria-label="rows per page"]')
   .should('contain', `${count} rows`);
   });
  cy.get('[aria-label="rows per page"]')
   .should('exist');
 });
 
 it('should test adding a new worker', () => {
  cy.get('#addNewRecordButton')
   .click();
  cy.get('#firstName')
   .type(firstName);
  cy.get('#lastName')
   .type(lastName);
  cy.get('#userEmail')
   .type(email);
  cy.get('#age')
   .type(age);
  cy.get('#salary')
   .type(salary);
  cy.get('#department')
   .type(department);
  cy.get('#submit')
   .click();
  cy.get('.rt-table')
   .should('contain', firstName);
  cy.get('.rt-table')
   .should('contain', lastName);
  cy.get('.rt-table')
   .should('contain', email);
  cy.get('.rt-table')
   .should('contain', age);
  cy.get('.rt-table')
   .should('contain', salary);
  cy.get('.rt-table')
   .should('contain', department);
 });

 it('should test deleting a worker', () => {
  cy.get('.rt-table').first().find('#delete-record-1').click();
  cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
});

 it('should delete all workers', () => {
   for (let i = 1; i <= 3; i++) {
     cy.get(`#delete-record-${i}`).click();
     cy.get(`#delete-record-${i}`).should('not.exist');
   }
 });

 it('should be able to find a worker using the search field and edit it', () => {
  cy.findByPlaceholder('Type to search')
   .type('Alden');
  cy.get('#edit-record-2')
   .click();
  cy.findByPlaceholder('First Name')
   .clear();
  cy.findByPlaceholder('First Name')
   .type(firstName);
  cy.findByPlaceholder('Last Name')
   .clear();
  cy.findByPlaceholder('Last Name')
   .type(lastName);
  cy.findByPlaceholder('name@example.com')
   .clear();
  cy.findByPlaceholder('name@example.com')
   .type(email);
  cy.findByPlaceholder('Age')
   .clear();
  cy.findByPlaceholder('Age')
   .type(age);
  cy.findByPlaceholder('Salary')
   .clear();
  cy.findByPlaceholder('Salary')
   .type(salary);
  cy.findByPlaceholder('Department')
   .clear();
  cy.findByPlaceholder('Department')
   .type(department);
  cy.contains('Submit')
   .click();
 });

 it('should validate data in the worker row after worker creation', () => {
  cy.contains('Add')
   .click();
  cy.get('#firstName')
   .type(firstName);
  cy.get('#lastName')
   .type(lastName);
  cy.get('#userEmail')
   .type(email);
  cy.get('#age')
   .type(age);
  cy.get('#salary')
   .type(salary);
  cy.get('#department')
   .type(department);
  cy.get('#submit')
   .click();
  cy.get('.rt-td')
   .should('contain', firstName);
  cy.get('.rt-td')
   .should('contain', lastName);
  cy.get('.rt-td')
   .should('contain', email);
  cy.get('.rt-td')
   .should('contain', salary);
  cy.get('.rt-td')
   .should('contain', department);
  });

 it('should search for workers according to all of the column values', () => {
  cy.get('#searchBox')
   .type('Alden');
  cy.get('.rt-tbody')
   .should('contain', 'Alden');
  cy.get('#searchBox')
   .clear();
  cy.get('#searchBox')
   .type('Cantrell');
  cy.get('.rt-tbody')
   .should('contain', 'Cantrell');
  cy.get('#searchBox')
   .clear();
  cy.get('#searchBox')
   .type(45);
  cy.get('.rt-tbody')
   .should('contain', 45);
  cy.get('#searchBox')
   .clear();
  cy.get('#searchBox')
   .type('alden@example.com');
  cy.get('.rt-tbody')
   .should('contain', 'alden@example.com');
  cy.get('#searchBox')
   .clear();
  cy.get('#searchBox')
   .type(12000);
  cy.get('.rt-tbody')
   .should('contain', 12000);
  cy.get('#searchBox')
   .clear();
  cy.get('#searchBox')
   .type('Compliance');
  cy.get('.rt-tbody')
   .should('contain', 'Compliance');
 });
});
