/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should check the pagination', () => {
    cy.contains('button', 'Previous')
      .should('be.visible');

    cy.contains('button', 'Next')
      .should('be.visible');

    cy.get('[class="-pageInfo"]')
      .should('be.visible');

    cy.get('.-pageJump > input')
      .should('contain.value', '1');
  });

  it('should proide an ability to select rows', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist');

    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 rows');

    cy.get('select')
      .select('10 rows');
    cy.get('select')
      .should('contain', '10 rows');

    cy.get('select')
      .select('20 rows');
    cy.get('select')
      .should('contain', '20 rows');

    cy.get('select')
      .select('25 rows');
    cy.get('select')
      .should('contain', '25 rows');
  });

  it('should provide an ability to add a new worker', () => {
    const worker = {
      firstName: 'Little',
      lastName: 'Pony',
      email: 'myLittlePony@gmail.com',
      age: 20,
      salary: 2500,
      department: 'Star'
    };

    cy.get('#addNewRecordButton').click();

    cy.get('#firstName')
      .type(worker.firstName);

    cy.get('#lastName')
      .type(worker.lastName);

    cy.get('#userEmail')
      .type(worker.email);

    cy.get('#age')
      .type(worker.age);

    cy.get('#salary')
      .type(worker.salary);

    cy.get('#department')
      .type(worker.department);

    cy.get('#submit')
      .click();

    cy.get('[class="rt-tr-group"]')
      .should('contain', worker.firstName);

    cy.get('[class="rt-tr-group"]');

    cy.get('[class="rt-tr-group"]')
      .should('contain', worker.email);

    cy.get('[class="rt-tr-group"]')
      .should('contain', worker.age);

    cy.get('[class="rt-tr-group"]')
      .should('contain', worker.salary);

    cy.get('[class="rt-tr-group"]')
      .should('contain', worker.department);
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1')
      .should('exist');

    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain', 'rt-tr -odd');
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1')
      .should('exist');

    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain', 'rt-tr -odd');

    cy.get('#delete-record-2')
      .should('exist');

    cy.get('#delete-record-2')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain', 'rt-tr -odd');

    cy.get('#delete-record-3')
      .should('exist');

    cy.get('#delete-record-3')
      .click();

    cy.get('.rt-tbody')
      .should('not.contain', 'rt-tr -odd');

    cy.get('[class="rt-noData"]').should('contain', 'No rows found');
  });

  it('should provide an ability to find and edit the worker', () => {
    const worker = {
      firstName: 'Cierra',
      lastName: 'Vega',
      email: 'cierra@example.com',
      age: 39,
      salary: 10000,
      department: 'Insurance',
      newFirstName: 'Alejandro'
    };

    cy.get('#searchBox')
      .should('exist');

    cy.get('#searchBox')
      .type(worker.firstName);

    cy.get('.mr-2')
      .click();

    cy.get('#lastName')
      .clear();

    cy.get('#lastName')
      .type('newLastName');

    cy.get('#userEmail')
      .clear();

    cy.get('#userEmail')
      .type('newuserEmail@gmail.com');

    cy.get('#age')
      .clear();

    cy.get('#age')
      .type('20');

    cy.get('#salary')
      .clear();

    cy.get('#salary')
      .type('3000');

    cy.get('#department')
      .clear();

    cy.get('#department')
      .type('Game');

    cy.get('#submit')
      .click();
  });

  it('should provide an ability to search by all column values', () => {
    cy.get('#searchBox')
      .type('cie');

    cy.get('.rt-tbody')
      .should('contain', 'Cierra');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('can');

    cy.get('.rt-tbody')
      .should('contain', 'Cantrell');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('29');

    cy.get('.rt-tbody')
      .should('contain', '29');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('alde');

    cy.get('.rt-tbody')
      .should('contain', 'alden@example.com');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('1000');

    cy.get('.rt-tbody')
      .should('contain', '10000');

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('Com');

    cy.get('.rt-tbody')
      .should('contain', 'Compliance');

    cy.get('#searchBox')
      .clear();
  });
});
