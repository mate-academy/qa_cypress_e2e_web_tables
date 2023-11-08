/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });
  it('should display pagination controls', () => {
    cy.get('.-pageInfo')
      .should('exist');
    cy.contains('.-btn', 'Previous')
      .should('exist');
    cy.contains('.-btn', 'Next')
      .should('exist');
  });
  it('should display rows count selector', () => {
    cy.get('[aria-label="rows per page"]')
      .should('exist');
  });
  it('should provide an ability to add a new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
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
    cy.contains('.rt-td', user.email)
      .should('exist');
    cy.contains('.rt-td', user.firstName)
      .should('exist');
    cy.contains('.rt-td', user.lastName)
      .should('exist');
  });
  it('should provide an ability to delete user', () => {
    cy.createWorker();
    cy.get('#delete-record-4')
      .click();
    cy.contains('.rt-td', 'Rambo')
      .should('not.exist');
  });
  it('should provide an ability to delete all users', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.contains('.col-12.mt-4.col-md-6', 'No rows found')
      .should('exist');
  });
  it('should provide an ability to search and edit a worker', () => {
    cy.createWorker();
    cy.get('#searchBox')
      .type('Rambo');
    cy.get('#edit-record-4')
      .click();
    cy.get('#firstName')
      .type('{selectAll}' + user.firstName);
    cy.get('#lastName')
      .type('{selectAll}' + user.lastName);
    cy.get('#userEmail')
      .type('{selectAll}' + user.email);
    cy.get('#submit')
      .click();
  });
  it('should provide an ability to verify eddited user', () => {
    cy.createWorker();
    cy.modifyWorker();
    cy.get('#searchBox')
      .clear();
    cy.contains('.rt-td', 'Jason')
      .should('exist');
    cy.contains('.rt-td', 'Konas')
      .should('exist');
    cy.contains('.rt-td', 'jason@mail.com')
      .should('exist');
  });
  it('should provide an ability to search by all column values', () => {
    cy.createWorker();
    cy.get('#searchBox')
      .type('John');
    cy.contains('.rt-td', 'John')
      .should('exist');
    cy.get('#searchBox')
      .type('{selectAll}Rambo');
    cy.contains('.rt-td', 'Rambo')
      .should('exist');
    cy.get('#searchBox')
      .type('{selectAll}john@mail.com');
    cy.contains('.rt-td', 'john@mail.com')
      .should('exist');
    cy.get('#searchBox')
      .type('{selectAll}71');
    cy.contains('.rt-td', '71')
      .should('exist');
    cy.get('#searchBox')
      .type('{selectAll}12000');
    cy.contains('.rt-td', '12000')
      .should('exist');
    cy.get('#searchBox')
      .type('{selectAll}Insurance');
    cy.contains('.rt-td', 'Insurance')
      .should('exist');
  });
});
