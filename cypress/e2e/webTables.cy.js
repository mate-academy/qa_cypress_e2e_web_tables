/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/webtables');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should contain pagination', () => {
    cy.contains('.-pagination', 'Page');
    cy.contains('.-totalPages', '1');
  });
  it('should contain rows count selection', () => {
    cy.get('select')
      .should('exist');
    cy.get('[aria-label = "rows per page"]')
      .select('5');
    cy.contains('[aria-label = "rows per page"]', 5);
  });
  it('should be able to add a new worker', () => {
    cy.contains('#addNewRecordButton', 'Add')
      .click();
    cy.contains('.modal-header', 'Registration Form');
    cy.get('#firstName')
      .type(user.firstName);
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
  });
  it('should be able to delete a worker', () => {
    cy.get('.rt-table')
      .should('exist');
    cy.contains('.rt-td', 'Cierra');
    cy.contains('.rt-resizable-header-content', 'Action');
    cy.get('#delete-record-1')
      .click();
    cy.contains('.rt-td', 'Alden');
  });
  it('should be able to delete all workers', () => {
    cy.get('.rt-table')
      .should('exist');
    cy.contains('.rt-resizable-header-content', 'Action');
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-td')
      .should('exist');
  });
  it('should able to search user and edit', () => {
    cy.get('#searchBox')
      .type('Alden');
    cy.contains('.rt-td', 'Alden');
    cy.get('#edit-record-2')
      .click();
    cy.get('#salary')
      .type('{selectAll}15000');
    cy.get('#submit')
      .click();
    cy.contains('.rt-td', 'Alden');
    cy.contains('.rt-td', 15000);
  });
  it('should able to search user by firstname', () => {
    cy.get('#searchBox')
      .type('Alden');
    cy.contains('.rt-td', 'Alden');
  });
  it('should able to search user by lastname', () => {
    cy.get('#searchBox')
      .type('Cantrell');
    cy.contains('.rt-td', 'Cantrell');
  });
  it('should able to search user by age', () => {
    cy.get('#searchBox')
      .type('45');
    cy.contains('.rt-td', 45);
  });
  it('should able to search user by email', () => {
    cy.get('#searchBox')
      .type('kierra@example.com');
    cy.contains('.rt-td', 'kierra@example.com');
  });
  it('should able to search user by salary', () => {
    cy.get('#searchBox')
      .type('12000');
    cy.contains('.rt-td', '12000');
  });
  it('should able to search user by department', () => {
    cy.get('#searchBox')
      .type('Legal');
    cy.contains('.rt-td', 'Legal');
  });
});
