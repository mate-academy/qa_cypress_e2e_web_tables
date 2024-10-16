/// <reference types='cypress' />
import { generateWorker } from '../support/generate';

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should check pagination', () => {
    cy.get('.-pageInfo').should('be.visible').and('exist');
    cy.get('[aria-label="rows per page"]').should('be.visible').and('exist');
  });

  it('should add new user', () => {
    const { email, firstName, lastName, age, salary, department } =
   generateWorker();
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age.toString());
    cy.get('#salary').type(salary.toString());
    cy.get('#department').type(department);
    cy.get('#submit').click();
    cy.get('.rt-table').should('contain', firstName);
  });

  it('should delete user', () => {
    cy.get('#delete-record-2').click();
    cy.get('.rt-table').should('not.contain', '#delete-record-2');
  });

  it.only('should delete all users', () => {
    cy.get('[title="Delete"').click({ multiple: true });
    cy.get('.rt-table').should('not.contain', '#delete-record-2');
  });

  it('should edit user', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('[title="Edit"').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Natalie');
    cy.get('#submit').click();
    cy.get('.rt-table').should('contain', 'Natalie');
  });

  it('should check the search by all column values', () => {
    const searchTerms = ['Cierra', 'Vega', '39', '10000', 'Insurance'];
    searchTerms.forEach((term) => {
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(term);
      cy.get('.rt-table').should('contain', term);
    });
  });
});
