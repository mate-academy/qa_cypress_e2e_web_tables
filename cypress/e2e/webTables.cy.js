/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/webtables');

    cy.task('addNewWorker')
      .then((addNewWorker) => {
        worker = addNewWorker;
      });
  });

  it('should handle pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Next');

    cy.get('.-pagination')
      .should('contain', 'Previous');

    cy.get('.-center')
      .should('contain', 'Page');

    cy.get('.-pageInfo')
      .should('exist');
  });

  it('should handle rows count selection', () => {
    cy.get('select').select('5 rows');

    cy.get('select').select('10 rows');

    cy.get('select').select('20 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

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

    cy.get('.web-tables-wrapper')
      .should('contain', worker.firstName);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();

    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();

    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');

    cy.get('#delete-record-2').click();

    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-2');

    cy.get('#delete-record-3').click();

    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-3');
  });

  it('should find and edit a worker', () => {
    cy.findByPlaceholder('Type to search')
      .type('cier' + '{enter}');

    cy.get('#edit-record-1').click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.findByPlaceholder('Last Name').clear();

    cy.findByPlaceholder('Last Name')
      .type(worker.lastName);

    cy.findByPlaceholder('name@example.com')
      .clear();

    cy.findByPlaceholder('name@example.com')
      .type(worker.email);

    cy.findByPlaceholder('Age').clear();

    cy.findByPlaceholder('Age')
      .type(worker.age);

    cy.findByPlaceholder('Salary').clear();

    cy.findByPlaceholder('Salary')
      .type(worker.salary);

    cy.get('#submit').click();
  });

  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

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

    cy.get('.web-tables-wrapper')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary);
  });

  it('should check search by all column values', () => {
    cy.findByPlaceholder('Type to search')
      .type('ci' + '{enter}');

    cy.get('.web-tables-wrapper')
      .should('contain', 'Cierra');

    cy.findByPlaceholder('Type to search')
      .clear();

    cy.findByPlaceholder('Type to search')
      .type('ki' + '{enter}');

    cy.get('.web-tables-wrapper')
      .should('contain', 'Kierra');

    cy.findByPlaceholder('Type to search')
      .clear();

    cy.findByPlaceholder('Type to search')
      .type('4' + '{enter}');

    cy.get('.web-tables-wrapper')
      .should('contain', '45');

    cy.findByPlaceholder('Type to search')
      .clear();

    cy.findByPlaceholder('Type to search')
      .type('ald' + '{enter}');

    cy.get('.web-tables-wrapper')
      .should('contain', 'alden@example.com');

    cy.findByPlaceholder('Type to search')
      .clear();

    cy.findByPlaceholder('Type to search')
      .type('12' + '{enter}');

    cy.get('.web-tables-wrapper')
      .should('contain', '12000');

    cy.findByPlaceholder('Type to search')
      .clear();

    cy.findByPlaceholder('Type to search')
      .type('comp' + '{enter}');

    cy.get('.web-tables-wrapper')
      .should('contain', 'Compliance');
  });
});
