/* eslint-disable cypress/unsafe-to-chain-command */
/* eslint-disable arrow-parens */
/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should have pagination', () => {
    // pagination
    cy.get('.-pageInfo').should('contain', 'Page');
    cy.get('.-pageJump > input').type('Number');
    cy.get('.-totalPages').should('contain', '1');
    cy.get('.-btn').should('contain', 'Previous');
    cy.get('.-btn').should('contain', 'Next');
  });

  it('should have rows count selection', () => {
    // Rows count selection
    cy.get('select').should('contain', '5 rows');
    cy.get('select').should('contain', '10 rows');
    cy.get('select').should('contain', '20 rows');
    cy.get('select').should('contain', '25 rows');
    cy.get('select').should('contain', '50 rows');
    cy.get('select').should('contain', '100 rows');
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').should('contain', 'Add').click();
    cy.get('#registration-form-modal').should('contain', 'Registration Form');
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').should('contain', 'Submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
      .should('contain', user.firstName);
  });

  it('should allow to delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.action-buttons').should('not.have', '#edit-record-1');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.action-buttons').should('not.have');
  });

  it('should to find worker in search field, edit and validate it', () => {
    cy.get('#addNewRecordButton').should('contain', 'Add').click();
    cy.get('#registration-form-modal').should('contain', 'Registration Form');
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').should('contain', 'Submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
      .should('contain',user.firstName);
    cy.findByPlaceholder('Type to search').type(user.firstName);
    cy.get('.rt-table').should('contain', user.firstName);
    cy.get('#edit-record-4').click();
    cy.findByPlaceholder('Age').clear().type(Number(user.age) + 2);
    cy.get('#submit').should('contain', 'Submit').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr')
      .should('contain', user.firstName)
      .should('contain', user.lastName)
      .should('contain', user.email)
      .should('contain', Number(user.age) + 2)
      .should('contain', user.salary)
      .should('contain', user.department);
    cy.findByPlaceholder('Type to search').clear();
    cy.get('.rt-table')
      .should('contain', user.firstName)
      .should('contain', user.lastName)
      .should('contain', user.email)
      .should('contain', Number(user.age) + 2)
      .should('contain', user.salary)
      .should('contain', user.department);
  });
});
