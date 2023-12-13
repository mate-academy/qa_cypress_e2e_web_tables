/// <reference types='cypress' />

const { generateUser } = require('../support/generate');

describe('Web Tables page', () => {
  it('should change the number of rows to 5', () => {
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
    cy.get('.rt-tr-group').should('have.length', 5);
  });
  it('the pagination should work', () => {
    cy.addNewUser(5);
    cy.get('[aria-label="rows per page"]')
      .select('5 rows');
    cy.contains('.-btn', 'Next')
      .click();
    cy.get('[aria-label="jump to page"]')
      .invoke('attr', 'value')
      .should('eq', '2');
  });
  it('should add a new worker', () => {
    const user = generateUser();

    cy.contains('#addNewRecordButton', 'Add')
      .click();
    cy.get('#firstName')
      .type(user.name);
    cy.get('#lastName')
      .type(user.surname);
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
    cy.get('.rt-td')
      .should('contain', user.email);
  });

  it('should delete a worker', () => {
    // new user if table is empty
    const user = generateUser();
    cy.addNewUserFrom(user);
    // if even 1 user exist we can find delete button
    cy.get('#delete-record-1')
      .should('exist');
    cy.get('#delete-record-1')
      .click();
    // without refreshing the now first user in table is still treated as 2
    cy.get('#delete-record-1')
      .should('not.exist');
  });

  it('should delete all workers', () => {
    cy.addNewUser();
    cy.get('[title="Delete"]')
      .then(($value) => {
        const count = $value.length;

        for (let i = 1; i <= count; i++) {
          cy.get('#delete-record-' + i)
            .click();
        }
      });
    cy.get('#delete-record-1')
      .should('not.exist');
  });
  it('should find a worker and edit them', () => {
    const user = generateUser();

    cy.addNewUserFrom(user);
    cy.get('#searchBox')
      .type(user.email);
    cy.contains('.rt-tr-group', user.email)
      .should('have.length', 1);
    cy.get('[title="Edit"]')
      .click();
    // edit worker
    cy.get('#firstName')
      .type('{selectAll}{del}NewName');
    cy.get('#submit')
      .click();
    cy.get('.rt-tbody')
      .should('contain', 'NewName');
  });

  it('should find worker by data from any column', () => {
    const user = generateUser();

    cy.addNewUserFrom(user);
    cy.searchWorker(user.name);
    cy.searchWorker(user.surname);
    cy.searchWorker(user.email);
    cy.searchWorker(user.age);
    cy.searchWorker(user.salary);
    cy.searchWorker(user.department);
  });
});
