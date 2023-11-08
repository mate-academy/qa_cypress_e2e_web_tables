const { newWorker } = require('../support/newWorker');

describe('Web Tables page', () => {
  const { firstName, lastName, email, age, salary, department } =
    newWorker();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have pagination', () => {
    cy.get('.-pagination')
      .should('exist');
    cy.get('.-pagination')
      .should('contain', 'Previous');
    cy.get('.-pagination')
      .should('contain', 'Next');
  });

  it('should have rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows');
    cy.get('[aria-label="rows per page"]')
      .select('100 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '100 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(firstName);
    cy.get('#lastName')
      .type(lastName);
    cy.get('#userEmail')
      .type(email);
    cy.get('#age')
      .type(age);
    cy.get('#salary')
      .type(salary);
    cy.get('#department')
      .type(department);
    cy.get('#submit')
      .click();
    cy.get('.rt-td')
      .should('contain', firstName);
    cy.get('.rt-td')
      .should('contain', lastName);
    cy.get('.rt-td')
      .should('contain', age);
    cy.get('.rt-td')
      .should('contain', email);
    cy.get('.rt-td')
      .should('contain', salary);
    cy.get('.rt-td')
      .should('contain', department);
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

  it('should find a worker, edit and validate data after editing', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#firstName')
      .clear();
    cy.get('#firstName')
      .type(firstName);
    cy.get('#lastName')
      .clear();
    cy.get('#lastName')
      .type(lastName);
    cy.get('#userEmail')
      .clear();
    cy.get('#userEmail')
      .type(email);
    cy.get('#age')
      .clear();
    cy.get('#age')
      .type(age);
    cy.get('#salary')
      .clear();
    cy.get('#salary')
      .type(salary);
    cy.get('#department')
      .clear();
    cy.get('#department')
      .type(department);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type(firstName);
  });

  it('should check the search by all column values', () => {
    cy.get('#searchBox')
      .type('Kierra');
    cy.get('.rt-tbody')
      .should('contain', 'Kierra');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Gentry');
    cy.get('.rt-tbody')
      .should('contain', 'Gentry');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('29');
    cy.get('.rt-tbody')
      .should('contain', '29');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('cierra@example.com');
    cy.get('.rt-tbody')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('12000');
    cy.get('.rt-tbody')
      .should('contain', '12000');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Legal');
    cy.get('.rt-tbody')
      .should('contain', 'Legal');
  });
});
