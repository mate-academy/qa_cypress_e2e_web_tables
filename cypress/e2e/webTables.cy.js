/// <reference types='cypress' />

const { getParsedCommandLineOfConfigFile } = require('typescript');

describe('Web Tables page', () => {

  const faker = require('faker');

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should be able to choose next page in the pagination', () => {
   cy.get('.-next > .-btn').should('have.class', 'disabled');
   });

  it('should be able to rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
});

it('it should be able to add a new worker', () => {
  const randomName = faker.name.firstName();
  const randomLastName = faker.name.lastName();
  const randomEmail = faker.internet.exampleEmail();
  const randomNumber = faker.random.number();
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type(randomName);
  cy.get('#lastName').type(randomLastName);
  cy.get('#userEmail').type(randomEmail);
  cy.get('#age').type(randomNumber);
  cy.get('#salary').type(randomNumber);
  cy.get('#department').type(randomNumber);
  cy.get('#submit').click();
  cy.wait(8000);
  cy.contains('.rt-table').should('contain', randomName).and('contain', randomLastName);
});

it('should be able to delete a worker', () => {
  cy.get('#delete-record-6'),click();
cy.get('.rt-table').invoke('First name').should('not.include', randomName).and('not.include', randomLastName);
});

it('should be able to delete all workers', () => {
  cy.get('#delete-record-1').click();
  cy.get('#delete-record-2').click();
  cy.get('#delete-record-3').click();
  cy.get('.rt-table').should('exist', 'No rows found');
});

it('should be able to find a worker in a search field and edit it', () => {
  cy.get('#searchBox').type('Cierra');
  cy.get('#edit-record-1').click();
  cy.get('#firstName').type('tt');
  cy.get('#submit').click();
  cy.get('.rt-tr-group').should('contain', 'Cierratt');
});

it.only('should be able to check the search by all column values.', () => {
  cy.get('#searchBox').type('Vega');
  cy.get('#basic-addon2').click();
  cy.get('.rt-table').should('contain', 'Vega');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('39');
  cy.get('#basic-addon2').click();
  cy.get('.rt-table').should('contain', '39');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('cierra@example.com');
  cy.get('#basic-addon2').click();
  cy.get('.rt-table').should('contain', 'cierra@example.com');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('10000');
  cy.get('#basic-addon2').click();
  cy.get('.rt-table').should('contain', '10000');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('Insurance');
  cy.get('#basic-addon2').click();
  cy.get('.rt-table').should('contain', 'Insurance');
});
});
