/// <reference types='cypress' />
let worker;

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.task('newWorker').then((newWorker) => {
      worker = newWorker;
    });
  });
  it('should display pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.contains('button', 'Previous').should('exist');
    cy.contains('button', 'Next').should('exist');
  });

  it('should display 10 rows by default', () => {
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 10);
  });

  it('should have rows count selection', () => {
    cy.get('select').select('5 rows');
  });

  it('should have rows count selection', () => {
    cy.get('select').select('25 rows');
  });

  it('should have rows count selection', () => {
    cy.get('select').select('50 rows');
  });

  it('should allow to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.get('#age-label').type(worker.age);
    cy.get('#salary-label').type(worker.salary);
    cy.get('#department-label').type(worker.department);
    cy.contains('button', 'Submit').click();
  });

  it('should allow to add a new worker with a random age', () => {
    const randomNumber = Math.floor(Math.random() * (60 - 18 + 1)) + 18;
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type('John');
    cy.findByPlaceholder('Last Name').type('Doe');
    cy.findByPlaceholder('name@example.com').type('john.doe@example.com');

    cy.get('#age-label').type(randomNumber);
    cy.get('#salary-label').type('50000');
    cy.get('#department-label').type('HR');
    cy.contains('button', 'Submit').click();
  });

  it('should allow to delete worker', () => {
    cy.get('.rt-table').scrollTo('right');
    cy.get('#delete-record-1').click();
  });

  it('should allow to delete all workers', () => {
    cy.get('.rt-table').scrollTo('right');
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();

    cy.contains('.rt-noData', 'No rows found').should('be.visible');
  });

  it('should allow to edit worker', () => {
    cy.get('.rt-table').scrollTo('right');
    cy.get('#edit-record-1').click();

    cy.clearInputFields();

    cy.newWorker().then((user) => {
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
  it('should allow to find search by all column values', () => {
    const searchValue = 'Alden';
    cy.findByPlaceholder('Type to search').type(searchValue);
    cy.contains('.rt-td', searchValue, { matchCase: false })
      .should('be.visible');
  });
});
