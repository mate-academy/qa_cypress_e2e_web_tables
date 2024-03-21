/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  before(() => {
    cy.task('newUser').then((newUser) => {
      user = newUser;
    });
  });

  it('should create a new worker', () => {
    cy.visit('/webtables');

    cy.get('[aria-label="rows per page"]').select('20 rows');
    cy.get('[value="20"]').should('have.value', '20');
    cy.get('select').should('have.value', '20');

    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', user.firstName)
      .and('contain', user.lastName);
  });

  it('should delete a worker', () => {
    cy.visit('/webtables');

    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.have.value', 'Cierra');
  });

  it('should delete all workers', () => {
    cy.visit('/webtables');

    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.have.value', 'Cierra');

    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.have.value', 'Alden');

    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.have.value', 'Kierra');

    cy.get('.rt-noData').should('contain', 'No rows found');
  });

  it.only('should find a worker in the search field and edit it', () => {
    cy.visit('/webtables');

    cy.findByPlaceholder('Type to search').type('Vega');
    cy.get('.rt-tbody').should('contain', 'Vega');
    cy.get('#edit-record-1').click();
    cy.get('#age').clear();
    cy.get('#age').type('77');
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', '77');
  });
});
