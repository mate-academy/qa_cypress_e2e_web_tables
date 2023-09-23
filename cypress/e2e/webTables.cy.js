/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;
  let editWorkerData;

  beforeEach(() => {
    cy.visit('/');
    cy.task('newWorker').then((newWorker) => {
      worker = newWorker;
    });
    cy.task('editWorker').then((editWorker) => {
      editWorkerData = editWorker;
    });
  });

  it('should have pagination', () => {
    cy.get('.-pagination').should('contain.text', 'Page');
    cy.get('.-pagination').should('contain.text', 'Previous');
    cy.get('.-pagination').should('contain.text', 'Next');
  });

  it('should have row  selection', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').select('10 rows');
    cy.get('[aria-label="rows per page"]').select('20 rows');
    cy.get('[aria-label="rows per page"]').select('100 rows');
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
    cy.get('.rt-td[style*="max-width: 40px;"]').should('contain.text', '19');
  });

  it('should delete worker', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
  });

  it('should delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-2').should('not.exist');
    cy.findById('delete-record-3').click();
    cy.findById('delete-record-3').should('not.exist');
  });

  it('should find, edit and validate data of edit worker', () => {
    const searchTexts = [
      editWorkerData.firstName,
      editWorkerData.lastName,
      editWorkerData.email,
      editWorkerData.age.toString(),
      editWorkerData.salary.toString(),
      editWorkerData.department
    ];
    cy.findById('searchBox').type('Kie');
    cy.findById('edit-record-3').click();
    cy.findById('registration-form-modal')
      .should('contain.text', 'Registration Form');
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(editWorkerData.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(editWorkerData.lastName);
    cy.findById('userEmail').clear();
    cy.findById('userEmail').type(editWorkerData.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(editWorkerData.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(editWorkerData.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(editWorkerData.department);
    cy.findById('submit').click();
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Do');
    cy.get('.col-md-6').each((col) => {
      searchTexts.forEach((searchText) => {
        cy.wrap(col).should('contain', searchText);
      });
    });
  });

  it('should check search by all column values.', () => {
    cy.findById('searchBox').type('Cierra');
    cy.get('.web-tables-wrapper').should('contain', 'Cierra');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Vega');
    cy.get('.web-tables-wrapper').should('contain', 'Vega');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('39');
    cy.get('.web-tables-wrapper').should('contain', '39');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('cierra@example.com');
    cy.get('.web-tables-wrapper').should('contain', 'cierra@example.com');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('10000');
    cy.get('.web-tables-wrapper').should('contain', '1000');
    cy.findById('searchBox').clear();
    cy.findById('searchBox').type('Insurance');
    cy.get('.web-tables-wrapper').should('contain', 'Insurance');
  });
});
