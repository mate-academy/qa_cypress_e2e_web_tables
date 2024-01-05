/// <reference types='cypress' />

const faker = require('faker');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should be a button to switch pages', () => {
    cy.contains('.-btn', 'Next').should('exist');
  });

  it('should be able to rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
  });

  it('add a new worker', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.exampleEmail(firstName, lastName);
    const age = faker.random.number({ min: 25, max: 60 });
    const salary = faker.random.number({ min: 2000, max: 6000 });
    const department = faker.random.number({ min: 1, max: 3 });

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.rt-tr')
      .should('contain', firstName)
      .and('contain', lastName);
  });

  it('delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-table').should('not.contain', 'Cierra');
  });

  it('delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-table').should('exist', 'No rows found');
  });

  it('find and edit worker', () => {
    const firstName = faker.name.firstName('female');
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').type(`{selectAll} ${firstName} {enter}`);
    cy.get('.rt-table').should('contain', firstName);
  });

  it('search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-table').should('contain', 'Cierra');
    cy.get('#searchBox').type(`{selectAll}Vega`);
    cy.get('.rt-table').should('contain', 'Vega');
    cy.get('#searchBox').type(`{selectAll}39`);
    cy.get('.rt-table').should('contain', '39');
    cy.get('#searchBox').type(`{selectAll}cierra@example.com`);
    cy.get('.rt-table').should('contain', 'cierra@example.com');
    cy.get('#searchBox').type(`{selectAll}10000`);
    cy.get('.rt-table').should('contain', '10000');
    cy.get('#searchBox').type(`{selectAll}Insurance`);
    cy.get('.rt-table').should('contain', 'Insurance');
  });
});
