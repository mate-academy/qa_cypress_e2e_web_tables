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
    cy.get('.-pagination').should('exist');
    cy.get('.-previous').should('contain', 'Previous');
    cy.get('.-pageInfo').should('contain', 'Page');
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('.-next').should('contain', 'Next');
  });

  it('should allow to select rows count', () => {
    const randomIndex = Math.floor(Math.random() * 5);
    const rowsNumbers = ['5', '10', '20', '25', '50', '100'];
    const rowsNumber = rowsNumbers[randomIndex];

    cy.get('[aria-label="rows per page"]').select(rowsNumber);

    cy.get('.rt-tr-group').should('have.length', +rowsNumber);
  });

  it('should allow to add new worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.findById('firstName').type(worker.firstName);
    cy.findById('lastName').type(worker.lastName);
    cy.findById('userEmail').type(worker.email);
    cy.findById('age').type(worker.age);
    cy.findById('salary').type(worker.salary);
    cy.findById('department').type(worker.department);

    cy.contains('button', 'Submit').click();

    cy.get('.rt-table').should('contain', worker.firstName)
      .and('contain', worker.lastName)
      .and('contain', worker.email)
      .and('contain', worker.age)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should allow to delete worker', () => {
    cy.findById('delete-record-1').click();

    cy.findById('delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.findById('delete-record-1').click();
    cy.findById('delete-record-2').click();
    cy.findById('delete-record-3').click();

    cy.findById('delete-record-1').should('not.exist');
    cy.findById('delete-record-2').should('not.exist');
    cy.findById('delete-record-3').should('not.exist');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it('should allow to find worker in search field and edit it', () => {
    cy.findById('searchBox').type('Cierra');
    cy.findById('edit-record-1').click();

    cy.findById('userEmail').clear();
    cy.findById('userEmail').type(worker.email);
    cy.findById('salary').clear();
    cy.findById('salary').type(worker.salary);
    cy.findById('department').clear();
    cy.findById('department').type(worker.department);

    cy.findById('submit').click();
    cy.findById('searchBox').clear();

    cy.get('.rt-table').should('contain', worker.email)
      .and('contain', worker.salary)
      .and('contain', worker.department);
  });

  it('should allow to search worker by all column values', () => {
    cy.findById('searchBox').type('ald');
    cy.get('.rt-table').should('contain', 'Alden');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('cant');
    cy.get('.rt-table').should('contain', 'Cantrell');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('45');
    cy.get('.rt-table').should('contain', '45');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('alden@');
    cy.get('.rt-table').should('contain', 'alden@example.com');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('1200');
    cy.get('.rt-table').should('contain', '12000');
    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('comp');
    cy.get('.rt-table').should('contain', 'Compliance');
    cy.findById('searchBox').clear();
  });
});
