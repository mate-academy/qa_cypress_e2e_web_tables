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
    cy.get('.-btn').should('contain.text', 'Previous');
    cy.get('.-btn').should('contain.text', 'Next');
    cy.get('.-pageInfo').should('contain.text', 'Page');
  });
  it('shoud have the rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows')
      .select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '10 rows')
      .select('10 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '20 rows')
      .select('20 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '25 rows')
      .select('25 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '50 rows')
      .select('50 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '100 rows')
      .select('100 rows');
  });
  it('should create new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#modal-header').should('contain', 'Registration Form');
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
  });
  it('should provide the ability to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-td').should('not.contain', '#delete-record-1');
  });
  it('should provide the ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });
  it('ability to find worker in search field and edit it', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('#basic-addon2').click();
    cy.get('#edit-record-2').click();
    cy.get('#lastName').type('Dovbush');
    cy.get('#submit').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').clear();
    cy.get('#age').type(worker.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(worker.salary);
    cy.get('#department').clear();
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
  });
  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#modal-header').should('contain', 'Registration Form');
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
    cy.get('.rt-td').should('contain', worker.email);
    cy.get('.rt-td').should('contain', worker.salary);
    cy.get('.rt-td').should('contain', worker.department);
  });
  it('should check search by all column values.', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('.rt-td').should('contain', 'Alden');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Dovbush');
    cy.get('.rt-td').should('contain', 'Dovbush');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('45');
    cy.get('.rt-td').should('contain', '45');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-td').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('12000');
    cy.get('.rt-td').should('contain', '12000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Compliance');
    cy.get('.rt-td').should('contain', 'Compliance');
  });
});
