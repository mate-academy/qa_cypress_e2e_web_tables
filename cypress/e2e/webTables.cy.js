const { generateUser } = require('../support/generate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Checking the pagination', () => {
    cy.get('.pagination-bottom')
      .should('contain', 'Previous')
      .and('contain', 'Next');

    cy.get('.-pageInfo')
      .contains('Page')
      .and('contain', 'of');

    cy.get('.select-wrap')
      .should('contain', '5 rows')
      .and('contain', '10 rows')
      .and('contain', '20 rows')
      .and('contain', '25 rows')
      .and('contain', '50 rows')
      .and('contain', '100 rows');
  });

  it('Add new worker and find the record by all the inputs', () => {
    const user = generateUser();

    cy.get('#addNewRecordButton')
      .click(generate.js);

    cy.findByPlaceholder('First Name')
      .type(user.firstName);

    cy.findByPlaceholder('Last Name')
      .type(user.lastName);

    cy.findByPlaceholder('name@example.com')
      .type(user.email);

    cy.findByPlaceholder('Age')
      .type(user.age);

    cy.findByPlaceholder('Salary')
      .type(user.salary);

    cy.findByPlaceholder('Department')
      .type(user.department);

    cy.contains('.btn', 'Submit')
      .click();

    cy.findByPlaceholder('Type to search')
      .type(user.firstName);

    cy.get('.rt-tbody')
      .should('contain', user.firstName);

    cy.findByPlaceholder('Type to search')
      .clear()
      .type(user.lastName);

    cy.get('.rt-tbody')
      .should('contain', user.lastName);

    cy.findByPlaceholder('Type to search')
      .clear()
      .type(user.email);

    cy.get('.rt-tbody')
      .should('contain', user.email);

    cy.findByPlaceholder('Type to search')
      .clear()
      .type(user.age);

    cy.get('.rt-tbody')
      .should('contain', user.age);

    cy.findByPlaceholder('Type to search')
      .clear()
      .type(user.salary);

    cy.get('.rt-tbody')
      .should('contain', user.salary);

    cy.findByPlaceholder('Type to search')
      .clear()
      .type(user.department);

    cy.get('.rt-tbody')
      .should('contain', user.department);
  });

  it('Delete a worker', () => {
    cy.get('#delete-record-3')
      .click();
  });

  it('Delete all workers', () => {
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`)
        .click();
    }
  });

  it('Find a worker in search field and edit it', () => {
    cy.findByPlaceholder('Type to search')
      .type('Vega');

    cy.get('[title="Edit"]')
      .click();

    cy.findByPlaceholder('Salary').clear().type(15000);

    cy.contains('.btn', 'Submit')
      .click();

  });
});
