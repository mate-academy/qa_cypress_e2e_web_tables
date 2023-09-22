/// <reference types='cypress' />

describe('Web Tables page', () => {
  const user = {
    firstName: 'Olha',
    lastName: 'Hvozd',
    email: 'abussum@gmail.com',
    age: 24,
    salary: 5000,
    department: 'QA'
  };

  const worker1 = {
    firstName: 'Cierra',
    lastName: 'Vega',
    email: 'cierra@example.com',
    age: 39,
    salary: 10000,
    department: 'Insurance',
    newFirstName: 'Helen'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should check the pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.get('.-pageInfo').should('contain', 'Page');
  });

  it('should check the rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
  });

  it('should check adding new workers', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', user.firstName);
    cy.get('.rt-tr-group').should('contain', user.lastName);
    cy.get('.rt-tr-group').should('contain', user.age);
    cy.get('.rt-tr-group').should('contain', user.email);
    cy.get('.rt-tr-group').should('contain', user.salary);
    cy.get('.rt-tr-group').should('contain', user.department);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
    cy.get('#delete-record-2').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
  });

  it('should check searching a worker and editing it', () => {
    cy.get('#searchBox').type(worker1.firstName);
    cy.get('#basic-addon2').click();
    cy.get('.rt-tr-group').should('contain', worker1.firstName);
    cy.get('#searchBox').type('{selectAll}' + worker1.lastName);
    cy.get('.rt-tr-group').should('contain', worker1.lastName);
    cy.get('#searchBox').type('{selectAll}' + worker1.age);
    cy.get('.rt-tr-group').should('contain', worker1.age);
    cy.get('#searchBox').type('{selectAll}' + worker1.email);
    cy.get('.rt-tr-group').should('contain', worker1.email);
    cy.get('#searchBox').type('{selectAll}' + worker1.salary);
    cy.get('.rt-tr-group').should('contain', worker1.salary);
    cy.get('#searchBox').type('{selectAll}' + worker1.department);
    cy.get('.rt-tr-group').should('contain', worker1.department);
    cy.get('#basic-addon2').click();
    cy.get('[title="Edit"]').click();
    cy.get('#firstName').type('{selectAll}' + worker1.newFirstName);
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', worker1.newFirstName);
  });
});
