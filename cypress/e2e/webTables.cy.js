/// <reference types='cypress' />
import { generateWorker } from "../support/generaiteWorker";

describe('Web Tables page', () => {
  const worker = generateWorker();
  beforeEach('', () => {
    cy.visit('/webtables')
  });

  it('Page is exist', () => {
    cy.get('.playgound-header')
      .should('contain.text', 'Web Tables')
  });

  it('Pagination is exist', () => {
    cy.get('.-pagination')
      .should('exist')
  });

  it.only('Possibility to Add new worker', () => {
    cy.get('#addNewRecordButton')
      .click()

      cy.get('#firstName')
       .type(worker.firstname)

      cy.get('#lastName')
        .type(worker.lastname)

      cy.get('#userEmail')
        .type(worker.email)

      cy.get('#age')
        .type(worker.age)

      cy.get('#salary')
        .type(worker.salary)

      cy.get('#department')
        .type(worker.department)

      cy.get('#submit')
        .click()

      cy.get('.ReactTable')
        .should('contain.text', worker.firstname)
      cy.get('.ReactTable')
        .should('contain.text', worker.lastname)
  });
});
