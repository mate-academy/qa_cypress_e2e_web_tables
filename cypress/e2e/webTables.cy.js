/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
     });

     it(' should navigate between the pages', () => {
      cy.get('#addNewRecordButton').click();
      cy.get('[placeholder="First Name"]').type('Daniel');
      cy.get('[placeholder="Last Name"]').type('Lister');
      cy.get('[placeholder="name@example.com"]').type('daniel@mail.com');
      cy.get('[placeholder="Age"]').type('22');
      cy.get('[placeholder="Salary"]').type('5000');
      cy.get('[placeholder="Department"]').type('IT');
      cy.get('#submit').click();
      cy.get('.rt-tbody').should('contain', 'Daniel');

      cy.get('#addNewRecordButton').click();
      cy.get('[placeholder="First Name"]').type('Anna');
      cy.get('[placeholder="Last Name"]').type('Sain');
      cy.get('[placeholder="name@example.com"]').type('anna@mail.com');
      cy.get('[placeholder="Age"]').type('22');
      cy.get('[placeholder="Salary"]').type('5000');
      cy.get('[placeholder="Department"]').type('IT');
      cy.get('#submit').click();
      cy.get('.rt-tbody').should('contain', 'Anna');

      cy.get('#addNewRecordButton').click();
      cy.get('[placeholder="First Name"]').type('Andrew');
      cy.get('[placeholder="Last Name"]').type('Sain');
      cy.get('[placeholder="name@example.com"]').type('andrew@mail.com');
      cy.get('[placeholder="Age"]').type('22');
      cy.get('[placeholder="Salary"]').type('5000');
      cy.get('[placeholder="Department"]').type('IT');
      cy.get('#submit').click();
      cy.get('.rt-tbody').should('contain', 'Andrew');

      cy.get('[aria-label="rows per page"]').select('5');
      cy.contains('.-btn', 'Next').click();
      cy.get('[aria-label="jump to page"]').should('have.value', '2');
      cy.get('.-previous').click();
      cy.get('[aria-label="jump to page"]').should('have.value', '1');
    });   

    it(' should change the count of rows', () => {
      cy.get('[aria-label="rows per page"]').select('20');
      cy.get('.rt-tr-group').should('have.length', 20);
    });

  it(' should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('[placeholder="First Name"]').type('Anna');
    cy.get('[placeholder="Last Name"]').type('Sain');
    cy.get('[placeholder="name@example.com"]').type('anna@mail.com');
    cy.get('[placeholder="Age"]').type('22');
    cy.get('[placeholder="Salary"]').type('5000');
    cy.get('[placeholder="Department"]').type('IT');
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', 'Anna');
  });

  it(' should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', 'Cierra');
  });

  it(' should delete all workers', () => {
    const employeesCount = 3;
    for (let i = 0; i < employeesCount; i++) {
      cy.get(`#delete-record-${i + 1}`).click();
    }
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it(' should find and edit a worker', () => {
    cy.get('[placeholder="Type to search"]').type('Kierra');
    cy.get('#edit-record-3').click();
    cy.get('[placeholder="First Name"]').clear();
    cy.get('[placeholder="First Name"]').type('Marsel');
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', 'Marsel');
  });

  it(' should search by all column values', () => {
    cy.get('[placeholder="Type to search"]').type('Cierra');
    cy.get('.rt-tbody').should('contain', 'Cierra');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('Vega');
    cy.get('.rt-tbody').should('contain', 'Vega');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('39');
    cy.get('.rt-tbody').should('contain', '39');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('cierra@example.com');
    cy.get('.rt-tbody').should('contain', 'cierra@example.com');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('10000');
    cy.get('.rt-tbody').should('contain', '10000');
    cy.get('[placeholder="Type to search"]').clear();
    cy.get('[placeholder="Type to search"]').type('Insurance');
    cy.get('.rt-tbody').should('contain', 'Insurance');
  });

});
