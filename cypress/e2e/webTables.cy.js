/// <reference types='cypress' />
const { generateUser, test } = require('../support/generate');

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('pagination should works', () => {
    generateUser();
    generateUser();
    generateUser();

    cy.get('select').select('5');

    cy.contains('.-btn', 'Next').click();

    cy.get('[aria-label="jump to page"]').should('have.value', '2');
  });

  it('rows count selections should work', () => {
    const amountRows = ['5', '10', '20', '25', '50', '100'];
    const randomIndex = Math.floor(Math.random() * amountRows.length);

    cy.get('select').select(amountRows[randomIndex]);

    cy.get('.rt-tbody')
      .find('.rt-tr-group')
      .should('have.length', Number(amountRows[randomIndex]));
  });

  it('should Add new worker and delete it', () => {
    const user = generateUser();

    cy.contains('.rt-tr-group', user.firstname).find('[title="Delete"]').click();
  });

  it.only('should Delete all workers', () => {
    cy.get('#delete-record-1')
      .should('exist');
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
    cy.get('#delete-record-2')
      .should('exist');
    cy.get('#delete-record-2')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-2');
    cy.get('#delete-record-3')
      .should('exist');
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-3');
  });

  it('should find worker in search field and edit it.', () => {
    const user = generateUser();
    cy.findId('searchBox').type(user.email);
    cy.get('[title="Edit"]').click();
    cy.get('[placeholder="First Name"]').type(user.firstname + user.age);
    cy.findId('submit').click();
    cy.contains('.rt-tr-group', user.firstname + user.age).should('exist');
  });

  it('should have equal data in worker row after creating worker.', () => {
    const user = generateUser();
    cy.findId('searchBox').type(user.email);
    cy.haveEqData('.rt-td', user.firstname);
    cy.haveEqData('.rt-td', user.lastname);
    cy.haveEqData('.rt-td', user.age);
    cy.haveEqData('.rt-td', user.email);
    cy.haveEqData('.rt-td', user.salary);
    cy.haveEqData('.rt-td', user.department);
  });

  it('should search by all column values', () => {
    const user = generateUser();
    cy.searchByColumn(user.firstname);
    cy.searchByColumn(user.lastname);
    cy.searchByColumn(user.age);
    cy.searchByColumn(user.email);
    cy.searchByColumn(user.salary);
    cy.searchByColumn(user.department);
  });
});
