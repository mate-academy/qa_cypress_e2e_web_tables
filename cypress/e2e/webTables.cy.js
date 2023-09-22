/// <reference types='cypress' />

beforeEach(() => {
  cy.visit('https://demoqa.com/webtables');
});
describe('Web Tables page', () => {
  it.skip('should contain pagination', () => {
    cy.get('[class="pagination-bottom"]').should('exist');
    cy.get('[class="-pageInfo"]').should('exist');
    cy.get('[class="select-wrap -pageSizeOptions"]').should('exist');
  });
  it.skip('should be able to add new worker', () => {
    cy.get('[id="addNewRecordButton"]').should('exist');
    cy.addWorker();
    cy.get('[class="modal-content"]').should('exist');
    cy.get('[class="modal-header"]')
      .should('contain', 'Registration Form');
    cy.AddAssertions();
  });
  it.skip('should able to delete from the table', () => {
    cy.addWorker();
    cy.DeleteAssertions();
  });
  it.skip('should assert that the table is empty', () => {
    cy.get('[id = "delete-record-1"]').click();
    cy.get('[id = "delete-record-1"]').should('not.exist');
    cy.get('[id = "delete-record-2"]').click();
    cy.get('[id = "delete-record-2"]').should('not.exist');
    cy.get('[id = "delete-record-3"]').click();
    cy.get('[id = "delete-record-3"]').should('not.exist');
  });
  it('should find worker in search field and edit it', () => {
    cy.addWorker();
    cy.get('[id="searchBox"]').should('exist');
    cy.get('[id="searchBox"]').type('Kolya');
    cy.ExistAssertions();
    cy.Edits();
  });
  it.skip('should validate data in worker row after creating worker', () => {
    cy.addWorker();
    cy.AddAssertions();
  });
  it.skip('should check search by all column values', () => {
    cy.reload();
    cy.addWorker();
    cy.SearchAsserts();
  });
});
