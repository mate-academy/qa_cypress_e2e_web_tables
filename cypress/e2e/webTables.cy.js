/// <reference types='cypress' />

import WebTables from '../support/pageObjects/pages/webTables';
import RegistrationForm from
  '../support/pageObjects/components/registrationForm';
import Pagination from '../support/pageObjects/components/pagination';
import { generateWorker } from '../support/generateData';
import workersData from '../support/fixtures/workersData.json';
import titles from '../support/fixtures/titles.json';

const webTables = new WebTables();
const registrationForm = new RegistrationForm();
const pagination = new Pagination();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.wrap(generateWorker()).as('workerData');

    cy.wrap(generateWorker()).as('newWorker');

    cy.visit('');
  });

  it('should allow to add a new worker', () => {
    webTables.assertAddBtnExists(titles.addBtn)
      .clickOnAddBtn();

    cy.get('@workerData').then((workerData) => {
      registrationForm
        .assertFormExists(titles.registrationForm, titles.submitDataBtn)
        .fillFormAndSubmit(workerData);

      webTables.assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to delete a worker', () => {
    cy.get('@workerData').then((workerData) => {
      webTables.addWorker(workerData)
        .assertWorkerDataInTable(workerData)
        .deleteWorker(workerData)
        .assertWorkerIsDeleted(workerData);
    });
  });

  it('should allow to delete all workers', () => {
    webTables.deleteAllWorkers()
      .assertTableIsClear(titles.emptyTable);
  });

  it('should allow to find a worker by first name', () => {
    cy.get('@workerData').then((workerData) => {
      const { firstName } = workerData;

      webTables.addWorker(workerData)
        .assertSearchFieldExists()
        .searchForWorker(firstName)
        .assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to find a worker by last name', () => {
    cy.get('@workerData').then((workerData) => {
      const { lastName } = workerData;

      webTables.addWorker(workerData)
        .searchForWorker(lastName)
        .assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to find a worker by age', () => {
    cy.get('@workerData').then((workerData) => {
      const { age } = workerData;

      webTables.addWorker(workerData)
        .searchForWorker(age)
        .assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to find a worker by email', () => {
    cy.get('@workerData').then((workerData) => {
      const { email } = workerData;

      webTables.addWorker(workerData)
        .searchForWorker(email)
        .assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to find a worker by salary', () => {
    cy.get('@workerData').then((workerData) => {
      const { salary } = workerData;

      webTables.addWorker(workerData)
        .searchForWorker(salary)
        .assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to find a worker by department', () => {
    cy.get('@workerData').then((workerData) => {
      const { department } = workerData;

      webTables.addWorker(workerData)
        .searchForWorker(department)
        .assertWorkerDataInTable(workerData);
    });
  });

  it('should allow to edit the found worker', () => {
    cy.get('@workerData').then((workerData) => {
      const { email } = workerData;

      webTables.addWorker(workerData)
        .searchForWorker(email)
        .clickOnEditBtnOfParticularWorker(email);

      registrationForm.assertFormContainsWorkerData(workerData);

      const updatedFirstName = workerData.firstName + ' edited';
      const updatedLastName = workerData.lastName + ' edited';

      cy.get('@newWorker').then((newWorkerData) => {
        registrationForm.editFormAndSubmit(newWorkerData);

        webTables.clearSearchField()
          .assertWorkerDataIsEdited(
            updatedFirstName, updatedLastName, newWorkerData
          );
      });
    });
  });

  it(`should allow to change the rows count selection of the table data`, () => {
    const rowsCount = ['5', '10', '20', '25', '50', '100'];

    webTables.assertRowsSelection(rowsCount);
  });

  it(`should allow to navigate to the next table pages by entering page number into the "Page input" field`, () => {
    webTables.addMultipleWorkers(workersData);

    pagination.selectRowsCount()
      .navigateUntilLastPageByPageNumber();
  });

  it(`should allow to navigate to the previous table pages by entering page number into the "Page input" field`, () => {
    webTables.addMultipleWorkers(workersData);

    pagination.selectRowsCount()
      .navigateUntilFirstPageByPageNumber();
  });

  it(`should allow to navigate to the next table pages by clicking on [Next]`, () => {
    webTables.addMultipleWorkers(workersData);

    pagination.selectRowsCount()
      .navigateUntilLastPageByClickingOnNextBtn();
  });

  it(`should allow to navigate to the previous table pages by clicking on [Previous]`, () => {
    webTables.addMultipleWorkers(workersData);

    pagination.selectRowsCount()
      .navigateToLastPage()
      .navigateUntilFirstPageByClickingOnPreviousBtn();
  });
});
