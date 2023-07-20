/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('newWorker')
      .then((newWorker) => {
        worker = newWorker;
      });
  });

  it('should have the pagination', () => {
    cy.get('.-pagination').should('exist');

    cy.get('.-pagination').should('contain.text', 'Page');

    cy.get('.-pagination').should('contain.text', 'Previous');

    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have row count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('contain', '5 rows').select('5 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '10 rows').select('10 rows');
    cy.get('[aria-label="rows per page"]')
      .should('contain', '20 rows').select('20 rows');
  });

  it('should allow to add worker', () => {
    cy.findById('addNewRecordButton', 'Add').click();
    // eslint-disable-next-line max-len
    cy.findById('registration-form-modal', 'Registration Form').should('be.visible');

    cy.findByPlaceholder('First Name').type(worker.firstName);

    cy.findByPlaceholder('Last Name').type(worker.lastName);

    cy.findById('userEmail').type(worker.email);

    cy.findByPlaceholder('Age').type(worker.age);

    cy.findByPlaceholder('Salary').type(worker.salary);

    cy.findByPlaceholder('Department').type(worker.department);

    cy.findById('submit').click();
  });

  it('should allow to delete worker', () => {
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

  it('should allow to find and edit worker', () => {
    cy.findById('searchBox').type('Kierra');

    cy.findById('edit-record-3').click();

    // eslint-disable-next-line max-len
    cy.findById('registration-form-modal', 'Registration Form').should('be.visible');

    cy.findByPlaceholder('Last Name').clear();

    cy.findByPlaceholder('Last Name').type(worker.lastName);

    cy.findById('userEmail').clear();

    cy.findById('userEmail').type(worker.email);

    cy.findByPlaceholder('Age').clear();

    cy.findByPlaceholder('Age').type(worker.age);

    cy.findByPlaceholder('Salary').clear();

    cy.findByPlaceholder('Salary').type(worker.salary);

    cy.findByPlaceholder('Department').clear();

    cy.findByPlaceholder('Department').type(worker.department);

    cy.findById('submit').click();
  });

  it('should allow to validate data after creating worker', () => {
    cy.findById('addNewRecordButton', 'Add').click();
    // eslint-disable-next-line max-len
    cy.findById('registration-form-modal', 'Registration Form').should('be.visible');

    cy.findByPlaceholder('First Name').type(worker.firstName);

    cy.findByPlaceholder('Last Name').type(worker.lastName);

    cy.findById('userEmail').type(worker.email);

    cy.findByPlaceholder('Age').type(worker.age);

    cy.findByPlaceholder('Salary').type(worker.salary);

    cy.findByPlaceholder('Department').type(worker.department);

    cy.findById('submit').click();

    cy.get('.rt-td').should('contain', worker.firstName);

    cy.get('.rt-td').should('contain', worker.lastName);

    cy.get('.rt-td').should('contain', worker.email);

    cy.get('.rt-td').should('contain', worker.age);

    cy.get('.rt-td').should('contain', worker.salary);

    cy.get('.rt-td').should('contain', worker.department);
  });

  it('should allow check search by all column values.', () => {
    cy.findById('searchBox').type('Ald' + '{enter}');

    cy.get('.rt-td').should('contain', 'Alden');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('cant' + '{enter}');

    cy.get('.rt-td').should('contain', 'Cantrell');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('4' + '{enter}');

    cy.get('.rt-td').should('contain', '45');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('alden@' + '{enter}');

    cy.get('.rt-td').should('contain', 'alden@example.com');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('120' + '{enter}');

    cy.get('.rt-td').should('contain', '12000');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('comp' + '{enter}');

    cy.get('.rt-td').should('contain', 'Compliance');
  });
});
