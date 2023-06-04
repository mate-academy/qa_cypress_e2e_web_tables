/// <reference types='cypress' />



describe('Web Tables', () => {
  const user = {
    firstName: 'Denys',
    lastName: 'Shyshlakov',
    email: '444.spam@gmail.com',
    age: '41',
    salary: '700',
    department: 'QA Engineer'
  }
  const existingUser = {
    firstName: 'Cierra',
    lastName: 'Vega',
    email: 'cierra@example.com',
    age: '39',
    salary: '10000',
    department: 'Insurance'
  }

  beforeEach(() => {
    cy.visit('/');
    });  

  it('should contain Pagination', () => {
    cy.contains('.pagination-bottom', 'Page')
      .should('contain', 'rows')
      .and('contain', 'Previous')
      .and('contain', 'Next');
  });
  it('row selection should select different values', () => {
    cy.get('select[aria-label="rows per page"]')
      .select('10');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '10');
    cy.get('select[aria-label="rows per page"]')
      .select('25');
    cy.get('select[aria-label="rows per page"]')
      .should('have.value', '25');
  });
  it('should add new worker and validate data', () => {  
    cy.get('[id="addNewRecordButton"]').click();
    cy.get('#registration-form-modal')
      .should('be.visible')
      .should('have.text', 'Registration Form');
    cy.findPlaceholder('First Name').type(user.firstName);
    cy.findPlaceholder('Last Name').type(user.lastName);
    cy.findPlaceholder('name@example.com').type(user.email);
    cy.findPlaceholder('Age').type(user.age);
    cy.findPlaceholder('Salary').type(user.salary);
    cy.findPlaceholder('Department').type(user.department+'{enter}');
    cy.contains('[class="rt-tbody"]', user.firstName)
      .should('contain', user.lastName)
      .and('contain', user.email)
      .and('contain', user.age)
      .and('contain', user.salary)
      .and('contain', user.department);
  });
  it('should delete worker', () => {  
    cy.get('#delete-record-1').should('exist');
    cy.get('#delete-record-1').click();
    cy.get('.rt-tbody')
      .should('not.contain', '#delete-record-1');
  });
  it('should delete all workers', () => {  
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.rt-tbody').should('not.contain', '#delete-record');
  });
  it('should find a worker and edit info', () => {  
    cy.get('#searchBox').type(existingUser.firstName);
    cy.get('[title="Edit"]').click();
    cy.findPlaceholder('First Name').type('{selectAll}' + user.firstName);
    cy.findPlaceholder('Last Name').type('{selectAll}' + user.lastName);
    cy.findPlaceholder('name@example.com').type('{selectAll}' + user.email);
    cy.findPlaceholder('Age').type('{selectAll}' + user.age);
    cy.findPlaceholder('Salary').type('{selectAll}' + user.salary);
    cy.findPlaceholder('Department').type('{selectAll}' + user.department+'{enter}');
    cy.get('#searchBox').clear();
    cy.contains('[class="rt-tbody"]', user.firstName)
      .should('contain', user.lastName)
      .and('contain', user.email)
      .and('contain', user.age)
      .and('contain', user.salary)
      .and('contain', user.department);
  });
  it.only('should search by all column values', () => {  
    cy.get('#searchBox').type(existingUser.firstName);
    cy.contains('[class="rt-tbody"]', existingUser.firstName)
      .should('be.visible');
    cy.get('#searchBox').type('{selectAll}' + existingUser.lastName);
    cy.contains('[class="rt-tbody"]', existingUser.lastName)
      .should('be.visible');
    cy.get('#searchBox').type('{selectAll}' + existingUser.email);
    cy.contains('[class="rt-tbody"]', existingUser.email)
      .should('be.visible');
    cy.get('#searchBox').type('{selectAll}' + existingUser.age);
    cy.contains('[class="rt-tbody"]', existingUser.age)
      .should('be.visible');
    cy.get('#searchBox').type('{selectAll}' + existingUser.salary);
    cy.contains('[class="rt-tbody"]', existingUser.salary)
      .should('be.visible');
    cy.get('#searchBox').type('{selectAll}' + existingUser.department);
    cy.contains('[class="rt-tbody"]', existingUser.department)
      .should('be.visible');
  });
});
