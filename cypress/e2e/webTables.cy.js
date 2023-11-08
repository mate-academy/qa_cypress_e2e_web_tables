/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;
  beforeEach(() => {
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
    cy.visit('https://demoqa.com/webtables');
  });

  it('Should allow navigation through pages using pagination', () => {
    cy.contains('.-btn', 'Previous')
      .should('be.visible');
    cy.contains('.-btn', 'Next')
      .should('be.visible');
    cy.get('.-pageJump')
      .should('be.visible');
    cy.get('.-totalPages')
      .should('be.visible');
    cy.get('.select-wrap.-pageSizeOptions')
      .should('be.visible');
  });

  it('Should allow to choose the number of rows on a page', () => {
    cy.get('[aria-label="rows per page"]')
      .select('10 rows');
    cy.get('.select-wrap.-pageSizeOptions')
      .should('contain', '10');
    cy.get('.rt-tr-group')
      .should('have.length', 10);
  });

  it('Should allow adding a new worker', () => {
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
    cy.get('.rt-table')
      .should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should allow deleting a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
    cy.get('#delete-record-2')
      .should('exist');
    cy.get('#delete-record-3')
      .should('exist');
  });

  it('should allow deleting all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-2');
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-3');
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });

  it('Should allow finding a worker using search', () => {
    cy.get('#searchBox')
      .type('Ci');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Cierra');
  });

  it('Should allow finding a worker and editing their information', () => {
    cy.get('#searchBox')
      .type('Ci');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#registration-form-modal')
      .should('be.visible');
    cy.get('#firstName')
      .type('{selectAll}' + worker.firstName);
    cy.get('#lastName')
      .type('{selectAll}' + worker.lastName);
    cy.get('#userEmail')
      .type('{selectAll}' + worker.email);
    cy.get('#age')
      .type('{selectAll}' + worker.age);
    cy.get('#salary')
      .type('{selectAll}' + worker.salary);
    cy.get('#department')
      .type('{selectAll}' + worker.department);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear();
    cy.contains('.rt-tr-group', worker.firstName)
      .should('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.email)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should allow searching by workers first name', () => {
    cy.get('#searchBox')
      .type('Alden');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Cantrell');
  });

  it('should allow searching by workers last name', () => {
    cy.get('#searchBox')
      .type('Cantrell');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Alden');
  });

  it('should allow searching by workers age', () => {
    cy.get('#searchBox')
      .type('45');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Alden');
  });

  it('should allow searching by workers email', () => {
    cy.get('#searchBox')
      .type('alden@example.com');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Alden');
  });

  it('should allow searching by workers salary', () => {
    cy.get('#searchBox')
      .type('12000');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Alden');
  });

  it('should allow searching by workers department', () => {
    cy.get('#searchBox')
      .type('Compliance');
    cy.get('.rt-tr.-odd')
      .should('contain', 'Alden');
  });
});
