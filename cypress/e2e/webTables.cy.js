/// <reference types="cypress" />

Cypress.Commands.add('addWorker', (firstName, lastName, email, age, salary, department) => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(email);
  cy.get('#age').type(age);
  cy.get('#salary').type(salary);
  cy.get('#department').type(department);
  cy.get('#submit').click();
});

describe('Web Tables Tests', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
    cy.viewport(1920, 1080);

    cy.get('#RightSide_Advertisement > div > div > a > img').invoke('hide');
  });

  it('Pagination: should change the page size and verify the number of rows', () => {
    cy.get('select[aria-label="rows per page"]').select('20');
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 20);

    cy.get('select[aria-label="rows per page"]').select('50');
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 50);

    cy.get('select[aria-label="rows per page"]').select('100');
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 100);
  });

  it('Rows count selection: should change the number of displayed rows', () => {
    cy.get('select[aria-label="rows per page"]').select('10');
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 10);
  });

  it('Add a new worker: should add a new worker successfully', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('john.doe@example.com');
    cy.get('#age').type('30');
    cy.get('#salary').type('50000');
    cy.get('#department').type('Engineering');

    cy.get('#submit').click();

    cy.get('.rt-tbody').should('contain.text', 'John');
    cy.get('.rt-tbody').should('contain.text', 'Doe');
  });

  it('Delete a worker: should delete Cierra successfully', () => {
    cy.addWorker('Cierra', 'Vega', 'cierra.vega@example.com', '39', '100000', 'Legal');

    cy.get('.rt-tbody').should('contain.text', 'Cierra');

    cy.get('#delete-record-1 > svg').click();
    cy.get('#delete-record-2 > svg').click();
    cy.get('#delete-record-3 > svg').click();
    cy.get('#delete-record-4 > svg').click();

    cy.get('.rt-tbody').should('not.contain.text', 'Cierra');
  });

  it('Find a worker in the search field and edit it', () => {

    cy.addWorker('Alden', 'Cantrell', 'alden.cantrell@example.com', '35', '120000', 'Compliance');

    cy.get('#searchBox').type('Alden');

    cy.contains('.rt-tr-group', 'Alden').within(() => {
      cy.get('[title="Edit"]').click();
    });

    cy.get('#age').clear().type('45');
    cy.get('#salary').clear().type('60000');
    cy.get('#submit').click();

    cy.contains('.rt-tr-group', 'Alden').within(() => {

      cy.get('.rt-td').eq(0).should('contain.text', 'Alden');
      cy.get('.rt-td').eq(1).should('contain.text', 'Cantrell');
      cy.get('.rt-td').eq(2).should('contain.text', '45');
      cy.get('.rt-td').eq(3).should('contain.text', 'alden@example.com');
      cy.get('.rt-td').eq(4).should('contain.text', '60000');
      cy.get('.rt-td').eq(5).should('contain.text', 'Compliance');
    });
  });

  it('Check the search by all column values', () => {
    cy.addWorker('Cierra', 'Vega', 'cierra.vega@example.com', '39', '100000', 'Legal');
    cy.addWorker('Alden', 'Cantrell', 'alden.cantrell@example.com', '35', '120000', 'Compliance');

    cy.get('#searchBox').clear().type('Cierra');
    cy.get('.rt-tbody').should('contain.text', 'Cierra');

    cy.get('#searchBox').clear().type('alden.cantrell@example.com');
    cy.get('.rt-tbody').should('contain.text', 'Alden');
  });
});
