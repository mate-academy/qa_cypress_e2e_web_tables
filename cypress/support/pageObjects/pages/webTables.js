/// <reference types="cypress" />

import Pagination from '../components/pagination';
import RegistrationForm from '../components/registrationForm';

class WebTables {
  constructor() {
    this.registrationForm = new RegistrationForm();
    this.pagination = new Pagination();
  }

  get addBtn() {
    return cy.getById('addNewRecordButton');
  }

  get searchField() {
    return cy.getById('searchBox');
  }

  get table() {
    return cy.get('.rt-tbody');
  }

  get tableData() {
    return cy.get('.rt-td');
  }

  get editBtn() {
    return cy.get('[title=Edit]');
  }

  get deleteBtn() {
    return cy.get('[title=Delete]');
  }

  get emptyTableTitle() {
    return cy.get('.rt-noData');
  }

  assertAddBtnExists(btnName) {
    this.addBtn
      .should('exist')
      .and('be.visible')
      .and('contain.text', btnName);

    return this;
  }

  assertSearchFieldExists() {
    this.searchField
      .should('exist')
      .and('be.visible');

    return this;
  }

  clickOnAddBtn() {
    this.addBtn
      .click();

    return this;
  }

  searchForWorker(searchTerm) {
    this.searchField
      .type(searchTerm);

    return this;
  }

  clearSearchField() {
    this.searchField
      .clear();

    return this;
  }

  addWorker(workerData) {
    this.clickOnAddBtn();

    this.registrationForm
      .fillFormAndSubmit(workerData);

    return this;
  }

  addMultipleWorkers(workersData) {
    cy.wrap(workersData)
      .each((workerData) => {
        this.addWorker(workerData);
      });

    return this;
  }

  assertWorkerDataInTable(workerData) {
    const {
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    } = workerData;

    this.table
      .find('.rt-tr-group')
      .contains('.rt-td', email)
      .parent()
      .within(() => {
        this.tableData.eq(0).should('contain.text', firstName);
        this.tableData.eq(1).should('contain.text', lastName);
        this.tableData.eq(2).should('contain.text', age);
        this.tableData.eq(3).should('contain.text', email);
        this.tableData.eq(4).should('contain.text', salary);
        this.tableData.eq(5).should('contain.text', department);
      });

    return this;
  }

  clickOnEditBtnOfParticularWorker(email) {
    this.table
      .find('.rt-tr-group')
      .contains('.rt-td', email)
      .parent()
      .within(() => {
        this.tableData.eq(6).find('[title=Edit]').click();
      });

    return this;
  }

  assertWorkerDataIsEdited(updatedFirstName, updatedLastName, updatedData) {
    const {
      email: updatedEmail,
      age: updatedAge,
      salary: updatedSalary,
      department: updatedDepartment
    } = updatedData;

    this.table
      .find('.rt-tr-group')
      .contains('.rt-td', updatedEmail)
      .parent()
      .within(() => {
        this.tableData.eq(0).should('contain.text', updatedFirstName);
        this.tableData.eq(1).should('contain.text', updatedLastName);
        this.tableData.eq(2).should('contain.text', updatedAge);
        this.tableData.eq(3).should('contain.text', updatedEmail);
        this.tableData.eq(4).should('contain.text', updatedSalary);
        this.tableData.eq(5).should('contain.text', updatedDepartment);
      });

    return this;
  }

  deleteWorker(workerData) {
    const { email } = workerData;

    this.table
      .find('.rt-tr-group')
      .contains('.rt-td', email)
      .parent()
      .within(() => {
        this.tableData.eq(6).find('[title=Delete]').click()
          .then(() => {
            cy.log('[Delete] is clicked');
          });
      });

    return this;
  }

  assertWorkerIsDeleted(workerData) {
    const { email } = workerData;

    this.table
      .find('.rt-tr-group')
      .contains('.rt-td', email)
      .should('not.exist')
      .then(() => {
        cy.log(`Worker with email: ${email} is successfully removed`);
      });

    return this;
  }

  deleteAllWorkers() {
    this.deleteBtn
      .its('length')
      .then((length) => {
        for (let i = 1; i <= length; i++) {
          this.deleteBtn
            .first()
            .click();
        }
        cy.log('There is no data to remove');
      });

    return this;
  }

  assertTableIsClear(emptyTableTitle) {
    this.emptyTableTitle
      .should('contain.text', emptyTableTitle);

    return this;
  }

  assertRowsSelection(rowsCount) {
    cy.wrap(rowsCount)
      .each((rowCount) => {
        this.pagination
          .selectRowsCount(rowCount);

        this.table
          .find('.rt-tr-group')
          .should('have.length', rowCount);
      });

    return this;
  }
}

export default WebTables;
