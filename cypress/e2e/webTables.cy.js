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

  // eslint-disable-next-line max-len
  it.only('should allow to find values by using searching bar in all columns', () => {
    const searchValue = 'Cierra';
    cy.findByPlaceholder('Type to search').type(searchValue);
    cy.get('.rt-tbody')
      .find('.rt-tr-group')
      .each(($row) => {
        cy.wrap($row)
          .find('.rt-td')
          .contains(searchValue, { matchCase: false }) // Перевіряємо наявність шуканого значення у комірках
          .parent() // Знаходимо батьківський елемент, тобто весь рядок
          .should('be.visible'); // Перевіряємо, що рядок видимий
      });
  });

  // it('should allow to find values by using searching bar', () => {
  //   cy.findByPlaceholder('Type to search')
  //     .type('Cierra');
  //   cy.contains('.rt-td', 'Cierra').should('be.visible');
  // });
});
