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
    cy.get('.rt-table').should('contain', firstName, lastName, email, age,
      salary, department);
  });

  it('should verify that the user deleted correctly', () => {
    cy.get('#delete-record-2').click();
    cy.get('.rt-table').should('not.contain', '#delete-record-2');
  });

  it.only('should verify that all the users deleted correctly', () => {
    cy.get('[title="Delete"').click({ multiple: true });
    cy.get('.rt-table').should('not.contain', '#delete-record-2');
  });

  it('should verify that all the user details are updated correctly', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('[title="Edit"').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Natalie');
    cy.get('#submit').click();
    cy.get('.rt-table').should('contain', 'Natalie', 'Vega', '39', '10000',
      'Insurance');
  });

  it('should display correct user is displayed in the table', () => {
    const searchTerms = ['Cierra', 'Vega', '39', '10000', 'Insurance'];
    searchTerms.forEach((term) => {
      cy.get('#searchBox').clear();
      cy.get('#searchBox').type(term);
      cy.get('.rt-table').should('contain', term);
    });
  });
});
