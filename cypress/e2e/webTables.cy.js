/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should provide an ability to use pagination', () => {
    cy.get('.-pageInfo').should('exist');
    cy.get('.-pageJump').should('exist');
    cy.get('.-totalPages').should('exist');
    cy.get('.-previous').should('exist');
    cy.get('.-next').should('exist');
  });

  it('should provide an ability to use rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('5');
    cy.get('[aria-label="rows per page"]').should('have.value', '5');
  });

  it('should provide an ability to add a new worker', () => {
    cy.task('generateUser').then((generateUser) => {
      const newWorker = generateUser;
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(newWorker.firstName);
      cy.get('#lastName').type(newWorker.lastName);
      cy.get('#userEmail').type(newWorker.email);
      cy.get('#age').type(newWorker.age);
      cy.get('#salary').type(newWorker.salary);
      cy.get('#department').type(newWorker.department);
      cy.get('#submit').click();
      cy.get('.rt-tbody')
        .should('contain', newWorker.firstName);
      cy.get('.rt-tbody')
        .should('contain', newWorker.lastName);
    });
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1').should('exist');
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('should provide an ability to delete all workers', () => {
    const numberOfWorkers = 3;
    for (let workerId = 1; workerId <= numberOfWorkers; workerId++) {
      cy.get(`#delete-record-${workerId}`).should('exist').click();
      cy.get(`#delete-record-${workerId}`).should('not.exist');
    }
  });

  it('ability to find a worker in the search field, edit it and validate result'
    , () => {
      cy.get('#searchBox').type('Cierra');
      cy.get('#edit-record-1').click();
      cy.task('generateUser').then((generateUser) => {
        const newWorker = generateUser;
        cy.get('#lastName').clear();
        cy.get('#lastName')
          .type(newWorker.lastName);
        cy.get('#submit').click();
        cy.get('.rt-tbody')
          .should('contain', newWorker.lastName);
      });
    });

  it('should provide an ability to check the search by all column values'
    , () => {
      cy.get('#searchBox').type('Cierra');
      cy.get('.rt-tbody').should('contain', 'Cierra');
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type('Vega');
      cy.get('.rt-tbody').should('contain', 'Vega');
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type('39');
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
