/// <reference types='cypress' />
describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should check pagination', () => {
    cy.generate_N_Users(10);
    cy.contains('.-next > .-btn', 'Next').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '2', {
      timeout: 10000,
    });
    cy.contains('.-previous > .-btn', 'Previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1', {
      timeout: 10000,
    });
  });

  it('should check rows count selection', () => {
    cy.get('[aria-label="rows per page"]').select('5');
    cy.get('[aria-label="rows per page"]').should('contain', '5');
    cy.get('[role="row"]').should('have.lengthOf', 6);
    cy.get('[role="row"]').should('not.have.lengthOf', 7);
  });

  it('should check adding a new worker', () => {
    let user;
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#userEmail').type(user.email);
      cy.get('#age').type(user.age);
      cy.get('#salary').type(user.salary);
      cy.get('#department').type(user.department);
      cy.get('#submit').click();
      cy.get('.rt-tbody').should('contain', user.firstName);
    });
  });

  it('should check deletion of a worker', () => {
    let user;
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#userEmail').type(user.email);
      cy.get('#age').type(user.age);
      cy.get('#salary').type(user.salary);
      cy.get('#department').type(user.department);
      cy.get('#submit').click();
      cy.get('#delete-record-4').click();
      cy.get('.rt-tbody').should('not.contain', user.firstName);
    });
  });

  it('should check deletion of all workers', () => {
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', 'Cierra');
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    cy.get('.rt-tbody').should('not.contain', 'Kierra');
  });

  it('should check searching the worker and edition of his data', () => {
    cy.get('#searchBox').type('Alden{enter}');
    cy.get('.rt-tbody').should('contain', 'Alden');
    cy.get('#edit-record-2').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Tester');
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', 'Tester');
  });

  it('should check the search by all the columns', () => {
    cy.searchByColVal('First Name', 'Alden');
    cy.searchByColVal('Last Name', 'Cantrell');
    cy.searchByColVal('Age', '45');
    cy.searchByColVal('Email', 'alden@example.com');
    cy.searchByColVal('Salary', '12000');
    cy.searchByColVal('Department', 'Compliance');
  });
});
