/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.task('addNewWorker').then((addNewWorker) => {
      worker = addNewWorker;
    });
    cy.visit('/');
  });

  it('should contain pagination', () => {
    cy.get('.-pagination').should('contain', 'Next');
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-center').should('contain', 'Page');
    cy.get('.-pageInfo').should('exist');
  });

  it('should allow to count the rows', () => {
    cy.get('select').select('5 rows');
    cy.get('select').select('10 rows');
    cy.get('select').select('20 rows');
  });

  it('should allow to add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.web-tables-wrapper').should('contain', worker.firstName);
  });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search').type('cier' + '{enter}');
    cy.get('#edit-record-1').click();
    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');

    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(worker.lastName);

    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(worker.email);

    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(worker.age);

    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.get('.web-tables-wrapper').should('contain', worker.lastName);
    cy.get('.web-tables-wrapper').should('contain', worker.email);
    cy.get('.web-tables-wrapper').should('contain', worker.age);
    cy.get('.web-tables-wrapper').should('contain', worker.salary);
  });

  // eslint-disable-next-line max-len
  it('should allow to validate data in worker row after creating worker.', () => {
    cy.get('#addNewRecordButton').click();
    cy.contains('#registration-form-modal', 'Registration Form')
      .should('be.visible');
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.web-tables-wrapper')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary);
  });

  // eslint-disable-next-line max-len
  it('should allow to check search by all column values.', () => {
    cy.findByPlaceholder('Type to search').type('kie' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'Kierra');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('gent' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'Gentry');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('2' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', '29');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('kier' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'kierra@example.com');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('20' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', '2000');

    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type('le' + '{enter}');
    cy.get('.web-tables-wrapper').should('contain', 'Legal');
  });
});
