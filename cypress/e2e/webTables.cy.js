/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');
    cy.task('addWorker').then((addWorker) => {
      worker = addWorker;
    });
  });

  it('should contain pagination', () => {
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pageInfo').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should allow to count rows', () => {
    cy.get('select').select('5 rows');
    cy.get('select').select('10 rows');
    cy.get('select').select('20 rows');
    cy.get('select').select('50 rows');
  });

  it('should allow to add a new worker', () => {
    cy.findById('addNewRecordButton').click();

    // eslint-disable-next-line max-len
    cy.findById('registration-form-modal').should('contain.text', 'Registration Form');
    cy.findById('firstName-label').should('contain.text', 'First Name');

    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.findById('submit').click();

    cy.get('.web-tables-wrapper')
      .should('contain.text', worker.firstName)
      .and('contain.text', worker.lastName)
      .and('contain.text', worker.email)
      .and('contain.text', worker.age)
      .and('contain.text', worker.salary)
      .and('contain.text', worker.department);
  });

  it('should allow to delete a worker', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-2').should('not.exist');
    cy.findById('delete-record-3').click();
    cy.findById('delete-record-3').should('not.exist');
  });

  // eslint-disable-next-line max-len
  it('should allow to find the worker in search field and edit data', () => {
    cy.findById('searchBox').type('cierra' + '{enter}');
    cy.findById('edit-record-1').click();

    // eslint-disable-next-line max-len
    cy.findById('registration-form-modal').should('contain.text', 'Registration Form');
    cy.findById('firstName-label').should('contain.text', 'First Name');

    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);

    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(worker.email);

    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);

    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.findById('submit').click();

    cy.get('.web-tables-wrapper').should('contain.text', worker.lastName)
      .and('contain.text', worker.email)
      .and('contain.text', worker.age)
      .and('contain.text', worker.salary)
      .and('contain.text', worker.department);
  });

  it('should allow to search by all column values', () => {
    cy.findById('searchBox').type('cie' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain.text', 'Cierra');

    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('vega' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain.text', 'Vega');

    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('39' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain.text', '39');

    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('cierra@' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain.text', 'cierra@example.com');

    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('10' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain.text', '10000');

    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Ins' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain.text', 'Insurance');
  });
});
