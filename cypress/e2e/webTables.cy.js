/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('Should allow to add a new worker', () => {
    cy.visit('');
    cy.addUser(user, 1);
    cy.assertUser(user);
  });

  it('Should allow to delete a worker', () => {
    cy.visit('');
    cy.addUser(user, 1);
    cy.get('.rt-tbody')
      .should('contain', user.firstName);
    cy.get('#delete-record-4').click();
    cy.get('.rt-tbody')
      .should('not.contain', user.firstName);
  });

  it('Should allow to delete all workers', () => {
    cy.visit('');
    cy.get('h1').should('contain', 'Web Tables');
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody')
      .should('not.contain', 'Cierra');
    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody')
      .should('not.contain', 'Alden');
    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody')
      .should('not.contain', 'Kierra');
    cy.contains('No rows found').should('exist');
  });

  it('Should allow to find a worker in the search field and edit it', () => {
    cy.visit('');
    cy.addUser(user, 1);
    cy.findByPlaceholder('Type to search').type(user.firstName);
    cy.get('#edit-record-4').click();
    cy.findByPlaceholder('First Name').clear();
    cy.findByPlaceholder('First Name').type(user.firstName);
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type(user.lastName);
    cy.findByPlaceholder('name@example.com').clear();
    cy.findByPlaceholder('name@example.com').type(user.email);
    cy.findByPlaceholder('Age').clear();
    cy.findByPlaceholder('Age').type(user.age);
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(user.salary);
    cy.findByPlaceholder('Department').clear();
    cy.findByPlaceholder('Department').type(user.department);
    cy.contains('.btn', 'Submit').click();
    cy.findByPlaceholder('Type to search').clear();
    cy.assertUser(user);
  });

  it('Should allow the ability to search by all column values', () => {
    cy.visit('');
    cy.addUser(user, 1);
    cy.findByPlaceholder('Type to search').type(user.firstName);
    cy.get('.rt-tbody')
      .should('contain', user.firstName);
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(user.lastName);
    cy.get('.rt-tbody')
      .should('contain', user.lastName);
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(user.email);
    cy.get('.rt-tbody')
      .should('contain', user.email);
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(user.age);
    cy.get('.rt-tbody')
      .should('contain', user.age);
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(user.salary);
    cy.get('.rt-tbody')
      .should('contain', user.salary);
    cy.findByPlaceholder('Type to search').clear();
    cy.findByPlaceholder('Type to search').type(user.department);
    cy.get('.rt-tbody')
      .should('contain', user.department);
  });

  it('should have the ability pagination', () => {
    cy.visit('');
    cy.addUser(user, 3);
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.contains('.-btn', 'Next').click();
    cy.get('[aria-label="jump to page"]').should('contain.value', '2');
    cy.contains('.-btn', 'Previous').click();
    cy.get('[aria-label="jump to page"]').should('contain.value', '1');
  });

  it('should have the ability rows count selection.', () => {
    cy.visit('');
    cy.rowSelection(5);
    cy.rowSelection(10);
    cy.rowSelection(20);
    cy.rowSelection(25);
    cy.rowSelection(50);
    cy.rowSelection(100);
  });
});
