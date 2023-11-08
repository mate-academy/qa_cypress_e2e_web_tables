/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.visit('/'),

    cy.task('generationUsers').then(generationUsers => {
    user = generationUsers
    })
  });

  it('validation or pagination exists', () => {
    cy.get('.-pagination')
      .should('exist');
    cy.contains('.-next > .-btn', 'Next')
    cy.contains('.-previous > .-btn', 'Previous')

  });

  it('check row count selector', () => {
    cy.get('.-center')
      .should('exist');
    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 row')

  })

  it('check for adding employees', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(user.firstName);
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-td')
      .should('contain', user.firstName);
    cy.get('.rt-td')
      .should('contain', user.lastName);
    cy.get('.rt-td')
      .should('contain', user.email);
  })

  it('delete a worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-td')
      .should('not.contain', user.email);
  })

  it('delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-td')
      .should('contain', '');
  })

  it('edit information about the worker', () => {
    cy.get('#searchBox')
    .type('Cie');
    cy.get('#edit-record-1')
    .click();
    cy.get('#firstName')
      .clear()
      .type(user.firstName);
    cy.get('#lastName')
      .clear()
      .type(user.lastName);
    cy.get('#userEmail')
      .clear()
      .type(user.email);
    cy.get('#age')
      .clear()
      .type(user.age);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
      .clear()
    cy.get('.rt-td')
      .should('contain', user.firstName);
    cy.get('.rt-td')
      .should('contain', user.lastName);
    cy.get('.rt-td')
      .should('contain', user.email);
  })

  it('verification of employee information', () => {
    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(user.firstName);
    cy.get('#lastName')
      .type(user.lastName);
    cy.get('#userEmail')
      .type(user.email);
    cy.get('#age')
      .type(user.age);
    cy.get('#salary')
      .type(user.salary);
    cy.get('#department')
      .type(user.department);
    cy.get('#submit')
      .click();
    cy.get('#searchBox')
    .type(user.firstName);
    cy.get('.rt-tr-group')
      .should('contain', user.firstName);
    cy.get('#searchBox')
      .clear();

    cy.get('#searchBox')
      .type(user.lastName);
    cy.get('.rt-tr-group')
        .should('contain', user.lastName);
    cy.get('#searchBox')
        .clear();

    cy.get('#searchBox')
        .type(user.email);
    cy.get('.rt-tr-group')
          .should('contain', user.email);
    cy.get('#searchBox')
          .clear();

    cy.get('#searchBox')
      .type(user.age);
    cy.get('.rt-tr-group')
        .should('contain', user.age);
    cy.get('#searchBox')
        .clear();

    cy.get('#searchBox')
        .type(user.salary);
    cy.get('.rt-tr-group')
        .should('contain', user.salary);
    cy.get('#searchBox')
        .clear();

    cy.get('#searchBox')
        .type(user.department);
    cy.get('.rt-tr-group')
        .should('contain', user.department);
    cy.get('#searchBox')
        .clear();
  })



});
