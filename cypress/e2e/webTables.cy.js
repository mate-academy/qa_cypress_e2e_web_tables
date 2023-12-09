/// <reference types='cypress' />

describe('Web Tables page', () => {

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should handle pagination', () => {
    cy.get('.-pageInfo').should('exist');
  });
  it('should handle rows count selection', () => {
    cy.get('select').should('exist');
  });
  it('should provide an ability to add new worker and validate data in worker row after creating worker.', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').click().type('User');
    cy.get('#lastName').click().type('Lastname');
    cy.get('#userEmail').click().type('user123@gmail.com');
    cy.get('#age').click().type('23');
    cy.get('#salary').click().type('500');
    cy.get('#department').click().type('Legal');
    cy.get('#submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('exist');
  });
  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-1').click();
  });
  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
  });
  it('should provide an ability to find worker in search field and edit it', () => {
    cy.get('#searchBox').click().type('Alden');
    cy.get('#basic-addon2').click();
    cy.get('#edit-record-2').click();
    cy.get('#firstName').click().type('s');
    cy.get('#submit').click();
  });
  it('should provide an ability to search by all column values', () => {
    cy.get('#searchBox').click().type('Alden');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('Vega');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('29');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('cierra@example.com');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('10000');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('Insurance');
    cy.get('#basic-addon2').click();
  });
});
