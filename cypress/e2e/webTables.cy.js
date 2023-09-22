/// <reference types='cypress' />
const { generateWorker } = require('../support/generate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should check pagination', () => {
    cy.get('.-next').should('contain', 'Next');
    cy.get('.-previous').should('contain', 'Previous');
  });

  it('should proide an ability to select rows at page', () => {
    cy.selectRowsCountOnPage('5');
    cy.selectRowsCountOnPage('10');
    cy.selectRowsCountOnPage('20');
    cy.selectRowsCountOnPage('25');
  });

  it('should provide an ability to add a new worker', () => {
    const worker = generateWorker();

    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('exist');
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.contains('Submit').click();

    cy.validateWorkerData(worker.firstName);
    cy.validateWorkerData(worker.lastName);
    cy.validateWorkerData(worker.age);
    cy.validateWorkerData(worker.salary);
    cy.validateWorkerData(worker.department);
  });

  it('should provide an ability to delete a worker', () => {
    cy.findByID('delete-record-1').click();

    cy.findByID('delete-record-1').should('not.exist');
  });

  it('should provide an ability to delete all workers', () => {
    cy.findByID('delete-record-1').click();
    cy.findByID('delete-record-2').click();
    cy.findByID('delete-record-3').click();

    cy.contains('.rt-noData', 'No rows found').should('be.visible');
  });

  it('should provide an ability to find and edit the worker', () => {
    const worker = generateWorker();
    cy.findByPlaceholder('Type to search').type('Vega');
    cy.findByID('edit-record-1').click();

    cy.editByPlaceholder('First Name', worker.firstName);
    cy.editByPlaceholder('Last Name', worker.lastName);
    cy.editByPlaceholder('name@example.com', worker.email);
    cy.editByPlaceholder('Age', worker.age);
    cy.editByPlaceholder('Salary', worker.salary);
    cy.editByPlaceholder('Department', worker.department);

    cy.findByID('submit').click();
    cy.findByID('searchBox').clear();

    cy.validateWorkerData(worker.firstName);
    cy.validateWorkerData(worker.lastName);
    cy.validateWorkerData(worker.age);
    cy.validateWorkerData(worker.salary);
    cy.validateWorkerData(worker.department);
  });

  it('should provide an ability to search a worker by column values', () => {
    cy.searchByValue('Cierra');
    cy.searchByValue('Vega');
    cy.searchByValue('39');
    cy.searchByValue('cierra@example.com');
    cy.searchByValue('Insurance');
  });
});
