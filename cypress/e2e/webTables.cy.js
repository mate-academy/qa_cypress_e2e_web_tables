/// <reference types='cypress' />

describe('Web Tables page', () => {
  let employee;

  beforeEach(() => {
    cy.task('generateEmployee').then((generateEmployee) => {
      employee = generateEmployee;
    });
    cy.visit('/');
  });

  it('should contain pagination', () => {
    cy.get('.pagination-bottom').should('exist');
    cy.get('.pagination-bottom').should('contain', 'Previous');
    cy.get('.pagination-bottom').should('contain', 'Page');
    cy.get('.pagination-bottom').should('contain', 'of');
    cy.get('.pagination-bottom').should('contain', 'rows');
    cy.get('.pagination-bottom').should('contain', 'Next');
  });

  it('should provide the ability to select count of rows', () => {
    cy.createUser(employee);
    cy.createUser(employee);
    cy.createUser(employee);
    cy.get('.select-wrap').should('contain', '10 rows');
    cy.get('.select-wrap').should('contain', '20 rows');
    cy.get('.select-wrap').should('contain', '5 rows');
    cy.get('select').select('5');
    cy.get('.-next').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '2');
    cy.get('.-previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1');
  });

  it('should provide the ability to add new worker', () => {
    cy.createUser(employee);
    cy.get('.ReactTable').should('contain', employee.firstName)
      .and('contain', employee.lastName)
      .and('contain', employee.email)
      .and('contain', employee.age)
      .and('contain', employee.salary)
      .and('contain', employee.department);
  });

  it('should provide the ability to delete a worker', () => {
    cy.createUser(employee);
    cy.get('#delete-record-4').click();
    cy.get('.ReactTable').should('not.contain', employee.firstName)
      .and('not.contain', employee.lastName)
      .and('not.contain', employee.email)
      .and('not.contain', employee.age)
      .and('not.contain', employee.salary)
      .and('not.contain', employee.department);
  });

  it('should provide the ability to delete all workers', () => {
    cy.get('[title="Delete"]').then(($value) => {
      const count = $value.length;

      for (let i = 1; i <= count; i++) {
        cy.get('#delete-record-' + i).click();
      }
    });
    cy.contains('No rows found').should('exist');
  });

  it('should provide the ability to find a worker' +
    'edit it and validate data', () => {
    cy.get('#addNewRecordButton').click();
    cy.findByPlaceholder('First Name').type(employee.firstName);
    cy.findByPlaceholder('Last Name').type(employee.lastName);
    cy.findByPlaceholder('name@example.com').type(employee.email);
    cy.findByPlaceholder('Age').type(employee.age);
    cy.findByPlaceholder('Salary').type(employee.salary);
    cy.findByPlaceholder('Department').type(employee.department);
    cy.get('#submit').click();
    cy.findByPlaceholder('Type to search').type(employee.firstName);
    cy.get('.ReactTable').should('contain', employee.firstName)
      .and('contain', employee.lastName);
    cy.get('#edit-record-4').click();
    cy.findByPlaceholder('Salary').clear();
    cy.findByPlaceholder('Salary').type(Number(employee.salary) + 1000);
    cy.get('#submit').click();
    cy.get('.ReactTable').should('contain', employee.firstName)
      .and('contain', employee.lastName)
      .and('contain', employee.email)
      .and('contain', employee.age)
      .and('contain', Number(employee.salary) + 1000)
      .and('contain', employee.department);
  });

  it('should provide to search by all column values', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('.ReactTable').should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Vega');
    cy.get('.ReactTable').should('contain', 'Vega');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('39');
    cy.get('.ReactTable').should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.ReactTable').should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.get('.ReactTable').should('contain', '10000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.ReactTable').should('contain', 'Insurance');
    cy.get('#searchBox').clear();
  });
});
