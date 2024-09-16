/// <reference types='cypress' />

import { faker } from '@faker-js/faker';

const user = {
  fName: faker.person.firstName(),
  lName: faker.person.lastName(),
  email: faker.internet.email(),
  age: '30',
  salary: '7000',
  department: 'Engineering'
};

function addNewWorker() {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName')
    .type(user.fName);
  cy.get('#lastName')
    .type(user.lName);
  cy.get('#userEmail')
    .type(user.email);
  cy.get('#age')
    .type(user.age);
  cy.get('#salary')
    .type(user.salary);
  cy.get('#department')
    .type(user.department);
  cy.get('#submit').click();
}

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it('should handle pagination', () => {
    cy.get('.-next').should('exist');

    cy.get('.-previous').should('exist');
  });

  it('should handle rows count selection', () => {
    cy.get('select[aria-label="rows per page"]')
      .should('exist')
      .select('5 rows');

    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '5');

    cy.get('select[aria-label="rows per page"]')
      .should('exist')
      .select('20 rows');

    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '20');
  });

  it('should add a new worker', () => {
    addNewWorker();
    cy.contains(user.fName);
  });

  it('should delete a worker', () => {
    addNewWorker();

    cy.contains(user.fName).parent()
      .find('[title="Delete"]').click();

    cy.get('#searchBox').type(user.fName);

    cy.contains(user.fName).should('not.exist');
    cy.get('.rt-noData')
      .should('have.text', 'No rows found');
  });

  it('should find a worker and edit it', () => {
    addNewWorker();

    cy.get('#searchBox').type(user.fName);
    cy.contains(user.fName).parent().as('parentElement');
    cy.get('@parentElement').find('[title="Edit"]').click();

    cy.get('#age').clear();
    cy.get('#age').type('55');
    cy.get('#submit').click();

    cy.contains(user.fName).parent().should('contain', '55');
  });

  it('should check the search by all column values', () => {
    addNewWorker();

    const searchValues = [
      user.fName, user.lName, user.email,
      user.age, user.salary, user.department
    ];

    searchValues.forEach((value) => {
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(value);
      cy.get('.rt-tbody').should('contain', value);
    });
  });
});
