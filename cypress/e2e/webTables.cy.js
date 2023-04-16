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

  it('Pagination is exist and working', () => {
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

  it('Possibility to find and edit worker', () => {
    cy.get('#searchBox')
      .type('Kierra')
     
    cy.get('#edit-record-3')
      .click()

    cy.get('#firstName')
      .type('{selectAll}John')

    cy.get('#lastName')
       .type('{selectAll}Doe')

    cy.get('#submit')
       .click()  

    cy.get('#searchBox')
       .type('{selectAll}{del}')

    cy.get('.ReactTable')
       .should('contain.text', 'John')
    cy.get('.ReactTable')
       .should('contain.text', 'Doe')
  });

  it('Possibility to Delete worker', () => {
    cy.get(`#delete-record-3`)
      .click();

    cy.get('#delete-record-3')
      .should('not.exist')
  });

  it('Possibility to Delete all workers', () => {
    cy.createWorker(worker)
    cy.createWorker(worker)

    cy.deleteAllWorkers(5)

    cy.get('#delete-record-1')
      .should('not.exist')
  });
});
