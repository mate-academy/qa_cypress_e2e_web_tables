/// <reference types='cypress' />
const { generateWorker } = require('../support/generateWorker');

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
      cy.visit('/');
    });
  });

  it('should check pagination', () => {
    cy.get('.-pageInfo').should('exist');
    cy.get('[aria-label="jump to page"]').type('1');
  });

  it('should check rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('20 rows');
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
    cy.createWorker(generateWorker());
    cy.get('#delete-record-4').click();
    cy.contains('.rt-td', generateWorker).should('not.exist');
  });

  it('should be able delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.ReactTable').should('contain', 'No rows found');
  });

  it('find a worker in the search field and edit it', () => {
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
  });

  it('Validate data in the worker row after editing the worker.', () => {
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
    cy.get('#searchBox').type('Kierra');
    cy.get('.ReactTable').should('contain', 'Kierra');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Gentry');
    cy.get('.ReactTable').should('contain', 'Gentry');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('29');
    cy.get('.ReactTable').should('contain', '29');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('kierra@example.com');
    cy.get('.ReactTable').should('contain', 'kierra@example.com');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('2000');
    cy.get('.ReactTable').should('contain', '2000');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type('Legal');
    cy.get('.ReactTable').should('contain', 'Legal');
    cy.get('#searchBox').clear();
  });
});
