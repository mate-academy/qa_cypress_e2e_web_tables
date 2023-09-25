/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');

    cy.task('newWorker').then((newWorker) => {
      worker = newWorker;
    });
  });





  it('should have pagination', () => {
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have row count selection', () => {
    cy.get('[aria-label="rows per page"]').select('10')
    .should('contain', '10 rows');
  });

  it('should add worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findById('registration-form-modal')
    .should('contain.text', 'Registration Form');
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

  it('should delete worker', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
  });

  it('should delete all workers', () => {
    cy.deleteWorker(3);
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should find and edit worker', () => {
    cy.findById('searchBox').type('Alden');
    cy.findById('edit-record-2').click();
    cy.findById('registration-form-modal').should('contain.text', 'Registration Form');
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
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.age);
    cy.get('.rt-td').should('contain', worker.salary);
    cy.get('.rt-td').should('contain', worker.department);
  });

  it('should validate data after creating worker', () => {
    cy.findById('addNewRecordButton').click();
    cy.findById('registration-form-modal').should('contain.text', 'Registration Form');
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

  it('should check search by all column values.', () => {
    cy.findById('searchBox').type('Alden');
    cy.get('.web-tables-wrapper').should('contain', 'Alden');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Cantrell');
    cy.get('.web-tables-wrapper').should('contain', 'Cantrell');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('45');
    cy.get('.web-tables-wrapper').should('contain', '45');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('alden@example.com');
    cy.get('.web-tables-wrapper').should('contain', 'alden@example.com');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('12000');
    cy.get('.web-tables-wrapper').should('contain', '12000');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Compliance');
    cy.get('.web-tables-wrapper').should('contain', 'Compliance');
  });
});
