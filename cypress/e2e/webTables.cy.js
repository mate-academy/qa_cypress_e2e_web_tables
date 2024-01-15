/// <reference types='cypress' />

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  let employee;
  before(() => {
    cy.task('generateEmployee').then((generateEmployee) => {
      employee = generateEmployee;
    });
  });

  it('validate pagination', () => {
    cy.addNewEmployee(employee);
    cy.addNewEmployee(employee);
    cy.addNewEmployee(employee);

    cy.get('[aria-label="rows per page"]').select('5');

    cy.contains('[type="button"]', 'Next').click();
    cy.get('[type="number"]').should('have.value', '2');

    cy.contains('[type="button"]', 'Previous').click();
    cy.get('[type="number"]').should('have.value', '1');
  });

  it('allows rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('10 rows', { force: true });
    cy.get('.rt-tbody').children().should('have.length', 10);
  });

  it('allows to add a new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');

    cy.findByPlaceholder('First Name').type(employee.firstName);
    cy.findByPlaceholder('Last Name').type(employee.lastName);
    cy.findByPlaceholder('name@example.com').type(employee.email);
    cy.findByPlaceholder('Age').type(employee.age);
    cy.findByPlaceholder('Salary').type(employee.salary);
    cy.findByPlaceholder('Department').type(employee.department);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', employee.firstName)
      .and('contain', employee.lastName)
      .and('contain', employee.email)
      .and('contain', employee.age)
      .and('contain', employee.salary)
      .and('contain', employee.department);
  });

  it('allows to delete a worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('.modal-content').should('contain', 'Registration Form');

    cy.findByPlaceholder('First Name').type('Shanti');
    cy.findByPlaceholder('Last Name').type('Shantihi');
    cy.findByPlaceholder('name@example.com').type('shanti@gmail.com');
    cy.findByPlaceholder('Age').type('42');
    cy.findByPlaceholder('Salary').type('5000');
    cy.findByPlaceholder('Department').type('Development');
    cy.get('#submit').click();
    cy.get('#delete-record-4').click();
    cy.get('.ReactTable.-striped.-highlight').should('not.contain', 'Shanti')
      .and('not.contain', 'Shantihi');
  });

  it('allows to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.ReactTable.-striped.-highlight')
      .should('contain', 'No rows found');
  });

  it('validate data in the worker row after editing the worker', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.ReactTable.-striped.-highlight').should('contain', 'Alden');
    cy.get('#edit-record-2').click();
    cy.findByPlaceholder('Last Name').clear();
    cy.findByPlaceholder('Last Name').type('Shevchenko');
    cy.get('#submit').click();
    cy.get('.rt-td').should('contain', 'Alden')
      .and('contain', 'Shevchenko');
  });

  it('allows to check the search by all column values', () => {
    cy.findByPlaceholder('Type to search').type('Alden');
    cy.get('.rt-td').should('contain', 'Alden');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Cantrell');
    cy.get('.rt-td').should('contain', 'Cantrell');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('45');
    cy.get('.rt-td').should('contain', '45');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.rt-td').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('12000');
    cy.get('.rt-td').should('contain', '12000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Compliance');
    cy.get('.rt-td').should('contain', 'Compliance');
  });
});
