/// <reference types='cypress' />

describe('Web Tables page', () => {
  const user = {
    firstName: 'angel',
    lastName: 'sen',
    email: 'angelsen@gmail.com',
    age: '10',
    salary: '10000',
    department: '123'
  };

  const newUser = {
    firstName: 'Angelina',
    lastName: 'Sen',
    email: 'angelinasen@gmail.com',
    age: '120',
    salary: '100500',
    department: '231'
  };
  beforeEach(() =>{
    cy.visit('https://demoqa.com/webtables');
  });

  it('pagination should be present', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .should('contain', 'Next');
    cy.get('.-pageInfo')
      .should('contain', 'Page');
  });

  it('should have row count selection', () => {
    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 rows');
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
    cy.get('.rt-tr-group')
      .should('contain', user.firstName)
      .and('contain', user.lastName)
      .and('contain', user.age)
      .and('contain', user.email)
      .and('contain', user.salary)
      .and('contain', user.department);
  });
  it('should find worker in search field and edit it', () => {
    cy.get('#searchBox')
      .type('Cierra');
    cy.get('#edit-record-1')
      .click();
    cy.get('#lastName')
      .clear()
      .type(newUser.lastName);
    cy.get('#userEmail')
      .clear()
      .type(newUser.email);
    cy.get('#age')
      .clear()
      .type(newUser.age);
    cy.get('#salary')
      .clear()
      .type(newUser.salary);
    cy.get('#department')
      .clear()
      .type(newUser.department);
    cy.get('#submit')
      .click();
  });

  it('should delete worker', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
    cy.get('#delete-record-2')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-2');
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-3');
  });
});
