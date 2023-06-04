/// <reference types='cypress' />

describe('Web Tables page', () => {
  const user = {
    firstName: 'Adam',
    lastName: 'Smith',
    email: 'adamsmith123@mail.com',
    age: 25,
    salary: 3000,
    department: 'HR'
  };

  const newData = {
    email: 'cierra_vega@gmail.com',
    salary: 15000,
    department: 'IT Security'
  };

  const findByValue = {
    firstName: 'Alden',
    lastName: 'Gentry',
    age: 45,
    email: 'cierra@example.com',
    salary: 12000,
    department: 'Insurance'
  };

  beforeEach(() => {
    cy.visit('/webtables');
  });

  it('should have the pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .should('contain', 'Next');
    cy.get('.-pageInfo')
      .should('contain', 'Page')
      .should('contain', 'of');
  });

  it('should have rows count selection', () => {
    cy.get('.-pageSizeOptions')
      .click();
    cy.get('.-pageSizeOptions')
      .should('contain', '5 rows')
      .should('contain', '100 rows');
  });

  it('should provide an ability to add new worker', () => {
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
    cy.get('.rt-tr-group')
      .should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.age)
      .and('contain', user.email)
      .and('contain', user.salary)
      .and('contain', user.department);
  });

  it('should provide an ability to delete worker', () => {
    cy.get('#delete-record-3')
      .should('exist');
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-3')
      .should('not.exist');
  });

  it('should provide an ability to delete all workers', () => {
    cy.get('#delete-record-1')
      .should('exist');
    cy.get('#delete-record-1')
      .click();
    cy.get('#delete-record-1')
      .should('not.exist');
    cy.get('#delete-record-2')
      .should('exist');
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-2')
      .should('not.exist');
    cy.get('#delete-record-3')
      .should('exist');
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-3')
      .should('not.exist');
  });

  it('should provide an ability to find worker in search field and edit it', () => {
    cy.get('[placeholder="Type to search"]')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#userEmail')
      .type('{selectAll}' + newData.email);
    cy.get('#salary')
      .type('{selectAll}' + newData.salary);
    cy.get('#department')
      .type('{selectAll}' + newData.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-tr-group')
      .should('contain', newData.email)
      .and('contain', newData.salary)
      .and('contain', newData.department);
  });

  it('should provide an ability to search by all column values', () => {
    cy.get('[placeholder="Type to search"]')
      .type(findByValue.firstName);
    cy.get('.rt-tr-group')
      .should('contain', findByValue.firstName);
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}' + findByValue.lastName);
    cy.get('.rt-tr-group')
      .should('contain', findByValue.lastName);
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}' + findByValue.age);
    cy.get('.rt-tr-group')
      .should('contain', findByValue.age);
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}' + findByValue.email);
    cy.get('.rt-tr-group')
      .should('contain', findByValue.email);
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}' + findByValue.salary);
    cy.get('.rt-tr-group')
      .should('contain', findByValue.salary);
    cy.get('[placeholder="Type to search"]')
      .type('{selectAll}' + findByValue.department);
    cy.get('.rt-tr-group')
      .should('contain', findByValue.department);
  });
});
