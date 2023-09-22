/// <reference types='cypress' />
import faker from 'faker';

const selectors = {
  rowsPerPageSelect: '[aria-label="rows per page"]',
  addButton: '#addNewRecordButton',
  firstNameInput: '#firstName',
  lastNameInput: '#lastName',
  userEmailInput: '#userEmail',
  ageInput: '#age',
  salaryInput: '#salary',
  departmentInput: '#department',
  submitButton: '#submit',
  searchBoxInput: '#searchBox',
  deleteRecordButton: (recordId) => `#delete-record-${recordId}`,
  editRecordButton: (recordId) => `#edit-record-${recordId}`
};

const createRandomUserData = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userEmail: faker.internet.email(),
  age: Math.floor(Math.random() * 100) + 1,
  salary: '1000',
  department: faker.random.word()
});

beforeEach(() => {
  cy.visit('https://demoqa.com/webtables');
});

describe('Web Tables page', () => {
  it('should validate rows options', () => {
    const rowsPerPageOptions = ['5 rows', '10 rows', '20 rows',
      '25 rows', '50 rows', '100 rows'];
    cy.get(selectors.rowsPerPageSelect).select('5 rows');
    rowsPerPageOptions.forEach((option) => {
      cy.contains(option).should('be.visible');
    });
  });

  it('should check the pagination functionality', () => {
    cy.get(selectors.rowsPerPageSelect).select('5 rows');
    const numberOfRecordsToCreate = 3;
    for (let i = 0; i < numberOfRecordsToCreate; i++) {
      cy.get(selectors.addButton).click();
      const userData = createRandomUserData();
      for (const field in userData) {
        cy.get(selectors[field + 'Input']).type(userData[field]);
      }
      cy.get(selectors.submitButton).click();
    }
    cy.get('.-next .-btn').should('contain', 'Next').click();
    cy.get('.-previous .-btn').should('contain', 'Previous');
    cy.get('input[aria-label="jump to page"]').type('2{enter}');
    cy.get('input[aria-label="jump to page"]').should('have.value', '2');
    cy.get('input[aria-label="jump to page"]').type('1{enter}');
  });

  it('should provide an ability to add a new worker', () => {
    const numberOfRecordsToCreate = 2;
    for (let i = 0; i < numberOfRecordsToCreate; i++) {
      const userData = createRandomUserData();
      cy.get(selectors.addButton).click();
      for (const field in userData) {
        cy.get(selectors[field + 'Input']).type(userData[field]);
      }
      cy.get(selectors.submitButton).click();
      cy.get('.rt-td').should('contain', userData.firstName);
    }
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('.rt-td').should('contain', 'Cierra');
    cy.get(selectors.deleteRecordButton(1)).click();
    cy.contains('Cierra').should('not.exist');
  });

  it('should provide an ability to delete all the workers', () => {
    ['Cierra', 'Alden', 'Kierra'].forEach((name, index) => {
      cy.contains(name).should('exist');
      cy.get(selectors.deleteRecordButton(index + 1)).click();
    });
    ['Cierra', 'Alden', 'Kierra'].forEach((name) => {
      cy.contains(name).should('not.exist');
    });
  });

  it('should find a worker in the search field and edit it', () => {
    cy.get(selectors.searchBoxInput).type('Cierra{enter}');
    cy.get(selectors.editRecordButton(1)).click();
    cy.get(selectors.firstNameInput).type('test{enter}');
    cy.contains('Cierratest').should('exist');
  });

  it('should validate created worker in the workers row', () => {
    const userData = createRandomUserData();
    cy.get(selectors.addButton).click();
    for (const field in userData) {
      cy.get(selectors[field + 'Input']).type(userData[field]);
    }
    cy.get(selectors.submitButton).click();
    cy.get('.rt-td').should('contain', userData.firstName);
  });

  it('should validate search by all column values', () => {
    ['Cierra', 'Vega', '39', 'cierra@example.com',
      '10000', 'Insurance'].forEach((value) => {
      cy.get(selectors.rowsPerPageSelect).select('5 rows');
      cy.get(selectors.rowsPerPageSelect).should('have.value', '5 rows');
      cy.contains(value).should('exist');
    });
  });
});
