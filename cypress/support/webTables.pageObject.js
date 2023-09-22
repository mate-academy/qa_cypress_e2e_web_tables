/// <reference types='cypress' />

import PageObject from './PageObject';

class WebTablesPageObject extends PageObject {
  url = '/webtables';

  get paginationPrevious() {
    return cy.get('.-btn');
  }

  get rowCountSelector() {
    return cy.get('select');
  }

  get numberOfRows() {
    return cy.get('.rt-table');
  }

  get firstNameField() {
    return cy.get('#firstName');
  }

  get lastNameField() {
    return cy.get('#lastName');
  }

  get emailField() {
    return cy.get('#userEmail');
  }

  get ageField() {
    return cy.get('#age');
  }

  get salaryField() {
    return cy.get('#salary');
  }

  get departmentField() {
    return cy.get('#department');
  }

  get workerFirstName() {
    return cy.get('[role="row"]');
  }

  get workerLastName() {
    return cy.get('[role="row"]');
  }

  get workerEmail() {
    return cy.get('[role="row"]');
  }

  get workerAge() {
    return cy.get('[role="row"]');
  }

  get workerSalary() {
    return cy.get('[role="row"]');
  }

  get workerDepartment() {
    return cy.get('[role="row"]');
  }

  get workerDelete() {
    return cy.get('#delete-record-4');
  }

  get workerEdit() {
    return cy.get('[title="Edit"]');
  }

  get searchBox() {
    return cy.get('#searchBox');
  }

  get noData() {
    return cy.get('.rt-noData');
  }

  assertPaginationButton(buttonName) {
    this.paginationPrevious
      .should('contain', buttonName);
  }

  selectRowCount(numOfRows) {
    this.rowCountSelector
      .select(numOfRows);
  }

  assertNumberOfRows(numOfRows) {
    this.numberOfRows
      .find('.rt-tr-group')
      .should('have.length', numOfRows);
  }

  fillFirstNameField(firstName) {
    this.firstNameField
      .type(firstName);
  }

  fillLastNameField(lastName) {
    this.lastNameField
      .type(lastName);
  }

  fillEmailField(email) {
    this.emailField
      .type(email);
  }

  fillAgeField(age) {
    this.ageField
      .type(age);
  }

  fillSalaryField(salary) {
    this.salaryField
      .type(salary);
  }

  clearSalaryField() {
    this.salaryField
      .clear();
  }

  fillDepartmentField(department) {
    this.departmentField
      .type(department);
  }

  deleteWorker() {
    this.workerDelete
      .click();
  }

  clickOnEdit() {
    this.workerEdit
      .click();
  }

  assertAddedWorkerFirstName(firstName) {
    this.workerFirstName
      .should('contain', firstName);
  }

  assertAddedWorkerLastName(lastName) {
    this.workerLastName
      .should('contain', lastName);
  }

  assertAddedWorkerEmail(email) {
    this.workerEmail
      .should('contain', email);
  }

  assertAddedWorkerAge(age) {
    this.workerAge
      .should('contain', age);
  }

  assertAddedWorkerSalary(salary) {
    this.workerSalary
      .should('contain', salary);
  }

  assertAddedWorkerDepartmant(department) {
    this.workerDepartment
      .should('contain', department);
  }

  assertClearTable(emptyData) {
    this.noData
      .should('contain', emptyData);
  }

  typeIntoSearchBox(data) {
    this.searchBox
      .type(data);
  }

  clearSearchField() {
    this.searchBox
      .clear();
  }
};

export default WebTablesPageObject;
