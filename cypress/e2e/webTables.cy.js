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

  it('Should check pagination and selector of rows.', () => {
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-next > .-btn').should('exist');
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
    cy.addNewUser(user);
    cy.addNewUser(user);
    cy.addNewUser(user);
    cy.addNewUser(user);
    cy.addNewUser(user);
    cy.contains('Next').click();
    cy.get('.-previous > .-btn').should('contain', 'Previous');
    cy.get('.-pageJump > input').should('have.value', '2');
    cy.contains('Previous').click();
    cy.get('.-next > .-btn').should('contain', 'Next');
    cy.get('.-pageJump > input').should('have.value', '1');
  });

  it('Create a new user.', () => {
    cy.addNewUser(user);
    cy.get(':nth-child(4) > .rt-tr > :nth-child(2)')
      .should('contain', user.lastName);
  });

  it('Should have an ability delete user.', () => {
    cy.get('#delete-record-1').click();
    cy.get(':nth-child(3) > .rt-tr > :nth-child(1)').should('have.value', '');
  });

  it('Should have an ability delete all users.', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`No rows found`);
    });
    cy.get(':nth-child(1) > .rt-tr > :nth-child(1)').should('have.value', '');
  });

  it('Find a worker and edit.', () => {
    cy.get('#searchBox').type('Vega');
    cy.get('#edit-record-1').click();
    cy.get('#lastName').type(user.lastName);
    cy.get('#submit').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .contains(user.lastName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain', user.lastName);
  });

  it('Check the search by all column values.', () => {
    cy.get('#searchBox').type('Vega');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain', 'Vega');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)')
      .should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('39');
    // eslint-disable-next-line max-len
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > [style="flex: 40 0 auto; width: 40px; max-width: 40px;"]')
      .should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(5)')
      .should('contain', '10000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(6)')
      .should('contain', 'Insurance');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@');
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain', 'cierra@');
    cy.get('#searchBox').clear();
  });
});
