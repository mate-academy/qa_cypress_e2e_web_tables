/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser')
      .then(generateUser =>{
        user = generateUser
      });
    });

    it('Check pagination', () => {

      cy.get('select[aria-label="rows per page"]')
    .select('5 rows');

    cy.get('#addNewRecordButton')
    .click();

    cy.get('#firstName')
    .type(user.firstName);

    cy.get('#lastName')
    .type(user.lastName);

    cy.get('#userEmail')
    .type(user.email);

    cy.get('#age')
    .type('21');

    cy.get('#salary')
    .type('2500');

    cy.get('#department')
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.get('#addNewRecordButton')
    .click();

    cy.get('#firstName')
    .type(user.firstName);

    cy.get('#lastName')
    .type(user.lastName);

    cy.get('#userEmail')
    .type(user.email);

    cy.get('#age')
    .type('21');

    cy.get('#salary')
    .type('2500');

    cy.get('#department')
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.get('#addNewRecordButton')
    .click();

    cy.get('#firstName')
    .type(user.firstName);

    cy.get('#lastName')
    .type(user.lastName);

    cy.get('#userEmail')
    .type(user.email);

    cy.get('#age')
    .type('21');

    cy.get('#salary')
    .type('2500');

    cy.get('#department')
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.get('.-next')
    .should('contain', 'Next')
    .click();

    cy.get('.-totalPages')
    .should('contain', '2');

    });

  it('Check the rows count', () => {
    
    cy.get('select[aria-label="rows per page"]')
    .select('20 rows');

  });

  it('Add new worker and validate data in worker row after creating worker.', () => {

    cy.get('#addNewRecordButton')
    .click();

    cy.get('#firstName')
    .type(user.firstName);

    cy.get('#lastName')
    .type(user.lastName);

    cy.get('#userEmail')
    .type(user.email);

    cy.get('#age')
    .type('21');

    cy.get('#salary')
    .type('2500');

    cy.get('#department')
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.contains('.web-tables-wrapper', 'First Name')
    .should('contain', user.firstName);

    cy.contains('.web-tables-wrapper', 'Last Name')
    .should('contain', user.lastName);

    cy.contains('.web-tables-wrapper', 'Age')
    .should('contain', '21');

    cy.contains('.web-tables-wrapper', 'Email')
    .should('contain', user.email);

    cy.contains('.web-tables-wrapper', 'Salary')
    .should('contain', '2500');

    cy.contains('.web-tables-wrapper', 'Department')
    .should('contain', user.department);

  });

  it ('Delete a created worker', () => {
    
    cy.get('#addNewRecordButton')
    .click();

    cy.get('#firstName')
    .type(user.firstName);

    cy.get('#lastName')
    .type(user.lastName);

    cy.get('#userEmail')
    .type(user.email);

    cy.get('#age')
    .type('21');

    cy.get('#salary')
    .type('2500');

    cy.get('#department')
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.get('#delete-record-4')
    .click();

  });

  it('Find worker in search field and edit it.', () => {
    cy.get('#searchBox')
    .type('Cierra');

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
    .should('contain', 'Cierra');

    cy.get('#edit-record-1')
    .click();

    cy.get('#department').clear()
    .type(user.department);

    cy.get('#submit')
    .click();

  });

  it('Check search by all column values.', () => {

    cy.get('#searchBox')
    .type('Cierra');
  cy.contains('[role="row"]', 'Cierra')
    .should('contain', 'Cierra');
  cy.get('#searchBox')
    .clear()
    .type('Vega');
  cy.contains('[role="row"]', 'Cierra')
    .should('contain', 'Vega');
  cy.get('#searchBox')
    .clear()
    .type('cierra@example.com');
  cy.contains('[role="row"]', 'Cierra')
    .should('contain', 'cierra@example.com');
  cy.get('#searchBox')
    .clear()
    .type(39);
  cy.contains('[role="row"]', 'Cierra')
    .should('contain', 39);
  cy.get('#searchBox')
    .clear()
    .type(10000);
  cy.contains('[role="row"]', 'Cierra')
    .should('contain', 10000);
  cy.get('#searchBox')
    .clear()
    .type('Insurance');
  cy.contains('[role="row"]', 'Cierra')
    .should('contain', 'Insurance');

  });

  it.only('Delete all workers', () => {

    for (let i = 1; i < 4; i++) {
      cy.get('#delete-record-' + `${i}`)
    .click();
    }

  });
});
