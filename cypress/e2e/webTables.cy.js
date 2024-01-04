/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  const user = {
    userfirstname: 'Bobby',
    userlastname: 'Tester',
    useremail: 'bobby@mail.com',
    userage: '30',
    usersalary: '5000',
    userdepartment: 'QA'
  };

  it('pagination should be displayed', () => {
    cy.get('.pagination-bottom')
      .should('contain.text', 'Page')
      .and('contain.text', 'of')
      .and('contain.text', 'Previous')
      .and('contain.text', 'Next');
  });

  it('should be able to select the row count', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '5 rows');
    cy.get('[aria-label="rows per page"]').select('10 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '10 rows');
    cy.get('[aria-label="rows per page"]').select('20 rows');
    cy.get('[aria-label="rows per page"]').should('contain', '20 rows');
  });

  it('should be able to add a new worker', () => {
    cy.newworker(user);
    cy.get('.rt-tbody')
      .should('contain', user.userfirstname)
      .and('contain', user.userlastname)
      .and('contain', user.useremail)
      .and('contain', user.userage)
      .and('contain', user.usersalary)
      .and('contain', user.userdepartment);
  });

  it('should be able to delete a worker', () => {
    cy.newworker(user);
    cy.get('#delete-record-4').click();
    cy.get('.rt-tr-group')
      .should('not.contain', user.userfirstname)
      .and('not.contain', user.userlastname)
      .and('not.contain', user.useremail)
      .and('not.contain', user.userage)
      .and('not.contain', user.usersalary)
      .and('not.contain', user.userdepartment);
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
    cy.get('#firstName').type(`{selectAll}${user.userfirstname}{Enter}`);
    cy.get('.rt-tr-group').should('contain', user.userfirstname);
  });

  it('should be able to search worker by First Name', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userfirstname);
    cy.get('.rt-tr-group').should('contain', user.userfirstname);
  });

  it('should be able to search worker by Last Name', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userlastname);
    cy.get('.rt-tr-group').should('contain', user.userlastname);
  });

  it('should be able to search worker by Age', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userage);
    cy.get('.rt-tr-group').should('contain', user.userage);
  });

  it('should be able to search worker by Email', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.useremail);
    cy.get('.rt-tr-group').should('contain', user.useremail);
  });

  it('should be able to search worker by Salary', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.usersalary);
    cy.get('.rt-tr-group').should('contain', user.usersalary);
  });

  it('should be able to search worker by Department', () => {
    cy.newworker(user);
    cy.get('#searchBox').type(user.userdepartment);
    cy.get('.rt-tr-group').should('contain', user.userdepartment);
  });
});
