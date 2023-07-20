/// <reference types='cypress' />

// const { AggregateError } = require("sequelize");

describe('Web Tables page', () => {
  const randomIndex = Math.floor(Math.random() * 2);
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: `johndoe${randomIndex}@gmail.com`,
    age: 24,
    salary: 2000,
    department: 'Police'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('Validation of pagination', () => {
    cy.get('.-previous > .-btn').should('be.visible');
    cy.get('.-next > .-btn').should('be.visible');
    cy.get('[class="-pageInfo"]').should('be.visible');
    cy.get('.-pageJump > input').should('contain.value', 1);
  });

  it('should allow to select row count', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('have.value', 5);

    cy.get('select').select('10 rows');
    cy.get('select').should('have.value', 10);

    cy.get('select').select('20 rows');
    cy.get('select').should('have.value', 20);

    cy.get('select').select('25 rows');
    cy.get('select').should('have.value', 25);

    cy.get('select').select('50 rows');
    cy.get('select').should('have.value', 50);

    cy.get('select').select('100 rows');
    cy.get('select').should('have.value', 100);
  });

  it('Should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);

    cy.get('[class="modal-title h4"]').should('contain', 'Registration Form');
    cy.get('#submit').click();

    cy.get('.rt-tbody').should('contain', user.firstName);
    cy.get('.rt-tbody').should('contain', user.lastName);
    cy.get('.rt-tbody').should('contain', user.email);
    cy.get('.rt-tbody').should('contain', user.age);
    cy.get('.rt-tbody').should('contain', user.salary);
    cy.get('.rt-tbody').should('contain', user.department);
  });

  it('should allow to delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', 'rt-tr -odd');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('[class="rt-noData"]').should('contain', 'No rows found');
  });

  it('should allow to find a worker in the search field & edit', () => {
    cy.findByPlaceholder('Type to search').type('Vega');
    cy.get('.mr-2').click();

    cy.get('#lastName').clear();
    cy.get('#lastName').type('Balrog'); // eslint не пропускає код в один рядок
    cy.get('#submit').click();

    cy.get('#searchBox').clear();
    cy.get('.rt-tbody').should('contain', 'Balrog');
  });

  it('should find a user by search columns values', () => {
    cy.get('#searchBox').type('Kie');
    cy.get('.rt-tbody').should('contain', 'Kierra');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('G');
    cy.get('.rt-tbody').should('contain', 'Gentry');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(39);
    cy.get('.rt-tbody').should('contain', '39');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@');
    cy.get('.rt-tbody').should('contain', 'alden@example.com');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('120');
    cy.get('.rt-tbody').should('contain', '12000');

    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('comp');
    cy.get('.rt-tbody').should('contain', 'Compliance');
  });
});
