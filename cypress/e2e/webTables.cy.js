/// <reference types='cypress' />

const { generateUser } = require('../support/generate');
const { firstName, lastName, email, age, salary, department } = generateUser();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should contain pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next')
      .and('contain', 'Page')
  });

  it('should provide to change rows count selection', () => {
    cy.get('select')
      .select('5 rows')
      .should('have.value', '5');

    cy.get('select')
      .select('10 rows')
      .should('have.value', '10');

    cy.get('select')
      .select('20 rows')
      .should('have.value', '20');

    cy.get('select')
      .select('25 rows')
      .should('have.value', '25');

    cy.visit('/')
      .get('select')
      .select('50 rows')
      .should('have.value', '50');

    cy.visit('/')
      .get('select')
      .select('100 rows')
      .should('have.value', '100');
  });

  it('should provide to add new worker', () => {
    cy.addWorker(firstName, lastName, email, age, salary, department);

    cy.get('.ReactTable')
      .should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email)
      .and('contain', age)
      .and('contain', salary)
      .and('contain', department);

    cy.get('#searchBox')
      .type(email);
  });

  it('should provide to edit worker', () => {
    cy.addWorker(firstName, lastName, email, age, salary, department);

    cy.get('#searchBox')
      .type(email);

    cy.get('[title="Edit"]')
      .click();

    cy.get('#firstName')
      .type('++');

    cy.get('#submit')
      .click();
    
    cy.get('.ReactTable')
      .should('contain', `${firstName}++`);
  
    cy.get('[title="Edit"]')
      .click();

    cy.get('#lastName')
      .type('++');

    cy.get('#submit')
      .click();
    
    cy.get('.ReactTable')
      .should('contain', `${lastName}++`);

    cy.get('[title="Edit"]')
      .click();

    cy.get('#age')
      .clear()
      .type(age + 1);

    cy.get('#submit')
      .click();
    
    cy.get('.ReactTable')
      .should('contain', age + 1);
  });

  it('should provide to delete worker', () => {
    cy.addWorker(firstName, lastName, email, age, salary, department);

    cy.get('#searchBox')
      .type(email);

    cy.get('[title="Delete"]')
      .click();

    cy.get('.ReactTable')
      .should('contain', 'No rows found');
  });

  it('should provide to delete all workers', () => {
    cy.get('[id="delete-record-1"]')
      .click();
    cy.get('[id="delete-record-2"]')
      .click();
    cy.get('[id="delete-record-3"]')
      .click();
  });

  it('should provide to find worker by all column values', () => {
    cy.addWorker(firstName, lastName, email, age, salary, department);

    cy.get('#searchBox')
      .type(firstName);

    cy.get('.ReactTable')
      .should('contain', firstName);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(lastName);

    cy.get('.ReactTable')
      .should('contain', lastName);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(email);

    cy.get('.ReactTable')
      .should('contain', email);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(age);

    cy.get('.ReactTable')
      .should('contain', age);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(salary);

    cy.get('.ReactTable')
      .should('contain', salary);

    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(department);

    cy.get('.ReactTable')
      .should('contain', department);

    cy.get('#searchBox')
      .clear();
  });
});
