/// <reference types='cypress' />
const { generateWorker } = require('../support/generateWorker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  } = generateWorker();

  it('should contains pagination', () => {
    cy.addNewWorker(generateWorker());
    cy.addNewWorker(generateWorker());
    cy.addNewWorker(generateWorker());

    cy.get('[aria-label="rows per page"]').select('5');

    cy.contains('[type="button"]', 'Next').click();
    cy.get('[type="number"]').should('have.value', '2');

    cy.contains('[type="button"]', 'Previous').click();
    cy.get('[type="number"]').should('have.value', '1');
  });

  it('should provide the ability to select count of rows', () => {
    cy.get('[aria-label="rows per page"]').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('20');
    cy.get('[aria-label="rows per page"]').should('have.value', '20');
  });

  it('should provide the ability to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');

    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type(department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email)
      .and('contain', age)
      .and('contain', salary)
      .and('contain', department);
  });

  it('should provide the ability to delete a worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.findByPlaceholder('name@example.com').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type(department);
    cy.get('#submit').click();

    cy.get('#delete-record-4').click();
    cy.get('.ReactTable').should('not.contain', firstName)
      .and('not.contain', lastName);
  });

  it('should provide the ability to delete all worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.get('.ReactTable').should('contain', 'No rows found');
    cy.get('.ReactTable').should('not.contain', '#delete-record^');
  });

  it('should provide the ability to find a worker and edit it', () => {
    cy.get('#searchBox').type('Gentry');

    cy.get('#edit-record-3').click();

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
    cy.get('#submit').click();

    cy.get('#searchBox').clear();

    cy.get('.ReactTable').should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email)
      .and('contain', age)
      .and('contain', salary)
      .and('contain', department)
      .and('not.contain', 'Gentry');
  });

  it('should provide to search by all column values', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('.ReactTable').should('contain', 'Kierra');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Gentry');
    cy.get('.ReactTable').should('contain', 'Gentry');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('29');
    cy.get('.ReactTable').should('contain', '29');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('kierra@example.com');
    cy.get('.ReactTable').should('contain', 'kierra@example.com');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('2000');
    cy.get('.ReactTable').should('contain', '2000');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Legal');
    cy.get('.ReactTable').should('contain', 'Legal');
    cy.get('#searchBox').clear();
  });
});
