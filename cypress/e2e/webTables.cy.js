/// <reference types='cypress' />

const { generateUser } = require("../support/generate");

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should change page', () => {
    const { firstname, lastname, email, age, salary, department } = generateUser();
    cy.createUsers(firstname, lastname, email, age, salary, department)

    cy.get('[aria-label="jump to page"]')
      .type('{selectALL}2{enter}');
    
    cy.get('[aria-label="jump to page"]')
      .should('have.value', '2');
  });

  it('should change rows count', () => {
    const { firstname, lastname, email, age, salary, department } = generateUser();
    cy.createUsers(firstname, lastname, email, age, salary, department)

    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
    
    cy.get('.rt-tbody')
      .find('.rt-tr-group')
      .should('have.length', 5)
  });

  it("should create new worker", () => {
    const { firstname, lastname, email, age, salary, department } = generateUser();
    cy.createUser(firstname, lastname, email, age, salary, department);

    cy.get(".rt-tbody")
      .find(".rt-tr-group")
      .should("contain", firstname)
      .and("contain", lastname)
      .and("contain", email)
      .and("contain", age)
      .and("contain", salary)
      .and("contain", department)
  });

  it("should delete a worker", () => {
    cy.get('#delete-record-2')
      .click();
    
    cy.get(".rt-tbody")
      .find(".rt-tr-group")
      .should('not.contain', 'Alden')
      .and('not.contain', 'Cantrell')
      .and('not.contain', 'alden@example.com');
  });

  it("should delete workers", () => {
    cy.get('#delete-record-1')
      .click();
    
    cy.get('#delete-record-2')
      .click();
    
    cy.get('#delete-record-3')
      .click();
    
    cy.get(".rt-noData")
      .should('contain', 'No rows found')
  });

  it("should find worker in search field and edit it", () => {
    cy.get('[placeholder="Type to search"]')
      .type('Alden')
    
    cy.get('.mr-2')
      .click();
    
    cy.get('[placeholder="Salary"]')
      .type('{selectAll}20000{enter}');
    
    cy.get(".rt-td")
      .should('contain', '20000')
  });

  it("should validate data in worker row after creating worker", () => {
    const { firstname, lastname, email, age, salary, department } = generateUser();
    cy.createUser(firstname, lastname, email, age, salary, department);
    
    cy.get(".rt-tbody")
      .find(".rt-tr-group")
      .should("contain", firstname)
      .and("contain", lastname)
      .and("contain", email)
      .and("contain", age)
      .and("contain", salary)
      .and("contain", department)
  });

  it("should search by all column values", () => {
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}Alden')
    
    cy.get(".rt-td")
      .should('contain', 'Alden')
    
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}Vega')
    
    cy.get(".rt-td")
      .should('contain', 'Vega')
    
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}29')
    
    cy.get(".rt-td")
      .should('contain', '29')
    
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}alden@example.com')
    
    cy.get(".rt-td")
      .should('contain', 'alden@example.com')
    
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}10000')
    
    cy.get(".rt-td")
      .should('contain', '10000')
    
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}Legal')
    
    cy.get(".rt-td")
      .should('contain', 'Legal')
  });
});
