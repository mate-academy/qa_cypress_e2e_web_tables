/// <reference types='cypress' />
const user = {
  firstName: 'inna',
  lastName: 'levytska',
  email: 'inna123@gmail.com',
  age: '40',
  salary: '100',
  department: 'QA'
}
beforeEach(() => {
  cy.visit('https://demoqa.com/webtables')
  });

describe('Web Tables page', () => {
  
  it('should have pagination', () => {
    cy.get('select').select('5 rows');

    cy.createWorker(user);
    cy.createWorker(user);
    cy.createWorker(user);
    cy.get('.pagination-bottom').should('exist');
    cy.get('.-pageJump > input').should('have.value', '1');
    cy.get('.-totalPages').should('contain.text', '2');
    cy.get('.-next > .-btn').click();
    cy.get('.-pageJump > input').should('have.value', '2');
    cy.get('.-previous > .-btn').click();
    cy.get('.-pageJump > input').should('have.value', '1');
  });

  it('should have row count selection', () => {
    cy.get('select')
      .select('50 rows');
      cy.get('select')
      .should('contain', '50 rows');
  });
  it('should provide abbility to add a new worker', () => {
    cy.createWorker(user);
    cy.get('.rt-tbody')
      .should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.email);
    cy.get('.rt-tbody')
      .should('contain', user.age);
    cy.get('.rt-tbody')
      .should('contain', user.salary);
    cy.get('.rt-tbody')
      .should('contain', user.department);
    
  });
  it('should provide abbility to delete the worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });
  it('should delete all workers', () => {
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-1')
      .click();
      cy.get('.rt-tbody').should('not.contain', '#delete-record-3');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-2');
      cy.get('.rt-tbody').should('not.contain', '#delete-record-1');
  });
  it('should provide abbility to find the worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Alden');
    cy.get('#edit-record-2')
      .click();
    cy.get('#lastName')
      .clear()
      .type(user.lastName);
    cy.get('#userEmail')
      .clear()
      .type(user.email);
    cy.get('#age')
      .clear()
      .type(user.age);
    cy.get('#salary')
      .clear()
      .type('3000');
    cy.get('#department')
      .clear()
      .type(user.department);
    cy.get('#submit')
      .click();
    cy.get('.rt-tr').should('contain.text', 'levytska');
  });
  it('should search by all column values', () => {
    cy.createWorker(user);
    cy.get('#searchBox').clear().type(user.firstName);
    cy.get('.rt-tbody').should('contain', user.firstName);

    cy.get('#searchBox').clear().type(user.lastName);
    cy.get('.rt-tbody').should('contain', user.lastName);

    cy.get('#searchBox').clear().type(user.email);
    cy.get('.rt-tbody').should('contain', user.email);

    cy.get('#searchBox').clear().type(user.age);
    cy.get('.rt-tbody').should('contain', user.age);

    cy.get('#searchBox').clear().type(user.salary);
    cy.get('.rt-tbody').should('contain', user.salary);

    cy.get('#searchBox').clear().type(user.department);
    cy.get('.rt-tbody').should('contain', user.department);

});
});
