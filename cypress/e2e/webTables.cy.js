/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should check pagination', () => {
    cy.scrollTo('bottom');
    cy.get('.-pagination').should('be.visible');
  });

  it('should select rows per page', () => {
    cy.get('select').should('be.visible');
    cy.get('select[aria-label="rows per page"]').select('5');
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.generateUser().then((user) => {
      const { firstName, lastName, email, age, salary, department } = user;

      cy.get('input#firstName').type(firstName);
      cy.get('input#lastName').type(lastName);
      cy.get('input#userEmail').type(email);
      cy.get('input#age').type(age);
      cy.get('input#salary').type(salary);
      cy.get('input#department').type(department);

      cy.get('#submit').click();

      cy.contains('.rt-td', firstName).should('be.visible');
      cy.contains('.rt-td', lastName).should('be.visible');
      cy.contains('.rt-td', email).should('be.visible');
      cy.contains('.rt-td', age).should('be.visible');
      cy.contains('.rt-td', salary).should('be.visible');
      cy.contains('.rt-td', department).should('be.visible');
    });
  });

  it('should allow to delete worker', () => {
    cy.get('.rt-table')
      .scrollTo('right');
    cy.get('#delete-record-1').click();
    cy.findById('delete-record-1').should('not.exist');
  });

  it('should allow to delete all workers', () => {
    cy.get('.rt-table')
      .scrollTo('right');
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.contains('.rt-noData', 'No rows found').should('be.visible');
  });

  it('should allow to edit worker', () => {
    cy.get('.rt-table')
      .scrollTo('right');
    cy.get('#edit-record-1').click();

    cy.clearInputFields();

    cy.generateUser().then((user) => {
      const { firstName, lastName, email, age, salary, department } = user;

      cy.get('input#firstName').type(firstName);
      cy.get('input#lastName').type(lastName);
      cy.get('input#userEmail').type(email);
      cy.get('input#age').type(age);
      cy.get('input#salary').type(salary);
      cy.get('input#department').type(department);

      cy.get('#submit').click();

      cy.contains('.rt-td', firstName).should('be.visible');
      cy.contains('.rt-td', lastName).should('be.visible');
      cy.contains('.rt-td', email).should('be.visible');
      cy.contains('.rt-td', age).should('be.visible');
      cy.contains('.rt-td', salary).should('be.visible');
      cy.contains('.rt-td', department).should('be.visible');
    });
  });

  it('should allow check search by all column values.', () => {
    cy.findById('searchBox').type('Ald' + '{enter}');

    cy.get('.rt-td').should('contain', 'Alden');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('cant' + '{enter}');

    cy.get('.rt-td').should('contain', 'Cantrell');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('4' + '{enter}');

    cy.get('.rt-td').should('contain', '45');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('alden@' + '{enter}');

    cy.get('.rt-td').should('contain', 'alden@example.com');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('120' + '{enter}');

    cy.get('.rt-td').should('contain', '12000');

    cy.findById('searchBox').clear();

    cy.findById('searchBox').type('comp' + '{enter}');

    cy.get('.rt-td').should('contain', 'Compliance');
  });
});
