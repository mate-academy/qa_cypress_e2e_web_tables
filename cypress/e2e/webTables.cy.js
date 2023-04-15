/// <reference types='cypress' />
import { generateWorker } from "../support/generaiteWorker";

describe('Web Tables page', () => {
  const worker = generateWorker();
  beforeEach('', () => {
    cy.visit('/webtables')
  });

  it.skip('Page is exist', () => {
    cy.get('.playgound-header')
      .should('contain.text', 'Web Tables')
  });

  it('Possibility to Add new worker', () => {
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

  it.only('Pagination is exist and working', () => {
    cy.get('.-pagination')
      .should('exist')

    cy.createWorker(worker)
    cy.createWorker(worker)
    cy.createWorker(worker)
    cy.createWorker(worker)

    cy.get('select').select('5')

    cy.get('.-totalPages')
      .should('contain.text', '2')

    cy.get('.-next > .-btn')
      .click()

    cy.get('.-pageJump > input')
      .should('have.value', '2')

    cy.get('.-previous > .-btn')
      .click()

    cy.get('.-pageJump > input')
      .should('have.value', '1')  
  });

  it('Possibility to Delete worker', () => {
    cy.get('.ReactTable')
      .should('contain.text', worker.lastname)
      

      cy.get('.ReactTable')
        .should('contain.text', worker.firstname)
      cy.get('.ReactTable')
        .should('contain.text', worker.lastname)
  });

  
});
