/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  const workerName = 'Vega';
  const workerDepartment = 'Sales';

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.visit('/webtables');
    });
  });

  it('should check a pagination', () => {
    for (let i = 0; i < 11; i++) {
      cy.task('generateUser').then((user) => {
        cy.addNewWorker(user);
      });
    }
    cy.contains('.-btn', 'Next').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '2');
    cy.contains('.-btn', 'Previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1');
  });

  it('should check a rows count selection', () => {
    cy.get('[aria-label="rows per page"]').select('25');
    cy.get('.rt-tbody .rt-tr').should('have.length', 25);
  });

  it('should add a new worker', () => {
    cy.addNewWorker(user);
    cy.get('.rt-table').should('contain', user.lastName);
  });

  it('should delete a worker', () => {
    cy.addNewWorker(user);
    cy.deleteWorker();
    cy.get('.rt-table').should('not.contain', user.lastName);
  });

  it('should delete all workers', () => {
    cy.deleteAllWorkers();
    cy.get('.rt-noData').should('contain', 'No rows found');
  });
  it('should find a worker in the search field and edit it', () => {
    cy.get('#searchBox').type(workerName);
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(user.email);
    cy.get('#age').clear();
    cy.get('#age').type(user.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(user.salary);
    cy.get('#department').clear();
    cy.get('#department').type(workerDepartment);
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.get('.rt-table').should('contain', user.lastName);
  });

  it('should validate data in the worker row after editing the worker', () => {
    cy.get('#searchBox').type(workerName);
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(user.email);
    cy.get('#age').clear();
    cy.get('#age').type(user.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(user.salary);
    cy.get('#department').clear();
    cy.get('#department').type(workerDepartment);
    cy.get('#submit').click();
    cy.get('#searchBox').clear();
    cy.get('.rt-tr-group').should('contain', user.firstName);
    cy.get('.rt-tr-group').should('contain', user.lastName);
    cy.get('.rt-tr-group').should('contain', user.age);
    cy.get('.rt-tr-group').should('contain', user.email);
    cy.get('.rt-tr-group').should('contain', user.salary);
    cy.get('.rt-tr-group').should('contain', workerDepartment);
  });

  it('should check the search by all column values', () => {
    cy.addNewWorker(user);
    cy.get('#searchBox').type(user.firstName);
    cy.get('#searchBox').clear();
    cy.get('.rt-tr').should('contain', user.firstName);
    cy.get('#searchBox').type(user.lastName);
    cy.get('#searchBox').clear();
    cy.get('.rt-tr').should('contain', user.lastName);
    cy.get('#searchBox').type(user.age);
    cy.get('#searchBox').clear();
    cy.get('.rt-tr').should('contain', user.age);
    cy.get('#searchBox').type(user.email);
    cy.get('#searchBox').clear();
    cy.get('.rt-tr').should('contain', user.email);
    cy.get('#searchBox').type(user.salary);
    cy.get('#searchBox').clear();
    cy.get('.rt-tr').should('contain', user.salary);
    cy.get('#searchBox').type(workerDepartment);
    cy.get('.rt-tr').should('contain', workerDepartment);
  });
});
