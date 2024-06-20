/// <reference types="cypress" />
const { generateUser } = require('../support/generate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const userName = 'test';
  const checkEmail = [
    'cierra@example.com',
    'alden@example.com',
    'kierra@example.com'
  ];
  const {

    lastNameFaker,
    emailFaker,
    ageFaker,
    salaryFaker,
    departmentFaker,
    name,
    newAge,
    Email,
    LastName,
    Age,
    Salary,
    Department

  } = generateUser();

  it('should provide an ability to pagination', () => {
    cy.get('.-pageJump > input')
      .should('have.value', '1');
  });

  it('should provide an ability to rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');

    cy.get('[value="5"]')
      .should('have.value', '5');

    cy.get('select')
      .should('have.value', '5');

    cy.get('[aria-label="rows per page"]')
      .select('10 rows');

    cy.get('[value="10"]')
      .should('have.value', '10');

    cy.get('select')
      .should('have.value', '10');

    cy.get('[aria-label="rows per page"]')
      .select('20 rows');

    cy.get('[value="20"]')
      .should('have.value', '20');

    cy.get('select')
      .should('have.value', '20');

    cy.get('[aria-label="rows per page"]')
      .select('25 rows');

    cy.get('[value="25"]')
      .should('have.value', '25');

    cy.get('select')
      .should('have.value', '25');

    cy.get('[aria-label="rows per page"]')
      .select('50 rows');

    cy.get('[value="50"]')
      .should('have.value', '50');

    cy.get('select')
      .should('have.value', '50');

    cy.get('[aria-label="rows per page"]')
      .select('100 rows');

    cy.get('[value="100"]')
      .should('have.value', '100');

    cy.get('select')
      .should('have.value', '100');
  });

  it('should provide an ability to add new worker', () => {
    cy.contains('.btn', 'Add')
      .click();
    cy.get('[id="firstName"]')
      .type(userName);
    cy.get('[id="lastName"]')
      .type(lastNameFaker);
    cy.get('[id="userEmail"]')
      .type(emailFaker);
    cy.get('[id="age"]')
      .type(ageFaker);
    cy.get('[id="salary"]')
      .type(salaryFaker);
    cy.get('[id="department"]')
      .type(departmentFaker);
    cy.contains('.btn', 'Submit')
      .click();
    cy.get('.rt-td')
      .should('contain', userName);
    cy.get('.rt-td')
      .should('contain', lastNameFaker);
    cy.get('.rt-td')
      .should('contain', emailFaker);
    cy.get('.rt-td')
      .should('contain', ageFaker);
    cy.get('.rt-td')
      .should('contain', salaryFaker);
    cy.get('.rt-td')
      .should('contain', departmentFaker);
  });

  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-3 > svg')
      .click();
    cy.contains('.rt-td', emailFaker)
      .should('not.exist');
  });

  it('should provide an ability to delete all worker', () => {
    cy.get('#delete-record-3 > svg > path')
      .click();
    cy.get('#delete-record-2 > svg > path')
      .click();
    cy.get('#delete-record-1 > svg > path')
      .click();
    cy.contains('.rt-td', checkEmail)
      .should('not.exist');
  });

  it('should provide an ability to find worker and edit it', () => {
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(name);
    cy.get('#edit-record-1 > svg > path')
      .click();
    cy.get('[id="firstName"]')
      .clear();
    cy.get('[id="firstName"]')
      .type(userName);
    cy.get('#age')
      .clear();
    cy.get('#age')
      .type(newAge);
    cy.contains('.btn', 'Submit')
      .click();
    cy.get('.rt-table')
      .should('contain', userName);
    cy.get('.rt-table')
      .should('contain', newAge);
  });

  it('should provide an ability to find worker in search field', () => {
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(name);
    cy.get('.rt-table')
      .should('contain', name);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(Email);
    cy.get('.rt-table')
      .should('contain', Email);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(LastName);
    cy.get('.rt-table')
      .should('contain', LastName);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(Age);
    cy.get('.rt-table')
      .should('contain', Age);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(Salary);
    cy.get('.rt-table')
      .should('contain', Salary);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .click();
    cy.get('#searchBox')
      .type(Department);
    cy.get('.rt-table')
      .should('contain', Department);
    cy.get('#searchBox')
      .clear();
  });
});
