/// <reference types="cypress" />

describe('Web Tables page', () => {
  let worker;

  before(() => {
    cy.task('generateWorker')
    .then(generateWorker => {
      worker = generateWorker;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain Pagination', () => {
    cy.get('.pagination-bottom')
      .should('exist')
      .and('contain', 'Page')
      .and('contain', 'Previous')
      .and('contain', 'Next');
  });

  it('should contain Rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows')
      .and('contain', '10 rows')
      .and('contain', '20 rows')
      .and('contain', '25 rows')
      .and('contain', '50 rows')
      .and('contain', '100 rows');
  });

  it('should allows user to add a worker', () => {
    cy.getById('addNewRecordButton').click();
    cy.getById('firstName').type(worker.firstName);
    cy.getById('lastName').type(worker.lastName);
    cy.getById('userEmail').type(worker.email);
    cy.getById('age').type(worker.age);
    cy.getById('salary').type(worker.salary);
    cy.getById('department').type(worker.department);
    cy.getById('submit').click();
    cy.get('[role="row"]')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName);
  });

  it('should allows user to delete a worker', () => {
    cy.getById('delete-record-1').click();
    cy.getById('delete-record-1').should('not.exist');
  });

  it('should allows user to delete all workers', () => {
    for(let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`)
      .click()
    }
    cy.get('.rt-noData')
    .should('contain', 'No rows found')
  });

  it('should allows user to search workers and edit it', () => {
    cy.getById('addNewRecordButton').click();
    cy.getById('firstName').type(worker.firstName);
    cy.getById('lastName').type(worker.lastName);
    cy.getById('userEmail').type(worker.email);
    cy.getById('age').type(worker.age);
    cy.getById('salary').type(worker.salary);
    cy.getById('department').type(worker.department);
    cy.getById('submit').click(); // I tried to send POST request to the site, but it is impossible here

    cy.getById('searchBox').type(worker.firstName);
    cy.get('[title="Edit"]').click();
    cy.getById('firstName').type(worker.newName);
    cy.getById('submit').click();
    cy.get('[role="row"]').should('contain', worker.newName);
  });

  it('should allows user to search workers by all column values', () => {
    cy.getById('addNewRecordButton').click();
    cy.getById('firstName').type(worker.firstName);
    cy.getById('lastName').type(worker.lastName);
    cy.getById('userEmail').type(worker.email);
    cy.getById('age').type(worker.age);
    cy.getById('salary').type(worker.salary);
    cy.getById('department').type(worker.department);
    cy.getById('submit').click();

    cy.getById('searchBox').type(worker.firstName);
    cy.get('[role="row"]').should('contain', worker.firstName);

    cy.getById('searchBox').type('{selectall}' + worker.lastName);
    cy.get('[role="row"]').should('contain', worker.lastName);

    cy.getById('searchBox').type('{selectall}' + worker.email);
    cy.get('[role="row"]').should('contain', worker.email);

    cy.getById('searchBox').type('{selectall}' + worker.age);
    cy.get('[role="row"]').should('contain', worker.age);

    cy.getById('searchBox').type('{selectall}' + worker.salary);
    cy.get('[role="row"]').should('contain', worker.salary);

    cy.getById('searchBox').type('{selectall}' + worker.department);
    cy.get('[role="row"]').should('contain', worker.department);
  });
});
