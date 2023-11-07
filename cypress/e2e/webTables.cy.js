/// <reference types='cypress' />

let newWorker;

beforeEach(() => {
  cy.task('generateWorker').then((generateWorker) => {
    newWorker = generateWorker;
  });
  cy.visit('/');
});

it('should check pagination', () => {
  cy.get('.-pagination').should('contain', 'Previous');
  cy.get('.-pagination').should('contain', 'Next');
});

it('should  check quantity of rows', () => {
  cy.get('select').select('5 rows');
  cy.get('select').should('contain', '5 rows');
  cy.get('select').select('10 rows');
  cy.get('select').should('contain', '10 rows');
  cy.get('select').select('20 rows');
  cy.get('select').should('contain', '20 rows');
});

it('should check adding of the new worker and validating data', () => {
  cy.get('#addNewRecordButton').click();
  cy.findByPlaceholder('First Name').type(newWorker.firstName);
  cy.findByPlaceholder('Last Name').type(newWorker.lastName);
  cy.findByPlaceholder('name@example.com').type(newWorker.email);
  cy.findByPlaceholder('Age').type(newWorker.age);
  cy.findByPlaceholder('Salary').type(newWorker.salary);
  cy.findByPlaceholder('Department').type('IT');
  cy.contains('#submit', 'Submit').click();
  cy.get('.rt-tbody').should('contain', newWorker.firstName);
  cy.get('.rt-tbody').should('contain', newWorker.lastName);
  cy.get('.rt-tbody').should('contain', newWorker.email);
  cy.get('.rt-tbody').should('contain', 'IT');
});

it('should check deleting of the worker', () => {
  cy.get('#delete-record-1').click();
  cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
});

it('should check deleting of all workers', () => {
  cy.get('#delete-record-1').click();
  cy.get('#delete-record-2').click();
  cy.get('#delete-record-3').click();
  cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
  cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
});

it('should check editing of the worker', () => {
  cy.findByPlaceholder('Type to search').type('Alden');
  cy.get('#edit-record-2').click();
  cy.get('#firstName').clear();
  cy.get('#firstName').type('newName');
  cy.get('#lastName').clear();
  cy.get('#lastName').type('newLastName');
  cy.get('#userEmail').clear();
  cy.get('#userEmail').type('newEmail');
  cy.get('#age').clear();
  cy.get('#age').type('25');
  cy.get('#salary').clear();
  cy.get('#salary').type('1000');
  cy.get('#department').clear();
  cy.get('#department').type('newDepartment');
  cy.contains('#submit', 'Submit').click();
  cy.get('.rt-tbody').should('contain', 'newName');
  cy.get('.rt-tbody').should('contain', 'newLastName');
  cy.get('.rt-tbody').should('contain', 'newEmail');
  cy.get('.rt-tbody').should('contain', '25');
  cy.get('.rt-tbody').should('contain', '1000');
  cy.get('.rt-tbody').should('contain', 'newDepartment');
});

it('should check searching by all column values', () => {
  cy.get('#searchBox').type('Kierra');
  cy.get('.rt-tbody').should('contain', 'Kierra');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('Vega');
  cy.get('.rt-tbody').should('contain', 'Vega');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(39);
  cy.get('.rt-tbody').should('contain', 39);
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('cierra@example.com');
  cy.get('.rt-tbody').should('contain', 'cierra@example.com');
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type(1000);
  cy.get('.rt-tbody').should('contain', 1000);
  cy.get('#searchBox').clear();
  cy.get('#searchBox').type('Insurance');
  cy.get('.rt-tbody').should('contain', 'Insurance');
  cy.get('#searchBox').clear();
});
