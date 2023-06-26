/// <reference types='cypress' />

import { generateUser } from '../support/generateUser';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add new worker', () => {
    const {
      firstName,
      lastName,
      email,
      userAge,
      salary,
      department
    } = generateUser();

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(userAge);
    cy.get('#salary').type(salary);
    cy.get('#department').type(`${department}{Enter}`);
    cy.get('[title="Delete"]').should('have.length', '4');
  });

  it('should delete all workers', () => {
    cy.get('[title=Delete]')
      .then(rows => {
        for (let i = 0; i < rows.length; i++) {
          cy.get('[title=Delete]').first().click();
        }
      });

    cy.get('.web-tables-wrapper').should('contain.text', 'No rows found');
  });

  it('should delete worker', () => {
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
  });

  it('should change rows count', () => {
    cy.get('[aria-label="rows per page"]').should('contain.text', '10 rows');
    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('[aria-label="rows per page"]').should('contain.text', '5 rows');
  });

  it('pagination should work', () => {
    for (let i = 0; i < 5; i++) {
      const {
        firstName,
        lastName,
        email,
        userAge,
        salary,
        department
      } = generateUser();

      cy.get('#addNewRecordButton').click();
      cy.get('#firstName').type(firstName);
      cy.get('#lastName').type(lastName);
      cy.get('#userEmail').type(email);
      cy.get('#age').type(userAge);
      cy.get('#salary').type(salary);
      cy.get('#department').type(`${department}{Enter}`);
    }

    cy.get('[aria-label="rows per page"]').select('5 rows');
    cy.get('.-totalPages').should('contain.text', '2');
    cy.get('[title="Delete"]').should('have.length', '5');
    cy.get('.-next').click();
    cy.get('[title="Delete"]').should('have.length', '3');
    cy.get('.-previous').click();
    cy.get('[title="Delete"]').should('have.length', '5');
    cy.get('[aria-label="jump to page"]').type('2{Enter}');
    cy.get('[title="Delete"]').should('have.length', '3');
  });

  it('should find worker by different column values', () => {
    const {
      firstName,
      lastName,
      email,
      userAge,
      salary,
      department
    } = generateUser();

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(userAge);
    cy.get('#salary').type(salary);
    cy.get('#department').type(`${department}{Enter}`);

    cy.get('#searchBox').type(firstName);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(lastName);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(email);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(userAge);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(salary);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type(department);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
    cy.get('#searchBox').clear();
  });

  it('should validate data in worker row after creating worker', () => {
    const {
      firstName,
      lastName,
      email,
      userAge,
      salary,
      department
    } = generateUser();

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(userAge);
    cy.get('#salary').type(salary);
    cy.get('#department').type(`${department}{Enter}`);
    cy.get('.rt-table')
      .should('contain.text', firstName)
      .should('contain.text', lastName)
      .should('contain.text', email)
      .should('contain.text', userAge)
      .should('contain.text', salary)
      .should('contain.text', department);
  });

  it('should find and edit worker', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.rt-table').should('contain.text', 'Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#salary').type('0{Enter}');
    cy.get('.rt-tbody').first().should('contain.text', '100000');
  });
});
