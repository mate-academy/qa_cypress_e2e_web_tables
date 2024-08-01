/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() =>{
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('The pagination and rows count selection', () => {
    cy.get('[value="5"]').should('exist');
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').select('25 rows');
    cy.get('.rt-tr-group').should('have.length', 25);
  });

  it('Added a new worker and delete him', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').type(user.department);
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();
    cy.get('.rt-tbody').should('not.contain', user.firstName).and('not.contain', user.lastName);
  });

  it('Deleteed all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-noData').should('be.visible');
  });

  it('Find worker in the search field and edit it', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('#edit-record-2').click();
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type('Ivanov');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'Ivanov');
  });

  it.only('Search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Kierra');
    cy.get('.rt-td').should('contain', 'Kierra');
    cy.get('.rt-td').should('not.contain', 'Alden');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('Cantrell');
    cy.get('.rt-td').should('contain', 'Cantrell');
    cy.get('.rt-td').should('not.contain', 'Gentry');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('45');
    cy.get('.rt-td').should('contain', '45');
    cy.get('.rt-td').should('not.contain', '29');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('cierra@example.com');
    cy.get('.rt-td').should('contain', 'cierra@example.com');
    cy.get('.rt-td').should('not.contain', 'alden@example.com');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('10000');
    cy.get('.rt-td').should('contain', '10000');
    cy.get('.rt-td').should('not.contain', '2000');
    cy.findByPlaceholder('Type to search').clear();

    cy.findByPlaceholder('Type to search').type('Compliance');
    cy.get('.rt-td').should('contain', 'Compliance');
    cy.get('.rt-td').should('not.contain', 'Legal');
    cy.findByPlaceholder('Type to search').clear();
  });
});