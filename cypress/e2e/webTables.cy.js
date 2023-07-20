/// <reference types='cypress' />

describe('Web Tables page', () => {
  let newWorker;

  beforeEach(() => {
    cy.task('addWorker').then((addWorker) => {
      newWorker = addWorker;
    });
    cy.visit('/');
  });

  it('should contain pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-center').should('contain', 'Page');
    cy.get('.-center').should('contain', 'of');
    cy.get('.select-wrap.-pageSizeOptions').should('be.visible');
    cy.get('.select-wrap.-pageSizeOptions').should('contain', '5 rows');
    cy.get('.select-wrap.-pageSizeOptions').should('contain', '10 rows');
    cy.get('.select-wrap.-pageSizeOptions').should('contain', '20 rows');
    cy.get('.select-wrap.-pageSizeOptions').should('contain', '25 rows');
    cy.get('.select-wrap.-pageSizeOptions').should('contain', '50 rows');
    cy.get('.select-wrap.-pageSizeOptions').should('contain', '100 rows');
    cy.get('.-pagination').should('contain', 'Next');
  });

  it('should allow the selection of the number of rows', () => {
    cy.get('select').should('be.visible');
    cy.get('select').select('5 rows');
    cy.get('select').select('20 rows');
  });

  it('should allow to add worker and validate data', () => {
    cy.get('#addNewRecordButton').should('contain', 'Add').click();
    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.findByPlaceholder('First Name').type(newWorker.firstName);
    cy.findByPlaceholder('Last Name').type(newWorker.lastName);
    cy.findByPlaceholder('name@example.com').type(newWorker.email);
    cy.findByPlaceholder('Age').type(newWorker.age);
    cy.findByPlaceholder('Salary').type(newWorker.salary);
    cy.findByPlaceholder('Department').type(newWorker.department);

    cy.get('#submit').click();

    cy.get('.web-tables-wrapper').should('contain', newWorker.firstName);
    cy.get('.web-tables-wrapper').should('contain', newWorker.lastName);
    cy.get('.web-tables-wrapper').should('contain', newWorker.age);
    cy.get('.web-tables-wrapper').should('contain', newWorker.salary);
    cy.get('.web-tables-wrapper').should('contain', newWorker.department);
  });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').should('not.exist');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('29');
    cy.get('#edit-record-3').click();
    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(newWorker.lastName);

    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(newWorker.email);

    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(newWorker.age);

    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(newWorker.salary);

    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(newWorker.department);

    cy.get('#submit').click();
    cy.get('#searchBox').clear();

    cy.get('.web-tables-wrapper').should('contain', newWorker.lastName);
    cy.get('.web-tables-wrapper').should('contain', newWorker.email);
    cy.get('.web-tables-wrapper').should('contain', newWorker.age);
    cy.get('.web-tables-wrapper').should('contain', newWorker.salary);
    cy.get('.web-tables-wrapper').should('contain', newWorker.department);
  });

  it('should allow to check search by all column values.', () => {
    cy.findByPlaceholder('Type to search').type('ci');
    cy.get('.web-tables-wrapper').should('contain', 'Cierra');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('ve');
    cy.get('.web-tables-wrapper').should('contain', 'Vega');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('9');
    cy.get('.web-tables-wrapper').should('contain', '29');
    cy.get('.web-tables-wrapper').should('contain', '39');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('alden@example.com');
    cy.get('.web-tables-wrapper').should('contain', 'alden@example.com');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('12');
    cy.get('.web-tables-wrapper').should('contain', '12000');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('ins');
    cy.get('.web-tables-wrapper').should('contain', 'Insurance');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('125dgfg');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });
});
