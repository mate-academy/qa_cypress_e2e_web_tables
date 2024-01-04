/// <reference types='cypress' />

const { generateUser } = require('../support/genUser');
const user = generateUser();
let userQuantityStart; // Declare the variable in a higher scope

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should be able to change the pagination', () => {
    cy.addNewWorker(generateUser());
    cy.addNewWorker(generateUser());
    cy.addNewWorker(generateUser());
    cy.get('select[aria-label="rows per page"]').select('5 rows');
    cy.get('.-next > .-btn').click();
    cy.get('input[aria-label="jump to page"]').should('have.value', '2');
    cy.get('.-previous > .-btn').click();
    cy.get('input[aria-label="jump to page"]').should('have.value', '1');
  });

  it('should be able to change the rows count selection', () => {
    cy.get('select[aria-label="rows per page"]').select('5 rows');
    cy.get('select').should('contain.text', '5 rows');
    cy.get('select[aria-label="rows per page"]').select('10 rows');
    cy.get('select').should('contain.text', '10 rows');
    cy.get('select[aria-label="rows per page"]').select('20 rows');
    cy.get('select').should('contain.text', '20 rows');
    cy.get('select[aria-label="rows per page"]').select('25 rows');
    cy.get('select').should('contain.text', '25 rows');
    cy.get('select[aria-label="rows per page"]').select('50 rows');
    cy.get('select').should('contain.text', '50 rows');
    cy.get('select[aria-label="rows per page"]').select('100 rows');
    cy.get('select').should('contain.text', '100 rows');
  });

  it('should be able to add a new worker.', () => {
    cy.getMaxRecordValue().then((startValue) => {
      userQuantityStart = startValue; // Set the value of userQuantityStart
    });

    cy.addNewWorker(user);

    cy.getMaxRecordValue().then((userQuantityEnd) => {
      expect(userQuantityEnd).to.be.greaterThan(userQuantityStart);
      cy.get('.rt-tr-group').should('contain', user.userName).should('exist');
    });
  });

  it('should be able to delete a worker.', () => {
    cy.getMaxRecordValue().then((startValue) => {
      userQuantityStart = startValue; // Set the value of userQuantityStart

      if (userQuantityStart === 0) {
        cy.addNewWorker(user);
      }
    });

    cy.get('span[id^="delete-record-"]').last().click();

    cy.getMaxRecordValue().then((userQuantityEnd) => {
      expect(userQuantityEnd).to.be.lessThan(userQuantityStart);
    });
  });

  it('should be able to delete all workers.', () => {
    function clickLastElementNTimes(n) {
      if (n > 0) {
        cy.get('span[id^="delete-record-"]').last().click();
        clickLastElementNTimes(n - 1);
      }
    }

    cy.visit('https://demoqa.com/webtables').then(() => {
      cy.getMaxRecordValue().then((maxValue) => {
        clickLastElementNTimes(maxValue);
      });
    });

    cy.get('span[id^="delete-record-"]').should('not.exist');
  });

  it('should be able to find a worker in the search field and edit it.', () => {
    cy.addNewWorker(user);
    cy.get('#searchBox').type(user.userName);
    cy.get('[title="Edit"]').invoke('attr', 'id').then(() => {
      cy.get('[title="Edit"]').click();
    });
    cy.get('#age').clear();
    cy.get('#age').type('2');
    cy.get('#submit').click();
    cy.get('div.rt-td').should('contain', '2');
    cy.contains(user.userName).should('exist');
    cy.contains(user.userSurname).should('exist');
    cy.contains(user.email).should('exist');
    cy.contains(user.number).should('exist');
    cy.contains(user.number).should('exist');
    cy.contains(user.department).should('exist');
  });

  function executeSearchAndCheck(value) {
    cy.get('#searchBox').type(value);
    cy.get('div.rt-td').should('contain', value);

    cy.get('#searchBox').clear();
  }
  it('should be able to check the search by all column values.', () => {
    cy.addNewWorker(user);

    executeSearchAndCheck(user.userName);
    executeSearchAndCheck(user.userSurname);
    executeSearchAndCheck(user.email);
    executeSearchAndCheck(user.age.toString());
    executeSearchAndCheck(user.number.toString());
    executeSearchAndCheck(user.department);
  });
});
