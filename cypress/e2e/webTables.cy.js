/// <reference types='cypress' />
import { generateWorker } from '../support/generate';

describe('Web Tables page', () => {
  const worker = generateWorker();

  function addWorker() {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(worker.firstName);
    cy.get('#lastName').type(worker.lastName);
    cy.get('#userEmail').type(worker.email);
    cy.get('#age').type(worker.age);
    cy.get('#salary').type(worker.salary);
    cy.get('#department').type(worker.department);

    cy.get('#submit').click();

    return worker;
  }

  beforeEach(() => {
    cy.visit('/');
  });

  it('should add, edit and delete new worker', () => {
    addWorker();

    cy.get('#searchBox').type(worker.firstName);
    cy.get('[title="Edit"]').click();
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type(`new${worker.email}`);
    cy.get('#submit').click();
    cy.contains('div', `new${worker.email}`).should('be.visible');

    cy.get('#delete-record-4').click();
    cy.contains('div', `new${worker.email}`).should('not.exist');
  });

  it('should implement pagination', () => {
    addWorker();
    addWorker();
    addWorker();
    addWorker();

    cy.get('select[aria-label="rows per page"]').select('5');
    cy.contains('.-next', 'Next').click();
    cy.contains('div', worker.firstName).should('be.visible');
  });

  it('should search by every column', () => {
    addWorker();

    cy.get('#searchBox').type(worker.firstName);
    cy.contains('div', worker.firstName).should('be.visible');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.lastName);
    cy.contains('div', worker.lastName).should('be.visible');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.email);
    cy.contains('div', worker.email).should('be.visible');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.age);
    cy.contains('div', worker.age).should('be.visible');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.salary);
    cy.contains('div', worker.salary).should('be.visible');
    cy.get('#searchBox').clear();

    cy.get('#searchBox').type(worker.department);
    cy.contains('div', worker.department).should('be.visible');
    cy.get('#searchBox').clear();
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.contains('div', 'Cierra').should('not.exist');

    cy.get('#delete-record-2').click();
    cy.contains('div', 'Alden').should('not.exist');

    cy.get('#delete-record-3').click();
    cy.contains('div', 'Kierra').should('not.exist');
  });
});
