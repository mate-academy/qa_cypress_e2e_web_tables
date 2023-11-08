/// <reference types='cypress' />
const { generateUser } = require('../support/generateUser');

describe('Web Tables page', () => {
  let user;
  const { firstName, lastName, email, age, salary, department } =
  generateUser();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.contains('.-next > .-btn', 'Next').should('exist');
    cy.contains('.-previous > .-btn', 'Previous').should('exist');
  });

  it('should have rows count selection', () => {
    cy.get('.-center').should('exist');
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
  });

  it('should add a new employee', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', firstName);
    cy.get('.rt-td').should('contain', lastName);
    cy.get('.rt-td').should('contain', email);
  });

  it('should delete employee', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-td').should('not.contain', email);
  });

  it('should delete all employees', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-td').should('contain', '');
  });

  it('should find and edit information about employees', () => {
    cy.get('#searchBox').type('Cie');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear().type(firstName);
    cy.get('#lastName').clear().type(lastName);
    cy.get('#userEmail').clear().type(email);
    cy.get('#age').clear().type(age);
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.get('.rt-td').should('contain', firstName);
    cy.get('.rt-td').should('contain', lastName);
    cy.get('.rt-td').should('contain', email);
  });

  it('verification of employee information', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
  });

  it('should check the search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tbody').should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('45');
    cy.get('.rt-tbody').should('contain', '45');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('2000');
    cy.get('.rt-tbody').should('contain', '2000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Legal');
    cy.get('.rt-tbody').should('contain', 'Legal');
  });
});
