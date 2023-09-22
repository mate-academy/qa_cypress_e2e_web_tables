/// <reference types='cypress' />
describe('Web Tables page', () => {
  let newWorker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('generateWorker').then((generateWorker) => {
      newWorker = generateWorker;
    });
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
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('exist');
    cy.findByPlaceholder('First Name').type(newWorker.firstName);
    cy.findByPlaceholder('Last Name').type(newWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(newWorker.email);
    cy.findByPlaceholder('Age').type(newWorker.age);
    cy.findByPlaceholder('Salary').type(newWorker.salary);
    cy.findByPlaceholder('Department').type(newWorker.department);
    cy.contains('Submit').click();

    cy.validateWorkerData(newWorker.firstName);
    cy.validateWorkerData(newWorker.lastName);
    cy.validateWorkerData(newWorker.age);
    cy.validateWorkerData(newWorker.salary);
    cy.validateWorkerData(newWorker.department);
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
    cy.findByPlaceholder('Type to search').type('Vega');
    cy.findByID('edit-record-1').click();

    cy.editByPlaceholder('First Name', newWorker.firstName);
    cy.editByPlaceholder('Last Name', newWorker.lastName);
    cy.editByPlaceholder('name@example.com', newWorker.email);
    cy.editByPlaceholder('Age', newWorker.age);
    cy.editByPlaceholder('Salary', newWorker.salary);
    cy.editByPlaceholder('Department', newWorker.department);

    cy.findByID('submit').click();
    cy.findByID('searchBox').clear();

    cy.validateWorkerData(newWorker.firstName);
    cy.validateWorkerData(newWorker.lastName);
    cy.validateWorkerData(newWorker.age);
    cy.validateWorkerData(newWorker.salary);
    cy.validateWorkerData(newWorker.department);
  });

  it('should provide an ability to search a worker by column values', () => {
    cy.searchByValue('Cierra');
    cy.searchByValue('Vega');
    cy.searchByValue('39');
    cy.searchByValue('cierra@example.com');
    cy.searchByValue('Insurance');
  });
});
