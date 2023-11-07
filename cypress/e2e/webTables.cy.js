/// <reference types='cypress' />

const { addWorker } = require("../support/generateWorker");

describe('Web Tables page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have row count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows').select('5 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '10 rows').select('10 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '20 rows').select('20 rows');
  });

  it('should allow to add worker  ', () => {
   const { firstName, lastName, email, age, salary } = addWorker();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type('IT Department');
    cy.get('#submit').click();
  });

  it("should delete a worker", () => {
    cy.get('#delete-record-1').click();
    cy.contains('.rt-td', 'cierra@example.com').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.contains('.rt-td', 'cierra@example.com').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.contains('.rt-td', 'calden@example.com').should('not.exist')
    cy.get('#delete-record-3').click();
    cy.contains('kierra@example.com').should('not.exist');
  });

  it('should allow to find and edit worker', () => {
    cy.get('#searchBox').type('Kierra');

    cy.get('#edit-record-3').click();

    cy.get('#lastName').clear();

    cy.get('#lastName').type('Papadopoulou');
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type('Testerqwerwe@gmail.com');

    cy.get('#submit').click();
    cy.get('#searchBox').clear();
  });

  it('should allow check search by all column values.', () => {
    cy.get('#searchBox').type('Ve' + '{enter}');
    cy.get('.rt-td').should('contain', 'Vega');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cant' + '{enter}');
    cy.get('.rt-td').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('3' + '{enter}');
    cy.get('.rt-td').should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@' + '{enter}');
    cy.get('.rt-td').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('100' + '{enter}');
    cy.get('.rt-td').should('contain', '10000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insu' + '{enter}');
    cy.get('.rt-td').should('contain', 'Insurance');
  });
  it('Validate data in worker row after creating worker ', () => {
    const { firstName, lastName, email, age, salary } = addWorker();
     cy.get('#addNewRecordButton').click();
     cy.get('#firstName').type(firstName);
     cy.get('#lastName').type(lastName);
     cy.get('#userEmail').type(email);
     cy.findByPlaceholder('Age').type(age);
     cy.findByPlaceholder('Salary').type(salary);
     cy.findByPlaceholder('Department').type('IT Department');
     cy.get('#submit').click();
 
     cy.get('.rt-td').should('contain', firstName);
     cy.get('.rt-td').should('contain', lastName);
     cy.get('.rt-td').should('contain', email);
     cy.get('.rt-td').should('contain', age);
     cy.get('.rt-td').should('contain', salary);
     cy.get('.rt-td').should('contain', 'IT Department');
   });
});
