/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-unused-vars */
/* eslint-disable cypress/no-force */
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
    const fillAndSubmitForm = () => {
      cy.get('#addNewRecordButton').click();
      cy.findByPlaceholder('First Name').type(user.firstName);
      cy.findByPlaceholder('Last Name').type(user.lastName);
      cy.findByPlaceholder('name@example.com').type(user.email);
      cy.findByPlaceholder('Age').type(user.age);
      cy.findByPlaceholder('Salary').type(user.salary);
      cy.findByPlaceholder('Department').type(user.department);
      cy.get('#submit').click();
      cy.task('generateUser').then(generateUser => {
        user = generateUser;
      });
    };
    for (let i = 0; i < 3; i++) {
      fillAndSubmitForm();
    }
    cy.get('select').should('contain', '5 rows');
    cy.get('select').select('5');
    cy.get('.-btn').last().should('contain', 'Next').click();
    cy.get('.-pageJump > input').should('have.value', '2');
    cy.get('.-btn').first().should('contain', 'Previous').click();
    cy.get('.-pageJump > input').should('have.value', '1');
  });

  it('should have rows count selection', () => {
    cy.get('select').should('contain', '5 rows');
    cy.get('select').select('5');
    cy.get('.rt-tr-group').should('have.length', 5);
    cy.get('select').should('contain', '25 rows');
    cy.get('select').select('25');
    cy.get('.rt-tr-group').should('have.length', 25);
    cy.get('select').should('contain', '100 rows');
    cy.get('select').select('100', { force: true });
    cy.get('.rt-tr-group').should('have.length', 100);
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#registration-form-modal').should('contain', 'Registration Form');
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
      .should('contain', user.firstName);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
      .should('contain', user.lastName);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(3)')
      .should('contain', user.age);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
      .should('contain', user.email);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
      .should('contain', user.salary);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
      .should('contain', user.department);
  });

  it('should allow to delete a worker', () => {
    cy.get('.action-buttons').its('length').as('initialRecordCount');
    cy.get('#delete-record-1').click();
    cy.get('.action-buttons').should(('have.length', value => value - 1));
    cy.get('#edit-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('.action-buttons').its('length').as('initialRecordCount');
    cy.get('.action-buttons').each(($button, index) => {
      cy.get(`#delete-record-${index + 1}`).click();
    });
    cy.get('.action-buttons').should('not.exist');
  });

  it('should to find worker in search field, edit and validate it', () => {
    //  add a worker
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    //  search the added worker using the Search field
    cy.findByPlaceholder('Type to search').type(user.firstName);
    cy.get('.rt-table').should('contain', user.firstName);
    cy.get('#edit-record-4').click();
    cy.findByPlaceholder('Age').clear().type(Number(user.age) + 2);
    cy.get('#submit').should('contain', 'Submit').click();
    cy.findByPlaceholder('Type to search').clear();
    //  validate it
    cy.get(':nth-child(4) > .rt-tr > :nth-child(1)')
      .should('contain', user.firstName);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
      .should('contain', user.lastName);
    cy.get(':nth-child(4) > .rt-tr ')
      .should('contain', Number(user.age) + 2);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(4)')
      .should('contain', user.email);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(5)')
      .should('contain', user.salary);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(6)')
      .should('contain', user.department);
  });

  it('should search by all column values ', () => {
    // add a worker
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    // search by all column values
    cy.findByPlaceholder('Type to search').clear().type(user.firstName);
    cy.get('.rt-table').should('contain', user.firstName);
    cy.findByPlaceholder('Type to search').clear().type(user.lastName);
    cy.get('.rt-table').should('contain', user.lastName);
    cy.findByPlaceholder('Type to search').clear().type(user.age);
    cy.get('.rt-table').should('contain', user.age);
    cy.findByPlaceholder('Type to search').clear().type(user.email);
    cy.get('.rt-table').should('contain', user.email);
    cy.findByPlaceholder('Type to search').clear().type(user.salary);
    cy.get('.rt-table').should('contain', user.salary);
    cy.findByPlaceholder('Type to search').clear().type(user.department);
    cy.get('.rt-table').should('contain', user.department);
  });
});
