/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should have the ability pagination', () => {
    cy.createWorkers(user, 4);
    cy.get('select').select('5 rows');
    cy.contains('.-btn', 'Next').click();
    cy.get('[aria-label="jump to page"]').should('contain.value', '2');
    cy.contains('.-btn', 'Previous').click();
    cy.get('[aria-label="jump to page"]').should('contain.value', '1');
  });

  it('should have the ability select rows count', () => {
    cy.get('[aria-label="rows per page"]').select('25 rows');
    cy.get('[aria-label="rows per page"]').should('contain.text','25 rows');
    cy.get('.rt-tr-group', ).should('have.length', 25);
  });

  it.only('should have the ability add a new worker', () => {
    cy.createWorkers(user, 1);
    
    cy.assertValueAndResult(user);
  });

  it('should have the ability to delete a worker', () => {
    cy.get('#delete-record-3').click();
    cy.get('.rt-tr-group', ).should('not.contain.text', 'Kierra');
  });

  it('should have the ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-tr-group', ).should('not.contain.text', 'Cierra');
    cy.get('.rt-tr-group', ).should('not.contain.text', 'Alden');
    cy.get('.rt-tr-group', ).should('not.contain.text', 'Kierra');
  });

  it('should have the ability find a worker and edit it', () => {
    cy.findById('searchBox').type('Kierra');
    cy.get('#edit-record-3').click();
    cy.get('#firstName').clear()
      .type(user.firstName);
    cy.get('#lastName').clear()
      .type(user.lastName);
    cy.get('#userEmail').clear()
      .type(user.email);
    cy.get('#age').clear()
      .type(user.age);
    cy.get('#salary').clear()
      .type(user.salary);
    cy.get('#department').clear()
      .type(user.department);
    cy.get('#submit').click();
    cy.findById('searchBox').clear();

    cy.assertValueAndResult(user);
  });

  it('should have the ability search by all column values', () => {
    cy.createWorkers(user, 1);
    cy.findById('searchBox').type(user.firstName);
    cy.findById('searchBox').clear().type(user.lastName);
    cy.findById('searchBox').clear().type(user.email);
    cy.findById('searchBox').clear().type(user.age);
    cy.findById('searchBox').clear().type(user.salary);
    cy.findById('searchBox').clear().type(user.department);

    cy.assertValueAndResult(user);
  });
});
