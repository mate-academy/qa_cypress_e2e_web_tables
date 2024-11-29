/// <reference types='cypress' />

const { generateUser } = require('../support/generUser');
const user = generateUser();
describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should paginate through the table', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('.-previous').should('exist');
    cy.get('.-next').should('exist');
    cy.get('.-pageInfo').should('exist');
    cy.get('.-previous').should('exist');
    cy.get('[class*="select-wrap -pageSizeOptions"]').should('exist');
  });

  it('should be able to change the rows count selection', () => {
    cy.get('select[aria-label="rows per page"]').select('5 rows');
    cy.get('select').should('contain.text', '5 rows');
    cy.get('select[aria-label="rows per page"]').select('10 rows');
    cy.get('select').should('contain.text', '10 rows');
    cy.get('select[aria-label="rows per page"]').select('20 rows');
    cy.get('select').should('contain.text', '20 rows');
    // eslint-disable-next-line cypress/no-force
    cy.get('select[aria-label="rows per page"]')
      .select('25 rows', { force: true });
    cy.get('select').should('contain.text', '25 rows');
    // eslint-disable-next-line cypress/no-force
    cy.get('select[aria-label="rows per page"]')
      .select('50 rows', { force: true });
    cy.get('select').should('contain.text', '50 rows');
    // eslint-disable-next-line cypress/no-force
    cy.get('select[aria-label="rows per page"]')
      .select('100 rows', { force: true });
    cy.get('select').should('contain.text', '100 rows');
  });

  it('should be able to add a new worker.', () => {
    cy.addNewWorker(user);
    cy.contains(user.userName).should('exist');
  });

  it('should be able to delete a worker.', () => {
    let userQuantityStart;
    let userQuantityEnd;

    cy.getMaxRecordValue().then((maxValue) => {
      userQuantityStart = maxValue;
      // eslint-disable-next-line no-cond-assign, no-constant-condition
      if (maxValue = 0) {
        cy.addNewWorker(user);
      }
      cy.get('span[id^="delete-record-"]').last().click();
      cy.getMaxRecordValue().then((maxValue) => {
        userQuantityEnd = maxValue;
        expect(userQuantityEnd).to.be.lessThan(userQuantityStart);
      });
    });
  });

  it('should be able to delete all workers.', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.get('.ReactTable').should('contain', 'No rows found');
    cy.get('.ReactTable').should('not.contain', '#delete-record^');
  });

  it('should be able to find a worker in the search field and edit it.', () => {
    cy.addNewWorker(user);
    cy.get('#searchBox').type(user.userName);
    cy.get('[title="Edit"]').invoke('attr', 'id').then(() => {
      cy.get('[title="Edit"]').click();
    });
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#age').clear().type('2');
    cy.get('#submit').click();
    cy.get('div.rt-td').should('contain', '2');
    cy.contains(user.userName).should('exist');
    cy.contains(user.userSurname).should('exist');
    cy.contains(user.email).should('exist');
    cy.contains(user.number).should('exist');
    cy.contains(user.number).should('exist');
    cy.contains(user.department).should('exist');
  });

  it('should be able to сheck the search by all column values.', () => {
    cy.addNewWorker(user);
    cy.get('#searchBox').type(user.userName);
    cy.get('div.rt-td').should('contain', user.userName);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type(user.userSurname);
    cy.get('div.rt-td').should('contain', user.userSurname);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type(user.email);
    cy.get('div.rt-td').should('contain', user.email);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type(user.age);
    cy.get('div.rt-td').should('contain', user.age);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type(user.number);
    cy.get('div.rt-td').should('contain', user.number);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('#searchBox').clear().type(user.department);
    cy.get('div.rt-td').should('contain', user.department);
  });
});
