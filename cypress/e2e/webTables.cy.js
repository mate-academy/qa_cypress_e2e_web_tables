/// <reference types='cypress' />
import * as data from './webTablesUtils';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should to display pagination', () => {
    data.validatePagination();
  });

  it('should to change rows count selection', () => {
    data.validateRowCount();
  });

  it('should be able to add new worker', () => {
    data.addWorker();
    data.validateNewWorker();
  });

  it('should be able to delete worker', () => {
    data.deleteWorker();
  });

  it('should be able to delete all workers', () => {
    data.deleteAllWorkers();
  });

  it('should display all data in worker row', () => {
    data.addWorker();
    data.validateWorkerRow();
  });

  it('should find worker by all attributes', () => {
    data.addWorker();
    data.findByFirstName();
    data.findByLastName();
    data.findByAge();
    data.findByEmail();
    data.findBySalary();
    data.findByDepartment();
  });

  it('should find worker and edit it', () => {
    data.addWorker();
    data.editWorker();
  });
});
