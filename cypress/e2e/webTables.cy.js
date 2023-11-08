/// <reference types='cypress' />
const faker = require('faker');
const { de } = require('faker/lib/locales');
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const age = faker.random.number({ min: 16, max: 99 });
const salary = faker.random.number();
const department = faker.commerce.department();


describe('Web Tables page', () => {
  beforeEach(() =>  {
    cy.visit('/webtables')
  })
  it('should have pagination', () => {
    cy.get('.-pagination')
     .should('exist');
    cy.get('.-pageInfo')
     .should('exist');
    cy.get('.-pagination')
     .should('contain', 'Previous');
    cy.get('.-pagination')
     .should('contain', 'Next');
});

  it('should have an ability to change number of rows', () => {
    cy.get('[aria-label="rows per page"]')
     .should('exist');
    cy.get('[aria-label="rows per page"]')
     .select('25');
    cy.get('[aria-label="rows per page"]')
     .should('contain', '25');
  })

  it('should have an ability to add new worker', () => {
    cy.get('#addNewRecordButton')
     .click();
    cy.findByPlaceholder('First Name')
     .type(firstName);
    cy.findByPlaceholder('Last Name')
     .type(lastName);
    cy.findByPlaceholder('name@example.com')
     .type(email);
    cy.findByPlaceholder('Age')
     .type(age);
    cy.findByPlaceholder('Salary')
     .type(salary);
    cy.findByPlaceholder('Department')
     .type(department);
    cy.contains('Submit')
     .click();
    cy.get('.rt-table')
     .should('contain', firstName);
    cy.get('.rt-table')
     .should('contain', lastName);
    cy.get('.rt-table')
     .should('contain', email);
    cy.get('.rt-table')
     .should('contain', age);
    cy.get('.rt-table')
     .should('contain', salary);
    cy.get('.rt-table')
     .should('contain', department);
  })
   
  it('should have an ability to delete a worker', () => {
    cy.get('#delete-record-3')
     .click();
    cy.get('.rt-tbody')
     .should('not.contain', '#delete-record-3');
  });

  it('should have an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
});
  
  it('should have an ability to find a worker in search field, edit it and validate edited data', () => {
    cy.findByPlaceholder('Type to search') 
     .type('Kierra');
    cy.get('#edit-record-3')
     .click();
    cy.findByPlaceholder('First Name')
     .clear().type(firstName);
    cy.get('#submit')
     .click();
    cy.get('.rt-td')
     .should('contain', firstName);
});

    it('should have an ability to search for workers by all column values', () => {
    cy.get('#searchBox')
     .type('Kierra');
    cy.get('.rt-tbody')
     .should('contain', 'Kierra');
    cy.get('#searchBox')
     .clear();
    cy.get('#searchBox')
     .type('Vega');
    cy.get('.rt-tbody')
     .should('contain', 'Vega');
    cy.get('#searchBox')
     .clear();
    cy.get('#searchBox')
     .type(45);
    cy.get('.rt-tbody')
     .should('contain', 45);
    cy.get('#searchBox')
     .clear();
    cy.get('#searchBox')
     .type('kierra@example.com');
    cy.get('.rt-tbody')
     .should('contain', 'kierra@example.com');
    cy.get('#searchBox')
     .clear();
    cy.get('#searchBox')
    .type(10000);
    cy.get('.rt-tbody')
     .should('contain', 10000);
    cy.get('#searchBox')
     .clear();
    cy.get('#searchBox')
     .type('Legal');
    cy.get('.rt-tbody')
     .should('contain', 'Legal');
});
 
});
