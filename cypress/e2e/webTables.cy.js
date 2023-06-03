describe('Web Tables page', () => {
  const user = {
    firstName: 'Test',
    lastName: 'User13',
    email: 'testuser13@mail.com',
    age: 20,
    salary: 1000,
    department: 'testDepartment'
  };
  const worker1 = {
    firstName: 'Cierra',
    lastName: 'Vega',
    email: 'cierra@example.com',
    age: 39,
    salary: 10000,
    department: 'Insurance',
    newFirstName: 'Alejandro'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should check the pagination', () => {
    cy.get('.-pagination')
      .should('contain', 'Previous')
      .and('contain', 'Next');
    cy.get('.-pageInfo')
      .should('contain', 'Page');
  });

  it('should check the rows count selection', () => {
    cy.get('select')
      .select('5 rows');
    cy.get('select')
      .should('contain', '5 rows');
  });

  it('should check adding new workers', () => {
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

  it('should check deleting a worker', () => {
    cy.get('#delete-record-1')
      .should('exist');
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
  });

  it('should check deleting all workers', () => {
    cy.get('#delete-record-1')
      .should('exist');
    cy.get('#delete-record-1')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-1');
    cy.get('#delete-record-2')
      .should('exist');
    cy.get('#delete-record-2')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-2');
    cy.get('#delete-record-3')
      .should('exist');
    cy.get('#delete-record-3')
      .click();
    cy.get('.rt-tbody')
      .should('not.contain.html', '#delete-record-3');
  });

  it.only('should check searching a worker and editing it', () => {
    cy.get('#searchBox')
      .type(worker1.firstName);
    cy.get('#basic-addon2')
      .click();
    cy.get('.rt-tr-group')
      .should('contain', worker1.firstName);
    cy.get('#searchBox')
      .type('{selectAll}' + worker1.lastName);
    cy.get('.rt-tr-group')
      .should('contain', worker1.lastName);
    cy.get('#searchBox')
      .type('{selectAll}' + worker1.age);
    cy.get('.rt-tr-group')
      .should('contain', worker1.age);
    cy.get('#searchBox')
      .type('{selectAll}' + worker1.email);
    cy.get('.rt-tr-group')
      .should('contain', worker1.email);
    cy.get('#searchBox')
      .type('{selectAll}' + worker1.salary);
    cy.get('.rt-tr-group')
      .should('contain', worker1.salary);
    cy.get('#searchBox')
      .type('{selectAll}' + worker1.department);
    cy.get('.rt-tr-group')
      .should('contain', worker1.department);
    cy.get('#basic-addon2')
      .click();
    cy.get('[title="Edit"]')
      .click();
    cy.get('#firstName')
      .type('{selectAll}' + worker1.newFirstName);
    cy.get('#submit')
      .click();
    cy.get('.rt-tr-group')
      .should('contain', worker1.newFirstName);
  });
});
