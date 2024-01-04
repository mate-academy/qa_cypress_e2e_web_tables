/// <reference types='cypress' />
const faker = require('faker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });
  const username = 'Cierra';
  it('should contains pagination', () => {
    cy.contains('Page of').should('exist');

    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]')
      .select('20 rows')
      .should('contain', '5 rows');
  });

  it('should be able to add new user', () => {
    const firstName = faker.name.firstName();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(faker.name.lastName());
    cy.get('#userEmail').type(faker.internet.email());
    cy.get('#age').type('22');
    cy.get('#salary').type('25000');
    cy.get('#department').type('eco');
    cy.get('#submit').click();

    cy.get('.rt-tbody').should('contain', firstName);
  });

  it('should be able to delete a user', () => {
    cy.get('.rt-tbody').should('contain', username);
    cy.get('#delete-record-1').click();
    cy.contains('.rt-tbody', username).should('not.exist');
  });

  it('should be able to delete all users', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.contains('No rows found').should('exist');
  });

  it('change', () => {
    cy.get('#searchBox')
      .click()
      .type(username);
    cy.get('#edit-record-1').click();
    cy.get('#firstName').type('{selectAll}aaaaaa');
    cy.get('#lastName').type('{selectAll}hello');
    cy.get('#submit').click();
    cy.contains('aaaaaa').should('exist');
    cy.contains('hello').should('exist');
  });

  it('should be able to find user by any row', () => {
    cy.get('#searchBox')
      .click()
      .type(username);
    cy.get('.rt-tbody').should('contain', username);

    cy.get('#searchBox')
      .click()
      .type('{selectAll}Vega');
    cy.get('.rt-tbody').should('contain', 'Vega');

    cy.get('#searchBox')
      .click()
      .type('{selectAll}29');
    cy.get('.rt-tbody').should('contain', '29');

    cy.get('#searchBox')
      .click()
      .type('{selectAll}alden@example.com');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');

    cy.get('#searchBox')
      .click()
      .type('{selectAll}10000');
    cy.get('.rt-tbody').should('contain', '10000');

    cy.get('#searchBox')
      .click()
      .type('{selectAll}Legal');
    cy.get('.rt-tbody').should('contain', 'Legal');
  });
});
