import { generateUser } from '../support/commands';

/// <reference types='cypress' />

const user = generateUser();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables');
  });

  it(' should be elements of pagination is present', () => {
    cy.get('.-pageInfo').should('exist');
    cy.get('.-previous > .-btn').should('exist');
    cy.get('.-pageJump > input').should('exist');
    cy.get('.-totalPages').should('exist');
    cy.get('.-next > .-btn').should('exist');
  });

  it(' should add new user', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.userEmail);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);

    cy.get('#submit').click();

    cy.get('.rt-table').should('contain', user.firstName, user.lastName,
      user.email, user.age, user.salary, user.department);
  });

  it(' should verify that the user is deleted', () => {
    cy.get('#delete-record-2').click();
    cy.get('.rt-table').should('not.contain', '#delete-record-2');
  });

  it(' should verify that the user information is edited', () => {
    cy.get('#searchBox').type('Kierra');
    cy.get('[title="Edit"]').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type(user.firstName);
    cy.get('#salary').clear();
    cy.get('#salary').type(user.salary);
    cy.get('#submit').click();
    cy.get('.rt-table').should('contain', user.firstName, user.lastName,
      user.email, user.age, user.salary, user.department);
  });

  it('should verify that all the users is deleted', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');

    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');

    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should provide an ability to search by all column values', () => {
    const searchValues = [
      user.firstName,
      user.lastName,
      user.age,
      user.userEmail,
      user.salary,
      user.department
    ];

    searchValues.forEach((value) => {
      cy.get('#searchBox').click();
      cy.get('#searchBox').type(value);
      cy.get('#basic-addon2').click();
    });
  });
});
