/// <reference types='cypress' />
const { addNewWorker, getWorkers } =
require('../support/generateWorker');

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
    cy.visit('/');
  });

  it('should check pagination', () => {
    const workers = getWorkers(5);
    addNewWorker(workers.length - 1);
    cy.get('.-pageInfo').should('exist');
    cy.get('[aria-label="jump to page"]').type('1');
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.contains('.-btn', 'Next').click();
    cy.contains('.-btn', 'Previous').click();
  });

  it('should check rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('20 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '20 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#registration-form-modal').should('contain', 'Registration Form');
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', worker.firstName);
    cy.get('.rt-td').should('contain', worker.lastName);
  });

  it('should be able to belete a worker', () => {
    cy.createWorker(worker);
    cy.get('#delete-record-4').click();
    cy.get('.ReactTable').should('not.contain', worker.firstName);
  });

  it('should be able delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.ReactTable').should('contain', 'No rows found');
  });

  it('find worker in the search field, edit it and alert data', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('.ReactTable').should('contain', 'Kierra');
    cy.get('#edit-record-3').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type('Anna');
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(22);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(190000);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'Anna');
    cy.get('.rt-td').should('contain', '22');
    cy.get('.rt-td').should('contain', '190000');
  });

  it('should be able to the search by all column values', () => {
    cy.createWorker(worker);
    cy.log(worker.firstName);

    cy.get('#searchBox').type(worker.firstName);
    cy.get('.ReactTable').should('contain', worker.firstName);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.lastName);
    cy.get('.ReactTable').should('contain', worker.lastName);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.age);
    cy.get('.ReactTable').should('contain', worker.age);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.email);
    cy.get('.ReactTable').should('contain', worker.email);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.salary);
    cy.get('.ReactTable').should('contain', worker.salary);
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.department);
    cy.get('.ReactTable').should('contain', worker.department);
    cy.get('#searchBox').clear();
  });
});
