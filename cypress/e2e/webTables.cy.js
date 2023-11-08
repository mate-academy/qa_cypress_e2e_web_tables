/// <reference types='cypress' />
const faker = require('faker');

describe('Web Tables page', () => {
  const worker = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: Math.ceil(Math.random() * 30),
    salary: Math.ceil(Math.random() * 1000),
    department: faker.name.lastName()
  };
  const worker1 = {
    firstName: 'Cierra',
    lastName: 'Vega',
    email: 'cierra@example.com',
    age: 39,
    salary: 10000,
    department: 'Insurance',
    newFirstName: faker.name.firstName()
  };
  beforeEach(() => {
    cy.visit('webtables');
  });

  it('should have pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.get('.-pageInfo')
      .should('contain', 'Page');
  });

  it('should have rows count selection', () => {
    cy.get('select')
      .select('10 rows');
    cy.get('select')
      .should('contain', '10 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.findByPlaceholder('First Name')
      .type(worker.firstName);
    cy.findByPlaceholder('Last Name')
      .type(worker.lastName);
    cy.findByPlaceholder('name@example.com')
      .type(worker.email);
    cy.findByPlaceholder('Age')
      .type(worker.age);
    cy.findByPlaceholder('Salary')
      .type(worker.salary);
    cy.findByPlaceholder('Department')
      .type(worker.department);
    cy.get('#submit').click();
    cy.get('.rt-tr-group')
      .should('contain', worker.firstName);
    cy.get('.rt-tr-group')
      .should('contain', worker.lastName);
    cy.get('.rt-tr-group')
      .should('contain', worker.age);
    cy.get('.rt-tr-group')
      .should('contain', worker.email);
    cy.get('.rt-tr-group')
      .should('contain', worker.salary);
    cy.get('.rt-tr-group')
      .should('contain', worker.department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
    cy.get('#delete-record-2')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-2');
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-3');
  });

  it('should find a worker in the search field and edit it', () => {
    cy.findByPlaceholder('Type to search')
      .type(worker1.firstName);
    cy.get('.rt-tbody')
      .should('contain', worker1.firstName)
      .and('contain', worker1.lastName)
      .and('contain', worker1.email)
      .and('contain', worker1.age)
      .and('contain', worker1.salary)
      .and('contain', worker1.department);
    cy.get('#edit-record-1')
      .click();
    cy.findByPlaceholder('First Name')
      .type('{selectAll}' + worker1.newFirstName);
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', worker1.newFirstName);
  });

  it('should validate data in the worker row after editing the worker', () => {
    cy.findByPlaceholder('Type to search')
      .type(worker1.lastName);
    cy.get('#edit-record-1')
      .click();
    cy.get('#firstName')
      .type('{selectAll}' + worker1.newFirstName);
    cy.get('#submit').click();
    cy.get('.rt-tbody')
      .should('contain', worker1.newFirstName);
  });

  it('should check the search by all column values', () => {
    cy.findByPlaceholder('Type to search')
      .type('Cierra');
    cy.get('.rt-tbody')
      .should('contain', 'Cierra');
    cy.findByPlaceholder('Type to search')
      .type('{selectAll}' + 'Cantrell');
    cy.get('.rt-tbody')
      .should('contain', 'Cantrell');
    cy.findByPlaceholder('Type to search')
      .type('{selectAll}' + 'kierra@example.com');
    cy.get('.rt-tbody')
      .should('contain', 'kierra@example.com');
    cy.findByPlaceholder('Type to search')
      .type('{selectAll}' + '39');
    cy.get('.rt-tbody')
      .should('contain', '39');
    cy.findByPlaceholder('Type to search')
      .type('{selectAll}' + '10000');
    cy.get('.rt-tbody')
      .should('contain', '10000');
    cy.findByPlaceholder('Type to search')
      .type('{selectAll}' + 'Legal');
    cy.get('.rt-tbody')
      .should('contain', 'Legal');
  });
});
