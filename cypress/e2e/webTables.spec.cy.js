/// <reference types='cypress' />
const { generateUser } = require('../support/generate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('testing the options on a page', () => {
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-pagination').should('contain', 'Next');
    cy.get('select').should('contain', '5 rows');
    cy.get('select').should('contain', '10 rows');
    cy.get('select').should('contain', '20 rows');
    cy.get('select').should('contain', '25 rows');
    cy.get('select').should('contain', '50 rows');
    cy.get('select').should('contain', '100 rows');
  });

  it('should register a new worker', () => {
    const { username, lastname, email, age, salary, department } = generateUser();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(username);
    cy.get('#lastName').type(lastname);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', username);
  });

  it('should search and edit a worker', () => {
    const { username, lastname, email, age, salary, department } = generateUser();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(username);
    cy.get('#lastName').type(lastname);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', username);

    cy.get('#searchBox').type(username);
    cy.get('#basic-addon2').click();
    cy.get('#edit-record-4 > svg').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(lastname, { force: true }).should('have.value', lastname);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', lastname);
  });

  it('should search worker by all registered information', () => {
    const { username, lastname, email, age, salary, department } = generateUser();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(username);
    cy.get('#lastName').type(lastname);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', username);

    cy.get('#searchBox').type(username);
    cy.get('#basic-addon2').click();
    cy.get('.ReactTable').should('contain', username);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(email);
    cy.get('#basic-addon2').click();
    cy.get('.ReactTable').should('contain', email);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(age);
    cy.get('#basic-addon2').click();
    cy.get('.ReactTable').should('contain', age);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(salary);
    cy.get('#basic-addon2').click();
    cy.get('.ReactTable').should('contain', salary);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(department);
    cy.get('#basic-addon2').click();
    cy.get('.ReactTable').should('contain', department);
    cy.get('#searchBox').clear();
  });

  it('should delete all workers', () => {
    const { username, lastname, email, age, salary, department } = generateUser();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(username);
    cy.get('#lastName').type(lastname);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', username);

    cy.get('#delete-record-4 > svg').click();
    cy.get('.ReactTable').should('not.contain', username);

    cy.get('[id*="delete-record"] > svg').then(($elements) => {
      const numberOfElements = $elements.length;

      for (let i = 0; i < numberOfElements; i++) {
        cy.get('[id*="delete-record"] > svg').first().click({ force: true });
      }
    });

    cy.get('.ReactTable').should('contain', 'No rows found');
  });
});
