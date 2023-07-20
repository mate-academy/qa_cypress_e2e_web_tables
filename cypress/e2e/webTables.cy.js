/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
  });

  it('should contain pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-pageInfo').should('exist');
    cy.get('.-pagination').should('contain', 'Next');
  });

  it('should contain rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
    cy.get('select').select('10 rows');
    cy.get('select').should('contain', '10 rows');
    cy.get('select').select('50 rows');
    cy.get('select').should('contain', '50 rows');
  });

  it('should allow to add new worker and validate data after creating worker',
    () => {
      cy.get('#addNewRecordButton').click();
      cy.get('#registration-form-modal').should('be.visible');
      cy.findByPlaceholder('First Name').type(worker.firstName);
      cy.findByPlaceholder('Last Name').type(worker.lastName);
      cy.findByPlaceholder('name@example.com').type(worker.email);
      cy.findByPlaceholder('Age').type(worker.age);
      cy.findByPlaceholder('Salary').type(worker.salary);
      cy.findByPlaceholder('Department').type(worker.department);
      cy.get('#submit').click();

      cy.get('.web-tables-wrapper').should('contain', worker.firstName);
      cy.get('.web-tables-wrapper').should('contain', worker.lastName);
      cy.get('.web-tables-wrapper').should('contain', worker.email);
      cy.get('.web-tables-wrapper').should('contain', worker.age);
      cy.get('.web-tables-wrapper').should('contain', worker.salary);
      cy.get('.web-tables-wrapper').should('contain', worker.department);
    });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#registration-form-modal').should('be.visible');
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();

    cy.get('#searchBox').clear();
    cy.get('.web-tables-wrapper').should('contain', worker.firstName);
    cy.get('.web-tables-wrapper').should('contain', worker.lastName);
    cy.get('.web-tables-wrapper').should('contain', worker.age);
    cy.get('.web-tables-wrapper').should('contain', worker.email);
    cy.get('.web-tables-wrapper').should('contain', worker.department);
  });

  it('should allow to check search by all column values.', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.web-tables-wrapper').should('contain', 'Alden');
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('Cantrell');
    cy.get('.web-tables-wrapper').should('contain', 'Cantrell');
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('45');
    cy.get('.web-tables-wrapper').should('contain', '45');
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('alden');
    cy.get('.web-tables-wrapper').should('contain', 'alden@example.com');
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('12');
    cy.get('.web-tables-wrapper').should('contain', '12000');
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('Compliance');
    cy.get('.web-tables-wrapper').should('contain', 'Compliance');
  });
});
