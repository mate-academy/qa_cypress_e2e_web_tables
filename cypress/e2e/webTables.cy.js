/// <reference types='cypress' />

let user;

function addUser(count) {
  for (let i = 0; i < count; i++) {
    cy.findById('addNewRecordButton').click();
    cy.findById('firstName').type(user.firstName);
    cy.findById('lastName').type(user.lastName);
    cy.findById('userEmail').type(user.email);
    cy.findById('age').type(user.age);
    cy.findById('salary').type(user.salary);
    cy.findById('department').type(user.department);

    cy.findById('submit').click();
    cy.get('.rt-td').should('contain', user.email);
  }
}

describe('Web Tables page', () => {
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should add a new worker', () => {
    addUser(1);
  });

  it('Should delete a user', () => {
    cy.findById('delete-record-3').click();
    cy.contains('.rt-td', 'kierra@example.com').should('not.exist');
  });

  it('Should delete all users', () => {
    cy.findById('delete-record-1').click();
    cy.contains('.rt-td', 'cierra@example.com').should('not.exist');

    cy.findById('delete-record-2').click();
    cy.contains('.rt-td', 'alden@example.com').should('not.exist');

    cy.findById('delete-record-3').click();
    cy.contains('.rt-td', 'kierra@example.com').should('not.exist');
  });

  it('Should select the rows quantity', () => {
    addUser(10);
    cy.get('select[aria-label="rows per page"]').select('5');
  });

  it('Should switch to another page', () => {
    addUser(10);
    cy.get('select[aria-label="rows per page"]').select('5');
    cy.contains('.-btn', 'Next').click();
    cy.get('input[type="number"]').should('have.value', 2);
    cy.contains('.-btn', 'Previous').click();
    cy.get('input[type="number"]').should('have.value', 1);
  });

  it('should find a worker in the search field by all column', () => {
    cy.get('#searchBox').type('Cierra');
    cy.contains('div', 'Alden').should('not.exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Cantrell');
    cy.contains('div', 'Cierra').should('not.exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('29');
    cy.contains('div', 'Cantrell').should('not.exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.contains('div', 'Kierra').should('not.exist');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.contains('div', 'Kierra').should('not.exist');
  });

  it('should edit a worker', () => {
    cy.get('#edit-record-1').click();
    cy.findById('age').clear();
    const age = 23;
    cy.findById('age').type(age);
    cy.findById('submit').click();
    cy.contains('div', user.age).should('be.visible');
  });
});
