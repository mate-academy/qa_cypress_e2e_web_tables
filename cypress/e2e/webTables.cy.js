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
    cy.get('.-pagination')
      .should('exist');
    cy.get('.-pagination')
      .should('contain', 'Previous');
    cy.get('.-center')
      .should('exist');
    cy.get('.-pagination')
      .should('contain', 'Next');
  });

  it('should contain rows count selection', () => {
    cy.get('.-pageSizeOptions')
      .should('exist');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(worker.firstName);
    cy.get('#lastName')
      .type(worker.lastName);
    cy.get('#userEmail')
      .type(worker.userEmail);
    cy.get('#age')
      .type(worker.age);
    cy.get('#salary')
      .type(worker.salary);
    cy.get('#department')
      .type(worker.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.firstName);
    cy.get('.rt-table')
      .should('contain', worker.lastName);
    cy.get('.rt-table')
      .should('contain', worker.userEmail);
    cy.get('.rt-table')
      .should('contain', worker.age);
    cy.get('.rt-table')
      .should('contain', worker.salary);
    cy.get('.rt-table')
      .should('contain', worker.department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-table')
      .should('not.contain', '#delete-record-1');
  });
  it('should delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-table')
      .should('not.contain', '#delete-record-1');
    cy.get('#delete-record-2')
      .click();
    cy.get('.rt-table')
      .should('not.contain', '#delete-record-2');
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-table')
      .should('not.contain', '#delete-record-3');
  });

  it('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('[title="Edit"]')
      .click();
    cy.get('.modal-content')
      .should('contain', 'Registration Form');
    cy.get('#lastName')
      .type('{selectAll}' + worker.lastName);
    cy.get('#userEmail')
      .type('{selectAll}' + worker.userEmail);
    cy.get('#age')
      .type('{selectAll}' + worker.age);
    cy.get('#salary')
      .type('{selectAll}' + worker.salary);
    cy.get('#department')
      .type('{selectAll}' + worker.department);
    cy.get('#submit')
      .click();
  });

  it('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('[title="Edit"]')
      .click();
    cy.get('.modal-content')
      .should('contain', 'Registration Form');
    cy.get('#lastName')
      .type('{selectAll}' + worker.lastName);
    cy.get('#userEmail')
      .type('{selectAll}' + worker.userEmail);
    cy.get('#age')
      .type('{selectAll}' + worker.age);
    cy.get('#salary')
      .type('{selectAll}' + worker.salary);
    cy.get('#department')
      .type('{selectAll}' + worker.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-table')
      .should('contain', worker.lastName);
    cy.get('.rt-table')
      .should('contain', worker.userEmail);
    cy.get('.rt-table')
      .should('contain', worker.age);
    cy.get('.rt-table')
      .should('contain', worker.salary);
    cy.get('.rt-table')
      .should('contain', worker.department);
  });

  it('should serach by all column values', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(worker.firstName);
    cy.get('#lastName')
      .type(worker.lastName);
    cy.get('#userEmail')
      .type(worker.userEmail);
    cy.get('#age')
      .type(worker.age);
    cy.get('#salary')
      .type(worker.salary);
    cy.get('#department')
      .type(worker.department);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .type(worker.firstName);
    cy.get('.rt-table')
      .should('contain', worker.firstName);
    cy.get('#searchBox')
      .type('{selectAll}' + worker.lastName);
    cy.get('.rt-table')
      .should('contain', worker.lastName);
    cy.get('#searchBox')
      .type('{selectAll}' + worker.age);
    cy.get('.rt-table')
      .should('contain', worker.age);
    cy.get('#searchBox')
      .type('{selectAll}' + worker.userEmail);
    cy.get('.rt-table')
      .should('contain', worker.userEmail);
    cy.get('#searchBox')
      .type('{selectAll}' + worker.salary);
    cy.get('.rt-table')
      .should('contain', worker.salary);
    cy.get('#searchBox')
      .type('{selectAll}' + worker.department);
    cy.get('.rt-table')
      .should('contain', worker.department);
  });
});
