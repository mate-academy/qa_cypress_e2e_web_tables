/// <reference types='cypress' />

describe('Web Tables page', () => {
  let worker;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateWorker').then((generateWorker) => {
      worker = generateWorker;
    });
    

  });
    it('should check visability of pagination', () => {
    cy.contains('button', 'Previous').should('be.visible');
    cy.contains('button', 'Next').should('be.visible');
    cy.get('.-pageInfo').should('contain', 'Page');
    cy.get('.-pageInfo').should('contain', 'of 1');

  });

  it('should allow to select rows count', () => {
    cy.get('select').select('5 rows');
    cy.get('select').select('20 rows');

  });

  it('should allow to add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', worker.firstName);
    cy.get('.rt-tbody').should('contain', worker.lastName);
 
  });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', 'Cierra')

  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.col-md-6').should('contain', 'No rows found')

  });

  it('should allow find worker in search field and edit it', () => {
   cy.findByPlaceholder('Type to search').type('Cierra');
   cy.get('#basic-addon2').click();
   cy.get('#edit-record-1').click();
   cy.get('#firstName').clear();
   cy.get('#firstName').type('Dmytro');
   cy.get('#submit').click();
   cy.get('.rt-tbody').should('contain','Dmytro')

  });

  it('should validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', worker.firstName);
    cy.get('.rt-tbody').should('contain', worker.lastName);
    cy.get('.rt-tbody').should('contain', worker.email);
    cy.get('.rt-tbody').should('contain', worker.age);
    cy.get('.rt-tbody').should('contain', worker.salary);
 
   });

it('should allow to check search by all column values', () => {
  cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tbody').should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Vega');
    cy.get('.rt-tbody').should('contain', 'Vega');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(39);
    cy.get('.rt-tbody').should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.rt-tbody').should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.get('.rt-tbody').should('contain', '10000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-tbody').should('contain', 'Insurance');

 });
});