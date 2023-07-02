/// <reference types='cypress' />

const { addNewWorker } = require("../support/generate");

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-pagination').should('contain', 'Next');
    cy.get('.-pageInfo').should('exist');
  });

  it('should have rows count selection', () => {
    cy.get('select').select('5 rows');
  });

  it('should allow to add a new worker', () => {
    const { firstName, lastName, email, age, salary } = addNewWorker();

    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.get('#userEmail').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type('Computer Science');
    cy.contains('#submit', 'Submit').click();

    cy.get('.rt-tbody')
      .should('contain', firstName)
      .and('contain', email);
  });

  it('should delete one worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');

    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');

    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });

  it('should find worker in search field and edit it', () => {
    const { firstName, lastName, email, age, salary } = addNewWorker();

    cy.findByPlaceholder('Type to search').type('ald', '{enter}');
    cy.get('.rt-tbody').should('contain', 'Alden');
    cy.get('.rt-tbody').should('not.contain', 'Cierra');

    cy.get('#edit-record-2').click();
    cy.findByPlaceholder('First Name').clear().type(firstName);
    cy.findByPlaceholder('Last Name').clear().type(lastName);
    cy.get('#userEmail').clear().type(email);
    cy.findByPlaceholder('Age').clear().type(age);
    cy.findByPlaceholder('Salary').clear().type(salary);
    cy.findByPlaceholder('Department').clear().type('Computer Science');
    cy.contains('#submit', 'Submit').click();

    cy.get('#searchBox').clear();

    cy.get('.rt-tbody')
      .should('contain', firstName)
      .and('contain', email);
  });

  it('should check data of a new created worker', () => {
    const { firstName, lastName, email, age, salary } = addNewWorker();

    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(firstName);
    cy.findByPlaceholder('Last Name').type(lastName);
    cy.get('#userEmail').type(email);
    cy.findByPlaceholder('Age').type(age);
    cy.findByPlaceholder('Salary').type(salary);
    cy.findByPlaceholder('Department').type('Computer Science');
    cy.contains('#submit', 'Submit').click();

    cy.get('.rt-td').should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email)
      .and('contain', age)
      .and('contain', salary)
      .and('contain', 'Computer Science');
  });

  it('should search by all column vlaues', () => {
    cy.get('#searchBox').type('ci');
    cy.get('.rt-td').should('contain', 'Cierra');

    cy.get('#searchBox').clear().type('ca');
    cy.get('.rt-td').should('contain', 'Cantrell');

    cy.get('#searchBox').clear().type('4');
    cy.get('.rt-td').should('contain', '45');

    cy.get('#searchBox').clear().type('n@');
    cy.get('.rt-td').should('contain', 'alden@example.com');

    cy.get('#searchBox').clear().type('12');
    cy.get('.rt-td').should('contain', '12000');

    cy.get('#searchBox').clear().type('in');
    cy.get('.rt-td').should('contain', 'Insurance');
  })
});
