/* eslint-disable max-len */
/// <reference types='cypress' />
const { faker } = require("@faker-js/faker");

describe('Web Tables page', () => {
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 13, max: 70 }),
    salary: faker.number.int({ min: 2000, max: 10000 })
  };
  beforeEach(() => {
    cy.visit('/webtables');
  });
  it('should provide an opportunity to switch a page', () => {
    cy.addManyUsers(3);
    cy.get('select').select('5 rows');
    cy.get('.-next').click();

    cy.get('[aria-label = "jump to page"]').should('contain.value', 2);
  });

  it('should provide an opportunity to switch rows count selection', () => {
    cy.get('select').select('5 rows');

    cy.get('[aria-label="rows per page"]').should('contain.text', '5 rows');
  });

  it('should provide an opportunity to add a user', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type('QA');
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', user.firstName);
  });

  it('should provide an opportunity to delete a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type('QA');
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();

    cy.get('.rt-td').should('not.contain', user.firstName);
  });

  it('should provide an opportunity to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should provide an opportunity to edit the worker', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#department').type('{selectAll} QA');
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', 'QA');
  });

  it.only('should provide an opportunity to find a worker by every column', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type('QA');
    cy.get('#submit').click();

    cy.get('#searchBox').type(user.firstName);
    cy.get('.rt-td').should('contain', user.firstName);

    cy.get('#searchBox').type('{selectAll}{del}');
    cy.get('#searchBox').type(user.lastName);
    cy.get('.rt-td').should('contain', user.lastName);

    cy.get('#searchBox').type('{selectAll}{del}');
    cy.get('#searchBox').type(user.email);
    cy.get('.rt-td').should('contain', user.email);

    cy.get('#searchBox').type('{selectAll}{del}');
    cy.get('#searchBox').type(user.age);
    cy.get('.rt-td').should('contain', user.age);

    cy.get('#searchBox').type('{selectAll}{del}');
    cy.get('#searchBox').type(user.salary);
    cy.get('.rt-td').should('contain', user.salary);

    cy.get('#searchBox').type('{selectAll}{del}');
    cy.get('#searchBox').type('QA');
    cy.get('.rt-td').should('contain', 'QA');
  });
});
