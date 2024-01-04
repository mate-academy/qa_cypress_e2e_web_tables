/// <reference types='cypress' />
Cypress.on('uncaught:exception', (_err) => {
  return false;
});

let user;

describe('Web Tables page', () => {
  before(() => {
    // eslint-disable-next-line arrow-parens
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('Should check pagination.', () => {
    cy.get('.-previous > .-btn').should('contain', 'Previous');
    cy.get('.-next > .-btn').should('contain', 'Next');
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-next > .-btn').should('exist');
  });

  it('Rows count selection.', () => {
    cy.get('select').select('10 rows');
  });

  it('Create a new user.', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
  });

  it('Delete user.', () => {
    cy.get('#delete-record-1').click();
  });

  it('Delete all users.', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
  });

  it('Find a worker and edit.', () => {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').click().type('Vega');
    cy.get('#edit-record-1').click();
    cy.get('#lastName').type(user.lastName);
    cy.get('#submit').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .contains(user.lastName);
  });

  it('Check the search by all column values.', () => {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').type('Vega');
    cy.get('#searchBox').clear();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').type('Cierra');
    cy.get('#searchBox').clear();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').type('39');
    cy.get('#searchBox').clear();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').type('10000');
    cy.get('#searchBox').clear();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').type('Insurance');
    cy.get('#searchBox').clear();
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').type('cierra@');
    cy.get('#searchBox').clear();
  });
});
