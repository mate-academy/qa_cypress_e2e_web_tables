/// <reference types='cypress' />

const faker = require('faker');

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.datatype.number({ min: 18, max: 70 });
const salary = faker.random.number({ min: 1000, max: 10000 });
const departments = ['Insurance', 'Compliance', 'Legal'];
const department = faker.random.arrayElement(departments);

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should have pagination elements', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Next');
    cy.get('.-pageJump').should('exist');
  });

  it('should allow changing the number of rows displayed', () => {
    const rowCounts = [5, 10, 20, 25, 50, 100];

    cy.get('[aria-label="rows per page"]').should('exist');

    rowCounts.forEach((rowCount) => {
      cy.get('[aria-label="rows per page"]').select(`${rowCount} rows`);
      cy.get('[aria-label="rows per page"]').should('contain', `${rowCount} rows`);
    });
  });

  it('should add new worker', () => {
    cy.contains('Add').click();
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type(department);
    cy.contains('Submit').click();
    cy.get('.rt-table').should('contain', firstName);
    cy.get('.rt-table').should('contain', lastName);
    cy.get('.rt-table').should('contain', email);
    cy.get('.rt-table').should('contain', age);
    cy.get('.rt-table').should('contain', salary);
    cy.get('.rt-table').should('contain', department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`).click();
      cy.get(`#delete-record-${i}`).should('not.exist');
    }
  });

  it('should find a worker using the search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('#edit-record-2').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(department);
    cy.contains('Submit').click();
  });

  it('should validate data in the worker row after creating a worker', () => {
    cy.contains('Add').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', firstName);
    cy.get('.rt-td').should('contain', lastName);
    cy.get('.rt-td').should('contain', email);
    cy.get('.rt-td').should('contain', salary);
    cy.get('.rt-td').should('contain', department);
  });

  it('should search for workers by all column values', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('.rt-tbody').should('contain', 'Kierra');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Gentry');
    cy.get('.rt-tbody').should('contain', 'Gentry');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(29);
    cy.get('.rt-tbody').should('contain', 29);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(2000);
    cy.get('.rt-tbody').should('contain', 2000);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Legal');
    cy.get('.rt-tbody').should('contain', 'Legal');
  });
});
