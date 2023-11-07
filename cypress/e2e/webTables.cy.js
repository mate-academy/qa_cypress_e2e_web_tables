/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/');
    cy.task('newUser')
      .then((newUser) => {
        user = newUser;
      });
  });

  it('should have pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.get('.-pagination').should('contain', 'Page');
    cy.get('.-pagination').should('contain', 'Previous');
    cy.get('.-pagination').should('contain', 'Next');
  });

  it('should contain rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '10 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '25 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '50 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '100 rows');
  });

  it('should allow to add new user', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstname);
    cy.get('#lastName').type(user.lastname);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
  });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should allow to find worker in search field and edit it.', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(user.firstname);
    cy.get('#lastName').clear();
    cy.get('#lastName').type(user.lastname);
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(user.email);
    cy.get('#age').clear();
    cy.get('#age').type(user.age);
    cy.get('#salary').clear();
    cy.get('#salary').type(user.salary);
    cy.get('#department').clear();
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
  });

  it('should allow to validate data in worker row after creating worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstname);
    cy.get('#lastName').type(user.lastname);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', user.firstname)
      .and('contain', user.lastname)
      .and('contain', user.email)
      .and('contain', user.age)
      .and('contain', user.salary)
      .and('contain', user.department);
  });

  it('should provide possibility to search by all column values', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstname);
    cy.get('#lastName').type(user.lastname);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    cy.get('#searchBox').type(user.firstname);
    cy.get('[class="rt-td"]').should('contain', user.firstname);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(user.lastname);
    cy.get('[class="rt-td"]').should('contain', user.lastname);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(user.email);
    cy.get('[class="rt-td"]').should('contain', user.email);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(user.age);
    cy.get('[class="rt-td"]').should('contain', user.age);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(user.salary);
    cy.get('[class="rt-td"]').should('contain', user.salary);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(user.department);
    cy.get('[class="rt-td"]').should('contain', user.department);
  });
});
