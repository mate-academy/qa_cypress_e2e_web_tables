/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import { generateMultipleWorker, generateWorker } from '../support/generate'; 

const randomRowNumber = Math.floor(Math.random() * 6);
const rowsCount = ['5', '10', '20', '25', '50', '100'];
const randomDeleteWorker = Math.ceil(Math.random() * 2)
const firstnameChanged = faker.person.firstName(); 

describe('Web Tables page', () => {
  const worker = generateWorker();
  const multipleWorker = worker * 3;

  beforeEach (() => {
    cy.visit('/');
  });

  it.only('should provide the pagination working correctly', () => {
    cy.get('[aria-label="rows per page"]').select('5');
    cy.createWorkers(worker, 3);
    cy.contains('Next')
      .click();
    cy.get('[aria-label="jump to page"]')
      .should('have.value', 2)
    cy.contains('Previous')
      .click()
    cy.get('[aria-label="jump to page"]')
      .should('have.value', 1)
  });

  it('should provide an ability to select rows count', () => {
    cy.get('[aria-label="rows per page"]')
      .select(randomRowNumber);
    cy.get('.rt-tr')
      .should('have.length', `${Number(rowsCount[randomRowNumber]) + 1}`)
  });

  it('should provide an ability to add new worker', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(worker.firstName);
    cy.get('#lastName')
      .type(worker.lastName);
    cy.get('#userEmail')
      .type(worker.email);
    cy.get('#age')
      .type(worker.age);
    cy.get('#salary')
      .type(worker.salary);
    cy.get('#department')
      .type(worker.department);
    cy.get('#submit')
      .click();
    cy.get(':nth-child(4) > .rt-tr')
      .should('contain.text', worker.firstName)
      .and('contain.text', worker.lastName)
      .and('contain.text', worker.email)
      .and('contain.text', worker.age)
      .and('contain.text', worker.salary)
      .and('contain.text', worker.department);
  })

  it('should provide an ability to delete worker', () => {
    cy.get(`#delete-record-${randomDeleteWorker}`)
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', `#delete-record-${randomDeleteWorker}`);
  })

  it('should provide an ability to delete all workers', () => {
    for (let i = 1; i < 4; i++) {
      cy.get(`#delete-record-${i}`)
        .click();
    };

    cy.get('.rt-td')
      .should('not.have.text', '');
  });

  it('should provide an ability to find worker', () => {
    cy.createWorker(worker);
    cy.searchAndValidateWorker(worker.firstName);
    cy.get('.rt-td')
      .and('not.contain.text', 'cierra@example.com');
  });

  it('should provide an ability to edit worker', () => {
    cy.createWorker(worker);
    cy.get('#searchBox').type(`${worker.firstName}`);
    cy.get('#edit-record-4').click();
    cy.get('#firstName').type(firstnameChanged);
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain.text', worker.firstName + firstnameChanged);
  });

  it('should provide searching by all column values', () => {
    cy.createWorker(worker);
    cy.searchAndValidateWorker(worker.firstName);
    cy.searchAndValidateWorker(worker.lastName);
    cy.searchAndValidateWorker(worker.email);
    cy.searchAndValidateWorker(worker.age);
    cy.searchAndValidateWorker(worker.salary);
    cy.searchAndValidateWorker(worker.department);
  });
});
