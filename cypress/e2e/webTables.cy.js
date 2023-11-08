/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      worker = generateUser;
    });
  });

  it('should contain pagination', () => {
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should contain row count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .select(worker.rows);
    cy.get('[aria-label="rows per page"]')
      .should('contain', worker.rows);
  });

  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
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
    cy.get('div')
      .should('contain', worker.firstName);
    cy.get('div')
      .should('contain', worker.lastName);
    cy.get('div')
      .should('contain', worker.email);
    cy.get('div')
      .should('contain', worker.age);
    cy.get('div')
      .should('contain', worker.salary);
    cy.get('div')
      .should('contain', worker.department);
  });

  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
  });

  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#registration-form-modal')
      .should('contain.text', 'Registration Form');
    cy.get('#firstName')
      .clear();
    cy.get('#firstName')
      .type(worker.firstName);
    cy.get('#lastName')
      .clear();
    cy.get('#lastName')
      .type(worker.lastName);
    cy.get('#userEmail')
      .clear();
    cy.get('#userEmail')
      .type(worker.email);
    cy.get('#age')
      .clear();
    cy.get('#age')
      .type(worker.age);
    cy.get('#salary')
      .clear();
    cy.get('#salary')
      .type(worker.salary);
    cy.get('#department')
      .clear();
    cy.get('#department')
      .type(worker.department);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear();
    cy.get('div')
      .should('contain', worker.firstName);
    cy.get('div')
      .should('contain', worker.lastName);
    cy.get('div')
      .should('contain', worker.email);
    cy.get('div')
      .should('contain', worker.age);
    cy.get('div')
      .should('contain', worker.salary);
    cy.get('div')
      .should('contain', worker.department);
  });

  it('should provide an ability to validate data after creating worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#registration-form-modal')
      .should('contain.text', 'Registration Form');
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
    cy.get('div').should('contain', worker.firstName);
    cy.get('div').should('contain', worker.lastName);
    cy.get('div').should('contain', worker.email);
    cy.get('div').should('contain', worker.age);
    cy.get('div').should('contain', worker.salary);
    cy.get('div').should('contain', worker.department);
  });

  it.only('should provide an ability to check search by all column val', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.web-tables-wrapper')
      .should('contain', 'Cierra');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Vega');
    cy.get('.web-tables-wrapper')
      .should('contain', 'Vega');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('39');
    cy.get('.web-tables-wrapper')
      .should('contain', '39');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('cierra@example.com');
    cy.get('.web-tables-wrapper')
      .should('contain', 'cierra@example.com');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('10000');
    cy.get('.web-tables-wrapper')
      .should('contain', '10000');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Insurance');
    cy.get('.web-tables-wrapper')
      .should('contain', 'Insurance');
  });
});
