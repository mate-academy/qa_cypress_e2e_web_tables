/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  const user = {
    userFirstName: 'Bobby',
    userLastName: 'Tester',
    userEmail: 'bobby@mail.com',
    userAge: '30',
    userSalary: '5000',
    userDepartment: 'QA'
  };

  it('pagination should be displayed', () => {
    cy.get('.pagination-bottom')
      .should('contain.text', 'Page')
      .and('contain.text', 'of')
      .and('contain.text', 'Previous')
      .and('contain.text', 'Next');
  });

  it('should be able to select the row count', () => {
    cy.newworker(user);
    cy.newworker(user);
    cy.newworker(user);
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
    cy.contains('[type="button"]', 'Next').click();
    cy.get('[type="number"]').should('have.value', '2');
    cy.contains('[type="button"]', 'Previous').click();
    cy.get('[type="number"]').should('have.value', '1');
    cy.get('[aria-label="rows per page"]').select('10 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '10 rows');
    cy.get('[aria-label="rows per page"]').select('20 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '20 rows');
  });

  it('should be able to add a new worker', () => {
    cy.newworker(user);
    cy.get('.rt-tbody')
      .should('contain', user.userFirstName)
      .and('contain', user.userLastName)
      .and('contain', user.userEmail)
      .and('contain', user.userAge)
      .and('contain', user.userSalary)
      .and('contain', user.userDepartment);
  });

  it('should be able to delete a worker', () => {
    cy.newworker(user);
    cy.get('#delete-record-4').click();
    cy.get('.rt-tr-group')
      .should('not.contain', user.userFirstName)
      .and('not.contain', user.userLastName)
      .and('not.contain', user.userEmail)
      .and('not.contain', user.userAge)
      .and('not.contain', user.userSalary)
      .and('not.contain', user.userDepartment);
  });

  it('should be able to delete all the workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-tr-group')
      .should('not.contain', 'Cierra')
      .and('not.contain', 'Vega')
      .and('not.contain', 'Alden')
      .and('not.contain', 'Cantrell')
      .and('not.contain', 'Kierra')
      .and('not.contain', 'Gentry');
  });

  it('should be able to search a worker and edit it', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tr-group').should('contain', 'Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#firstName').type(`{selectAll}${user.userFirstName}{Enter}`);
    cy.get('.rt-tr-group').should('contain', user.userFirstName);
  });

  it('should be able to search worker by First Name', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userFirstName);
    cy.get('.rt-tr-group').should('contain', user.userFirstName);
  });

  it('should be able to search worker by Last Name', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userLastName);
    cy.get('.rt-tr-group').should('contain', user.userLastName);
  });

  it('should be able to search worker by Age', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userAge);
    cy.get('.rt-tr-group').should('contain', user.userAge);
  });

  it('should be able to search worker by Email', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userEmail);
    cy.get('.rt-tr-group').should('contain', user.userEmail);
  });

  it('should be able to search worker by Salary', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userSalary);
    cy.get('.rt-tr-group').should('contain', user.userSalary);
  });

  it('should be able to search worker by Department', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userDepartment);
    cy.get('.rt-tr-group').should('contain', user.userDepartment);
  });
});
