/// <reference types='cypress' />

describe('Web Tables page', () => {
  const worker = {
    firstName: 'Bob',
    lastName: 'Winge',
    email: 'bobw2023@gmail.com',
    age: 28,
    salary: 5370,
    department: 'Finance',
    };
  beforeEach(() => {
    cy.visit('/');
  });
  
it('should have the pagination', () => {
    cy.get('.-pagination').should('exist');

    cy.contains('button', 'Previous').should('exist');
  
    cy.contains('button', 'Next').should('exist');
  });

  it('shoud have the rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows')
    .select('5 rows');

    cy.get('[aria-label="rows per page"]').should('contain', '10 rows')
    .select('10 rows');
  });

  it('should create new worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(worker.firstName);

    cy.get('#lastName').type(worker.lastName);

    cy.get('#userEmail').type(worker.email);

    cy.get('#age').type(worker.age);

    cy.get('#salary').type(worker.salary);

    cy.get('#department').type(worker.department);

    cy.get('#submit').click();
  });

  it('should find and edit the worker', () => {
    cy.get('[placeholder="Type to search"]').type('Vega');

    cy.get('[id="edit-record-1"]').click();

    cy.get('[placeholder="First Name"]').type('sh');

    cy.get('[id="submit"]').click();

    cy.get('.rt-td').should('contain', 'Cierrash');
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();

    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });
  it('should provide the ability to delete all workers', () => {
    cy.get('#delete-record-1').click();

    cy.get('#delete-record-1').should('not.exist');

    cy.get('#delete-record-2').click();

    cy.get('#delete-record-2').should('not.exist');

    cy.get('#delete-record-3').click();

    cy.get('#delete-record-3').should('not.exist');
  });
  it(' should search by all column values', () => {
    cy.get('[placeholder="Type to search"]').type('Cierra');

    cy.get('.rt-tbody').should('contain', 'Cierra');

    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('Vega');

    cy.get('.rt-tbody').should('contain', 'Vega');

    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('39');

    cy.get('.rt-tbody').should('contain', '39');

    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('cierra@example.com');

    cy.get('.rt-tbody').should('contain', 'cierra@example.com');

    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('10000');

    cy.get('.rt-tbody').should('contain', '10000');

    cy.get('[placeholder="Type to search"]').clear();

    cy.get('[placeholder="Type to search"]').type('Insurance');

    cy.get('.rt-tbody').should('contain', 'Insurance');
  });
});
