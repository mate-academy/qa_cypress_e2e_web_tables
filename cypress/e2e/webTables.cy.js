const user = {
  firstName: 'tester',
  lastName: 'tester',
  email: 'tester123@gmail.com',
  age: '123',
  salary: '100',
  department: 'QA'
}

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
    });

  it('should have pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page')
      .should('exist');
  });
  it('should have row count selection', () => {
    cy.get('select')
      .select('20 rows');
  });
  it('should add a new worker', () => {
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
    cy.get('#searchBox')
      .clear()
      .type(user.firstName);
    cy.get('#searchBox')
      .clear()
      .type(user.lastName);
    cy.get('#searchBox')
      .clear()
      .type(user.email);
    cy.get('#searchBox')
      .clear()
      .type(user.age);
    cy.get('#searchBox')
      .clear()
      .type(user.salary);
    cy.get('#searchBox')
      .clear()
      .type(user.department);
  });
  it('should delete the worker', () => {
    cy.get('#delete-record-2')
      .click();
  });
  it('should delete all workers', () => {
    cy.get('#delete-record-3')
      .click();
    cy.get('#delete-record-2')
      .click();
    cy.get('#delete-record-1')
      .click();
  });
  it('should find the worker in search field and edit it', () => {
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
  });
});
