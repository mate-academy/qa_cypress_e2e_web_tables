/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUse) => {
      user = generateUser;
    });

    cy.visit('/webtables');
  });

  it('Pagination', () => {
    cy.get('.-previous')
      .should('contain', 'Previous');
    cy.get('.-pageInfo')
      .should('exist');
    cy.get('.-next')
      .should('contain', 'Next');
  });

  it('Rows count selection', () => {
    cy.get('select')
      .should('exist')
      .should('be.visible');
  });

  it('Add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(user.firstName);
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-td')
      .should('contain', user.firstName)
      .should('contain', user.lastName)
      .should('contain', user.email)
      .should('contain', user.salary)
      .should('contain', user.department)
      .should('contain', user.age);
  });

  it('Delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-table')
      .should('not.contain', '#delete-record-1');
  });

  it('Delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-table')
      .should('not.contain', '#delete-record-1')
      .should('not.contain', '#delete-record-2')
      .should('not.contain', '#delete-record-3');
  });

  it('Find a worker in the search field and edit it', () => {
    cy.get('#searchBox')
      .type('Alden{enter}');
    cy.get('#edit-record-2')
      .click();
    cy.get('#lastName')
      .clear()
      .type('Changelastname');
    cy.get('#salary')
      .clear()
      .type(12090);
    cy.get('#submit')
      .click();
  });

  it('Validate data in the worker row after editing the worker', () => {
    cy.get('#searchBox')
      .type('Alden{enter}');
    cy.get('#edit-record-2')
      .click();
    cy.get('#lastName')
      .clear()
      .type('Changelastname');
    cy.get('#salary')
      .clear()
      .type(12090);
    cy.get('#submit')
      .click();
    cy.get('.rt-table')
      .should('contain', 'Changelastname');
    cy.get('.rt-table')
      .should('contain', 12090);
  });

  it('Check the search by all column values', () => {
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Alden{enter}');
    cy.get('.rt-table')
      .should('contain', 'Alden');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Cantrell{enter}');
    cy.get('#searchBox')
      .clear();
    cy.get('.rt-table')
      .should('contain', 'Cantrell');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('45{enter}');
    cy.get('.rt-table')
      .should('contain', 45);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('alden@example.com{enter}');
    cy.get('.rt-table')
      .should('contain', 'alden@example.com');
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('12000{enter}');
    cy.get('.rt-table')
      .should('contain', 12000);
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Compliance{enter}');
    cy.get('.rt-table')
      .should('contain', 'Compliance');
  });
});
