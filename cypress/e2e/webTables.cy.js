const { generateWorker } = require("../support/generate");

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should have correct pagination', () => {
    cy.get('select').select('5 rows');

    cy.addNewWorker();
    cy.addNewWorker();
    cy.addNewWorker();

    cy.get('.pagination-bottom').should('exist');

    cy.get('.-pageJump > input').should('have.value', '1');

    cy.get('.-totalPages').should('contain.text', '2');

    cy.get('.-next > .-btn').click();

    cy.get('.-pageJump > input').should('have.value', '2');

    cy.get('.-previous > .-btn').click();

    cy.get('.-pageJump > input').should('have.value', '1');
  });

  it('should allow to select rows count', () => {
    cy.get('select').select('20 rows').should('have.value', '20');

    cy.get('.rt-tr-group').should('have.length', 20);
  });

  it('should allow to add a new worker', () => {
    const {
      firstName,
      lastName,
      email,
      age,
      salary,
      department,
    } = generateWorker();

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);

    cy.get('#submit').click();

    cy.get(':nth-child(4) > .rt-tr')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', age)
      .should('contain.text', salary)
      .should('contain.text', department);
  });

  it('should allow to delete the worker', () => {
    cy.contains(':nth-child(3) > .rt-tr', 'Kierra').should('exist');

    cy.get('#delete-record-3').click();

    cy.contains(':nth-child(3) > .rt-tr', 'Kierra').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`).click();
    }

    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });

  it('should allow to find and edit the worker', () => {
    cy.get('#searchBox').type('Kierra{enter}');

    cy.get('#edit-record-3').click();

    cy.get('#lastName').type('-Vega');

    cy.get('#submit').click();

    cy.get('.rt-tr').should('contain.text', 'Gentry-Vega');
  });

  it('should allow searching by all column values', () => {
    cy.get('#searchBox').type('Kierra{enter}');
    cy.get('.rt-tr').should('contain.text', 'Kierra');

    cy.get('#searchBox').type('{selectall}Gentry{enter}');
    cy.get('.rt-tr').should('contain.text', 'Gentry');

    cy.get('#searchBox').type('{selectall}kierra@example.com{enter}');
    cy.get('.rt-tr').should('contain.text', 'kierra@example.com');

    cy.get('#searchBox').type('{selectall}29{enter}');
    cy.get('.rt-tr').should('contain.text', '29');

    cy.get('#searchBox').type('{selectall}2000{enter}');
    cy.get('.rt-tr').should('contain.text', '2000');

    cy.get('#searchBox').type('{selectall}Legal{enter}');
    cy.get('.rt-tr').should('contain.text', 'Legal');
  });
});
