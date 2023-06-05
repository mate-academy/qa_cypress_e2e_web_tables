/// <reference types='cypress' />

const { generateUser } = require('../support/generate');

describe('Web Tables page', () => {
  const { 
    firstName,
    lastName,
    email,
    age,
    salary,
    department 
  } = generateUser();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should provide the ability to add a new worker', () => {
    cy.createUser(
      firstName, 
      lastName, 
      email, 
      age, 
      salary, 
      department
    );

    cy.get('.rt-tbody')
      .should('contain', firstName)
      .and('contain', lastName)
      .and('contain', email);

    cy.get('.rt-tbody')
      .should('contain', age);

    cy.get('.rt-tbody')
      .should('contain', salary);

    cy.get('.rt-tbody')
      .should('contain', department);
  
    });

  it('should provide the ability to search by all columns', () => {
    cy.createUser(
      firstName, 
      lastName, 
      email, 
      age, 
      salary, 
      department
    );

    cy.get('#searchBox')
      .type(firstName);
    cy.get('.rt-tr-group')
      .should('contain', firstName)
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(lastName);
    cy.get('.rt-tr-group')
      .should('contain', lastName)
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(email);
    cy.get('.rt-tr-group')
      .should('contain', email)
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(age);
    cy.get('.rt-tr-group')
      .should('contain', age)
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(salary);
    cy.get('.rt-tr-group')
      .should('contain', salary)
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(department);
    cy.get('.rt-tr-group')
      .should('contain', department)
    cy.get('#searchBox')
  });

  it('should provide the ability to delete a worker', () => {
    cy.get('#delete-record-2')
      .should('exist')

    cy.get('#delete-record-2')
      .click();

    cy.get('.rt-tbody')
      .should('not.include.html', '#delete-record-2');
  });

  it('should provide the ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .should('exist')

    cy.get('#delete-record-1')
      .click();

    cy.get('.rt-tbody')
      .should('not.include.html', '#delete-record-1');

    cy.get('#delete-record-2')
      .should('exist')

    cy.get('#delete-record-2')
      .click();

    cy.get('.rt-tbody')
      .should('not.include.html', '#delete-record-2');

    cy.get('#delete-record-3')
      .should('exist')

    cy.get('#delete-record-3')
      .click();

    cy.get('.rt-tbody')
      .should('not.include.html', '#delete-record-3');
  });

  it('should provide the ability to find a worker in search field and edit it', () => {
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').then(($name) => {
      const txt = $name.text();

    cy.get('#searchBox')
      .type(txt);
    })

    cy.get('#edit-record-1')
      .click();

    cy.get('#userEmail')
      .clear()
      .type(email);

    cy.get('#submit')
        .click();

    cy.get('#searchBox')
      .clear();

    cy.get('.rt-tr-group')
      .should('contain', email);
  });

  it('should contain pagination', () => {
    for(let i = 1; i <= 5; i++) {
      cy.createUser(
        firstName, 
        lastName, 
        email, 
        age, 
        salary, 
        department
      ); 
      i++;
    };

    cy.get('select')
      .select(0);
    cy.get('.-pageJump > input')
      .should('have.attr', 'value', '1');
    cy.contains('button', 'Next')
      .click();
    cy.get('.-pageJump > input')
      .should('have.attr', 'value', '2');
  });

  it('should contain row count selection', () => {
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
