/// <reference types='cypress' />

describe('Web Tables Page', () => {
  beforeEach(() => {
  cy.visit ('https://demoqa.com/webtables');
  });
  
  const user = {
    firstName: 'Oleg',
    lastName: 'Vandal',
    email: 'olegvandal@qa.com',
    age: '23',
    salary: '500',
    department: 'management'
  };

  it('Should be possible to add a new worker and validate the data', () => {
    cy.createUser(user.firstName , user.lastName, user.email, user.age, user.salary, user.department);
    cy.get('.rt-tr-group')
    .should('contain', user.firstName);
    cy.get('.rt-tr-group')
    .should('contain', user.lastName); 
    cy.get('.rt-tr-group')
    .should('contain', user.age); 
    cy.get('.rt-tr-group')
    .should('contain', user.email); 
    cy.get('.rt-tr-group')
    .should('contain', user.salary);
    cy.get('.rt-tr-group')
    .should('contain', user.department);    
    });

  it('Should be possible to delete a worker', () => {
    cy.contains('.rt-tr-group', 'alden@example.com' ) 
      .find('#delete-record-2', 'Delete')  
      .click('center');
    cy.get('.rt-tr-group')
      .should('not.contain', 'alden@example.com');   
    }); 
    
  it('Should be possible to delete all workers', () => {
    cy.contains('.rt-tr-group', 'cierra@example.com' ) 
    .find('#delete-record-1', 'Delete')  
    .click('center');    
    cy.contains('.rt-tr-group', 'alden@example.com' ) 
      .find('#delete-record-2', 'Delete')  
      .click('center');
    cy.contains('.rt-tr-group', 'kierra@example.com' ) 
    .find('#delete-record-3', 'Delete')  
    .click('center');
    cy.get('.rt-noData')
      .should('contain', 'No rows found');
    });

  it('Should be possible to find and edit all employees', () => {
    cy.get('#searchBox')
      .type('cierra@example.com');
    cy.contains('.rt-tr-group', 'cierra@example.com' ) 
    .find('#edit-record-1', 'Edit')  
    .click('center');
    cy.get('#userEmail')
      .clear()
      .type(user.email);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear();  
    cy.get('.rt-tr-group')
      .should('contain', user.email);   
    });

  it('Should be possible to search by all column values', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-tr-group')
      .should('contain', 'Cierra')
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('Vega');
    cy.get('.rt-tr-group')
      .should('contain', 'Vega')
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('Cierra');
    cy.get('.rt-tr-group')
      .should('contain', 'Cierra')
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('39');
    cy.get('.rt-tr-group')
      .should('contain', '39')
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('cierra@example.com');
    cy.get('.rt-tr-group')
      .should('contain', 'cierra@example.com')
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type('10000');
    cy.get('.rt-tr-group')
      .should('contain', '10000')
    cy.get('#searchBox')
      .clear();
    cy.get('#searchBox')
      .type('Insurance');
    cy.get('.rt-tr-group')
      .should('contain', 'Insurance')
    cy.get('#searchBox') 

    });
  it('Should be possible to use pagination', () => {
    cy.createUser(user.firstName , user.lastName, user.email, user.age, user.salary, user.department);
    cy.createUser(user.firstName , user.lastName, user.email, user.age, user.salary, user.department);
    cy.createUser(user.firstName , user.lastName, user.email, user.age, user.salary, user.department);
    cy.get('select')
      .select(0);
    cy.get('.-pageJump > input')
      .should('have.attr', 'value', '1');
    cy.contains('button', 'Next')
      .click();
    cy.get('.-pageJump > input')
      .should('have.attr', 'value', '2');
    });

    it('Should be possible to change number of rows', () => {
      cy.get('div.rt-tr-group')
        .should('have.length', 10);
      cy.get('select')
        .select(0);
      cy.get('div.rt-tr-group')
        .should('have.length', 5);
      cy.get('select')
        .select(2);
      cy.get('div.rt-tr-group')
        .should('have.length', 20);
      });
    });