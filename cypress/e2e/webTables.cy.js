const { faker } = require('@faker-js/faker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });
  it('should handle pagination', () => {
    cy.get('.-pageInfo').should('exist');
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-pageJump > input').should('exist');
    cy.get('.-totalPages').should('exist');
    cy.get('.-next > .-btn').should('exist');
  });
  it('should handle rows count selection', () => {
    cy.get('select').should('exist');
  });
  it('should provide an ability to add a new worker.', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const lastname = faker.name.lastName();
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').click().type(username);
    cy.get('#lastName').click().type(lastname);
    cy.get('#userEmail').click().type(email);
    cy.get('#age').click().type('23');
    cy.get('#salary').click().type('500');
    cy.get('#department').click().type('Legal');
    cy.get('#submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('exist');
  });
  it('should provide an ability to validate data in a worker row after creating a worker', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const lastname = faker.name.lastName();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').click().type(username);
    cy.get('#lastName').click().type(lastname);
    cy.get('#userEmail').click().type(email);
    cy.get('#age').click().type('23');
    cy.get('#salary').click().type('500');
    cy.get('#department').click().type('Legal');
    cy.get('#submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').should('contain', username, lastname, email);
  });
  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1').click().should('not.exist');
  });
  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1').click().should('not.exist');
    cy.get('#delete-record-2').click().should('not.exist');
    cy.get('#delete-record-3').click().should('not.exist');
  });
  it('should provide an ability to find a worker in the search field and edit it', () => {
    cy.get('#searchBox').click().type('Alden');
    cy.get('#basic-addon2').click();
    cy.get('#edit-record-2').click();
    cy.get('#firstName').click().type('s');
    cy.get('#submit').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').should('contain.text', 'Aldens');
  });
  it('should provide an ability to search by all column values', () => {
    cy.get('#searchBox').click().type('Alden').should('exist');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('Vega').should('exist');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('29').should('exist');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('cierra@example.com').should('exist');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('10000').should('exist');
    cy.get('#basic-addon2').click();
    cy.get('#searchBox').click().type('Insurance').should('exist');
    cy.get('#basic-addon2').click();
  });
});
