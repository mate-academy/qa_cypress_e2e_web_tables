/// <reference types='cypress' />
import WebTablesPageObject from '../support/webTables.pageObject';

const {
  createWorker, randomSelect, deleteAllWorkers, addWorker
} = require('../support/functions');

const webTablesPage = new WebTablesPageObject();
const numberOfRows = randomSelect();
let worker = createWorker();
const newSalary = Math.floor(Math.random(10) * 200000);

describe('Web Tables page', () => {
  beforeEach(() => {
    webTablesPage.visit();
  });

  it('should contain the pagination elements', () => {
    webTablesPage.assertPaginationButton('Previous');
    webTablesPage.assertPaginationButton('Next');
  });

  it('should allow to select row count', () => {
    webTablesPage.selectRowCount(numberOfRows);
    webTablesPage.assertNumberOfRows(numberOfRows);
  });

  it('should allow to add new worker', () => {
    cy.clickOnElement('#addNewRecordButton', 'Add');
    webTablesPage.fillFirstNameField(worker.firstName);
    webTablesPage.fillLastNameField(worker.lastName);
    webTablesPage.fillEmailField(worker.email);
    webTablesPage.fillAgeField(worker.age);
    webTablesPage.fillSalaryField(worker.salary);
    webTablesPage.fillDepartmentField(worker.department);
    cy.clickOnElement('#submit', 'Submit');
  });

  it('should allow to delete a worker', () => {
    worker = addWorker(worker);
    webTablesPage.assertAddedWorkerEmail(worker.email);
    webTablesPage.deleteWorker();
    webTablesPage.typeIntoSearchBox(worker.email);
    webTablesPage.assertClearTable('No rows found');
  });

  it('should allow to delete all workers', () => {
    deleteAllWorkers();
    webTablesPage.assertClearTable('No rows found');
  });

  it('should find worker and edit it', () => {
    worker = addWorker(worker);
    webTablesPage.typeIntoSearchBox(worker.email);
    webTablesPage.clickOnEdit();
    webTablesPage.clearSalaryField();
    webTablesPage.fillSalaryField(newSalary);
    cy.clickOnElement('#submit', 'Submit');
    webTablesPage.assertAddedWorkerSalary(newSalary);
  });

  it('should validate new worker\'s data', () => {
    worker = addWorker(worker);
    webTablesPage.assertAddedWorkerFirstName(worker.firstName);
    webTablesPage.assertAddedWorkerLastName(worker.lastName);
    webTablesPage.assertAddedWorkerEmail(worker.email);
    webTablesPage.assertAddedWorkerAge(worker.age);
    webTablesPage.assertAddedWorkerSalary(worker.salary);
    webTablesPage.assertAddedWorkerDepartmant(worker.department);
  });

  it('should search by all column values', () => {
    worker = addWorker(worker);
    webTablesPage.typeIntoSearchBox(worker.firstName);
    webTablesPage.assertAddedWorkerFirstName(worker.firstName);
    webTablesPage.clearSearchField();
    webTablesPage.typeIntoSearchBox(worker.lastName);
    webTablesPage.assertAddedWorkerLastName(worker.lastName);
    webTablesPage.clearSearchField();
    webTablesPage.typeIntoSearchBox(worker.email);
    webTablesPage.assertAddedWorkerEmail(worker.email);
    webTablesPage.clearSearchField();
    webTablesPage.typeIntoSearchBox(worker.age);
    webTablesPage.assertAddedWorkerAge(worker.age);
    webTablesPage.clearSearchField();
    webTablesPage.typeIntoSearchBox(worker.salary);
    webTablesPage.assertAddedWorkerSalary(worker.salary);
    webTablesPage.clearSearchField();
    webTablesPage.typeIntoSearchBox(worker.department);
    webTablesPage.assertAddedWorkerDepartmant(worker.department);
  });
});
