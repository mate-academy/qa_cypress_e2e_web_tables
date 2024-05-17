/// <reference types='cypress' />

describe('Web Tables page', () => {
 
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should provide an ability to use pagination', () => {
    cy.get('.-pageInfo')
      .should('exist');
    cy.get('.-pageJump')
      .should('exist');
    cy.get('.-totalPages')
      .should('exist');
    cy.get('.-previous')
      .should('exist');
    cy.get('.-next')
      .should('exist');
  });

  it('should provide an ability to use rows count selection', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist');
    cy.get('[aria-label="rows per page"]')
      .select('5');
    cy.get('[aria-label="rows per page"]')
      .should('have.value', '5');
  });

  it('should provide an ability to add a new worker', () => {
    cy.task('generateUser').then((generateUser) => {
      const worker = generateUser;
      cy.get('#addNewRecordButton')
        .click();
      cy.get('#firstName')
        .type(worker.firstName);
      cy.get('#lastName')
        .type(worker.lastName);
      cy.get('#userEmail')
        .type(worker.email);
      cy.get('#age')
        .type(worker.age);
      cy.get('#salary')
        .type(worker.salary);
      cy.get('#department')
        .type(worker.department);
      cy.get('#submit')
        .click();
      cy.get('.rt-tr-group')
        .should('contain', worker.firstName)
        .should('contain', worker.lastName)
        .should('contain', worker.age)
        .should('contain', worker.email)
        .should('contain', worker.salary)
        .should('contain', worker.department);
    });
  });

  it('should provide an ability to delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .should('exist');
    cy.get('#delete-record-3')
      .should('exist');
  });

  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .should('not.exist');
    cy.get('#delete-record-3')
      .should('not.exist');
  });

  it('ability to find a worker in the search field, edit it and validate result'
    , () => {
      cy.get('#searchBox')
        .click();
      cy.get('#searchBox')
        .type('Alden');
      cy.get('#edit-record-2')
        .click();
      cy.task('generateUser').then((generateUser) => {
        const worker = generateUser;
        cy.get('#department')
          .clear();
        cy.get('#department')
          .type(worker.department);
        cy.get('#submit')
          .click();
        cy.get('.rt-tr-group')
          .should('contain', worker.department);
      });
    });

  it('should provide an ability to check the search by all column values'
    , () => {
      cy.get('#searchBox')
        .click();
      cy.get('#searchBox')
        .type('Cierra');
      cy.get('.rt-tr-group')
        .should('contain', 'Cierra');
      cy.get('#searchBox')
        .clear();
      cy.get('#searchBox')
        .type('Vega');
      cy.get('.rt-tr-group')
        .should('contain', 'Vega');
      cy.get('#searchBox')
        .clear();
      cy.get('#searchBox')
        .type('39');
      cy.get('.rt-tr-group')
        .should('contain', '39');
      cy.get('#searchBox')
        .clear();
      cy.get('#searchBox')
        .type('cierra@example.com');
      cy.get('.rt-tr-group')
        .should('contain', 'cierra@example.com');
      cy.get('#searchBox')
        .clear();
      cy.get('#searchBox')
        .type('10000');
      cy.get('.rt-tr-group')
        .should('contain', '10000');
      cy.get('#searchBox')
        .clear();
      cy.get('#searchBox')
        .type('Insurance');
      cy.get('.rt-tr-group')
        .should('contain', 'Insurance');
    });
});
