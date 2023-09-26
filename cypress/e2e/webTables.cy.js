/// <reference types='cypress' />

describe('Web Tables page', () => {
  const faker = require('faker');

  const worker = {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.number({ min: 18, max: 65 }),
    salary: faker.random.number({ min: 2000, max: 25000 }),
    department: faker.commerce.department()
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should have pagination', () => {
    cy.get('.-pagination').should('exist');
  });

  it('should proide an ability to select rows at page', () => {
    cy.selectRowsOnPage('5');
    cy.selectRowsOnPage('10');
    cy.selectRowsOnPage('20');
  });

  it('should provide the ability to add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.name);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);

    cy.get('#submit').click();
    cy.get('.rt-table').should('contain', worker.name, worker.lastName);
  });

  it('should provide the ability to delete worker', () => {
    cy.get('#delete-record-1 > svg > path').click();
    cy.get('.rt-table').should('not.contain', 'Cierra, Vega');
  });

  it('should provide an ability to delete all workers', () => {
    cy.deleteAllWorkers(3);
    cy.contains('.rt-noData', 'No rows found').should('be.visible');
  });

  it('should provide the ability to find worker in search field and edit it',
    () => {
      cy.get('#searchBox').type('Cierra');
      cy.get('#edit-record-1 > svg > path').click();
      cy.get('#lastName').type(worker.lastName);
      cy.get('#submit').click();
      cy.get('.rt-tbody').should('contain', worker.lastName);
    });

  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.name);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);

    cy.get('#submit').click();

    cy.get('.rt-table').should('contain', worker.name);
    cy.get('.rt-table').should('contain', worker.lastName);
    cy.get('.rt-table').should('contain', worker.email);
    cy.get('.rt-table').should('contain', worker.age);
    cy.get('.rt-table').should('contain', worker.salary);
    cy.get('.rt-table').should('contain', worker.department);
  });

  it('should provide the ability to check search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tbody').should('contain', 'Cierra');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Vega');
    cy.get('.rt-tbody').should('contain', 'Vega');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('39');
    cy.get('.rt-tbody').should('contain', '39');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-tbody').should('contain', 'cierra@example.com');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.get('.rt-tbody').should('contain', '10000');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-tbody').should('contain', 'Insurance');
  });
});
