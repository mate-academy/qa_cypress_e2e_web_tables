/// <reference types='cypress' />

beforeEach(() => {
  cy.visit('');
});

describe('Web Tables page', () => {
  it('should allow to use pagination', () => {
    cy.get('.-pageInfo').should('exist');
    cy.get('.-pageJump').should('exist');
    cy.get('.-totalPages').should('exist');
    cy.get('.-previous').should('exist');
    cy.get('.-next').should('exist');
  });

  it('should allow to use rows selection', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('20');

    cy.get('[aria-label="rows per page"]').should('have.value', '20');
  });

  it('should allow to add a new worker', () => {
    cy.task('generateUser').then((generateUser) => {
      const worker = generateUser;
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(worker.firstName);
      cy.get('#lastName').type(worker.lastName);
      cy.get('#userEmail').type(worker.email);
      cy.get('#age').type(worker.age);
      cy.get('#salary').type(worker.salary);
      cy.get('#department').type(worker.department);
      cy.get('#submit').click();

      cy.get('.rt-tr-group')
        .should('contain', worker.firstName)
        .should('contain', worker.lastName)
        .should('contain', worker.age)
        .should('contain', worker.email)
        .should('contain', worker.salary)
        .should('contain', worker.department);
    });
  });

  it('should allow to delete a worker', () => {
    cy.get('#delete-record-1').click();

    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').should('exist');
    cy.get('#delete-record-3').should('exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should allow to find a worker in the search field and edit', () => {
    cy.get('#searchBox').click();
    cy.get('#searchBox').type('Alden');
    cy.get('#edit-record-2').click();
    cy.task('generateUser').then((generateUser) => {
      const worker = generateUser;
      cy.get('#firstName').clear();
      cy.get('#firstName').type(worker.firstName);
      cy.get('#submit').click();

      cy.get('.rt-tr-group').should('contain', worker.firstName);
    });
  });

  it('should allow to check the search by all column values'
    , () => {
      const firstName = 'Alden';
      const lastName = 'Cantrell';
      const age = '45';
      const email = 'alden@example.com';
      const salary = '12000';
      const department = 'Compliance';

      cy.get('#searchBox').click();
      cy.get('#searchBox').type(firstName);
      cy.get('.rt-tr-group').should('contain', firstName);
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(lastName);
      cy.get('.rt-tr-group').should('contain', lastName);
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(age);
      cy.get('.rt-tr-group').should('contain', age);
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(email);
      cy.get('.rt-tr-group').should('contain', email);
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(salary);
      cy.get('.rt-tr-group').should('contain', salary);
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(department);
      cy.get('.rt-tr-group').should('contain', department);
    });
});
