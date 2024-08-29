/// <reference types='cypress' />

import { generateWorker } from '../support/generateData';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.wrap(generateWorker()).as('worker');

    cy.visit();
  });

  it('should allow to add a new worker', () => {
    cy.get('@worker').then((worker) => {
      const {
        firstName,
        lastName,
        email,
        age,
        salary,
        department
      } = worker;

      cy.getById('firstName')
        .type(firstName);
      cy.getById('lastName')
        .type(lastName);
      cy.getById('email')
        .type(email);
      cy.getById('age')
        .type(age);
      cy.getById('salary')
        .type(salary);
      cy.getById('department')
        .type(department);
    });

    cy.get('button[id=submit]')
      .click();
  });
});
