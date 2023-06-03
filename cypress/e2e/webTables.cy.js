const { generateUser } = require('../support/generate.js');
const worker = generateUser();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should have pagination', () => {
    cy.get('.-pageJump')
      .should('exist');
  });

  it('should have Rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
  });

  it.only('should should allow to add new worker', () => {
    cy.findById('addNewRecordButton')
      .click();
    cy.findById('firstName')
      .type(worker.firstName);
    cy.findById('lastName')
      .type(worker.lastName);
    cy.findById('userEmail')
      .type(worker.email);
    cy.findById('age')
      .type(worker.age);
    cy.findById('salary')
      .type(worker.salary);
    cy.findById('department')
      .type(worker.department);
    cy.findById('submit')
      .click();
    cy.get('.rt-tbody')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should delete worker', () => {
    cy.findById('delete-record-3')
      .click();
  });

  it('should delete all workers', () => {
    cy.findById('delete-record-1')
      .should('exist');
    cy.findById('delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
    cy.findById('delete-record-2')
      .should('exist');
    cy.findById('delete-record-2')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-2');
    cy.findById('delete-record-3')
      .should('exist');
    cy.findById('delete-record-3')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-3');
  });

  it('should Find worker in search field and edit it', () => {
    cy.findById('searchBox')
      .click();
    cy.findById('searchBox')
      .type('Alden');
    cy.findById('edit-record-2')
      .click();
    cy.get('[placeholder="First Name"]')
      .type('_new');
    cy.findById('submit')
      .should('exist')
      .click();
    cy.get('[role="row"]')
      .should('contain', 'Alden_new');
  });

  it('Search by all column values', () => {
    cy.findById('searchBox')
      .type('Kierra')
      .clear();
    cy.get('#basic-addon2')
      .click();
    cy.get('[role="row"]')
      .should('contain', 'Kierra');

    cy.findById('searchBox')
      .type('Gentry')
      .clear();
    cy.get('#basic-addon2')
      .click();
    cy.get('[role="row"]')
      .should('contain', 'Gentry');

    cy.findById('searchBox')
      .type('29')
      .clear();
    cy.get('#basic-addon2')
      .click();
    cy.get('[role="row"]')
      .should('contain', '29');

    cy.findById('searchBox')
      .type('kierra@example.com')
      .clear();
    cy.get('#basic-addon2')
      .click();
    cy.get('[role="row"]')
      .should('contain', 'kierra@example.com');

    cy.findById('searchBox')
      .type('2000')
      .clear();
    cy.get('#basic-addon2')
      .click();
    cy.get('[role="row"]')
      .should('contain', '2000');

    cy.findById('searchBox')
      .type('Legal')
      .clear();
    cy.get('#basic-addon2')
      .click();
    cy.get('[role="row"]')
      .should('contain', 'Legal');
  });
});
