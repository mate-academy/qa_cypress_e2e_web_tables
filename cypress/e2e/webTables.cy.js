/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should check pagination on the Tables page', () => {
    cy.scrollTo('bottom');
    cy.get('.-pagination').should('be.visible');
  });

  it('should select rows per page on the Tables page', () => {
    cy.get('select').should('be.visible');
    cy.get('select[aria-label="rows per page"]').select('5');
    cy.get('select[aria-label="rows per page"]').select('20');
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.generateUser().then((user) => {
      const { firstName, lastName, email, age, salary, department } = user;
      cy.get('#firstName').type(firstName);
      cy.get('#lastName').type(lastName);
      cy.get('#userEmail').type(email);
      cy.get('#age').type(age);
      cy.get('#salary').type(salary);
      cy.get('#department').type(department);
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
  });

  it('should allow to delete worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', 'rt-tr -odd');
  });

  it('should allow to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should allow to find and edit worker', () => {
    cy.get('.rt-table')
      .scrollTo('right');
    cy.get('#edit-record-1').click();

    cy.clearInputFields();

    cy.generateUser().then((user) => {
      const { firstName, lastName, email, age, salary, department } = user;

      cy.get('#firstName').type(firstName);
      cy.get('#lastName').type(lastName);
      cy.get('#userEmail').type(email);
      cy.get('#age').type(age);
      cy.get('#salary').type(salary);
      cy.get('#department').type(department);
      cy.get('#submit').click();
      cy.contains('.rt-td', firstName).should('be.visible');
    });
  });
  it('should allow check search by all column values.', () => {
    cy.get('#git searchBox').type('Ald' + '{enter}');
    cy.get('.rt-td').should('contain', 'Alden');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cant' + '{enter}');
    cy.get('.rt-td').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('4' + '{enter}');
    cy.get('.rt-td').should('contain', '45');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@' + '{enter}');
    cy.get('.rt-td').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('120' + '{enter}');
    cy.get('.rt-td').should('contain', '12000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('comp' + '{enter}');
    cy.get('.rt-td').should('contain', 'Compliance');
  });
});
