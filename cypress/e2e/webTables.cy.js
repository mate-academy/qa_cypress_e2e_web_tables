/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import { generateUser } from '../support/generateUser'; 

describe('Web Tables page', () => {
  const newName = faker.name.firstName();
  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('Check for pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page').should('exist');
    cy.get('.-pageSizeOptions').should('exist');
  });

  it('Check for rows count selection', () => {
    cy.get('select').select('10 rows');
  });

  it('Check for adding new worker and search ', () => {
    cy.createUser(user);
    cy.searchBy(user);
    cy.get('.modal-header').should('contain', 'Registration Form');
    cy.get('.modal-body').should('exist');
  });

  it('Check for deleting a worker', () => {
    cy.get('#delete-record-1').click();
  });

  it('Check for deleting all workers', () => {
    for (let i = 1; i < 4; i++) {
      cy.get(`#delete-record-${i}`).click();
    }
  });

  it('Check for finding user', () => {
    cy.createUser(user);
    cy.searchAndValidateWorker(user.firstName)
    cy.get('.rt-td')
      .and('not.contain.text', 'example@example.com')
  })

  it('should provide the ability to edit the user', () => {
    cy.createUser(user);
    cy.get('#searchBox').type(`${user.firstName}`);

    cy.get('#edit-record-4').click();

    cy.get('#firstName').type(newName);

    cy.get('#submit').click();

    cy.get('.rt-td').should('contain.text', user.firstName + newName);
  })

  it('Validate data in worker row after creating worker.', () => {
    cy.createUser(user);
    cy.searchAndValidateWorker(user.firstName);
    cy.searchAndValidateWorker(user.lastName);
    cy.searchAndValidateWorker(user.email);
    cy.searchAndValidateWorker(user.age);
    cy.searchAndValidateWorker(user.salary);
    cy.searchAndValidateWorker(user.department);
  });

});
