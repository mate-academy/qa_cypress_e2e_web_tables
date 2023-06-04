/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  before(() => {
    cy.visit('/');
    cy.task('generateUser')
      .then(generateUser =>{
        user = generateUser
      });
    });

  it('check workflow on the page', () => {
    
    cy.get('.select-wrap')
    .type('{downArrow}{enter}');

    cy.get('#addNewRecordButton')
    .click();

    cy.get('#firstName')
    .type(user.firstName);

    cy.get('#lastName')
    .type(user.lastName);

    cy.get('#userEmail')
    .type(user.email);

    cy.get('#age')
    .type('21');

    cy.get('#salary')
    .type('2500');

    cy.get('#department')
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.contains('.web-tables-wrapper', 'First Name')
    .should('contain', user.firstName);

    cy.contains('.web-tables-wrapper', 'Last Name')
    .should('contain', user.lastName);

    cy.contains('.web-tables-wrapper', 'Age')
    .should('contain', '21');

    cy.contains('.web-tables-wrapper', 'Email')
    .should('contain', user.email);

    cy.contains('.web-tables-wrapper', 'Salary')
    .should('contain', '2500');

    cy.contains('.web-tables-wrapper', 'Department')
    .should('contain', user.department);
    
    cy.get('#delete-record-1')
    .click();

    cy.get('#searchBox')
    .type('Cierra');

    cy.get('#edit-record-1')
    .click();

    cy.get('#department').clear()
    .type(user.department);

    cy.get('#submit')
    .click();

    cy.get('#searchBox')
    .clear();

    cy.get('#searchBox')
    .type(user.searchField)
    .should('have.value', user.searchField)
    .clear();

    cy.get('#delete-record-1')
    .click();

    cy.get('#delete-record-2')
    .click();

    cy.get('#delete-record-3')
    .click();

    cy.get('#delete-record-4')
    .click();
  });
});
