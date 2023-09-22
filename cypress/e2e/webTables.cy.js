/// <reference types='cypress' />

describe('Web Tables page', () => {
  const worker = {
    firstName: 'Alex',
    lastName: 'User',
    email: 'alexuser@gmail.com',
    age: 24,
    salary: 24000,
    department: 'PR'
  };

  const changedWorker = {
    firstName: 'Sasha',
    lastName: 'User',
    email: 'sashauser@gmail.com',
    age: 23,
    salary: 12000,
    department: 'QA'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-pagination').and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('should have rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
  });

  it('should add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();

    cy.get('.rt-tbody').should('contain', worker.firstName);
    cy.get('.rt-tbody').and('contain', worker.lastName);
    cy.get('.rt-tbody').and('contain', worker.email);
    cy.get('.rt-tbody').and('contain', worker.age);
    cy.get('.rt-tbody').and('contain', worker.salary);
    cy.get('.rt-tbody').and('contain', worker.department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');

    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');

    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });

  it('should be able to find worker in search field and edit it', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#lastName').clear();
    cy.get('#lastName').type(changedWorker.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(changedWorker.email);
    cy.get('#age').clear();
    cy.get('#age').type(changedWorker.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(changedWorker.salary);
    cy.get('#department').clear();
    cy.get('#department').type(changedWorker.department);
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', changedWorker.lastName);
    cy.get('.rt-tr-group').and('contain', changedWorker.email);
    cy.get('.rt-tr-group').and('contain', changedWorker.age);
    cy.get('.rt-tr-group').and('contain', changedWorker.salary);
    cy.get('.rt-tr-group').and('contain', changedWorker.department);
  });

  it('should search by all column values', () => {
    cy.createWorker(worker);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(worker.firstName);
    cy.get('#searchBox').type(worker.lastName);
    cy.get('#searchBox').type(worker.email);
    cy.get('#searchBox').type(worker.age);
    cy.get('#searchBox').type(worker.salary);
    cy.get('#searchBox').type(worker.department);
    cy.get('.rt-tbody').should('contain', worker.firstName);
    cy.get('.rt-tbody').should('contain', worker.lastName);
    cy.get('.rt-tbody').should('contain', worker.email);
    cy.get('.rt-tbody').should('contain', worker.age);
    cy.get('.rt-tbody').should('contain', worker.salary);
    cy.get('.rt-tbody').should('contain', worker.department);
  });
});
