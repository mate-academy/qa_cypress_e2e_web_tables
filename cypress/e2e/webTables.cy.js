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

  it('should contain pagination', () => {
    cy.get('.-pagination')
      .should('contain.text', 'Previous')
      .and('contain.text', 'Next');
    cy.get('.-pageInfo')
      .should('exist');
  });

  it('should contain row count selection', () => {
    cy.get('select')
      .select('5 rows');
  });

  it('should add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();

    cy.get('#firstName')
      .type(firstName);

    cy.get('#lastName')
      .type(lastName);

    cy.get('#userEmail')
      .type(email);

    cy.get('#age')
      .type(age);

    cy.get('#salary')
      .type(salary);

    cy.get('#department')
      .type(department);

    cy.get('#submit')
      .click();
    
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

    cy.get('#searchBox')
      .clear()
      .type(firstName);

    cy.get('#searchBox')
      .clear()
      .type(lastName);

    cy.get('#searchBox')
      .clear()
      .type(email);

    cy.get('#searchBox')
      .clear()
      .type(age);

    cy.get('#searchBox')
      .clear()
      .type(salary);

    cy.get('#searchBox')
      .clear()
      .type(department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-2')
      .should('exist')

    cy.get('#delete-record-2')
      .click();

    cy.get('.rt-tbody')
      .should('not.include.html', '#delete-record-2');
  });

  it('should delete all workers', () => {
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

    it('should find a worker in search field and edit it', () => {
        cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').then(($name) => {
        const txt = $name.text();

          cy.get('#searchBox')
          .type(txt);
        })

        cy.get('#edit-record-1')
          .click();

        cy.get('#lastName')
          .clear()
          .type(lastName);

        cy.get('#userEmail')
          .clear()
          .type(email);

        cy.get('#age')
          .clear()
          .type(age);

        cy.get('#salary')
          .clear()
          .type('3000');

        cy.get('#department')
          .clear()
          .type(department);

        cy.get('#submit')
          .click();
    });
});
